"use client";
import React from "react";

const AboutPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#e0e6d8]">
      <section className="bg-theme text-white py-16 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">About Gill Mart</h1>
        <p className="max-w-3xl mx-auto text-lg md:text-xl">
          Welcome to <span className="font-semibold">Gill Mart</span> — your trusted online marketplace where you can find everything from daily essentials to luxury products, all in one place.
        </p>
      </section>

      
      <section className="py-16 px-6 max-w-6xl mx-auto text-gray-700">
        <div className="flex flex-col md:flex-row items-center gap-10">
          <img
            src="/images/Gill.png"
            alt="Gill Mart Store"
            className="w-full md:w-1/2 rounded-lg shadow-lg object-cover h-[300px]"
          />
          <div className="flex-1">
            <h2 className="text-3xl font-bold text-theme mb-4">Our Story</h2>
            <p className="leading-relaxed mb-4">
              Founded in <strong>2025</strong>, <strong>Gill Mart</strong> began with a simple vision: to make shopping convenient, affordable, and enjoyable for everyone. Whether you’re buying groceries, electronics, fashion, or home essentials — we’ve got it all covered under one roof.
            </p>
            <p className="leading-relaxed">
              Our team works tirelessly to bring you the best deals, top brands, and reliable delivery services, so you can shop with confidence from the comfort of your home.
            </p>
          </div>
        </div>
      </section>

    
      <section className="bg-white py-16 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10">
          <div className="p-6 rounded-lg shadow-md border border-gray-100 transition-transform duration-300 hover:-translate-y-2 hover:shadow-lg hover:shadow-[#869e62] bg-gray-200">
            <h3 className="text-2xl font-bold text-theme mb-3">🎯 Our Mission</h3>
            <p className="text-gray-700 leading-relaxed">
              To deliver a seamless shopping experience with a wide variety of products, competitive prices, and fast, reliable delivery — making your life easier and smarter.
            </p>
          </div>
          <div className="p-6 rounded-lg shadow-md border border-gray-100 transition-transform duration-300 hover:-translate-y-2 hover:shadow-lg hover:shadow-[#869e62] bg-gray-200">
            <h3 className="text-2xl font-bold text-theme mb-3">🚀 Our Vision</h3>
            <p className="text-gray-700 leading-relaxed">
              To become Pakistan’s most loved and trusted e-commerce platform — connecting millions of customers with thousands of sellers across the nation.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-green-50 py-16 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-theme mb-8">Our Core Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-200 rounded-lg shadow p-6 transition-transform duration-300 hover:-translate-y-2 hover:shadow-lg hover:shadow-[#869e62]">
              <h4 className="text-xl font-semibold mb-2 text-theme">Customer First</h4>
              <p className="text-gray-600">
                We prioritize customer satisfaction and always strive to exceed expectations.
              </p>
            </div>
            <div className="bg-gray-200 rounded-lg shadow p-6 transition-transform duration-300 hover:-translate-y-2 hover:shadow-lg hover:shadow-[#869e62]">
              <h4 className="text-xl font-semibold mb-2 text-theme">Integrity</h4>
              <p className="text-gray-600">
                Transparency and honesty are the foundation of everything we do.
              </p>
            </div>
            <div className="bg-gray-200 rounded-lg shadow p-6 transition-transform duration-300 hover:-translate-y-2 hover:shadow-lg hover:shadow-[#869e62]">
              <h4 className="text-xl font-semibold mb-2 text-theme">Innovation</h4>
              <p className="text-gray-600">
                We continuously evolve our platform to deliver better products and services.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 👨‍💻 Team Section */}
      <section className="py-16 px-6 max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-theme mb-8">Meet Our Team</h2>
        <div className="grid md:grid-cols-3 gap-10">
          <div className=" shadow-lg rounded-lg p-6 transition-transform duration-300 hover:-translate-y-2 hover:shadow-lg hover:shadow-[#869e62] bg-gray-200">
            <img
              src="/images/TT.jpg"
              alt="Founder"
              className="w-44 h-44 mx-auto rounded-full object-cover mb-4"
            />
            <h4 className="text-lg font-bold">Usman Gill</h4>
            <p className="text-green-600 font-bold">Founder & CEO</p>
            <p className="text-gray-600 text-sm mt-2">
              Visionary entrepreneur passionate about innovation and customer experience.
            </p>
          </div>

          <div className="bg-gray-200 shadow-lg rounded-lg p-6 transition-transform duration-300 hover:-translate-y-2 hover:shadow-lg hover:shadow-[#869e62]">
            <img
              src="/images/TT.jpg"
              alt="Operations"
              className="w-44 h-44 mx-auto rounded-full object-cover mb-4"
            />
            <h4 className="text-lg font-bold">Ali Khan</h4>
            <p className="text-green-600 font-bold">Head of Operations</p>
            <p className="text-gray-600 text-sm mt-2">
              Ensuring seamless operations and efficient delivery services.
            </p>
          </div>

          <div className="bg-gray-200 shadow-lg rounded-lg p-6 transition-transform duration-300 hover:-translate-y-2 hover:shadow-lg hover:shadow-[#869e62]">
            <img
              src="/images/TT.jpg"
              alt="Marketing"
              className="w-44 h-44 mx-auto rounded-full object-cover mb-4"
            />
            <h4 className="text-lg font-bold">Sara Ahmed</h4>
            <p className="text-green-600 font-bold">Marketing Lead</p>
            <p className="text-gray-600 text-sm mt-2">
              Driving brand awareness and connecting with our customers nationwide.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[#869e62] text-white py-12 text-center">
        <h2 className="text-2xl font-bold mb-3">Want to Know More?</h2>
        <p className="mb-6">We’d love to hear from you! Contact us anytime for support or feedback.</p>
        <a
          href="/contact"
          className="bg-white text-theme px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition"
        >
          Contact Us
        </a>
      </section>
    </div>
  );
};

export default AboutPage;
