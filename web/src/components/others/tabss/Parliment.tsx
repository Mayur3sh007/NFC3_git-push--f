import React from "react";
import { CiMicrophoneOn } from "react-icons/ci";
import { FaBookMedical } from "react-icons/fa6";

const items = [
  {
    id: 1,
    name: "Draft Bill on Digital Competition Law, 2024",
    description: "Deadline for submission: Apr 15, 2024 | Press Release",
  },
  {
    id: 2,
    name: " Draft Guidelines for the Prevention and Regulation of Greenwashing, 2024",
    description: "Deadline for submission: Mar 21, 2024 | Press Release",
  },
  {
    id: 3,
    name: "Draft Guidelines for Prevention of Misleading Advertisement in Coaching, 2024",
    description: "Deadline for submission: Mar 16, 2024 | Press Release",
  },
  {
    id: 4,
    name: "Draft Bill on Digital Competition Law, 2024",
    description: "Deadline for submission: Apr 15, 2024 | Press Release",
  },
];

function Parliament() {
  return (
    <div className="flex">
      {/* Leftvala */}

      <div className="flex flex-col border-r border-gray-300 py-4 px-2">
        <div className="flex items-center">
          <div className="text-white mr-2">
            <FaBookMedical />
          </div>
          <div>Parliament Today</div>
        </div>
        <div className="mt-2">📅 Aug 29, 2024</div>
        <div className="mt-1">Lok Sabha</div>
        <div className="mt-1">Parliament adjourned sine die</div>
      </div>
      {/* Rightvala */}
      <div className=" p-4">
        <div className="flex ">
          <div className="text-xl text-white">
            <CiMicrophoneOn />
          </div>
          <div>Announcements</div>
        </div>
        <div className="text-white">Comments invited on</div>
        <div className="flex flex-col gap-2">
          {items.map((item) => (
            <div key={item.id} className="p-4 border rounded">
              <h2 className="text-lg font-bold">{item.name}</h2>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
        <div className="w-full mx-auto flex justify-end ">
          <button className="bg-teal-400 m-2 p-2 rounded-full">
            Read More ⏭️
          </button>
        </div>
      </div>
    </div>
  );
}

export default Parliament;
