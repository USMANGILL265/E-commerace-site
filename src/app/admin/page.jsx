"use client";
import React, { useState } from "react";
import {
  LineChart, Line, XAxis, YAxis, Tooltip,
  ResponsiveContainer, BarChart, Bar
} from "recharts";

const mockKpis = {
  revenue: 125430.5,
  orders: 1289,
  customers: 842,
  conversion: 3.7,
};

const mockSales = [
  { date: "2025-09-01", sales: 4200 },
  { date: "2025-09-02", sales: 5200 },
  { date: "2025-09-03", sales: 6100 },
  { date: "2025-09-04", sales: 4900 },
  { date: "2025-09-05", sales: 7300 },
  { date: "2025-09-06", sales: 6800 },
  { date: "2025-09-07", sales: 7900 },
];

const mockOrdersByDay = [
  { date: "Mon", orders: 120 },
  { date: "Tue", orders: 150 },
  { date: "Wed", orders: 180 },
  { date: "Thu", orders: 130 },
  { date: "Fri", orders: 220 },
  { date: "Sat", orders: 260 },
  { date: "Sun", orders: 90 },
];

const mockTopProducts = [
  { id: 1, title: "Wireless Headphones", price: 79.99, sold: 420 },
  { id: 2, title: "Smart Watch", price: 129.99, sold: 320 },
  { id: 3, title: "Running Shoes", price: 59.99, sold: 290 },
  { id: 4, title: "Backpack", price: 39.99, sold: 230 },
];

const mockOrders = [
  { id: "ORD-1001", customer: "Aisha Khan", total: 129.99, status: "Shipped", date: "2025-09-07" },
  { id: "ORD-1002", customer: "Bilal Ahmed", total: 59.99, status: "Processing", date: "2025-09-07" },
];

const mockCustomers = [
  { id: 1, name: "Aisha Khan", email: "aisha@example.com", joined: "2025-01-15" },
  { id: 2, name: "Bilal Ahmed", email: "bilal@example.com", joined: "2025-03-02" },
  { id: 3, name: "Sana Iqbal", email: "sana@example.com", joined: "2025-04-20" },
];

export default function DashboardContent() {
  const [kpis] = useState(mockKpis);
  const [sales] = useState(mockSales);
  const [ordersByDay] = useState(mockOrdersByDay);
  const [topProducts] = useState(mockTopProducts);
  const [orders] = useState(mockOrders);
  const [customers] = useState(mockCustomers);

  return (
    <div className="p-6">

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card
          title="Revenue"
          value={`$${kpis.revenue.toLocaleString()} `}
          subtitle="Last 30 days"
          className="bg-theme text-white"
        />
        <Card
          title="Orders"
          value={kpis.orders}
          subtitle="Total orders"
          className="bg-theme text-white"
        />
        <Card
          title="Customers"
          value={kpis.customers}
          subtitle="Active customers"
          className="bg-theme text-white"
        />
        <Card
          title="Conversion"
          value={`${kpis.conversion}%`}
          subtitle="Conversion rate"
          className="bg-theme text-white"
        />
      </div>

      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <section className="col-span-2 bg-white p-4 rounded shadow">
          <h3 className="font-semibold mb-3">Sales (last 7 days)</h3>
          <div style={{ width: "100%", height: 280 }}>
            <ResponsiveContainer>
              <LineChart data={sales}>
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="sales" stroke="#556B2F" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="bg-white p-4 rounded shadow">
          <h3 className="font-semibold mb-3">Orders by day</h3>
          <div style={{ width: "100%", height: 240 }}>
            <ResponsiveContainer>
              <BarChart data={ordersByDay}>
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="orders" fill="#556B2F" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-6">
        <section className="col-span-2 bg-white p-4 rounded shadow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Top Products</h3>
            <div className="text-sm text-gray-500">Most sold items</div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {topProducts.map((p) => (
              <div key={p.id} className="p-4 border rounded flex items-center justify-between">
                <div>
                  <div className="font-medium">{p.title}</div>
                  <div className="text-sm text-gray-500">Sold: {p.sold}</div>
                </div>
                <div className="text-right">
                  <div className="font-semibold">${p.price}</div>
                  <button className="mt-2 px-3 py-1 rounded border text-sm cursor-pointer 
                    hover:bg-[#556B2F] hover:text-white transition-all duration-300">
                    View
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <aside className="bg-white p-4 rounded shadow">
          <h3 className="font-semibold mb-3">Recent Orders</h3>
          <div className="space-y-2">
            {orders.map((o) => (
              <div key={o.id} className="flex items-center justify-between p-2 border rounded">
                <div>
                  <div className="text-sm font-medium">{o.customer}</div>
                  <div className="text-xs text-gray-500">{o.id} • {o.date}</div>
                </div>
                <div className="text-right">
                  <div className="font-semibold">${o.total}</div>
                  <StatusChip status={o.status} />
                </div>
              </div>
            ))}
          </div>
          <h4 className="mt-4 font-semibold">Customers</h4>
          <div className="mt-2 space-y-2">
            {customers.map((c) => (
              <div key={c.id} className="flex items-center justify-between p-2 border rounded">
                <div>
                  <div className="font-medium">{c.name}</div>
                  <div className="text-xs text-gray-500">{c.email}</div>
                </div>
                <div className="text-xs text-gray-500">{c.joined}</div>
              </div>
            ))}
          </div>
        </aside>
      </div>

      <section className="mt-6 bg-white p-4 rounded shadow">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold">All Orders</h3>
          <div className="text-sm text-gray-500">Showing latest 10 orders</div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left">
            <thead>
              <tr className="text-sm text-gray-500">
                <th className="px-3 py-2">Order</th>
                <th className="px-3 py-2">Customer</th>
                <th className="px-3 py-2">Total</th>
                <th className="px-3 py-2">Status</th>
                <th className="px-3 py-2">Date</th>
                <th className="px-3 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <tr key={o.id} className="border-t">
                  <td className="px-3 py-3 text-sm">{o.id}</td>
                  <td className="px-3 py-3 text-sm">{o.customer}</td>
                  <td className="px-3 py-3 text-sm">${o.total}</td>
                  <td className="px-3 py-3 text-sm"><StatusChip status={o.status} /></td>
                  <td className="px-3 py-3 text-sm">{o.date}</td>
                  <td className="px-3 py-3 text-sm">
                    <div className="flex gap-2">
                      <button className="px-2 py-1 border rounded text-sm cursor-pointer hover:bg-[#556B2F] hover:text-white duration-300">View</button>
                      <button className="px-2 py-1 border rounded text-sm cursor-pointer hover:bg-[#556B2F] hover:text-white duration-300">Invoice</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>


      <div className="mt-6 flex gap-4">
        <a href="admin/product/form" className="px-4 py-2 bg-[#556B2F] text-white rounded cursor-pointer transition-all duration-300 hover:bg-[#7a9b49]">Add Product</a>
        <a href="/admin/category/form" className="px-4 py-2 border rounded cursor-pointer bg-[#556B2F] text-white transition-all duration-300 hover:bg-[#7a9b49]">Manage Categories</a>
        <button className="px-4 py-2 border rounded cursor-pointer bg-[#556B2F] text-white transition-all duration-300 hover:bg-[#7a9b49]">View Reports</button>
      </div>
    </div>
  );
}


function Card({ title, value, subtitle, className = "" }) {
  return (
    <div className={`p-4 rounded shadow flex flex-col ${className}`}>
      <div className="text-sm">{title}</div>
      <div className="text-2xl font-semibold mt-2">{value}</div>
      <div className="text-xs mt-2">{subtitle}</div>
    </div>
  );
}


function StatusChip({ status }) {
  const cls = {
    Processing: "bg-yellow-100 text-yellow-800",
    Shipped: "bg-blue-100 text-blue-800",
    Delivered: "bg-green-100 text-green-800",
    Cancelled: "bg-red-100 text-red-800",
  }[status] || "bg-gray-100 text-gray-800";

  return (
    <span className={`px-2 py-1 rounded text-xs font-medium ${cls}`}>{status}</span>
  );
}
