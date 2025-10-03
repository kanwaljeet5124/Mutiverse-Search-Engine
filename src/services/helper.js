export const URL = "https://rickandmortyapi.com/api";

export const responseValidator = async (response) => {
  const res = await response.json().catch(() => ({}));

  if (response.ok) {
    return {
      status: true,
      data: res.results ?? res,
      info: res.info || {},
    };
  }

  if (response.status === 401) {
    throw new Error("You are not logged in. Please login for accessing this section.");
  }
  else if (response.status === 413) {
    throw new Error("The file you tried to upload is too large.");
  }
  else if (response.status === 404) {
    throw new Error("Wrong input or resource not found.");
  }
  else if (response.status >= 400 && response.status < 500) {
    throw new Error(res?.message || res?.error || "Client side error occurred.");
  }
  else if (response.status >= 500) {
    throw new Error(res?.message || "Encountered server error.");
  }

  throw new Error("Something went wrong.");
};

export const apiError = (e) => {
  return { status: false, message: e.message || "Network error: please refresh the page." };
};
