import { searchCharacters, searchEpisodes, searchLocation } from "@/services/apis/search.service";
import { errorMessage, successMessage } from "@/utilities/toasters";
import { useState } from "react";

export default function useSearch() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    characters: [],
    locations: [],
    episodes: [],
    charactersInfo: {},
    locationsInfo: {},
    episodesInfo: {}
  });

  const searchInMetaverse = async (query) => {
    setLoading(true);

    try {
        // Here I decide to go with Promise.allSettled instead of Promise.all because if any API fails then still user will get the result of the APIs which are successful and for the failed ones I will show an error message.
      const [characters, locations, episodes] = await Promise.allSettled([
        searchCharacters(query),
        searchLocation(query),
        searchEpisodes(query),
      ]);

      const newData = {
        characters: [],
        locations: [],
        episodes: [],
        charactersInfo: {},
        locationsInfo: {},
        episodesInfo: {}
      };

      if (characters.status === "fulfilled" && characters.value.status) {
        newData.characters = characters.value.data;
        newData.charactersInfo = characters.value.info;
      } else {
        errorMessage(characters.reason?.message || "No data found for characters.");
      }

      if (locations.status === "fulfilled" && locations.value.status) {
        newData.locations = locations.value.data;
        newData.locationsInfo = locations.value.info;
      } else {
        errorMessage(locations.reason?.message || "No data found for locations.");
      }

      if (episodes.status === "fulfilled" && episodes.value.status) {
        newData.episodes = episodes.value.data;
        newData.episodesInfo = episodes.value.info;
      } else {
        errorMessage(episodes.reason?.message || "No data found for episodes.");
      }

      setData(newData);
    } catch (err) {
      errorMessage(err.message || "Something went wrong while searching.");
    } finally {
      setLoading(false);
    }
  };

  const searchByType = async (query, type, page=1, merge=true) => {
    setLoading(true);
    console.log("Search by type:", query, type, page, merge);
    try {
      let response;
      switch (type) {
        case "characters":
          response = await searchCharacters(query, page);
          if (response.status) {
            setData((prev) => ({
              ...prev,
              characters: merge?[...data.characters, ...response.data]:response.data,
              charactersInfo: response.info,
              locations:merge?data.locations:[],
              locationsInfo:merge?data.locationsInfo:{},
              episodes:merge?data.episodes:[],
              episodesInfo:merge?data.episodesInfo:{} 
            }));
          }
          else{
            setData((prev) => ({
              ...prev,
              characters: [],
              charactersInfo: response.info,
              locations:merge?data.locations:[],
              locationsInfo:merge?data.locationsInfo:{},
              episodes:merge?data.episodes:[],
              episodesInfo:merge?data.episodesInfo:{} 
            }));
          }
          break;

        case "locations":
          response = await searchLocation(query, page);
          console.log("Locations response:", response);
          if (response.status) {
            setData((prev) => ({
              ...prev,
              locations: merge?[...data.locations, ...response.data]:response.data,
              locationsInfo: response.info,
              characters:merge?data.characters:[],
              charactersInfo: merge?data.charactersInfo:{},
              episodes:merge?data.episodes:[],
              episodesInfo: merge?data.episodesInfo:{}
            }));
          }
          else{
            setData((prev) => ({
              ...prev,
              locations: [],
              locationsInfo: response.info,
              characters:merge?data.characters:[],
              charactersInfo: merge?data.charactersInfo:{},
              episodes:merge?data.episodes:[],
              episodesInfo: merge?data.episodesInfo:{}
            }));
          }
          break;

        case "episodes":
          response = await searchEpisodes(query, page);
          if (response.status) {
            setData((prev) => ({
              ...prev,
              episodes: merge?[...data.episodes,...response.data]:response.data,
              episodesInfo: response.info,
              characters:merge?data.characters:[],
              charactersInfo:merge?data.charactersInfo:{},
              locations:merge?data.locations:[],
              locationsInfo: merge?data.locationsInfo:{}
            }));
          }
          else{
            setData((prev) => ({
              ...prev,
              episodes: [],
              episodesInfo: response.info,
              characters:merge?data.characters:[],
              charactersInfo:merge?data.charactersInfo:{},
              locations:merge?data.locations:[],
              locationsInfo: merge?data.locationsInfo:{}
            }));
          }
          break;

        default:
          errorMessage("Invalid search type provided.");
      }
    } catch (err) {
      errorMessage(err.message || "Something went wrong while searching.");
    } finally {
      setLoading(false);
    }
  };


  return { loading, data, searchInMetaverse,searchByType };
}
