import React from 'react';
import {Text, View} from 'react-native';
import {useDispatch} from 'react-redux';
import { selectLocation, setSearchTerm } from '../../redux/actions';

export const DropDownItem = (props) => {
    const location = props.location;
    const dispatch = useDispatch();

    const onLocationSelect = () => {
        dispatch(selectLocation(props.location));
        dispatch(setSearchTerm(''));
    }

  return (
    <View style={{
        borderBottomWidth: 1,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderRadius: 1,
        flex: 3,
    }}>  
    <Text
        onPress={onLocationSelect}
        style={{
            padding: 5,  
            borderColor: 'black', 
            backgroundColor: '#decbb1'}}>
      {location.location}
    </Text>
    </View>
  );
};
