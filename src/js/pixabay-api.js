import axios from "axios";

const BASE_URL = "https://pixabay.com/api/";
axios.defaults.baseURL = BASE_URL;

const loader = document.querySelector('.loader');

export async function fetchRequest(queryValue, page = 1, per_page = 15) {

  if (!queryValue) {
    return [] ;
  }

  loader.classList.remove('hidden');

  const searchParams = new URLSearchParams({
    key: "45116727-e543bef81ffe857c5144581e6",
    q: queryValue,
    image_type: "photo",
    orientation: "horizontal",
    safesearch: true,
    page,
    per_page
  });


  try {
    const response = await axios.get(`?${searchParams}`);
    return response.data;
  } catch (error) {
    console.log(error);
  } finally {
    loader.classList.add('hidden');
  }
}


