import { useState, useEffect } from 'react';

interface Place {
  id: string;
  name: string;
  description: string;
  lat: number;
  lng: number;
  date: {
    from: Date;
    to: Date;
  };
}

interface PlaceSuggestionsResult {
  filteredPlaces: Place[];
  showSuggestions: boolean;
  setShowSuggestions: (show: boolean) => void;
  selectPlace: (place: Place) => void;
}

export const usePlaceSuggestions = (
  places: Place[],
  inputValue: string,
  onSelect: (place: Place) => void
): PlaceSuggestionsResult => {
  const [filteredPlaces, setFilteredPlaces] = useState<Place[]>([]);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);

  useEffect(() => {
    if (!inputValue.trim()) {
      setFilteredPlaces([]);
      setShowSuggestions(false);
      return;
    }

    // 过滤去过的地方，显示匹配的地点提示
    const filtered = places.filter(place => 
      place.name.toLowerCase().includes(inputValue.toLowerCase())
    );
    setFilteredPlaces(filtered);
    setShowSuggestions(filtered.length > 0);
  }, [inputValue, places]);

  const selectPlace = (place: Place) => {
    onSelect(place);
    setFilteredPlaces([]);
    setShowSuggestions(false);
  };

  return {
    filteredPlaces,
    showSuggestions,
    setShowSuggestions,
    selectPlace
  };
};
