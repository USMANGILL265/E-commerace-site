"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Menu } from "lucide-react";

const ShopPage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const router = useRouter();

  const fetchProducts = async () => {
    try {
      const res = await axios.get("/api/product");
      const allProducts = res.data.ProductsGet || [];
      setProducts(allProducts);

      const uniqueCategories = [
        ...new Set(
          allProducts.map((p) => {
            if (!p.category) return "Uncategorized";
            if (typeof p.category === "object") return p.category.title || "Unnamed";
            return p.category;
          })
        ),
      ];
      setCategories(uniqueCategories);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const filteredProducts = products.filter((product) => {
    const productTitle = product.title?.toLowerCase() || "";
    const categoryName =
      typeof product.category === "object"
        ? product.category.title?.toLowerCase() || ""
        : product.category?.toLowerCase() || "";

    const matchesSearch =
      productTitle.includes(search.toLowerCase()) ||
      categoryName.includes(search.toLowerCase());

    const matchesCategory =
      selectedCategory === "" ||
      categoryName === selectedCategory.toLowerCase();

    return matchesSearch && matchesCategory;
  });

  // 🔹 Skeleton loader (with darker tones)
  const ProductSkeleton = () => (
    <div className="bg-white shadow-lg rounded-2xl overflow-hidden animate-pulse">
      <div className="w-full h-56 bg-gray-300"></div>
      <div className="p-4">
        <div className="h-4 bg-gray-400 rounded w-3/4 mb-2"></div>
        <div className="h-3 bg-gray-300 rounded w-full mb-3"></div>
        <div className="flex justify-between items-center">
          <div className="h-4 bg-gray-400 rounded w-16"></div>
          <div className="h-4 bg-gray-300 rounded w-10"></div>
        </div>
        <div className="mt-4 h-8 bg-gray-400 rounded-full w-full"></div>
      </div>
    </div>
  );

  return (
    <div className="relative bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center px-6 py-6 border-b border-gray-200 bg-white shadow-sm">
        <h1 className="text-3xl font-bold text-gray-800">Products</h1>

        {/* 🧭 Categories Dropdown (Right Side) */}
        <div className="relative group">
          <button className="flex items-center gap-2 bg-theme text-white px-4 py-2 rounded-full shadow-md hover:bg-[#7a9b49] transition">
            <Menu size={18} />
            <span>Categories</span>
          </button>

          {/* Dropdown List */}
          <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 shadow-lg rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition duration-200 z-50">
            <ul className="py-2">
              <li
                onClick={() => setSelectedCategory("")}
                className={`cursor-pointer px-4 py-2 text-gray-700 hover:bg-green-100 transition ${
                  selectedCategory === ""
                    ? "bg-green-100 font-semibold text-green-700"
                    : ""
                }`}
              >
                All Products
              </li>
              {categories.map((cat, index) => (
                <li
                  key={index}
                  onClick={() => setSelectedCategory(cat)}
                  className={`cursor-pointer px-4 py-2 text-gray-700 hover:bg-green-100 transition ${
                    selectedCategory === cat
                      ? "bg-green-100 font-semibold text-green-700"
                      : ""
                  }`}
                >
                  {cat}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* 🔍 Search Bar */}
      <div className="flex justify-center mt-10 mb-10 px-4">
        <input
          type="text"
          placeholder="Search product by name or category..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-1/2 p-3 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-theme text-gray-700 placeholder-gray-400"
        />
      </div>

      {/* 🌀 Skeleton or Product Grid */}
      {loading ? (
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {Array.from({ length: 8 }).map((_, i) => (
            <ProductSkeleton key={i} />
          ))}
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="text-center text-gray-500 text-lg pb-20">
          No products found 😢
        </div>
      ) : (
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 pb-20">
          {filteredProducts.map((product) => (
            <div
              key={product._id}
              className="bg-white shadow-lg rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_8px_24px_rgba(34,197,94,0.25)] flex flex-col"
            >
              {/* 🖼️ Product Image */}
              <div className="relative w-full h-56">
                <img
                  src={product.images?.[0] || "/placeholder.jpg"}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
                {product.discount && (
                  <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-md">
                    {product.discount}% OFF
                  </span>
                )}
              </div>

              {/* 📦 Product Content */}
              <div className="p-4 flex flex-col flex-grow">
                <h2 className="text-lg font-semibold text-gray-800 line-clamp-1 mb-1">
                  {product.title}
                </h2>
                <p className="text-gray-500 text-sm mb-3 line-clamp-2">
                  {product.desc}
                </p>

                <div className="flex justify-between items-center mb-4">
                  <span className="text-green-600 font-bold text-base">
                    Rs. {product.price}
                  </span>
                  <span className="text-yellow-500 text-sm">
                    ⭐ {product.rating || 4.5}
                  </span>
                </div>

                <button
                  onClick={() => router.push(`/shop/${product._id}`)}
                  className="mt-auto w-full py-2 bg-theme text-white rounded-full hover:bg-[#7a9b49] transition cursor-pointer text-sm font-medium shadow-md"
                >
                  🛒 Buy Now
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ShopPage;
