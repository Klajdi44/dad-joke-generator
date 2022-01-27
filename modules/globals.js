import fetch from "node-fetch";

export const fetchJoke = async url => {
  try {
    const request = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });
    const data = await request.json();
    if (!request.ok) {
      throw new Error("Couldn't get joke");
    }
    return {
      data,
      error: null,
    };
  } catch (error) {
    return {
      data: null,
      error: error.message,
    };
  }
};

export const sleep = async ms => new Promise((res, rej) => setTimeout(res, ms));
