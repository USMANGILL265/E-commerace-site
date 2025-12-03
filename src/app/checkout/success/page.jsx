export default function SuccessPage() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-green-50">
      <div className="bg-white p-10 rounded-2xl shadow-xl text-center max-w-md">
        <h1 className="text-3xl font-bold text-green-700 mb-3">
          🎉 Order Placed Successfully!
        </h1>
        <p className="text-gray-600 mb-6">
          Thank you for your order. We will contact you shortly for confirmation.
        </p>

        <a
          href="/shop"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700"
        >
          Continue Shopping
        </a>
      </div>
    </div>
  );
}
