import React, { useState } from 'react'

export default function Statistics() {
  const [startDate, setStartDate] = useState('4/28/2024')
  const [endDate, setEndDate] = useState('4/28/2024')

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Top Bar */}
      <div className="bg-gray-700 text-white px-6 py-3 flex justify-between items-center fixed top-0 left-16 right-0 z-10">
        <div></div>
        <div className="flex items-center gap-6">
          <span className="font-medium">Bijoy sing</span>
          <button onClick={() => window.location.href = '/login'} className="text-white hover:text-gray-300">Log Out</button>
        </div>
      </div>

      <div className="pt-16 max-w-7xl mx-auto">
        {/* Visit Statistics */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-6 rounded-lg shadow text-center">
            <h3 className="text-gray-600 mb-2 font-medium">Total Visit:</h3>
            <p className="text-4xl font-bold">0</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow text-center">
            <h3 className="text-gray-600 mb-2 font-medium">Todays Visit:</h3>
            <p className="text-4xl font-bold">1</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow text-center">
            <h3 className="text-gray-600 mb-2 font-medium">This Month Visit:</h3>
            <p className="text-4xl font-bold">4</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow text-center">
            <h3 className="text-gray-600 mb-2 font-medium">Last Months Visit:</h3>
            <p className="text-4xl font-bold">43</p>
          </div>
        </div>

        {/* Patient Statistics */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-6 rounded-lg shadow text-center">
            <h3 className="text-gray-600 mb-2 font-medium">Total Patient:</h3>
            <p className="text-4xl font-bold">0</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow text-center">
            <h3 className="text-gray-600 mb-2 font-medium">Todays Patient:</h3>
            <p className="text-4xl font-bold">1</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow text-center">
            <h3 className="text-gray-600 mb-2 font-medium">This Months Patient:</h3>
            <p className="text-4xl font-bold">3</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow text-center">
            <h3 className="text-gray-600 mb-2 font-medium">Last Months Patient:</h3>
            <p className="text-4xl font-bold">7</p>
          </div>
        </div>

        {/* Date Range Picker */}
        <div className="bg-white p-8 rounded-lg shadow flex items-center justify-center gap-12">
          <div>
            <label className="block text-sm font-medium mb-2">Pick Start Date</label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="px-4 py-2 border-2 border-gray-300 rounded focus:outline-none focus:border-blue-500"
              />
              <button className="px-3 py-2 bg-gray-200 rounded hover:bg-gray-300">📅</button>
            </div>
          </div>
          <div className="border-r-2 border-gray-300 h-24"></div>
          <div>
            <label className="block text-sm font-medium mb-2">Pick End Date</label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="px-4 py-2 border-2 border-gray-300 rounded focus:outline-none focus:border-blue-500"
              />
              <button className="px-3 py-2 bg-gray-200 rounded hover:bg-gray-300">📅</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
