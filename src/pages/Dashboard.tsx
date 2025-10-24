import React, { useEffect, useState } from 'react'
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts'
import { getStatistics } from '../api/tauri'

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d', '#ffc658', '#ff7c7c', '#8dd1e1', '#d084d0']

export default function Dashboard() {
  const [stats, setStats] = useState<any>({
    patient_count: 0,
    visit_count: 0,
    top_medicines: []
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true
    ;(async () => {
      try {
        const data: any = await getStatistics()
        if (mounted) {
          setStats(data)
        }
      } catch (error) {
        console.log('Stats failed (Tauri not available)', error)
        // Keep default stats for web dev
      } finally {
        if (mounted) setLoading(false)
      }
    })()
    return () => { mounted = false }
  }, [])

  if (loading) {
    return <div className="text-center py-8">Loading statistics...</div>
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl mb-6 font-bold text-gray-800">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-6 rounded-lg shadow-lg text-white">
          <div className="text-blue-100 text-sm uppercase tracking-wide mb-2">Total Patients</div>
          <div className="text-4xl font-bold">{stats.patient_count}</div>
          <div className="mt-2 text-blue-100 text-sm">Registered in system</div>
        </div>
        <div className="bg-gradient-to-br from-green-500 to-green-600 p-6 rounded-lg shadow-lg text-white">
          <div className="text-green-100 text-sm uppercase tracking-wide mb-2">Total Visits</div>
          <div className="text-4xl font-bold">{stats.visit_count}</div>
          <div className="mt-2 text-green-100 text-sm">Consultations completed</div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg col-span-1 md:col-span-2">
          <h3 className="mb-4 text-xl font-bold text-gray-800">Top Medicines Prescribed</h3>
          {stats.top_medicines.length > 0 ? (
            <div style={{ width: '100%', height: 350 }}>
              <ResponsiveContainer>
                <PieChart>
                  <Pie 
                    data={stats.top_medicines} 
                    dataKey="value" 
                    nameKey="name" 
                    cx="50%" 
                    cy="50%" 
                    outerRadius={120} 
                    label
                  >
                    {stats.top_medicines.map((_: any, i: number) => (
                      <Cell key={i} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="text-center text-gray-400 py-12">
              <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <p className="text-lg font-medium">No prescription data yet</p>
              <p className="text-sm mt-2">Start adding prescriptions to see statistics</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
