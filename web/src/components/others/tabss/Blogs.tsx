import React from "react";

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

function Blogs() {
  return (
    <>
      <div className="flex flex-col gap-2">
        {items.map((item) => (
          <div key={item.id} className="p-4 border rounded">
            <div>
              <h2 className="text-lg font-bold">{item.name}</h2>
              <p>{item.description}</p>
            </div>
            <div className="flex justify-end">
              <button className="bg-teal-400 m-2 p-2 rounded-full">
                read more ⏭️
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Blogs;
