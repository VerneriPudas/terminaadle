import axios from "axios";

export async function fetchImage() {
  return axios
    .get("/api/generate-image")
    .then((resp) => {
      return resp.data;
    })
    .catch((err) => {
      console.error("Something went wrong with fetching image", err);
      throw err;
    });
}
