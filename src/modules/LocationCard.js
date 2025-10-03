import React from "react";

export default function LocationCard({ data }) {
  return (
    <div className="bg-white rounded-lg shadow-2xl p-5 group text-black hover:bg-[#f3f3f3] ease-linear duration-300 transition-all">
      <h3 className="text-2xl font-bold  mb-2">{data.name}</h3>
      <div className="space-y-1">
        <p>
          <span className="font-semibold ">Type:</span> {data.type || "Unknown"}
        </p>
        <p>
          <span className="font-semibold ">Dimension:</span> {data.dimension || "Unknown"}
        </p>
        <p>
          <span className="font-semibold ">Residents:</span>{" "}
          {data.residents?.length > 0 ? data.residents.length : "No known residents"}
        </p>
      </div>
    </div>
  );
}
