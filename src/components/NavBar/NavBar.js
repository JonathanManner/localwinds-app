import React from 'react';
import {View} from 'react-native';
import {SearchBar} from '../SearchBar/SearchBar';

export const NavBar = () => {
  return (
    <View style={{
        height: 70, 
        backgroundColor: '#8f614b', 
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: '#382a1d',
        }}>
      <View style={{flex: 1}}>
        
      </View>
        {/* has flex: 3 */}
        <SearchBar />
      <View style={{flex: 1}}>

      </View>
    </View>
  );
};
