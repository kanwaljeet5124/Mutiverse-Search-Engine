import { responseValidator, apiError, URL } from "../helper";

const requestOptions = {
  method: "GET",
  headers: new Headers(),
  redirect: "follow",
};

export const searchCharacters = async (keyword = "", page=1) => {
  try {
    const response = await fetch(`${URL}/character/?name=${keyword}&page=${page}`, requestOptions);
    const res = await responseValidator(response);
    return {
      status: true,
      data: res.results ?? res,
      info: res.info || {},
    };
  } catch (e) {
    return apiError(e);
  }
};

export const searchLocation = async (keyword = "", page=1) => {
  try {
    const response = await fetch(`${URL}/location/?name=${keyword}&page=${page}`, requestOptions);
    const res = await responseValidator(response);
    return {
      status: true,
      data: res.results ?? res,
      info: res.info || {},
    };
  } catch (e) {
    return apiError(e);
  }
};

export const searchEpisodes = async (keyword = "", page=1) => {
  try {
    const response = await fetch(`${URL}/episode/?name=${keyword}&page=${page}`, requestOptions);
    const res = await responseValidator(response);
    return {
      status: true,
      data: res.results ?? res,
      info: res.info || {},
    };
  } catch (e) {
    return apiError(e);
  }
};

export const searchSingleCharacter = async (id) => {
  try {
    const response = await fetch(`${URL}/character/${id}`, requestOptions);
    const res = await responseValidator(response);
    return {
      status: true,
      data: res
    };
  } catch (e) {
    return apiError(e);
  }
};