// src/pages/home.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import BannerCarousel from "../components/BannerCarousel";
import CategoryCarousel from "../components/CategoryCarousel";
import CategoryCard from "../components/ui/CategoryCard";

// Categories for Browse by Category
const categories = [
  {
    name: "Concerts",
    image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Workshops",
    image: "https://images.unsplash.com/photo-1507874457470-272b3c8d8ee2?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Festivals",
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Theatre",
    image: "https://images.unsplash.com/photo-1508606572321-901ea443707f?auto=format&fit=crop&w=800&q=80",
  },
];

export default function Home() {
  const [featured, setFeatured] = useState([]);
  const [bannerImages, setBannerImages] = useState([]);

  // Fetch data for featured events and banner images
  useEffect(() => {
    // Fetch banner images from Unsplash API
    fetch("https://api.unsplash.com/photos?client_id=qrehNWwr7Vc6pUbGB_OtIO5R4N5fXqOWw97Tvz9q4a4")  // Replace with your Unsplash API key
      .then(res => res.json())
      .then(data => {
        const images = data.map(image => ({
          url: image.urls.regular,
          alt: image.alt_description,
        }));
        setBannerImages(images);
      })
      .catch(err => console.error("Failed to fetch banner images:", err));

    // Fetch featured events from your backend
    fetch("/events")
      .then(res => res.json())
      .then(data => {
        const transformed = data.map(evt => ({
          id: evt.id,
          title: evt.title,  // Ensure correct field names
          bannerImage: evt.image || evt.bannerImage,  // Adjust according to your data
          startDate: evt.startDate || evt.date,
          endDate: evt.endDate || evt.date,  // Assuming end date is available or use startDate for simplicity
          location: evt.venue || evt.location,
          organizer: {
            username: evt.organizerName || "Unknown",  // Adjust as needed
          }
        }));
        setFeatured(transformed);
      })
      .catch(err => console.error("Failed to fetch events:", err));
  }, []);

  return (
    <div className="space-y-20 font-sans text-gray-900 bg-gradient-to-br from-white to-purple-50">
      {/* Hero Section using BannerCarousel */}
      <section className="px-4">
        <BannerCarousel className="w-full h-96">
          {bannerImages.length > 0 ? (
            bannerImages.map((image, index) => (
              <div key={index} className="relative w-full h-96 rounded-2xl overflow-hidden shadow-xl mb-8">
                <img
                  src={image.url}
                  alt={image.alt}
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-center px-4">
                  <h1 className="text-white text-3xl md:text-5xl font-bold mb-2">Find Events That Excite You</h1>
                  <p className="text-white text-md md:text-lg mb-4 max-w-xl">
                    Explore music festivals, business conferences, workshops, and more happening near you.
                  </p>


                  <Link
                    to="/events"
                   className="bg-white text-black px-6 py-2 rounded-full font-semibold hover:bg-gray-200 transition inline-block"
                 >
               Explore Now
                  </Link>


                </div>
              </div>
            ))
          ) : (
            <p>Loading Banner...</p>
          )}
        </BannerCarousel>
      </section>

      {/* Why Evently Section */}
      <section className="max-w-5xl mx-auto text-center space-y-6 px-6">
        <h2 className="text-4xl font-bold text-indigo-700">Why Choose Evently?</h2>
        <p className="text-lg text-gray-700 max-w-3xl mx-auto">
          Create, discover, and sell tickets for experiences that matter. Evently makes it effortless to launch stunning event pages, manage attendees, and grow your audience—all in one place.
        </p>
      </section>

      {/* Featured Events */}
      <section className="max-w-7xl mx-auto px-6">
        <h3 className="text-3xl font-semibold text-indigo-800 mb-6">Recommended For You</h3>
        {featured.length === 0 ? (
          <p className="text-lg text-gray-700">No recommended events at the moment.</p>
        ) : (
          <CategoryCarousel events={featured} />
        )}
      </section>

      {/* Browse by Category */}
      <section className="max-w-7xl mx-auto px-6">
        <h3 className="text-3xl font-semibold text-indigo-800 mb-6">Browse by Category</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          {categories.map(cat => (
            <CategoryCard key={cat.name} name={cat.name} image={cat.image} />
          ))}
        </div>
      </section>

      {/* About Evently Section */}
      <section className="bg-white py-16 px-6 shadow-inner rounded-xl max-w-6xl mx-auto text-center space-y-6">
        <h2 className="text-4xl font-bold text-indigo-700">Built for Organizers. Loved by Audiences.</h2>
        <p className="text-gray-700 max-w-3xl mx-auto">
          At Evently, we believe in the power of connection. Whether you're hosting a grand concert or an intimate workshop, our platform empowers you to create, manage, and share your events effortlessly. Join a community where every event finds its audience.
        </p>
        <Link
          to="/about"
          className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white text-lg px-6 py-3 rounded-full font-semibold shadow-lg transition"
        >
          Learn More
        </Link>
      </section>
    </div>
  );
}
