export const fetchUnsplashImage = async (query: string) => {
  const accessKey = process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY;

  if (!accessKey) {
    throw new Error("Unsplash API key is missing.");
  }

  const response = await fetch(
    `https://api.unsplash.com/photos/random?query=${encodeURIComponent(
      query
    )}&client_id=${accessKey}&count=1`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch image from Unsplash.");
  }

  const data = await response.json();
  return data[0]?.urls?.regular || null;
};
