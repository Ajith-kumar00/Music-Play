import { Song } from '../types/song';

export const fetchSongs = async (query: string = "love"): Promise<Song[]> => {
  try {
    const response = await fetch(
      `https://itunes.apple.com/search?term=${query}&entity=song&limit=30`
    );
    if (!response.ok) {
      console.log("API Error:", response.statusText);
      return [];
    }

    const data = await response.json();
    return data.results as Song[];

  } catch (error) {
    console.log("Fetch Error:", error);
    return [];
  }
};
