import Places from './Places.jsx';
import Error from './Error.jsx';
import { sortPlacesByDistance } from '../loc.js';
import { fetchAvailablePlaces } from '../http.js';
import { useFetch } from '../hooks/useFetch.js';

async function fetchShortedPlaces() {
  const places = await fetchAvailablePlaces();

  //useFetch 期望fetch函數產生一個promise
  //  useFetch.js這裡 try {
  //  const data = await『 fetchFn();』
  //一但值存在就調用resolve顯示排序
  return new Promise((resolve) => {
    navigator.geolocation.getCurrentPosition((position) => {
      const sortedPlaces = sortPlacesByDistance(
        places,
        position.coords.latitude,
        position.coords.longitude
      );
    resolve(sortedPlaces);
    });
  })
}

export default function AvailablePlaces({ onSelectPlace }) {

  const {
    isFetching, 
    error ,
    fetchedData: availablePlaces,
   } = useFetch( fetchShortedPlaces ,[]);

  if (error) {
    return <Error title="An error occurred!" message={error.message} />;
  }

  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      isLoading={isFetching}
      loadingText="Fetching place data..."
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
