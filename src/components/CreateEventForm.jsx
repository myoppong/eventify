import React, { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import api from "../services/api";
import InputField from "./ui/Input";
import TextArea from "./ui/TextArea";
import Button from "./ui/Button";
import { Select } from "flowbite-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TimePicker from "./ui/TimePicker";
import UploadDropzone from "./ui/UploadDropzone";
import ticketOverlayExample from "../assets/tickit.png";

// Zod schema
const eventSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(10),
  location: z.string().nonempty(),
  startDate: z.date(),
  endDate: z.date(),
  startTime: z.string().nonempty(),
  endTime: z.string().nonempty(),
  type: z.string().nonempty(),
  isVirtual: z.boolean().optional(),
  categories: z.string().nonempty(),
  socialLinks: z.object({
    facebook: z.string().optional(),
    instagram: z.string().optional(),
    twitter: z.string().optional(),
  }),
  allowMessaging: z.boolean().optional(),
  refundPolicy: z.string().optional(),
  tickets: z.array(
    z.object({
      type: z.string().nonempty(),
      price: z.number().min(0),
      quantity: z.number().min(1),
      description: z.string().optional(),
      customFields: z.string().optional(),
      image: z.instanceof(File),
    })
  ),
});

export default function CreateEventForm() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      isVirtual: false,
      allowMessaging: false,
      socialLinks: { facebook: "", instagram: "", twitter: "" },
      tickets: [{ type: "", price: 0, quantity: 1, description: "", customFields: "", image: null }],
    },
  });

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [isVirtual, setIsVirtual] = useState(false);
  const [bannerFile, setBannerFile] = useState(null);
  const [bannerPreview, setBannerPreview] = useState("");

  // just below your useState declarations
const handleVirtualToggle = () => {
  setIsVirtual(prev => !prev);
  setValue("isVirtual", !isVirtual);
};


  const { fields, append, remove } = useFieldArray({ control, name: "tickets" });

  const onSubmit = async (data) => {
    try {
      // Sanitize customFields into array
      const sanitizedTickets = data.tickets.map((t) => ({
        ...t,
        customFields: t.customFields
          ? t.customFields.split(",").map((f) => f.trim())
          : [],
      }));

      // Combine date and time
      const startDT = new Date(startDate);
      const endDT = new Date(endDate);
      if (startTime instanceof Date)
        startDT.setHours(startTime.getHours(), startTime.getMinutes());
      if (endTime instanceof Date)
        endDT.setHours(endTime.getHours(), endTime.getMinutes());

      // Build payload
      const payload = {
        title: data.title,
        description: data.description,
        location: data.location,
        startDate: startDT.toISOString(),
        endDate: endDT.toISOString(),
        startTime: data.startTime,
        endTime: data.endTime,
        type: data.type,
        isVirtual: data.isVirtual,
        categories: data.categories,
        socialLinks: data.socialLinks,
        allowAttendeeMessaging: data.allowMessaging,
        refundPolicy: data.refundPolicy,
        tickets: sanitizedTickets.map(({ type, price, quantity, description, customFields }) => ({
          type,
          price,
          quantity,
          description,
          customFields,
        })),
      };

      const formData = new FormData();

// 1) The JSON blob
formData.append("data", JSON.stringify(payload));

// 2) Then the banner file
if (bannerFile) {
  formData.append("banner", bannerFile);
}

// 3) Then each ticket image
sanitizedTickets.forEach((_, idx) => {
  const file = data.tickets[idx].image;
  if (file) {
    formData.append(`ticketImage-${idx}`, file);
  }
});

await api.post("/create-event", formData, {
  headers: { "Content-Type": "multipart/form-data" },
});

      toast.success("Event created successfully!");
      navigate("/organizer/dashboard");
    } catch (err) {
      console.error("Submission error:", err.response?.data || err.message);
      toast.error("Failed to create event");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-6 max-w-3xl mx-auto p-4">
      <h2 className="text-2xl font-bold">Create Event</h2>

      {/* Event Title & Description */}
      <InputField label="Event Title" {...register("title")} error={errors.title?.message} />
      <TextArea label="Event Description" {...register("description")} error={errors.description?.message} />

      {/* Dates */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block mb-1">Start Date</label>
          <DatePicker
            selected={startDate}
            onChange={d => { setStartDate(d); setValue("startDate", d); }}
            dateFormat="yyyy-MM-dd"
            className="w-full"
          />
          {errors.startDate && <p className="text-red-500 text-sm">{errors.startDate.message}</p>}
        </div>
        <div>
          <label className="block mb-1">End Date</label>
          <DatePicker
            selected={endDate}
            onChange={d => { setEndDate(d); setValue("endDate", d); }}
            dateFormat="yyyy-MM-dd"
            className="w-full"
          />
          {errors.endDate && <p className="text-red-500 text-sm">{errors.endDate.message}</p>}
        </div>
      </div>

      {/* Times */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block mb-1">Start Time</label>
          <TimePicker
            selected={startTime}
            onChange={t => { setStartTime(t); setValue("startTime", t.toLocaleTimeString()); }}
          />
          {errors.startTime && <p className="text-red-500 text-sm">{errors.startTime.message}</p>}
        </div>
        <div>
          <label className="block mb-1">End Time</label>
          <TimePicker
            selected={endTime}
            onChange={t => { setEndTime(t); setValue("endTime", t.toLocaleTimeString()); }}
          />
          {errors.endTime && <p className="text-red-500 text-sm">{errors.endTime.message}</p>}
        </div>
      </div>

      {/* Location & Type */}
      <InputField label="Location or Virtual Link" {...register("location")} error={errors.location?.message} />
      <div>
        <label className="block mb-1">Event Type</label>
        <Select {...register("type")}> 
          <option value="">Select event type</option>
          <option value="Conference">Conference</option>
          <option value="Concert">Concert</option>
          <option value="Webinar">Webinar</option>
          <option value="Festival">Festival</option>
        </Select>
        {errors.type && <p className="text-red-500 text-sm">{errors.type.message}</p>}
      </div>

      {/* Virtual Toggle */}
      <label className="flex items-center space-x-2">
        <input type="checkbox" checked={isVirtual} onChange={handleVirtualToggle} />
        <span>Virtual Event</span>
      </label>

      {/* Banner Upload */}
      <div>
        <label className="block mb-1">Event Banner (1356×1024)</label>
        <UploadDropzone
          accept="image/*"
          onFileSelect={file => {
            setBannerFile(file);
            setBannerPreview(URL.createObjectURL(file));
            setValue("banner", file);
          }}
        />
        {bannerPreview && (
          <img src={bannerPreview} alt="Banner Preview" className="h-32 object-cover mt-2" />
        )}
        {errors.banner && <p className="text-red-500 text-sm">{errors.banner.message}</p>}
      </div>

      {/* Categories & Social Links */}
      <InputField label="Categories (comma separated)" {...register("categories")} error={errors.categories?.message} />
      <div className="mb-4">
        <h3 className="font-semibold text-lg">Social Media Links</h3>
        <InputField label="Facebook URL" {...register("socialLinks.facebook")} error={errors.socialLinks?.facebook?.message} />
        <InputField label="Instagram URL" {...register("socialLinks.instagram")} error={errors.socialLinks?.instagram?.message} />
        <InputField label="Twitter URL" {...register("socialLinks.twitter")} error={errors.socialLinks?.twitter?.message} />
      </div>
      <label className="flex items-center space-x-2">
        <input type="checkbox" {...register("allowMessaging")} />
        <span>Allow Attendee Messaging</span>
      </label>
      <TextArea label="Refund Policy" {...register("refundPolicy")} error={errors.refundPolicy?.message} />

      {/* Ticket Setup */}
      <div>
        <h3 className="text-xl font-semibold mt-6">Ticket Setup</h3>
        {fields.map((ticket, idx) => (
          <div key={ticket.id} className="border p-4 mt-4 rounded-lg space-y-4">
            <InputField label="Ticket Type" {...register(`tickets.${idx}.type`)} error={errors.tickets?.[idx]?.type?.message} />
            <InputField label="Price" type="number" {...register(`tickets.${idx}.price`, { valueAsNumber: true })} error={errors.tickets?.[idx]?.price?.message} />
            <InputField label="Quantity" type="number" {...register(`tickets.${idx}.quantity`, { valueAsNumber: true })} error={errors.tickets?.[idx]?.quantity?.message} />
            <TextArea label="Description" {...register(`tickets.${idx}.description`)} error={errors.tickets?.[idx]?.description?.message} />
            <InputField label="Custom Fields (comma-separated)" {...register(`tickets.${idx}.customFields`)} />
            <label htmlFor={`tickets.${idx}.image`} className="block mb-1">Ticket Image (1356×1024)</label>
            <div className="w-full max-w-md mx-auto mb-4 border rounded-md overflow-hidden shadow-sm">
              <img src={ticketOverlayExample} alt="Ticket layout preview" className="w-full object-cover" />
              <p className="text-center text-sm text-gray-600 mt-1">Example overlay illustration</p>
            </div>
            <UploadDropzone onFileSelect={(file) => setValue(`tickets.${idx}.image`, file)} accept="image/*" />

{watch(`tickets.${idx}.image`) && (() => {
  const fileOrUrl = watch(`tickets.${idx}.image`);
  const src = typeof fileOrUrl === "string"
    ? fileOrUrl
    : URL.createObjectURL(fileOrUrl);

  return (
    <img
      src={src}
      alt={`Preview ${idx}`}
      className="h-32 object-cover mt-2"
      onLoad={() => {
        // clean up the blob URL once loaded
        if (typeof fileOrUrl !== "string") {
          URL.revokeObjectURL(src);
        }
      }}
    />
  );
})()}


            {errors.tickets?.[idx]?.image && <p className="text-red-500 text-sm">{errors.tickets[idx].image.message}</p>}
            <Button type="button" onClick={() => remove(idx)} className="bg-red-600 hover:bg-red-700">
              Remove Ticket
            </Button>
          </div>
        ))}
        <Button type="button" onClick={() => append({ type: "", price: 0, quantity: 1, description: "", customFields: "", image: "" })}>
          Add Ticket
        </Button>
      </div>

      {/* Submit */}
      <div className="text-right">
        <Button type="submit">Submit</Button>
      </div>
    </form>
  );
}
