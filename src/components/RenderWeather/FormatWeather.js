import React, {useEffect} from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { storeWeather, isItLoading } from "../../redux/actions";
import { fetchWeather } from "../../Utilities/smhi";
import { RenderWeek } from './RenderWeek';

const formatData = (data) => {
    const weatherObject = {};
    for (let i = 0; i < data.length; i++) {
      weatherObject[data[i].name] = data[i];
    }
    return weatherObject;
  };

export const FormatWeather = () => {
    const dispatch = useDispatch();
    const isLoading = useSelector(state => state.isLoading);
    const weatherData = useSelector(state => state.weatherData);
    const selectedDay = useSelector(state => state.selectedDay);
    const selectedLocation = useSelector((state) => state.selectedLocation);
    
    useEffect(() => {
        if(!selectedLocation) return;
        dispatch(isItLoading(true));
        fetchWeather(selectedLocation.lon, selectedLocation.lat).then((response) => {
          dispatch(isItLoading(false));
          const tempData = response;
          const sortedData = {};
          if (tempData === 'error') return;
          for (let i = 0; i < tempData.timeSeries.length; i++) {
            const value = {
              validTime: tempData.timeSeries[i].validTime,
              parameters: formatData(tempData.timeSeries[i]["parameters"]),
            };
            const date = value.validTime.slice(0, value.validTime.indexOf("T"));
            if (sortedData[date]) {
              sortedData[date].push(value);
            } else {
              sortedData[date] = [value];
            }
          }
          tempData.futureData = sortedData;
          dispatch(storeWeather(tempData.futureData));
        });
        
      }, [selectedLocation, dispatch]);

      const renderComponent = () => {
        if (isLoading || !selectedLocation) return <Text>Loading...</Text>;
        return (
          <>
            {selectedDay === "today" && (
              <Text>VÄDER IDAG COMING SOON</Text>
            )}
            {selectedDay === "forecast" && (
              <RenderWeek weatherData={weatherData} />
            )}
          </>
        );
      };

      if(!selectedLocation) return (
        <View style={{
            marginTop: 25, 
            marginBottom: 25,
            
            }}>
        <Text style={{fontFamily: 'Baskerville', fontSize: 30, textAlign: 'center', marginBottom: 10}}>Local Winds</Text>
        <Text style={{textAlign: 'center'}}>Var god sök på valfri ort i sökrutan</Text>
        <Text style={{textAlign: 'center', marginBottom: 550}}>(inom Sverige)</Text>
        </View>
      );

    return(
        <View>
            <Text style={{marginTop: 16, textAlign: 'center', fontSize: 18, color: '#070502'}}>
                Väderprognos för {selectedLocation && selectedLocation.location.slice(0, selectedLocation.location.indexOf(','))} {selectedDay === 'forecast' ? <Text>den här veckan</Text> : <Text>idag</Text>}</Text>
                {renderComponent()}
        </View>
    )
}