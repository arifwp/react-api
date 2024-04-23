import { useState, useEffect } from 'react';
import Places from './Places.jsx';
import Error from './Error.jsx';

export default function AvailablePlaces({ onSelectPlace }) {
  const [isFetching, setIsFetching] = useState(false);
  const [availablePlace, setAvailablePlace] = useState([]);
  const [error, setError] = useState();

  useEffect(() => {
    async function fetchPlaces() {
      setIsFetching(true);

      try {
        const response = await fetch('http://localhost:3000/places');
        const resData = await response.json();

        if (!response.ok) {
          throw new Error('Failed to load data');
        }

        setAvailablePlace(resData.places)
      } catch (error) {
        setError({ message: error.message || 'Tidak dapat load data untuk saat ini, coba lagi nanti' });
      }

      setIsFetching(false);
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
