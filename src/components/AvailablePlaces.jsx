import { useState, useEffect } from 'react';
import Places from './Places.jsx';
import Error from './Error.jsx';
import { sortPlacesByDistance } from '../loc.js';
import { fetchAvailablePlaces } from '../http.js';

export default function AvailablePlaces({ onSelectPlace }) {
  const [isFetching, setIsFetching] = useState(false);
  const [availablePlace, setAvailablePlace] = useState([]);
  const [error, setError] = useState();

  useEffect(() => {
    async function fetchPlaces() {
      setIsFetching(true);

      try {
        const places = await fetchAvailablePlaces();
        navigator.geolocation.getCurrentPosition((position) => {
          const sortedPlaces = sortPlacesByDistance(
            places,
            position.coords.latitude,
            position.coords.longitude
          );
          setAvailablePlace(sortedPlaces);
          setIsFetching(false);
        });

      } catch (error) {
        setError({ message: error.message || 'Tidak dapat load data untuk saat ini, coba lagi nanti' });
        setIsFetching(false);
      }


    }
    fetchPlaces();
  }, []);

  if (error) {
    return <Error title="Terjadi kesalahan saat load data!" msg={error.message} />;
  }

  return (
    <Places
      title="Available Places"
      places={availablePlace}
      isLoading={isFetching}
      loadingText="Loading data..."
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
