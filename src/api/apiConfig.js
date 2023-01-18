const apiConfig = {
  baseUrl: "https://api.themoviedb.org/3/",
  apiKey: "4bac6dd388ce19fdd22583a8ac8cc3e2",
  originalImage: (imgPath) => `https://image.tmdb.org/t/p/original/${imgPath}`,
  w500Image: (imgPath) => `https://image.tmdb.org/t/p/w500/${imgPath}`,
};

export default apiConfig;
