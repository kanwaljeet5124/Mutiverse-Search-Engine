import React from "react";

export default function EpisodeCard({ data }) {
  return (
    <div className="bg-white rounded-lg shadow-xl p-5">
      <h3 className="text-2xl font-bold text-black mb-2">{data.name}</h3>
      <div className="text-gray-600 space-y-1">
        <p>
          <span className="font-semibold text-black">Episode:</span> {data.episode}
        </p>
        <p>
          <span className="font-semibold text-black">Air Date:</span> {data.air_date}
        </p>
        <p>
          <span className="font-semibold text-black">Characters:</span>{" "}
          {data.characters?.length > 0 ? data.characters.length : "No known characters"}
        </p>
      </div>
    </div>
  );
}
