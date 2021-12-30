import React from 'react';
import {View, TextInput} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {setSearchTerm} from '../../redux/actions';
import { fetchLocations } from '../../Utilities/smhi';
import { updateLocations } from '../../redux/actions'; 


export const SearchBar = () => {
  const dispatch = useDispatch();
  const searchTerm = useSelector((state) => state.searchTerm);

  let weatherLocations = [];

  const renderSearchList = (response) => {
    if (response) {
      return response.map((responseItem, index) => {
        return responseItem.country === "Sverige"
          ? weatherLocations.push({
              id: index,
              location: `${responseItem.place}, ${responseItem.county}`,
              lon: Math.round(responseItem.lon * 100) / 100,
              lat: Math.round(responseItem.lat * 100) / 100,
            })
          : null;
      });
    }
    return;
  };

  const onSearch = (text) => {
    dispatch(setSearchTerm(text));
    fetchLocations(text).then((response) => {
        renderSearchList(response);
        dispatch(updateLocations(weatherLocations));
      });
  } 

  return (
    <View
      style={{
        flex: 3,
      }}>
      <View style={{flex: 1}}></View>
        <TextInput  
          onChangeText={onSearch}
          value={searchTerm}
          style={{
          paddingLeft: 15,    
          borderRadius: 2,
          borderWidth: 1,
          borderColor: '#382a1d',    
          flex: 6,    
          backgroundColor: 'white'}}
          placeholder="Sök och välj ort"
          placeholderTextColor="gray"
        />
      <View style={{flex: 1}}></View>
    </View>
  );
};
