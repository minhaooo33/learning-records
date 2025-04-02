import Places from './Places.jsx';
import Error from "./Error.jsx"
import { useState ,useEffect} from 'react';
import { sortPlacesByDistance } from '../loc.js';
import { fetchAvailbalePlaces } from '../http.js'

export default function AvailablePlaces({ onSelectPlace }) {
const [isFethching, setIsFetching] = useState(false)
const [availablePlaces, setAvailablePlaces] = useState([]);
const [error, setError] = useState();

useEffect(() => {
  async function fetchPlaces(){
    setIsFetching(true);

    try {
    const places = await fetchAvailbalePlaces();

    navigator.geolocation.getCurrentPosition((position) => {
      const sortedPlaces = sortPlacesByDistance(
        places 
        ,position.coords.latitude 
        ,position.coords.longitude
      );
      setAvailablePlaces(sortedPlaces);
      setIsFetching(false);
    });

    } catch (error) {
      setError ({message:error.message || "Faild to fecth , please try again later"});
      setIsFetching(false);
    }
  };

  fetchPlaces()
},[])
//要用useEffect setAvailablePlaces(resData) 會導致 
// 組件重新渲染，使 fetch() 無限執行。

if(error){
  return <Error title="An Error occurred!" message={error.message} />
}

  return (
    <Places
      title="places available."
      isLoading={isFethching}
      loadingText="Fetching place data..."
      places={availablePlaces}
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
