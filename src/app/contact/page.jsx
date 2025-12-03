"use client";

import React, { useState } from "react";
import toast from "react-hot-toast";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill all required fields!");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      setLoading(false);

      if (res.ok) {
        toast.success("Email sent Successfully!");
        setFormData({ name: "", email: "", phone: "", message: "" });
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      setLoading(false);
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-2xl bg-white p-8 rounded-2xl shadow-xl border">

        <h1 className="text-4xl font-bold text-center text-theme mb-6">
          Contact Us
        </h1>
        <p className="text-center text-gray-600 mb-6">
          Have questions? Send us a message and we’ll get back to you!
        </p>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">

          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Full Name"
            className="border border-gray-300 p-3 rounded-lg focus:ring-theme"
          />

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email Address"
            className="border border-gray-300 p-3 rounded-lg focus:ring-theme"
          />

          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone Number (optional)"
            className="border border-gray-300 p-3 rounded-lg focus:ring-theme"
          />

          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Your Message"
            rows="5"
            className="border border-gray-300 p-3 rounded-lg focus:ring-theme"
          ></textarea>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-theme text-black font-bold py-3 rounded-lg hover:bg-[#a8cc59] transition disabled:opacity-50 cursor-pointer"
          >
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactPage;
