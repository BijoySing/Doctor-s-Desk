import React from 'react'

export default function DoctorHeader() {
  return (
    <div className="p-6 mb-0">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-600 mb-1">BIJOY SING</h1>
          <p className="text-gray-600 italic text-sm">BSC IN COMPUTER SCIENCE IN ENGINEERING</p>
          <p className="text-gray-600 italic text-sm">
            SHAHJALAL UNIVERSITY OF SCIENCE AND TECHNOLOGY, SYLHET
          </p>
        </div>
        <div className="text-right">
          <h2 className="text-2xl font-bold text-gray-600 mb-1">বিজয় সিং</h2>
          <p className="text-gray-600 italic text-sm">বিএসসি ইন কম্পিউটার সায়েন্স ইন ইঞ্জিনিয়ারিং</p>
          <p className="text-gray-600 italic text-sm">শাহজালাল বিজ্ঞান ও প্রযুক্তি বিশ্ববিদ্যালয়, সিলেট</p>
        </div>
      </div>
      <div>
        <p className="text-gray-600 italic text-sm font-bold text-center">
          Heart Specialist, Endocrinologist, Neuro Specialist
          <br />
          হৃদরোগ বিশেষজ্ঞ, এন্ডোক্রাইনোলজিস্ট, নিউরো স্পেশালিস্ট
        </p>
        <p className="text-gray-600 italic text-sm mt-1 text-center">
          Address: 123 Medical St, Health City, Country, মোবাইল: +880123456789
        </p>
      </div>
    </div>
  )
}
