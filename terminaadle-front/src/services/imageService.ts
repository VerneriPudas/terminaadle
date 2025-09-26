import axios from "axios";
import type { ServerData } from "../types/data";

export async function fetchImage(): Promise<ServerData> {
  return axios
    .get("/api/generate-image")
    .then((resp) => {
      return resp.data as ServerData;
    })
    .catch((err) => {
      console.error("Something went wrong with fetching image", err);
      throw err;
    });
}
