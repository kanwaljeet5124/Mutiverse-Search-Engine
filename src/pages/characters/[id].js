import { searchSingleCharacter } from "@/services/apis/search.service";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { PuffLoader } from "react-spinners";


export default function CharacterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { id } = router.query;

  const [character, setCharacter] = useState({});

  const fetchData = async (id) => {
    setLoading(true);
    const res= await searchSingleCharacter(id);
    if(res.status) {
      setCharacter(res.data);
    } else {
      router.push({pathname:"/", query: {...router.query}}, undefined, {scroll: false});
    }
    setLoading(false);
  }
  useEffect(() => {
    if (id) {
      fetchData(id);
    }
  }, [id]);

  return (
    <div className="min-h-screen flex items-center justify-center relative">
      <button onClick={()=> router.push({pathname:"/", query: {...router.query}}, undefined, {scroll: false})} className="top-6 left-6 text-sm flex items-center gap-1 text-white rounded-full absolute px-4 py-2 bg-blue-400 cursor-pointer">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-left-icon lucide-arrow-left"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
        Go Back
      </button>
      {!loading && <div className="wrapper w-full md:rounded-2xl flex flex-col md:flex-row">
        
        <div className="relative w-full md:w-1/3 h-full">
          <img
            src={character.image}
            alt={character.name}
            fill
            className="w-full rounded-l-2xl"
          />
        </div>

        <div className="flex-1 px-6 pt-6 md:px-10 md:pt-10 pb-0 flex flex-col gap-2 bg-zinc-100 shadow-2xl rounded-r-2xl">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 ">
            {character.name}
          </h1>

          <div className="flex items-center gap-2">
            <span
              className={`w-3 h-3 rounded-full ${
                character.status === "Alive"
                  ? "bg-green-500"
                  : character.status === "Dead"
                  ? "bg-red-500"
                  : "bg-gray-400"
              }`}
            ></span>
            <p className="text-gray-700">
              {character.status} – {character.species}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 text-gray-800 dark:text-gray-200 mt-2">
            <div>
              <p className="text-sm text-gray-500">Gender</p>
              <p className="font-medium text-gray-900">{character.gender}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Origin</p>
              <p className="font-medium text-gray-900">{character.origin?.name}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Location</p>
              <p className="font-medium text-gray-900">{character.location?.name}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Episodes</p>
              <p className="font-medium text-gray-900">{character.episode?.length}</p>
            </div>
          </div>

          {/* Created Date
          <p className="text-xs text-gray-500 mt-3 md:mt-5 mb-5 md:mb-2">
            Created: {new Date(character.created).toDateString()}
          </p> */}
        </div>
      </div>}
      {loading && <div className="flex flex-col items-center justify-center">
        <PuffLoader color="#3b82f6" size={84} />
      </div>}
    </div>
  );
}
