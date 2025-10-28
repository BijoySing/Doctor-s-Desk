import React from 'react'

export default function PrescriptionFooter() {
  return (
    <div className="mt-6 bg-red-00 border-2 px-4 py-2 border-gray-200">
      <div className="flex justify-between text-xs">
        <div className="flex items-start">
          <div className="mr-2">⚠️</div>
          <div>
            <p className="font-bold">চেম্বারঃ XYZ ডায়াগনস্টিক সেন্টার</p>
            <p className="font-bold">ঠিকানা:শাহজালাল বিজ্ঞান ও প্রযুক্তি বিশ্ববিদ্যালয়, সিলেট</p>
          </div>
        </div>
        <div className="text-right">
          <p className="font-bold">রোগী দেখার সময়ঃ প্রতি শনি, সোম, মঙ্গল ও বুধবার</p>
          <p className="font-bold">যোগাযোগঃ +8801894-943029 (সকাল ১০টা - ১২টা)  <br />
          রবি, বৃহস্পতি ও শুক্রবার বন্ধ</p>
        </div>
      </div>
    </div>
  )
}
