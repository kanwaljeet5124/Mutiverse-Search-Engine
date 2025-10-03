import Search from '@/Icons/Search'
import { searchCharacters } from '@/services/apis/search.service';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react'

export default function SearchBar() {
    const [query, setQuery] = useState("");
    const router = useRouter();

    const handleSearch = async (e) => {
        e.preventDefault();
        // console.log("Search submitted:", query);
        if(query.trim().length === 0) {
            router.push(`/`, undefined, { scroll: false });
        }
        else{
            router.push(
                {
                  pathname: router.pathname,
                  query: { ...router.query, keyword:query },
                },
                undefined,
                { scroll: false }
            )
        }
        // const response = await searchCharacters(keyword);
        // console.log("Search response:", response);
    }

    // Debounced search code starts here This will be usefull if do not require the search button because it will search automatically after 500ms of user stop typing
    // useEffect(() => {
    //     const timer = setTimeout(async () => {
    //     router.push(`/?keyword=${query}`);
    //     console.log("Search submitted:", query); 
    //     }, 500);

    //     return () => clearTimeout(timer);
    // }, [query]);
    // Debounced search code ends here

    useEffect(() => {
        const { keyword } = router.query;
        // console.log("Keyword from URL:", keyword);
        if (keyword) {
            setQuery(keyword);
        }
    }, [router.isReady]);

  return (
    <>
        <form className='w-3/4 bg-white max-w-[600px] rounded-full pl-4 pr-2.5 mt-7 flex items-center py-2.5 justify-between'>
            <Search />
            {/* <input type="text" onChange={(e)=> setQuery(e.target.value)} placeholder='Search characters, locations, or episodes...' className='text-xl bg-transparent outline-none p-2.5 w-4/5'/> */}
            <input type="text" value={query} onChange={(e)=> setQuery(e.target.value)} placeholder='Search characters, locations, or episodes...' className='text-xl bg-transparent outline-none p-2.5 w-4/5'/>
            <button onClick={handleSearch} className='rounded-full px-7 bg-blue-400 text-white py-3 text-xl cursor-pointer hover:bg-blue-500 transition-all duration-200 ease-in-out'>Search</button>
        </form>
    </>
  )
}
