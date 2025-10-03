import { Bebas_Neue, Nunito } from "next/font/google";
import { useEffect, useMemo } from "react";
import Banner from "@/modules/Banner";
import CharacterCard from "@/modules/CharacterCard";
import LocationCard from "@/modules/LocationCard";
import EpisodeCard from "@/modules/EpisodeCard";
import { useRouter } from "next/router";
import useSearch from "@/hooks/useSearch";
import { ShimmerThumbnail, ShimmerTitle, ShimmerText } from "react-shimmer-effects";

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
    const { loading, data, isCleared, searchByType, clearResults } = useSearch();

    const tab = useMemo(() => router.query.tab || "characters", [router.query.tab]);
    const keyword = useMemo(() => router.query.keyword || "", [router.query.keyword]);

    const handleSearch = async (query, type,page=1, merge) => {
        console.log("Handle initiated for:", { query, type, page, merge });
        if (!query || query.trim().length === 0) {
            await clearResults()
            router.push(`/`, undefined, { scroll: false });
            return;
        }

        await searchByType(query, type, page, merge);
    };

    const getPageFromUrl = (url) => {
        if (!url) return null;
        const params = new URL(url).searchParams;
        return params.get("page");
    };

    const handleCharacterLoadMore = async () => {
        if (!data.charactersInfo?.next) return;
        const nextPage = getPageFromUrl(data.charactersInfo.next);
        console.log("Next page:", nextPage);
        handleSearch(router.query.keyword, "characters", nextPage); 
    }
    const handleLocationsLoadMore = async () => {
        console.log("Locations Load More clicked");
        if (!data.locationsInfo?.next) return;
        const nextPage = getPageFromUrl(data.locationsInfo.next);
        console.log("Next page:", nextPage);
        handleSearch(router.query.keyword, "locations", nextPage); 
    }
    const handleEpisodesLoadMore = async () => {
        console.log("asdfasdf");
        if (!data.episodesInfo?.next) return;
        const nextPage = getPageFromUrl(data.episodesInfo.next);
        console.log("Next page:", nextPage);
        handleSearch(router.query.keyword, "episodes", nextPage); 
    }   

    useEffect(() => {
        console.log(router.query.keyword)
        if (router.isReady && router.query.keyword) {
            handleSearch(router.query.keyword, tab,1, false);
        }
        else{
            clearResults();
        }
    }, [router.isReady, router.query.keyword]);

    useEffect(() => {
        if (router.isReady && router.query.keyword) {
            if (tab === "characters" && data.characters.length > 0) return;
            if (tab === "locations" && data.locations.length > 0) return;
            if (tab === "episodes" && data.episodes.length > 0) return;
            handleSearch(router.query.keyword, tab,1, true);
        }
    }, [router.isReady, tab]);

  return (
    <div className={`${bebas.variable} ${nunito.variable} font-nunito flex flex-wrap`}>
      <Banner />

      {/* Tabs */}
      <div className="wrapper flex flex-wrap items-center justify-center">
        <div className="w-full transition-all duration-200 ease-linear md:w-auto mt-8 flex flex-wrap items-center justify-center rounded-full gap-2 p-2 border border-gray-300 overflow-clip">
          {["characters", "locations", "episodes"].map((type) => (
            <label
              key={type}
              className={`py-2.5 px-3 sm:px-5 cursor-pointer rounded-full border-r border-white ${
                tab === type
                  ? "bg-blue-400 text-white font-bold"
                  : "text-blue-400 font-semibold bg-gray-100"
              }`}
              onClick={() =>
                router.push(
                  {
                    pathname: router.pathname,
                    query: { ...router.query, tab: type },
                  },
                  undefined,
                  { scroll: false }
                )
              }
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </label>
          ))}
        </div>
      </div>

      {/* Characters */}
      {tab === "characters" && (
        <div className="wrapper flex flex-wrap flex-col items-center justify-center">
          <div className="w-full flex flex-wrap items-center justify-center">
            <span className="w-full flex items-center justify-center sm:justify-end text-base text-gray-500 font-semibold font-nunito my-5 capitalize">
              Showing {data.characters.length} out of {data.charactersInfo?.count} characters
            </span>
            {data?.characters?.length > 0 ? (<>
              <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {data?.characters?.map((item, index) => (
                    <CharacterCard key={index} data={item} />
                ))}
              </div>
              {!loading && <div className="">
                {data?.charactersInfo?.next && <button disabled={loading} onClick={handleCharacterLoadMore} className=' mt-10 disabled:cursor-not-allowed disabled:bg-blue-300 rounded-full px-7 bg-blue-400 text-white py-3 text-lg font-nunito cursor-pointer hover:bg-blue-500 transition-all duration-200 ease-in-out'>
                    {"Load More"}
                </button>}
              </div>}
            </>) : (
              <div className="flex flex-col items-center justify-center mt-8 mb-16 w-11/12 sm:w-11/12 md:w-8/12 lg:w-6/12">
                <h3 className="text-6xl font-bebas opacity-65">{isCleared?"":"404"}</h3>
                <h4 className="text-4xl font-bebas opacity-50">{isCleared?"Explore the Metaverse!":"No Data Found"}</h4>
                <span className="text-lg font-nunito text-gray-500 text-center">
                  {isCleared?"Try some keyword and explore your favorite characters,locations, and episodes":"Oops! No character found for this keyword."}
                </span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Locations */}
      {tab === "locations" && (
        <div className="wrapper flex flex-wrap flex-col items-center justify-center">
          <div className="w-full flex flex-wrap items-center justify-center">
            <span className="w-full flex items-center justify-end text-base text-gray-500 font-semibold font-nunito my-5 capitalize">
              Showing {data.locations.length} out of {data.locationsInfo?.count} locations
            </span>
            {data?.locations?.length > 0 ? (<>
              <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {data?.locations?.map((item, index) => (
                  <LocationCard key={index} data={item} />
                ))}
              </div>
              {!loading && <div className="">
                {data?.locationsInfo?.next && <button disabled={loading} onClick={handleLocationsLoadMore} className=' mt-10 disabled:cursor-not-allowed disabled:bg-blue-300 rounded-full px-7 bg-blue-400 text-white py-3 text-lg font-nunito cursor-pointer hover:bg-blue-500 transition-all duration-200 ease-in-out'>
                    {"Load More"}
                </button>}
              </div>}
            </>) : (
                <div className="flex flex-col items-center justify-center mt-8 mb-16 w-11/12 sm:w-11/12 md:w-8/12 lg:w-6/12">
                    <h3 className="text-6xl font-bebas opacity-65">{isCleared?"":"404"}</h3>
                    <h4 className="text-4xl font-bebas opacity-50">{isCleared?"Explore the Metaverse!":"No Data Found"}</h4>
                    <span className="text-lg font-nunito text-gray-500 text-center">
                    {isCleared?"Try some keyword and explore your favorite characters,locations, and episodes":"Oops! No character found for this keyword."}
                    </span>
                </div>
            )}
          </div>
        </div>
      )}

      {/* Episodes */}
      {tab === "episodes" && (
        <div className="wrapper flex flex-wrap flex-col items-center justify-center">
          <div className="w-full flex flex-wrap items-center justify-center">
            <span className="w-full flex items-center justify-end text-base text-gray-500 font-semibold font-nunito my-5 capitalize">
              Showing {data.episodes.length} out of {data.episodesInfo?.count} episodes
            </span>
            {data?.episodes?.length > 0 ? (<>
              <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
                {data?.episodes?.map((item, index) => (
                    <EpisodeCard key={index} data={item} />
                ))}
              </div>
              {!loading && <div className="">
                {data?.episodesInfo.next && <button disabled={loading} onClick={handleEpisodesLoadMore} className=' mt-10 disabled:cursor-not-allowed disabled:bg-blue-300 rounded-full px-7 bg-blue-400 text-white py-3 text-lg font-nunito cursor-pointer hover:bg-blue-500 transition-all duration-200 ease-in-out'>
                    {"Load More"}
                </button>}
              </div>}
            </>) : (
                <div className="flex flex-col items-center justify-center mt-8 mb-16 w-11/12 sm:w-11/12 md:w-8/12 lg:w-6/12">
                    <h3 className="text-6xl font-bebas opacity-65">{isCleared?"":"404"}</h3>
                    <h4 className="text-4xl font-bebas opacity-50">{isCleared?"Explore the Metaverse!":"No Data Found"}</h4>
                    <span className="text-lg font-nunito text-gray-500 text-center">
                    {isCleared?"Try some keyword and explore your favorite characters,locations, and episodes":"Oops! No character found for this keyword."}
                    </span>
                </div>)}
            </div>
        </div>
      )}

      {loading && (
        <div className="wrapper">
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 my-5">
                <div>
                    <ShimmerThumbnail height={200} rounded />
                    <div className="mt-1">
                        <ShimmerTitle line={1} />
                    </div>
                </div>
                <div>
                    <ShimmerThumbnail height={200} rounded />
                    <div className="mt-1">
                        <ShimmerTitle line={1} />
                    </div>
                </div>
                <div>
                    <ShimmerThumbnail height={200} rounded />
                    <div className="mt-1">
                        <ShimmerTitle line={1} />
                    </div>
                </div>
                <div>
                    <ShimmerThumbnail height={200} rounded />
                    <div className="mt-1">
                        <ShimmerTitle line={1} />
                    </div>
                </div>
            </div>
        </div>
      )}

      {/* Footer */}
      <footer className="w-full flex items-center justify-center border-t mt-16 bg-black">
        <div className="wrapper">
          <p className="text-center text-white py-5">
            Made with ❤️ by Kanwaljeet Singh for{" "}
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
  );
}
