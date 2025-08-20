import { useState, useEffect } from 'react';

// The endpoint parameter allows us to use this hook for different API calls
export function useCharacters(endpoint) {
  const [characters, setCharacters] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAllCharacters = async () => {
      setIsLoading(true);
      let characterList = [];
      // Use the provided endpoint, with a fallback to all characters
      let nextUrl = `https://hp-api.onrender.com/api/characters${endpoint}`;

      // The old API used pagination, the new one doesn't, so we simplify.
      try {
        const response = await fetch(nextUrl);
        const data = await response.json();
        // We now filter for images inside the component, not in the hook
        characterList = data; 
      } catch (error) {
        console.error(`Failed to fetch from ${endpoint}:`, error);
      }
      
      setCharacters(characterList);
      setIsLoading(false);
    };

    fetchAllCharacters();
  }, [endpoint]); // Re-run the fetch if the endpoint changes

  return { characters, isLoading };
}