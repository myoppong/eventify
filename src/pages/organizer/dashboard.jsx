import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import EventCard from "../../components/EventCard";
import Button from "../../components/ui/Button";
import Loader from "../../components/ui/Loader";
import { toast, Toaster } from "react-hot-toast";
import ErrorBoundary from "../../components/ErrorBoundary";
import api from "../../services/api";  // Assuming you've set up Axios



export default function Dashboard() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const token = localStorage.getItem("token");
  
        if (!token) {
          toast.error("You must be logged in to view events.");
          return;
        }
  
        const response = await api.get("/organizer/my-events/overview", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        const data = response.data.events;
        // Validate if events array is correctly structured
        if (Array.isArray(data) && data.every(event => event.banner && event.title)) {
          setEvents(data);
        } else {
          toast.error("Some event data is missing or incorrect.");
        }
      } catch (err) {
        console.error("Failed to fetch events:", err);
        toast.error("Failed to load events");
      } finally {
        setLoading(false);
      }
    };
  
    fetchEvents();
  }, []);
  

  const handleEdit = (id) => navigate(`/organizer/event/${id}`);
  const handleDelete = (id) => {
    api.delete(`/organizer/events/${id}`)
      .then(() => {
        setEvents((prev) => prev.filter((e) => e.eventId !== id));
        toast.success("Event deleted");
      })
      .catch((err) => {
        console.error("Delete failed:", err);
        toast.error("Delete failed");
      });
  };

  if (loading) return <Loader />;

  return (
    <ErrorBoundary>
      <div className="p-6 space-y-6">
        {/* Create Event Button */}
        <div className="flex justify-end">
          <Button onClick={() => navigate("/organizer/create")}>+ Create Event</Button>
        </div>

        {/* Toast Notifications Container */}
        <Toaster position="top-right" />

        {/* Events Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.isArray(events) && events.length > 0 ? (
            events.map((event) => (
              <EventCard
                key={event.eventId}
                bannerUrl={event.banner}
                title={event.title}
                sold={event.ticketsSold}
                remaining={event.ticketsLeft}
                onEdit={() => handleEdit(event.eventId)}
                onDelete={() => handleDelete(event.eventId)}
                onClick={() => navigate(`/organizer/event/${event.eventId}`)}
              />
            ))
          ) : (
            <p>No events available.</p>
          )}
        </div>
      </div>
    </ErrorBoundary>
  );
}

