"use client";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import { ChevronDown, X } from "lucide-react";
import { CldUploadWidget } from "next-cloudinary";

const CreateProduct = () => {
  const [categories, setCategories] = useState([]);
  const [openDropdown, setOpenDropdown] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    desc: "",
    stock: "",
    price: "",
    category: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useRouter();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get("/api/category");
        if (res.data.success) {
          setCategories(res.data.CategoryGet);
        }
      } catch (err) {
        console.error("Error fetching Categories:", err);
      }
    };
    fetchCategories();
  }, []);

  const [tempImages, setTempImages] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    if (!formData.title.trim()) return "Title is required!";
    if (!formData.price) return "Price is required!";
    if (Number(formData.price) <= 0) return "Price must be greater than 0!";
    if (!formData.stock) return "Stock is required!";
    if (Number(formData.stock) < 0) return "Stock cannot be negative!";
    if (!formData.category) return "Category is required!";
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
      const productData = {
        ...formData,
        stock: Number(formData.stock),
        price: Number(formData.price),
        images: tempImages,
      };

      const res = await axios.post("/api/product", productData);

      if (res.data.success) {
        toast.success("Product added successfully!");
        navigate.push("/admin/product");
      } else {
        toast.error(res.data.message || "Failed to create product!");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Something went wrong!");
    } finally {
      setIsSubmitting(false);
      setFormData({
        title: "",
        desc: "",
        stock: "",
        images: "",
        price: "",
        category: "",
      });
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 p-4">
      {/* Loader Overlay */}
      {isSubmitting && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/70 backdrop-blur-md z-50">
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 border-4 border-theme border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-lg font-semibold text-theme animate-pulse">
              Submitting your product...
            </p>
          </div>
        </div>
      )}

      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl p-6 md:p-12">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-theme mb-10">
          🛒 Add New Product
        </h2>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {/* Title */}
          <div className="col-span-1">
            <label className="block text-lg font-medium text-gray-700 mb-2">
              Title
            </label>
            <input
              type="text"
              name="title"
              onChange={handleChange}
              value={formData.title}
              placeholder="Enter product title"
              className="w-full p-3 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-theme"
            />
          </div>

          {/* Price */}
          <div className="col-span-1">
            <label className="block text-lg font-medium text-gray-700 mb-2">
              Price
            </label>
            <input
              type="string"
              name="price"
              onChange={handleChange}
              value={formData.price}
              placeholder="Enter product price"
              className="w-full p-3 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-theme"
            />
          </div>

          {/* Stock */}
          <div className="col-span-1">
            <label className="block text-lg font-medium text-gray-700 mb-2">
              Stock
            </label>
            <input
              type="number"
              name="stock"
              min="0"
              onChange={handleChange}
              value={formData.stock}
              placeholder="Enter stock quantity"
              className="w-full p-3 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-theme"
            />
          </div>

          {/* Category Dropdown */}
          <div className="col-span-1">
            <label className="block text-lg font-medium text-gray-700 mb-2">
              Category
            </label>
            <div className="relative">
              <button
                type="button"
                onClick={() => setOpenDropdown(!openDropdown)}
                className="w-full flex justify-between items-center px-4 py-3 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-theme bg-white text-gray-900 hover:bg-green-50 transition"
              >
                {formData.category
                  ? categories.find((c) => c._id === formData.category)?.title
                  : "Select Category"}
                <ChevronDown className="w-5 h-5 text-gray-500" />
              </button>

              {openDropdown && (
                <ul className="absolute mt-2 w-full bg-white border rounded-xl shadow-lg max-h-60 overflow-y-auto z-20">
                  {categories.map((v, i) => (
                    <li
                      key={i}
                      onClick={() => {
                        setFormData((prev) => ({ ...prev, category: v._id }));
                        setOpenDropdown(false);
                      }}
                      className={`px-4 py-2 cursor-pointer transition ${
                        formData.category === v._id
                          ? "bg-theme text-white"
                          : "hover:bg-[#7a9b49]"
                      }`}
                    >
                      {v.title}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* Description */}
          <div className="col-span-1 md:col-span-2">
            <label className="block text-lg font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              name="desc"
              onChange={handleChange}
              value={formData.desc}
              placeholder="Enter product description"
              rows={4}
              className="w-full p-3 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-theme resize-none"
            />
          </div>

          {/* Images Upload */}
          <div>
            <label htmlFor="images" className="block text-lg font-medium text-gray-700 mb-2">
              Images
            </label>
            <div className="mt-2">
              <CldUploadWidget
                uploadPreset="gill-mart"
                onSuccess={(results) => {
                  if (
                    results.info?.secure_url &&
                    results.event === "success"
                  ) {
                    setTempImages((prevImages) => [
                      ...prevImages,
                      results.info.secure_url,
                    ]);
                  }
                }}
                options={{ multiple: true }}
              >
                {({ open }) => (
                  <button
                    type="button"
                    onClick={open}
                    className="px-4 py-2 bg-theme text-white rounded-lg font-semibold shadow hover:shadow-md transition"
                  >
                    Upload Images
                  </button>
                )}
              </CldUploadWidget>
            </div>
          </div>

          {/* Show Uploaded Images */}
          {tempImages.length > 0 && (
            <div className="flex flex-wrap gap-4 mt-4">
              {tempImages.map((img, index) => (
                <div key={index} className="relative w-[120px] h-[120px]">
                  <img
                    src={img}
                    alt={`Uploaded ${index}`}
                    className="w-full h-full object-cover rounded-lg border border-gray-200 shadow"
                  />
                  <button
                    onClick={() =>
                      setTempImages((prevImages) =>
                        prevImages.filter((_, i) => i !== index)
                      )
                    }
                    className="absolute top-1 right-1 rounded-full p-1 bg-red-500 text-white"
                    type="button"
                  >
                    <X />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Submit Button */}
          <div className="col-span-1 md:col-span-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 bg-theme text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition disabled:opacity-50 cursor-pointer hover:bg-theme"
            >
              Submit Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProduct;
