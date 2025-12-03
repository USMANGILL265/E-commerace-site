"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { ChevronDown, Trash2, Pencil } from "lucide-react";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCat, setSelectedCat] = useState("All Categories");
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/product");
      if (res.data.success) {
        setProducts(res.data.ProductsGet);
      }
    } catch (err) {
      console.error("Error fetching Products:", err);
      toast.error("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await axios.get("/api/category");
      if (res.data.success) {
        const cats = res.data.CategoryGet.map((c) => c.title);
        setCategories(["All Categories", ...cats]);
      }
    } catch (err) {
      console.error("Error fetching Categories:", err);
      toast.error("Failed to load categories");
    }
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This product will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axios.delete(`/api/product/${id}`);
          if (res.data.success) {
            setProducts(products.filter((p) => p._id !== id));
            Swal.fire("Deleted!", "Product has been deleted successfully.", "success");
          }
        } catch (err) {
          console.error("Error deleting product:", err);
          Swal.fire("Error!", "Failed to delete product.", "error");
        }
      }
    });
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const filteredProducts =
    selectedCat === "All Categories"
      ? products
      : products.filter((p) => {
          if (typeof p.category === "string") {
            return p.category.toLowerCase() === selectedCat.toLowerCase();
          }
          if (typeof p.category === "object" && p.category?.title) {
            return p.category.title.toLowerCase() === selectedCat.toLowerCase();
          }
          return false;
        });

  // ✅ Skeleton Row for Table (Desktop)
  const SkeletonRow = () => (
    <tr className="animate-pulse">
      <td className="px-4 py-3">
        <div className="w-16 h-16 bg-gray-300 rounded-md"></div>
      </td>
      <td className="px-4 py-3">
        <div className="h-5 bg-gray-300 rounded w-24"></div>
      </td>
      <td className="px-4 py-3">
        <div className="h-5 bg-gray-300 rounded w-20"></div>
      </td>
      <td className="px-4 py-3">
        <div className="h-5 bg-gray-300 rounded w-16"></div>
      </td>
      <td className="px-4 py-3">
        <div className="h-5 bg-gray-300 rounded w-24"></div>
      </td>
      <td className="px-4 py-3">
        <div className="flex gap-3">
          <div className="w-12 h-6 bg-gray-300 rounded"></div>
          <div className="w-12 h-6 bg-gray-300 rounded"></div>
        </div>
      </td>
    </tr>
  );

  // ✅ Skeleton Card for Mobile
  const SkeletonCard = () => (
    <div className="animate-pulse bg-white p-4 rounded-lg shadow-md border flex flex-col gap-3">
      <div className="w-full h-40 bg-gray-300 rounded-md"></div>
      <div className="h-5 bg-gray-300 rounded w-3/4"></div>
      <div className="h-4 bg-gray-300 rounded w-1/2"></div>
      <div className="h-5 bg-gray-300 rounded w-1/3"></div>
      <div className="h-4 bg-gray-300 rounded w-2/3"></div>
      <div className="flex gap-2">
        <div className="flex-1 h-8 bg-gray-300 rounded"></div>
        <div className="flex-1 h-8 bg-gray-300 rounded"></div>
      </div>
    </div>
  );

  return (
    <div className="p-4 sm:p-10 min-h-screen bg-gradient-to-b from-gray-100 to-gray-200">
      {/* Top Section */}
      <div className="flex flex-col gap-6">
        <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between w-full gap-4">
          <a
            href="/admin/product/form"
            className="px-4 py-2 bg-[#556B2F] text-white rounded cursor-pointer transition-all duration-300 hover:bg-[#7a9b49] w-fit"
          >
            Add Product
          </a>

          <h1 className="text-3xl sm:text-4xl font-bold px-4 py-2 rounded-lg shadow-lg bg-theme text-white text-center">
            🛍 Products
          </h1>

          <div className="relative group w-full sm:w-60">
            <button className="flex items-center justify-between w-full bg-theme text-white font-semibold py-[10px] px-4 rounded-lg shadow-md hover:bg-[#7a9b49] transition">
              {selectedCat}
              <ChevronDown className="w-5 h-5 ml-2" />
            </button>

            <div className="absolute right-0 w-full bg-white rounded-lg shadow-lg overflow-hidden max-h-0 group-hover:max-h-60 transition-all duration-500 ease-in-out z-10">
              <ul className="flex flex-col divide-y divide-gray-200">
                {categories.length === 0 ? (
                  <li className="px-4 py-2 text-gray-500 text-center">
                    No Categories
                  </li>
                ) : (
                  categories.map((cat, i) => (
                    <li
                      key={i}
                      onClick={() => setSelectedCat(cat)}
                      className={`px-4 py-2 cursor-pointer ${
                        selectedCat === cat
                          ? "bg-green-100 text-green-700 font-semibold"
                          : "hover:bg-gray-100 text-gray-700"
                      }`}
                    >
                      {cat}
                    </li>
                  ))
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Products Section */}
      <div className="mt-8">
        {loading ? (
          <>
            {/* ✅ Skeleton for Desktop Table */}
            <div className="hidden sm:block overflow-x-auto">
              <table className="w-full border border-gray-300 bg-white rounded-lg shadow-lg overflow-hidden">
                <thead className="bg-gray-200">
                  <tr className="text-left">
                    <th className="px-4 py-3">Image</th>
                    <th className="px-4 py-3">Title</th>
                    <th className="px-4 py-3">Category</th>
                    <th className="px-4 py-3">Price</th>
                    <th className="px-4 py-3">Stock</th>
                    <th className="px-4 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.from({ length: 6 }).map((_, i) => (
                    <SkeletonRow key={i} />
                  ))}
                </tbody>
              </table>
            </div>

            {/* ✅ Skeleton for Mobile Cards */}
            <div className="sm:hidden grid gap-4 mt-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          </>
        ) : filteredProducts.length === 0 ? (
          <p className="text-gray-600 text-center text-lg">No products found.</p>
        ) : (
          <>
            {/* Desktop Table */}
            <div className="overflow-x-auto hidden sm:block">
              <table className="w-full border border-gray-300 bg-white rounded-lg shadow-lg overflow-hidden">
                <thead className="bg-gray-200">
                  <tr className="text-left">
                    <th className="px-4 py-3">Image</th>
                    <th className="px-4 py-3">Title</th>
                    <th className="px-4 py-3">Category</th>
                    <th className="px-4 py-3">Price</th>
                    <th className="px-4 py-3">Stock</th>
                    <th className="px-4 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map((v) => (
                    <tr
                      key={v._id}
                      className="border-t hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-4 py-3">
                        <img
                          src={v.images?.[0]}
                          alt={v.title}
                          className="w-16 h-16 object-cover rounded-md border"
                        />
                      </td>
                      <td className="px-4 py-3 font-semibold">{v.title}</td>
                      <td className="px-4 py-3 text-gray-600">
                        {v.category?.title || v.category}
                      </td>
                      <td className="px-4 py-3 font-medium text-green-600">
                        Rs: {v.price}
                      </td>
                      <td
                        className={`px-4 py-3 font-medium ${
                          v.stock > 0 ? "text-blue-600" : "text-red-500"
                        }`}
                      >
                        {v.stock > 0 ? `In Stock: ${v.stock}` : "Out of Stock"}
                      </td>
                      <td className="px-4 py-3 flex gap-3">
                        <a
                          href={`/admin/product/edit/${v._id}`}
                          className="flex items-center gap-1 px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition"
                        >
                          <Pencil size={16} /> Edit
                        </a>
                        <button
                          onClick={() => handleDelete(v._id)}
                          className="flex items-center gap-1 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                        >
                          <Trash2 size={16} /> Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile View */}
            <div className="sm:hidden grid gap-4 mt-6">
              {filteredProducts.map((v) => (
                <div
                  key={v._id}
                  className="bg-white p-4 rounded-lg shadow-md border flex flex-col gap-3"
                >
                  <img
                    src={v.images?.[0]}
                    alt={v.title}
                    className="w-full h-40 object-cover rounded-md"
                  />
                  <h3 className="text-lg font-bold">{v.title}</h3>
                  <p className="text-sm text-gray-600">
                    {v.category?.title || v.category}
                  </p>
                  <p className="text-green-600 font-semibold">Rs: {v.price}</p>
                  <p
                    className={`font-medium ${
                      v.stock > 0 ? "text-blue-600" : "text-red-500"
                    }`}
                  >
                    {v.stock > 0 ? `In Stock: ${v.stock}` : "Out of Stock"}
                  </p>
                  <div className="flex gap-2">
                    <a
                      href={`/admin/product/edit/${v._id}`}
                      className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition"
                    >
                      <Pencil size={16} /> Edit
                    </a>
                    <button
                      onClick={() => handleDelete(v._id)}
                      className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
                    >
                      <Trash2 size={16} /> Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductsPage;
