import axios from "axios";

const UNSPLASH_ACCESS_KEY = "ClrHUx-6bjfvJep5C1aOdIIHfcSBmNFMDO9o3gIkW9g";

const fetchRandomVacationImage = async () => {
  try {
    const response = await axios.get("https://api.unsplash.com/photos/random", {
      params: {
        query: "vacation",
        count: 1,
      },
      headers: {
        Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`,
      },
    });

    return response.data[0]?.urls?.small;
  } catch (error) {
    console.error("Error fetching random vacation image from Unsplash:", error);
    throw error;
  }
};

export default fetchRandomVacationImage;
