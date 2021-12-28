import React from 'react';
import {Text, View, Image} from 'react-native';
import { useState } from 'react';
import { ExpandData } from './ExpandData';

const TIMES_TO_SHOW = ['00:00', '06:00', '12:00', '18:00'];

export const RenderWeek = props => {
  const weather = props.weatherData;
  const isValidDate = date => weather[date].length >= 4;
  const dates = Object.keys(weather).slice(1).filter(isValidDate);
  const [expanded, setExpanded] = useState(false);  

  const expandData = () => {
      setExpanded(!expanded)
  }  

  if (
    !weather ||
    typeof weather !== 'object' ||
    weather.length === 0 ||
    dates.length === 0
  ) {return <Text>Loading...</Text>;}
  return (
    <View style={{alignItems: 'center', marginBottom: 64}}>
      {dates.map((weatherDate, index) => {
        return weather[weatherDate] && weather[weatherDate].length !== 0 ? (
          <View
          key={index} 
          style={{
            backgroundColor: '#decbb1',
            width: '80%',
            borderRadius: 3,
            marginTop: 20,
            marginBottom: 10,
            paddingBottom: 8,
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,

            elevation: 5,
            }}>
              {/* DATE */}
            <Text style={{
                textAlign: 'center',
                margin: 8,
                color: 'white',
                backgroundColor: '#8f614b',
                }}
                onPress={() => expandData()}
                >{weatherDate}  <Text style={{fontSize: 14}}>{expanded === false ? "▼" : "▲"}</Text></Text>

                {weather[weatherDate].map((weatherData, _index) => {
                const time = weatherData.validTime.slice(
                    weatherData.validTime.indexOf('T') + 1,
                    weatherData.validTime.length - 4,
                    );
              if (TIMES_TO_SHOW.indexOf(time) === -1 && expanded === false) return null;
            //   TIME AND VALUES
            return (
              <View 
                key={_index}
              style={{
                  flexDirection: 'row',
                  marginBottom: 5,
                  marginLeft: 16,
                  marginRight: 16,
                  paddingBottom: 2,
                  justifyContent: 'space-between',
                  borderBottomWidth: 1,
                  borderColor: '#b69b7d',
                  }}>
                <View>
                    <Text>{time}</Text>
                </View>
                <View style={{flexDirection: 'row',}}>

                    <View>
                        <Text style={{marginRight: 16,}}>
                            {/* <Image 
                                style={{}}
                                source={require('../../icons/temp.png')} /> */}
                        {weatherData.parameters.t.values}°</Text>
                    </View>
                    <View style={{width: 110}}>
                        <Text style={{marginRight: 16,}}>{weatherData.parameters.ws.values}
                        ({weatherData.parameters.gust.values}) m/s</Text>
                    </View>
                    <View>
                        <Text style={{
                                    transform: [{ rotate: `${weatherData.parameters.wd.values}deg scale(-1, -1)` }]
                                }}>↑</Text>
                    </View>
                </View>
              </View>  
              );
            })}
          </View>
        ) : null;
      })}
    </View>
  );
};
