import React from 'react'

import Comparison from '@/components/Comparison';

const politicianData1 = {
  name: "John Doe",
  image: "/path/to/image1.jpg",
  party: "Democratic",
  age: 55,
  yearsInOffice: 8,
  keyPolicies: ["Healthcare Reform", "Climate Action", "Education Funding"]
};

const politicianData2 = {
  name: "Jane Smith",
  image: "/path/to/image2.jpg",
  party: "Republican",
  age: 50,
  yearsInOffice: 6,
  keyPolicies: ["Tax Cuts", "Border Security", "Job Creation"]
};


const page = () => {
  return (
    <div className='flex justify-center h-screen w-screen'>
        <Comparison politician1={politicianData1} politician2={politicianData2} />
    </div>
  )
}

export default page