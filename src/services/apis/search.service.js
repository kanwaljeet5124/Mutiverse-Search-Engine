import { responseValidator, apiError, URL } from "../helper";

const requestOptions = {
  method: "GET",
  headers: new Headers(),
  redirect: "follow",
};

export const searchCharacters = async (keyword = "", page=1) => {
  try {
    const response = await fetch(`${URL}/character/?name=${keyword}&page=${page}`, requestOptions);
    return await responseValidator(response);
  } catch (e) {
    return apiError(e);
  }
};

export const searchLocation = async (keyword = "", page=1) => {
  try {
    const response = await fetch(`${URL}/location/?name=${keyword}&page=${page}`, requestOptions);
    return await responseValidator(response);
  } catch (e) {
    return apiError(e);
  }
};

export const searchEpisodes = async (keyword = "", page=1) => {
  try {
    const response = await fetch(`${URL}/episode/?name=${keyword}&page=${page}`, requestOptions);
    return await responseValidator(response);
  } catch (e) {
    return apiError(e);
  }
};
