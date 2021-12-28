export const selectDay = (selectedDay) => {
    return {
      type: "SELECT_DAY",
      payload: selectedDay,
    };
  };
  export const selectLocation = (selectedLocation) => {
    return {
      type: "SELECT_LOCATION",
      payload: selectedLocation,
    };
  };
  export const storeWeather = (fetchedWeather) => {
    return {
      type: "STORE_WEATHER",
      payload: fetchedWeather,
    };
  };
  export const isItLoading = (bool) => {
    return {
      type: "IS_LOADING",
      payload: bool,
    };
  };
  export const setSearchTerm = (searchTerm) => {
    return {
      type: "SEARCH_TERM",
      payload: searchTerm,
    };
  };
  export const updateLocations = (locations) => {
    return {
      type: "UPDATE_LOCATIONS",
      payload: locations,
    };
  }