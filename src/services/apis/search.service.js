import { responseValidator, apiError, URL } from "../helper";

const requestOptions = {
  method: "GET",
  headers: new Headers(),
  redirect: "follow",
};

export const searchCharacters = async (keyword = "") => {
  try {
    const response = await fetch(`${URL}/character/?name=${keyword}`, requestOptions);
    return await responseValidator(response);
  } catch (e) {
    return apiError(e);
  }
};

export const searchLocation = async (keyword = "") => {
  try {
    const response = await fetch(`${URL}/location/?name=${keyword}`, requestOptions);
    return await responseValidator(response);
  } catch (e) {
    return apiError(e);
  }
};

export const searchEpisodes = async (keyword = "") => {
  try {
    const response = await fetch(`${URL}/episode/?name=${keyword}`, requestOptions);
    return await responseValidator(response);
  } catch (e) {
    return apiError(e);
  }
};
