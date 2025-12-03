"use client";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { clear } from "../redux/cartslice";

export default function CheckoutPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items || []);

  const totalPrice = cartItems.reduce((acc, item) => acc + item.totalPrice, 0);

  // Form State
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    payment: "COD",
  });

  const [error, setError] = useState("");

  // Input Handler
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Form Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!form.name || !form.phone || !form.address || !form.email) {
      setError("Please complete all required fields.");
      return;
    }

    try {
      // ✅ Simulate sending order to backend
      const res = await fetch("/api/placeOrder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer: form,
          cartItems,
          totalPrice,
        }),
      });

      const data = await res.json();

      if (data.success) {
        // ✅ Clear Redux cart & localStorage
        dispatch(clear());

        // ✅ Redirect to success page
        router.push("/checkout/success");
      } else {
        setError("Failed to place order. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setError("Network error. Please try again.");
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-8">

      {/* LEFT: USER DETAILS FORM */}
      <div className="border rounded-xl p-6 shadow">
        <h1 className="text-3xl font-extrabold mb-4 text-gray-800">Checkout</h1>

        {error && (
          <p className="text-red-600 bg-red-100 p-2 rounded mb-4">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">

          <div>
            <label className="font-semibold">Full Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg mt-1"
              placeholder="Enter your full name"
            />
          </div>
          <div>
            <label className="font-semibold">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg mt-1"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="font-semibold">Phone Number</label>
            <input
              type="text"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg mt-1"
              placeholder="03XX-XXXXXXX"
            />
          </div>

          <div>
            <label className="font-semibold">Address</label>
            <textarea
              name="address"
              value={form.address}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg mt-1"
              placeholder="Complete shipping address"
            ></textarea>
          </div>

          {/* PAYMENT METHODS */}
          <div>
            <label className="font-semibold block mb-2">Payment Method</label>

            <div className="space-y-2">
              {["COD", "Easypaisa", "JazzCash"].map((method) => (
                <label key={method} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="payment"
                    value={method}
                    checked={form.payment === method}
                    onChange={handleChange}
                  />
                  {method === "COD" ? "Cash on Delivery (COD)" : method}
                </label>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Place Order
          </button>
        </form>
      </div>

      {/* RIGHT: ORDER SUMMARY */}
      <div className="border rounded-xl p-6 shadow bg-gray-50">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Order Summary</h2>

        <div className="space-y-4">
          {cartItems.map((item) => (
            <div
              key={item.entryId}
              className="p-4 border rounded-lg bg-white shadow-sm"
            >
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="text-gray-600">Unit Price: Rs. {item.price}</p>
              <p className="text-gray-600">Quantity: {item.quantity}</p>
              <p className="font-bold text-green-700">
                Total: Rs. {item.totalPrice}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-6 border-t pt-4">
          <p className="text-lg text-gray-700">Subtotal</p>
          <h2 className="text-3xl font-extrabold">Rs. {totalPrice}</h2>
        </div>
      </div>
    </div>
  );
}
