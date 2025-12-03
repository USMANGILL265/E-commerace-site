"use client";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FiTrash2, FiArrowLeft } from "react-icons/fi";
import { useRouter } from "next/navigation"; // Next.js router
import { clear, remove } from "@/redux/cartSlice";

export default function CartPage() {
  const cartItems = useSelector((state) => state.cart.items || []);
  const dispatch = useDispatch();
  const router = useRouter();

  const [loading, setLoading] = useState(true);

  // Skeleton loader simulation
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800); // simulate loading
    return () => clearTimeout(timer);
  }, []);

  const totalCartPrice = cartItems.reduce((acc, item) => acc + item.totalPrice, 0);

  const SkeletonItem = () => (
    <div className="flex items-center border p-4 rounded gap-4 mb-4 animate-pulse">
      <div className="w-20 h-20 bg-gray-300 rounded"></div>
      <div className="flex-1 space-y-2">
        <div className="h-5 w-3/4 bg-gray-300 rounded"></div>
        <div className="h-4 w-1/2 bg-gray-200 rounded"></div>
        <div className="h-4 w-1/3 bg-gray-200 rounded"></div>
        <div className="h-5 w-1/4 bg-gray-300 rounded"></div>
      </div>
      <div className="w-20 h-8 bg-gray-300 rounded"></div>
    </div>
  );

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-extrabold text-gray-800">Your Cart ({cartItems.length})</h1>
        <button
          onClick={() => router.push("/shop")}
          className="flex items-center px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition"
        >
          <FiArrowLeft className="mr-2 w-5 h-5" />
          Back to Shop
        </button>
      </div>

      {loading ? (
        <>
          <SkeletonItem />
          <SkeletonItem />
          <SkeletonItem />
        </>
      ) : cartItems.length === 0 ? (
        <p className="text-gray-500 text-lg">Your cart is empty 🛒</p>
      ) : (
        <>
          <button
            onClick={() => dispatch(clear())}
            className="mb-6 px-5 py-3 bg-theme text-white font-semibold rounded-lg hover:bg-[#91b357] transition cursor-pointer"
          >
            Clear Cart
          </button>

          <div className="space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.entryId}
                className="flex items-center border p-4 rounded-lg shadow-sm hover:shadow-md transition gap-4"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  width={100}
                  height={100}
                  className="rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h2 className="text-xl font-semibold text-gray-800">{item.title}</h2>
                  <p className="text-gray-600">Unit Price: Rs. {item.price}</p>
                  <p className="text-gray-500">Quantity: {item.quantity}</p>
                  <p className="text-green-700 font-bold mt-1">Total: Rs. {item.totalPrice}</p>
                </div>
                <button
                  onClick={() => dispatch(remove(item.entryId))}
                  className="p-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
                  title="Remove item"
                >
                  <FiTrash2 className="text-red-600 w-5 h-5" />
                </button>
              </div>
            ))}
          </div>

          <div className="mt-8 text-right">
            <p className="text-gray-700 text-lg mb-2">Subtotal</p>
            <h2 className="text-2xl font-bold text-gray-900">Rs. {totalCartPrice}</h2>
          </div>

          <div className="mt-6 text-right">
            <button
            onClick={() => router.push("/checkout")}
            className="px-6 py-3 bg-theme text-black font-semibold rounded-lg hover:bg-[#91b357] transition cursor-pointer">
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}
