import { useRef, useState, useCallback, useEffect } from 'react';

import Places from './components/Places.jsx';
import Modal from './components/Modal.jsx';
import DeleteConfirmation from './components/DeleteConfirmation.jsx';
import logoImg from './assets/logo.png';
import AvailablePlaces from './components/AvailablePlaces.jsx';
import { fetchUserPlaces, updateUserPlaces } from './http.js';
import Error from './components/Error.jsx';

function App() {
  const selectedPlace = useRef();

  const [userPlaces, setUserPlaces] = useState([]);

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const [errorUpdateingPlaces, setErrorUpdateingPlaces] = useState();

  const [isFethching, setIsFetching] = useState(false);

  const [error, setError] = useState();

useEffect(() => {
  async function fetchPlaces(){
    setIsFetching(true);
    try {
      const userPlace = await fetchUserPlaces();
      setUserPlaces(userPlace);
    } catch (error) {
      setError ({message:error.message || "加載失敗，請稍後再嘗試"});
      
    }
    setIsFetching(false);
  }
    fetchPlaces();
},[]);

  function handleStartRemovePlace(place) {
    setModalIsOpen(true);
    selectedPlace.current = place;
  }

  function handleStopRemovePlace() {
    setModalIsOpen(false);
  }

  async function handleSelectPlace(selectedPlace) {

    setUserPlaces((prevPickedPlaces) => {
      if (!prevPickedPlaces) {
        prevPickedPlaces = [];
      }
      if (prevPickedPlaces.some((place) => place.id === selectedPlace.id)) {
        return prevPickedPlaces;
      }
      return [selectedPlace, ...prevPickedPlaces];
    });
    
    try {
      await updateUserPlaces([selectedPlace, ...userPlaces]);
    } catch (error) {
      setUserPlaces(userPlaces);
      setErrorUpdateingPlaces({message: error.message || "Faild to fecth user places"});
    }
  };

  const handleRemovePlace = useCallback(async function handleRemovePlace() {
    setUserPlaces((prevPickedPlaces) =>
      prevPickedPlaces.filter((place) => place.id !== selectedPlace.current.id)
    );

    try { await updateUserPlaces(
      userPlaces.filter((place) => place.id !== selectedPlace.current.id)
    )} catch (error) {
      setUserPlaces(userPlaces);
      setErrorUpdateingPlaces({message: error.message || "Faild to remove place"});
    }

    setModalIsOpen(false);
  }, [userPlaces]);

  const handleError = () => {
    setErrorUpdateingPlaces(null);
  }

  return (
    <>
      <Modal open={errorUpdateingPlaces} onClose={handleError}>
     {errorUpdateingPlaces &&(
       <Error title="An error occurred" 
              onConfirm={handleError}
              message={errorUpdateingPlaces.message}/>
     )}
      </Modal>

      <Modal open={modalIsOpen} onClose={handleStopRemovePlace}>
        <DeleteConfirmation
          onCancel={handleStopRemovePlace}
          onConfirm={handleRemovePlace}
        />
      </Modal>

      <header>
        <img src={logoImg} alt="Stylized globe" />
        <h1>PlacePicker</h1>
        <p>
          Create your personal collection of places you would like to visit or
          you have visited.
        </p>
      </header>
      {error && <Error title="An Error occurred" message={error.message} />}
      <main>
       {!error &&(
        <Places
          title="I'd like to visit ..."
          fallbackText="Select the places you would like to visit below."
          places={userPlaces}
          onSelectPlace={handleStartRemovePlace}
          isLoading={isFethching}
          loadingText="Loading..."
        />
       )}

        <AvailablePlaces onSelectPlace={handleSelectPlace} />
      </main>
    </>
  );
}

export default App;
