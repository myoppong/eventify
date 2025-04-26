// src/pages/AboutUs.jsx
import React from 'react';
import TeamMemberCard from '../components/ui/TeamMemberCard';

const teamMembers = [
  { name: 'Alice Johnson', role: 'CEO & Founder', img: 'https://i.pravatar.cc/150?img=32' },
  { name: 'Bob Smith', role: 'CTO', img: 'https://i.pravatar.cc/150?img=12' },
  { name: 'Carol Martinez', role: 'Head of Marketing', img: 'https://i.pravatar.cc/150?img=48' },
  { name: 'David Lee', role: 'Lead Developer', img: 'https://i.pravatar.cc/150?img=56' },
];

export default function AboutUs() {
  return (
    <div className="font-sans text-gray-900">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-20">
        <div className="container mx-auto text-center px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">About Evently</h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto">
            We’re here to help you discover, organize, and share unforgettable experiences.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="container mx-auto py-16 px-4 grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          <h2 className="text-3xl font-semibold mb-4">Our Mission</h2>
          <p className="text-gray-700 leading-relaxed">
            To simplify event management by providing an intuitive, all-in-one platform where organizers can create beautiful event pages, manage attendees, and streamline ticket sales.
          </p>
        </div>
        <div>
          <h2 className="text-3xl font-semibold mb-4">Our Vision</h2>
          <p className="text-gray-700 leading-relaxed">
            To be the world’s most trusted event platform, fostering vibrant communities through seamless technology and unparalleled user experience.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-semibold mb-8">Our Core Values</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {['Innovation', 'Integrity', 'Community', 'Excellence'].map((value, idx) => (
              <div key={idx} className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition">
                <h3 className="text-xl font-medium mb-2">{value}</h3>
                <p className="text-gray-600">
                  {value === 'Innovation' && 'We embrace creativity and constantly seek new ways to improve.'}
                  {value === 'Integrity' && 'We act with honesty and adhere to the highest ethical standards.'}
                  {value === 'Community' && 'We build meaningful connections and support event communities worldwide.'}
                  {value === 'Excellence' && 'We strive for the highest quality in everything we do.'}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="container mx-auto py-16 px-4">
        <h2 className="text-3xl font-semibold text-center mb-8">Meet the Team</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {teamMembers.map((member) => (
            <TeamMemberCard key={member.name} name={member.name} role={member.role} img={member.img} />
          ))}
        </div>
      </section>

      {/* Contact */}
      <section className="bg-indigo-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-semibold mb-4">Get in Touch</h2>
          <p className="mb-6">
            Have questions or need support? We’d love to hear from you.
          </p>
          <a
            href="mailto:support@evently.com"
            className="inline-block bg-white text-indigo-600 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition"
          >
            Contact Support
          </a>
        </div>
      </section>

      <footer className="bg-gray-800 text-gray-300 py-6">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; {new Date().getFullYear()} Evently. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
