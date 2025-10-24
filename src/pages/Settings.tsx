import React, { useState } from 'react'

export default function Settings() {
  const [doctorInfo, setDoctorInfo] = useState({
    nameEnglish: 'BIJOY SING',
    nameBengali: 'BIJOY SING',
    degreeEnglish: 'MBBS,DEM (Endocrinology & Metabolism)',
    degreeBengali: 'এমবিবিএস, ডিইএম(এন্ডোক্রাইনোলজি ও মেটাবলিজম)',
    specialization: 'Consultant Diabetologist, Endocrinologist & Metabolic Disorder Specialist',
    specializationBengali: 'ডায়াবেটিস ইন্সোলিন ও মেটাবলিজম বিশেষজ্ঞ',
    details: 'আর্মিস্ট হাসপাতাল - পূর্ব নির্ধারিত এপয়েন্টমেন্ট ছাড়া যথাস্থানে সিরিয়াল',
    phone: 'মোবাইলঃ 01914-478747 (সকাল ১০টা - ১২টা) রবি, বুধবার ও শুক্রবার বন্ধ',
    chamber: 'রোমেন্দা হাসপিতাল তৃতীয়/চতুর্থ সিঁড়ি',
    location: 'চৌহাট্টা পয়েন্ট, সাভার, মিরপুর',
    visitDate: 'রোজ (শনিবার সন্ধ্যা বাদ শুক্র, শনির, মঙ্গল ও বৃহস্পতিবার',
    visitTime: 'বিকাল ৩ - ৬০ থেকে রাত ৮ - ১০ পর্যন্ত',
    advice: 'শর্টিয়ের জন্য নিচের নম্বরে যোগাযোগ করুন। শুক্রবার সন্ধ্যার লেসেস বারা ধন্যবাদ। মোবাইলেঃ ০১৯১৬৭৮৮৩৩৫ (সুন্দর মাজহা তায়েপ)',
    leftGrid: '24',
    rightGrid: '21'
  })

  const handleChange = (field: string, value: string) => {
    setDoctorInfo({ ...doctorInfo, [field]: value })
  }

  const handleUpdate = () => {
    alert('Doctor information updated successfully!')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-8 max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Doctor Information</h1>
            <button className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
              Privacy Settings
            </button>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-4">
              <div>
                <label className="block font-medium mb-2">Doctor Name:</label>
                <input
                  type="text"
                  value={doctorInfo.nameEnglish}
                  onChange={(e) => handleChange('nameEnglish', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block font-medium mb-2">Doctor Degree:</label>
                <input
                  type="text"
                  value={doctorInfo.degreeEnglish}
                  onChange={(e) => handleChange('degreeEnglish', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block font-medium mb-2">Specialization:</label>
                <input
                  type="text"
                  value={doctorInfo.specialization}
                  onChange={(e) => handleChange('specialization', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block font-medium mb-2">Details:</label>
                <input
                  type="text"
                  value={doctorInfo.details}
                  onChange={(e) => handleChange('details', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block font-medium mb-2">Chamber:</label>
                <input
                  type="text"
                  value={doctorInfo.chamber}
                  onChange={(e) => handleChange('chamber', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block font-medium mb-2">Visit Date:</label>
                <input
                  type="text"
                  value={doctorInfo.visitDate}
                  onChange={(e) => handleChange('visitDate', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block font-medium mb-2">Advice :</label>
                <textarea
                  value={doctorInfo.advice}
                  onChange={(e) => handleChange('advice', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 h-24"
                />
              </div>

              <div>
                <label className="block font-medium mb-2">LeftGrid:</label>
                <input
                  type="text"
                  value={doctorInfo.leftGrid}
                  onChange={(e) => handleChange('leftGrid', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              <div>
                <label className="block font-medium mb-2">ডাক্তারের নাম:</label>
                <input
                  type="text"
                  value={doctorInfo.nameBengali}
                  onChange={(e) => handleChange('nameBengali', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block font-medium mb-2">ডাক্তারের ডিগ্রি:</label>
                <input
                  type="text"
                  value={doctorInfo.degreeBengali}
                  onChange={(e) => handleChange('degreeBengali', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block font-medium mb-2">বিশেষত্ব:</label>
                <input
                  type="text"
                  value={doctorInfo.specializationBengali}
                  onChange={(e) => handleChange('specializationBengali', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block font-medium mb-2">Phone No:</label>
                <input
                  type="text"
                  value={doctorInfo.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block font-medium mb-2">Location:</label>
                <input
                  type="text"
                  value={doctorInfo.location}
                  onChange={(e) => handleChange('location', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block font-medium mb-2">Visit Time:</label>
                <input
                  type="text"
                  value={doctorInfo.visitTime}
                  onChange={(e) => handleChange('visitTime', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="h-24"></div>

              <div>
                <label className="block font-medium mb-2">RightGrid:</label>
                <input
                  type="text"
                  value={doctorInfo.rightGrid}
                  onChange={(e) => handleChange('rightGrid', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-center">
            <button
              onClick={handleUpdate}
              className="px-12 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700"
            >
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
