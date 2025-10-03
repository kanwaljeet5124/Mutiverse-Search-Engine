import React from "react";

export default function LocationCard({ data }) {
  return (
    <div className="bg-white rounded-lg shadow-2xl p-5">
      <h3 className="text-2xl font-bold text-black mb-2">{data.name}</h3>
      <div className="text-gray-600 space-y-1">
        <p>
          <span className="font-semibold text-black">Type:</span> {data.type || "Unknown"}
        </p>
        <p>
          <span className="font-semibold text-black">Dimension:</span> {data.dimension || "Unknown"}
        </p>
        <p>
          <span className="font-semibold text-black">Residents:</span>{" "}
          {data.residents?.length > 0 ? data.residents.length : "No known residents"}
        </p>
      </div>
    </div>
  );
}
