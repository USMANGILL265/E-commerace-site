"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";

const EditProductPage = () => {
  const { id } = useParams();
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: "",
    desc: "",
    stock: "",
    images: [],
    price: "",
    category: "",
  });
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      try {
        const [productRes, catRes] = await Promise.all([
          fetch(`/api/product/${id}`),
          fetch(`/api/category`),
        ]);

        const productData = await productRes.json();
        const categoryData = await catRes.json();

        if (productData.success) {
          setFormData({
            title: productData.product.title || "",
            desc: productData.product.desc || "",
            stock: productData.product.stock || "",
            images: productData.product.images || [],
            price: productData.product.price || "",
            category: productData.product.category || "",
          });
        }

        if (categoryData.success) {
          setCategories(categoryData.CategoryGet || []);
        }
      } catch (error) {
        toast.error("Failed to load data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Prevent negative numbers for price and stock
    if ((name === "price" || name === "stock") && Number(value) < 0) {
      setFormData({ ...formData, [name]: "0" });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Extra validation before sending
    if (Number(formData.price) < 0 || Number(formData.stock) < 0) {
      toast.error("❌ Price and Stock cannot be negative");
      return;
    }

    try {
      const res = await fetch(`/api/product/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await res.json();
      if (result.success) {
        toast.success("✅ Product updated successfully!");
        router.push("/admin/product");
      } else {
        toast.error("❌ Failed to update product");
      }
    } catch (error) {
      toast.error("❌ Something went wrong");
    }
  };

  // 🦴 Skeleton Loader
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
        <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-3xl space-y-6 animate-pulse">
          <div className="h-8 w-1/3 bg-gray-300 rounded mx-auto"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i}>
                <div className="h-4 w-1/2 bg-gray-300 mb-2 rounded"></div>
                <div className="h-10 bg-gray-300 rounded"></div>
              </div>
            ))}
          </div>

          <div>
            <div className="h-4 w-1/3 bg-gray-300 mb-2 rounded"></div>
            <div className="h-24 bg-gray-300 rounded"></div>
          </div>

          <div>
            <div className="h-4 w-1/4 bg-gray-300 mb-2 rounded"></div>
            <div className="h-10 bg-gray-300 rounded"></div>
          </div>

          <div className="h-12 bg-gray-400 rounded-xl"></div>
        </div>
      </div>
    );
  }

  // 🧾 Main Form
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-xl p-8 w-full max-w-3xl space-y-6"
      >
        <h1 className="text-3xl font-bold text-center text-[#556B2F] flex items-center justify-center gap-2">
          🛒 Edit Product
        </h1>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block font-semibold mb-1">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter product title"
              className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#556B2F]"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Price</label>
            <input
              type="string"
              name="price"
              min="0"
              value={formData.price}
              onChange={handleChange}
              placeholder="Enter product price"
              className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#556B2F]"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Stock</label>
            <input
              type="number"
              name="stock"
              min="0"
              value={formData.stock}
              onChange={handleChange}
              placeholder="Enter stock quantity"
              className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#556B2F]"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full border rounded-xl px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#556B2F] appearance-none bg-white relative cursor-pointer"
              style={{
                backgroundImage:
                  "linear-gradient(45deg, transparent 50%, #556B2F 50%), linear-gradient(135deg, #556B2F 50%, transparent 50%)",
                backgroundPosition:
                  "calc(100% - 20px) calc(1em + 2px), calc(100% - 15px) calc(1em + 2px)",
                backgroundSize: "5px 5px, 5px 5px",
                backgroundRepeat: "no-repeat",
              }}
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option
                  key={cat._id}
                  value={cat._id}
                  className="bg-[#dfe6dc] text-[#556B2F]"
                >
                  {cat.title}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block font-semibold mb-1">Description</label>
          <textarea
            name="desc"
            value={formData.desc}
            onChange={handleChange}
            placeholder="Enter product description"
            rows="4"
            className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#556B2F]"
          />
        </div>

        {/* Images */}
        <div>
          <label className="block font-semibold mb-1">Upload Images</label>
          <input
            type="text"
            name="images"
            value={formData.images.join(",")}
            onChange={(e) =>
              setFormData({ ...formData, images: e.target.value.split(",") })
            }
            placeholder="Enter image URLs separated by commas"
            className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#556B2F]"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-[#556B2F] text-white py-3 rounded-xl hover:bg-[#6B8E23] transition-all"
        >
          Update Product
        </button>
      </form>
    </div>
  );
};

export default EditProductPage;
