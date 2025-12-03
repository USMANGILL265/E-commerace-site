"use client"
import axios from "axios"
import React, { useEffect, useState } from "react"
import { Trash2 } from "lucide-react"

const Page = () => {
  const [category, setCategory] = useState([])
  const [loading, setLoading] = useState(true)

  const fetch = async () => {
    try {
      setLoading(true)
      const res = await axios.get("/api/category")
      if (res.data.success) {
        setCategory(res.data.CategoryGet)
      }
    } catch (err) {
      console.error("Error fetching categories:", err)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/category/${id}`)
      setCategory((prev) => prev.filter((c) => c._id !== id))
    } catch (err) {
      console.error("Error deleting category:", err)
    }
  }

  useEffect(() => {
    fetch()
  }, [])

  // ✅ Skeleton Loader Component
  const SkeletonCard = () => (
    <div className="border border-gray-200 bg-white shadow-md rounded-2xl p-6 animate-pulse">
      <div className="h-6 bg-gray-300 rounded w-3/4 mb-6"></div>
      <div className="h-10 bg-gray-300 rounded w-1/2"></div>
    </div>
  )

  return (
    <div className="p-6 md:p-10 min-h-screen bg-gradient-to-b from-gray-100 to-gray-200">
      <div className="relative flex items-center justify-between w-full">
        <a
          href="/admin/category/form"
          className="px-4 py-2 border rounded cursor-pointer bg-[#556B2F] text-white transition-all duration-300 hover:bg-[#7a9b49]"
        >
          Add Category
        </a>

        <h1 className="absolute left-1/2 transform -translate-x-1/2 text-3xl md:text-4xl font-bold px-6 py-2 rounded-lg bg-theme shadow-lg text-white">
          Categories
        </h1>
      </div>

      {/* ✅ Skeleton while loading */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-12">
          {Array.from({ length: 8 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : (
        // ✅ Real categories when loaded
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-12">
          {category.map((v) => (
            <div
              key={v._id}
              className="group border border-theme bg-white shadow-md rounded-2xl p-6 flex flex-col items-center justify-between transition-all duration-300 hover:shadow-xl hover:-translate-y-2"
            >
              <span className="text-xl md:text-2xl font-semibold text-black transition-colors">
                {v.title}
              </span>

              <button
                onClick={() => handleDelete(v._id)}
                className="mt-6 flex items-center gap-2 px-5 py-2 bg-red-500 text-white text-sm md:text-base rounded-lg font-medium shadow-md hover:bg-red-700 hover:shadow-lg transition-all cursor-pointer"
              >
                <Trash2 size={18} />
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Page
