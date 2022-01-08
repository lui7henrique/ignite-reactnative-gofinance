import axios from "axios";

export const oauth = axios.create({
  baseURL: "https://www.googleapis.com/oauth2/v1",
  params: {
    alt: "json",
  },
});
