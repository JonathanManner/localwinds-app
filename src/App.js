import React from 'react';
import {SafeAreaView, ScrollView, Text, View} from 'react-native';
import { DropDownItem } from './components/SearchBar/DropDownItem';
import { NavBar } from './components/NavBar/NavBar';
import { useSelector } from 'react-redux';
import { FormatWeather } from './components/RenderWeather/FormatWeather';

// Black: #070502 | Mocha: #382a1d | Caramel: #8f614b | Heavy Cream: #b69b7d | Whip: #decbb1

const App = () => {
   const searchTerm = useSelector((state) => state.searchTerm);
   const locations = useSelector((state) => state.locations);

    const filteredItems = locations.filter((location) =>
        location.location.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
      <SafeAreaView style={{backgroundColor: '#070502'}}>
      <View style={{height: '100%'}}>
          <NavBar />
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={{flex: 1, height: '100%'}}>
            <View
              style={{
                backgroundColor: '#b69b7d',
                height: '100%',
              }}>
              <FormatWeather />
            </View>
          </ScrollView>
          {searchTerm ? <View style={{position: 'absolute', marginTop: 70, width: '100%'}}>
            
              
            {filteredItems.map((location, index) => {
              return(
                <View key={index} style={{flexDirection: 'row'}}>
            <View style={{flex: 1}}></View>
            {/* has flex: 3 */}
            <DropDownItem
              location={location} />
            <View style={{flex: 1}}></View>
            </View>
              )
            })}
            </View> : null}
        </View>
      </SafeAreaView>
  );
};

export default App;
