import Image from "next/image";
import { Bebas_Neue, Nunito } from "next/font/google";
import { useEffect, useState } from "react";
import Banner from "@/modules/Banner";
import CharacterSection from "@/modules/CharacterSection";
import { useRouter } from "next/router";
import useSearch from "@/hooks/useSearch";

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
  // const {searchInMetaverse, loading, data} = useSearch();
  const {loading, data, searchInMetaverse} = useSearch();

  const handleSearch = async (query) => {
    if(query.trim().length === 0) {
        router.push(`/`, undefined, { scroll: false });
        return;
    }
    await searchInMetaverse(query);
  } 


  useEffect(() => {
    if(router.isReady && router.query.keyword) {
      handleSearch(router.query.keyword);
    }
  }, [router.isReady, router.query]);

  // console.log(data);
  return (
    <div
      className={`${bebas.variable} ${nunito.variable}`}
    >
      <Banner />
      {loading && <div className="w-full h-20 flex items-center justify-center text-xl font-nunito text-gray-700">Loading...</div>}
      {!loading && <CharacterSection results={data} />}
    </div>
  );
}
