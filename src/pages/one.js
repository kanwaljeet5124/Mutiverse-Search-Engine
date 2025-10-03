import Image from "next/image";
import { Bebas_Neue, Nunito } from "next/font/google";
import { useEffect, useMemo, useState } from "react";
import Banner from "@/modules/Banner";
import CharacterSection from "@/modules/CharacterSection";
import { useRouter } from "next/router";
import useSearch from "@/hooks/useSearch";
import CharacterCard from "@/modules/CharacterCard";
import LocationCard from "@/modules/LocationCard";
import EpisodeCard from "@/modules/EpisodeCard";

const bebas = Bebas_Neue({
  variable: "--font-bebas-neue",
  subsets: ["latin"],
  weight: "400",
});

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
});

export default function Home() {
  const router = useRouter();
  const {loading, data, searchInMetaverse} = useSearch();
  const tab = useMemo(() => router.query.tab || "characters", [router.query.tab]);

  const handleSearch = async (query) => {
    if(query.trim().length === 0) {
        router.push(`/`, undefined, { scroll: false });
        return;
    }
    await searchInMetaverse(query);
  }


  useEffect(() => {
    if (router.isReady && router.query.keyword) {
      handleSearch(router.query.keyword);
    }
  }, [router.isReady, router.query.keyword]); 

  useEffect(() => {
    if (router.isReady) {
      tab = router.query.tab || "characters";
    }
  }, [router.isReady, router.query.tab]);

  console.log(data);

  return (
    <div
      className={`${bebas.variable} ${nunito.variable} font-nunito flex flex-wrap`}
    >
      <Banner />
      <div className="wrapper flex flex-wrap items-center justify-center">
        <div className="w-full transition-all duration-200 ease-linear md:w-auto mt-8 flex flex-wrap items-center justify-center rounded-full gap-2 p-2 border border-gray-300 overflow-clip">
          <label 
            className={`py-2.5 px-5 cursor-pointer rounded-full border-r border-white ${tab=="characters"?"bg-blue-400 text-white font-bold":"text-blue-400 font-semibold bg-gray-100"}`}
            onClick={() =>
              router.push(
                {
                  pathname: router.pathname,
                  query: { ...router.query, tab: "characters" },
                },
                undefined,
                { scroll: false }
              )
            }    
          >
            Characters
          </label>
          <label 
            className={`py-2.5 px-5 cursor-pointer rounded-full border-r border-white ${tab=="locations"?"bg-blue-400 text-white font-bold":"text-blue-400 font-semibold bg-gray-100"}`} 
            onClick={() =>
              router.push(
                {
                  pathname: router.pathname,
                  query: { ...router.query, tab: "locations" },
                },
                undefined,
                { scroll: false }
              )
            }
          >
            Locations
          </label>
          <label 
            className={`py-2.5 px-5 cursor-pointer rounded-full border-r border-white ${tab=="episodes"?"bg-blue-400 text-white font-bold":"text-blue-400 font-semibold bg-gray-100"}`}
            onClick={() =>
              router.push(
                {
                  pathname: router.pathname,
                  query: { ...router.query, tab: "episodes" },
                },
                undefined,
                { scroll: false }
              )
            }
          >
            Episodes
          </label>
        </div>
      </div>

      {tab && tab == "characters" && <div className='wrapper flex flex-wrap flex-col items-center justify-center'>
        <div className='w-full flex flex-wrap items-center justify-center'>
            <span className='w-full flex items-center justify-end text-base text-gray-500 font-semibold font-nunito my-5 capitalize'>Showing {data.characters.length} out of {data.charactersInfo?.count} characters</span>
            {data?.characters?.length>0 ? <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-6'>
                {data?.characters?.map((item, index) => <CharacterCard key={index} data={item} />)}
            </div>: <div className="flex flex-col items-center justify-center">
                <h3 className="text-6xl font-bebas opacity-65">404</h3>
                <h4 className="text-4xl font-bebas opacity-50">No Data Found</h4>
                <span className="text-lg font-nunito text-gray-500">Oops! No characters found for this keyword.</span>
            </div>}
        </div>
      </div>}

      {tab && tab == "locations" && <div className='wrapper flex flex-wrap flex-col items-center justify-center'>
        <div className='w-full mt-5 flex flex-wrap items-center justify-center'>
            <span className='w-full flex items-center justify-end text-base text-gray-500 font-semibold font-nunito my-5 capitalize'>Showing {data.locations.length} out of {data.locationsInfo?.count} locations</span>
            {data?.locations?.length>0 ? <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-6'>
                {data?.locations?.map((item, index) => <LocationCard key={index} data={item} />)}
            </div>: <div>
                No data found for characters.
            </div>}
        </div>
      </div>}

      {tab && tab == "episodes" && <div className='wrapper flex flex-wrap flex-col items-center justify-center'>
        <div className='w-full mt-5 flex flex-wrap items-center justify-center'>
            <span className='w-full flex items-center justify-end text-base text-gray-500 font-semibold font-nunito my-5 capitalize'>Showing {data.episodes.length} out of {data.episodesInfo?.count} episodes</span>
            {data?.episodes?.length>0 ? <div className='w-full grid grid-cols-1 md:grid-cols-2 gap-4'>
                {data?.episodes?.map((item, index) => <EpisodeCard key={index} data={item} />)}
            </div>: <div>
                No data found for characters.
            </div>}
        </div>
      </div>}

      <footer className="w-full flex items-center justify-center border-t mt-10 bg-black">
        <div className="wrapper">
          <p className="text-center text-white py-5">
            Made with ❤️ by{" "} Kanwaljeet Singh for {" "}
            <a
              href="https://tryft.co"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#eb6744] hover:underline"
            >
              Tryft
            </a>
          </p>
        </div>
      </footer>
    </div>
  )
}
