"use client"
import React, { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";

const Create = () => {
  const [formData, setFormData] = useState({
    title: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useRouter();

 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };


  const validateForm = () => {
    if (!formData.title.trim()) return "Title is required!";
    return null;
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    const errorMessage = validateForm();
    if (errorMessage) {
      toast.error(errorMessage);
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await axios.post("/api/category", formData);
      if (res.data.success) {
        toast.success("🎉 Category added successfully!");
        navigate.push("/admin/category");
      } else {
        toast.error(res.data.message || "Failed to create Category!");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Something went wrong!");
    } finally {
      setIsSubmitting(false);
      setFormData({
        title: ""
      });
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 p-4">
      
      {isSubmitting && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/70 backdrop-blur-md z-50">
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 border-4 border-theme border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-lg font-semibold text-theme animate-pulse">
              Submitting your category...
            </p>
          </div>
        </div>
      )}

      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-2xl p-8 md:p-12 transition-all duration-300 hover:shadow-bg-theme">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-theme mb-8">
          Create a Category
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
  
          <div>
            <label htmlFor="title" className="block text-lg font-medium text-gray-700 mb-2">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              onChange={handleChange}
              value={formData.title}
              placeholder="Enter category title"
              className="w-full p-3 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-theme transition"
            />
          </div>
          
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 bg-theme text-white font-semibold rounded-xl shadow-md  hover:shadow-lg transition-all duration-300 disabled:opacity-50 cursor-pointer"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Create;
