"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { add, setStock } from "../../../redux/cartSlice";

const ProductDetailPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();

  const cartStock = useSelector((state) => state.cart.stock);

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [mainImage, setMainImage] = useState("");
  const [remainingStock, setRemainingStock] = useState(0);
  const [notification, setNotification] = useState(""); 

  // Fetch product
  const fetchProduct = async () => {
    try {
      const res = await axios.get(`/api/product/${id}`);
      const fetchedProduct = res.data.product || null;
      setProduct(fetchedProduct);

      if (fetchedProduct?.images?.length > 0) {
        setMainImage(fetchedProduct.images[0]);
      }

      if (fetchedProduct?.stock) {
        dispatch(setStock({ productId: fetchedProduct.id, stock: fetchedProduct.stock }));
        const availableStock = cartStock[fetchedProduct.id] ?? fetchedProduct.stock;
        setRemainingStock(availableStock);
      }
    } catch (error) {
      console.error("Error fetching product:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) fetchProduct();
  }, [id]);

  useEffect(() => {
    if (product) {
      const availableStock = cartStock[product.id] ?? product.stock;
      setRemainingStock(availableStock);
    }
  }, [cartStock, product]);

  const updateQuantity = (type) => {
    if (!product) return;
    if (type === "dec" && quantity > 1) setQuantity(quantity - 1);
    else if (type === "inc" && quantity < remainingStock) setQuantity(quantity + 1);
  };

  // ✅ Handle Add to Cart with notification
  const handleAddToCart = () => {
    if (!product || remainingStock <= 0) return;

    dispatch(
      add({
        id: product.id,
        title: product.title,
        price: product.price,
        quantity,
        image: mainImage,
        stock: remainingStock,
        originalStock: product.stock,
      })
    );

    setQuantity(1);
    setNotification(`${product.title} added to cart!`);

    // Automatically hide notification after 3 seconds
    setTimeout(() => setNotification(""), 3000);
  };

  // 🦴 Skeleton Loader Component
  const SkeletonLoader = () => (
    <div className="bg-gray-100 min-h-screen flex justify-center items-center py-12 px-6">
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden max-w-6xl w-full flex flex-col md:flex-row animate-pulse">
        {/* Left side image skeleton */}
        <div className="md:w-1/2 flex flex-col justify-center items-center bg-gray-200 p-6">
          <div className="w-[400px] h-[300px] bg-gray-300 rounded-lg mb-6"></div>
          <div className="flex gap-3 flex-wrap justify-center">
            {Array.from({ length: 4 }).map((_, idx) => (
              <div key={idx} className="w-20 h-20 bg-gray-300 rounded-md"></div>
            ))}
          </div>
        </div>

        {/* Right side detail skeleton */}
        <div className="md:w-1/2 p-8 flex flex-col justify-center">
          <div className="h-8 bg-gray-300 rounded w-2/3 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-full mb-3"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-3"></div>
          <div className="h-6 bg-gray-300 rounded w-1/3 mb-5"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/3 mb-8"></div>
          <div className="flex gap-4">
            <div className="h-10 bg-gray-300 rounded-lg w-32"></div>
            <div className="h-10 bg-gray-200 rounded-lg w-32"></div>
          </div>
        </div>
      </div>
    </div>
  );

  if (loading) return <SkeletonLoader />;

  if (!product)
    return (
      <div className="flex flex-col justify-center items-center min-h-screen">
        <p className="text-gray-600 mb-4">❌ Product not found</p>
        <button
          onClick={() => router.push("/shop")}
          className="px-5 py-2 bg-theme text-white rounded-lg"
        >
          Back to Shop
        </button>
      </div>
    );

  return (
    <div className="bg-gray-50 min-h-screen flex justify-center items-center py-12 px-6">
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden max-w-6xl w-full flex flex-col md:flex-row relative">
        {/* ✅ Notification */}
        {notification && (
          <div className="absolute top-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow-lg animate-slide-in z-50">
            {notification}
          </div>
        )}

        {/* Image Section */}
        <div className="md:w-1/2 flex flex-col justify-center items-center bg-gray-100 p-6">
          <div className="relative w-[400px] h-[300px] mb-6">
            <img
              src={mainImage || "/placeholder.jpg"}
              alt={product.title}
              className="w-full h-full object-cover rounded-lg shadow-lg transition-all duration-300"
            />
          </div>
          <div className="flex gap-3 flex-wrap justify-center">
            {product.images?.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`Thumbnail ${idx}`}
                onClick={() => setMainImage(img)}
                className={`w-20 h-20 object-cover rounded-md cursor-pointer border-2 transition ${
                  mainImage === img ? "border-theme scale-105" : "border-gray-300 hover:scale-105"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Details Section */}
        <div className="md:w-1/2 p-8 flex flex-col justify-center">
          <h1 className="text-3xl font-extrabold text-gray-800 mb-3">{product.title}</h1>
          <p className="text-gray-700 leading-relaxed mb-8 text-xl">
            {product.desc || "No description available for this product."}
          </p>

          <div className="flex items-center gap-3 mb-3">
            <span className="text-green-700 text-2xl font-bold">Rs. {product.price}</span>
            {product.discount && (
              <span className="text-red-500 text-sm font-semibold bg-red-100 px-2 py-1 rounded">
                {product.discount}% OFF
              </span>
            )}
          </div>

          <p className="text-sm text-gray-500 mb-6">
            Stock Remaining:{" "}
            <span className={`${remainingStock > 0 ? "text-green-600" : "text-red-500"} font-semibold`}>
              {remainingStock > 0 ? `${remainingStock} left` : "Out of Stock"}
            </span>
          </p>

          <div className="flex items-center gap-4 mb-8">
            <p className="text-gray-700 font-medium">Quantity:</p>
            <div className="flex items-center border border-gray-300 rounded-lg">
              <button
                onClick={() => updateQuantity("dec")}
                className="px-3 py-2 text-lg font-bold text-gray-600 hover:text-theme"
              >
                -
              </button>
              <span className="px-5 py-2 font-semibold text-gray-800">{quantity}</span>
              <button
                onClick={() => updateQuantity("inc")}
                className="px-3 py-2 text-lg font-bold text-gray-600 hover:text-theme"
              >
                +
              </button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <button
              onClick={handleAddToCart}
              disabled={remainingStock <= 0}
              className={`px-6 py-3 rounded-lg font-medium shadow cursor-pointer transition ${
                remainingStock > 0 ? "bg-theme text-white hover:bg-[#7a9b49]" : "bg-gray-400 text-gray-700 cursor-not-allowed"
              }`}
            >
              {remainingStock > 0 ? "Add to Cart" : "Out of Stock"}
            </button>
            <button
              onClick={() => router.push("/shop")}
              className="px-6 py-3 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition font-medium shadow cursor-pointer"
            >
              Back to Shop
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
