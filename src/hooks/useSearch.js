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

  return { loading, data, searchInMetaverse };
}
