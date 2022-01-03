import React from 'react';
import {Text, View, Image, Linking} from 'react-native';
import {useState} from 'react';
import moment from 'moment';
import 'moment/locale/sv';

// Wsymb2 values:
// Value	Meaning
// 1	Clear sky
// 2	Nearly clear sky
// 3	Variable cloudiness
// 4	Halfclear sky
// 5	Cloudy sky
// 6	Overcast
// 7	Fog
// 8	Light rain showers
// 9	Moderate rain showers
// 10	Heavy rain showers
// 11	Thunderstorm
// 12	Light sleet showers
// 13	Moderate sleet showers
// 14	Heavy sleet showers
// 15	Light snow showers
// 16	Moderate snow showers
// 17	Heavy snow showers
// 18	Light rain
// 19	Moderate rain
// 20	Heavy rain
// 21	Thunder
// 22	Light sleet
// 23	Moderate sleet
// 24	Heavy sleet
// 25	Light snowfall
// 26	Moderate snowfall
// 27	Heavy snowfall

const TIMES_TO_SHOW = ['00:00', '06:00', '12:00', '18:00'];
const MONTH = [
  'Januari',
  'Februari',
  'Mars',
  'April',
  'Maj',
  'Juni',
  'Juli',
  'Augusti',
  'September',
  'Oktober',
  'November',
  'December',
];
const getMonth = num => MONTH[num- 1];

export const RenderWeek = props => {
  const weather = props.weatherData;
  //Only prints dates that have values for 4 or more timeperiods per day >
  const isValidDate = date => weather[date].length >= 4;
  // Add ".slice(1)" below to remove the todays date form the generated list
  const dates = Object.keys(weather).filter(isValidDate);
  const [expanded, setExpanded] = useState(0);
    

  if (
    !weather ||
    typeof weather !== 'object' ||
    weather.length === 0 ||
    dates.length === 0
  ) {
    return <Text>Loading...</Text>;
  }
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
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,

              elevation: 5,
            }}>
            {/* DATE */}
            <Text
              style={{
                textAlign: 'center',
                margin: 8,
                color: 'white',
                backgroundColor: '#8f614b',
              }}
              onPress={() => {
                setExpanded(expanded === index ? -1 : index);
              }}>
              {/* Add index + 1 if you remove todays date */}
              {moment()
                .add(index, 'days')
                .format('dddd')
                .charAt(0)
                .toUpperCase() +
                moment().add(index, 'days').format('dddd').slice(1)}{' '}
                {index === 0 ? '(idag) ' : null}
              {weatherDate.slice(8)} {getMonth(weatherDate.slice(5, 7))}
              <Text style={{fontSize: 14}}>
                {expanded !== index ? ' ▼' : ' ▲'}
              </Text>
            </Text>

            {weather[weatherDate].map((weatherData, _index) => {
              const time = weatherData.validTime.slice(
                weatherData.validTime.indexOf('T') + 1,
                weatherData.validTime.length - 4,
              );
              const getWeatherSymbol = () => {

                if (weatherData.parameters.Wsymb2.values[0] === 1 || 
                    weatherData.parameters.Wsymb2.values[0] === 2 || 
                    weatherData.parameters.Wsymb2.values[0] === 3 || 
                    weatherData.parameters.Wsymb2.values[0] === 4) {
                    console.log(weatherData.parameters.Wsymb2.values[0] + ' sunny')
                    return (<Image
                        source={require('../../icons/sunny.png')} />);
                } else if (weatherData.parameters.Wsymb2.values[0] === 5 || 
                    weatherData.parameters.Wsymb2.values[0] === 6 || 
                    weatherData.parameters.Wsymb2.values[0] === 7) {
                    console.log(weatherData.parameters.Wsymb2.values[0] + ' cloudy')
                    return (<Image 
                        source={require('../../icons/cloudy.png')} />);
                } else if (weatherData.parameters.Wsymb2.values[0] === 8 || 
                    weatherData.parameters.Wsymb2.values[0] === 9 || 
                    weatherData.parameters.Wsymb2.values[0] === 10 || 
                    weatherData.parameters.Wsymb2.values[0] === 11 || 
                    weatherData.parameters.Wsymb2.values[0] === 18 || 
                    weatherData.parameters.Wsymb2.values[0] === 19 || 
                    weatherData.parameters.Wsymb2.values[0] === 20 || 
                    weatherData.parameters.Wsymb2.values[0] === 21) {
                    console.log(weatherData.parameters.Wsymb2.values[0] + ' lightrain')
                    return (<Image 
                        source={require('../../icons/lightrain.png')} />);
                } else if (weatherData.parameters.Wsymb2.values[0] === 12 || 
                    weatherData.parameters.Wsymb2.values[0] === 13 || 
                    weatherData.parameters.Wsymb2.values[0] === 14 || 
                    weatherData.parameters.Wsymb2.values[0] === 22 || 
                    weatherData.parameters.Wsymb2.values[0] === 23 || 
                    weatherData.parameters.Wsymb2.values[0] === 24) {
                    console.log(weatherData.parameters.Wsymb2.values[0] + ' sleet')
                    return (<Image 
                        source={require('../../icons/sleet.png')} />);
                } else if (weatherData.parameters.Wsymb2.values[0] === 15 || 
                    weatherData.parameters.Wsymb2.values[0] === 16 || 
                    weatherData.parameters.Wsymb2.values[0] === 17 || 
                    weatherData.parameters.Wsymb2.values[0] === 25 || 
                    weatherData.parameters.Wsymb2.values[0] === 26 || 
                    weatherData.parameters.Wsymb2.values[0] === 27) {
                    console.log(weatherData.parameters.Wsymb2.values[0] + ' snowy')
                    return (<Image 
                        source={require('../../icons/snowy.png')} />);
                } else {
                    console.log('error');
                }
            }
              if (TIMES_TO_SHOW.indexOf(time) === -1 && expanded !== index)
                return null;
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
                  <View style={{flexDirection: 'row'}}>
                    <View>
                      <Text style={{marginRight: 16}}>
                        {weatherData.parameters.t.values}°
                      </Text>
                    </View>
                    <View>
                        <Text style={{marginRight: 8}}>
                            {getWeatherSymbol()}
                            {/* {weatherData.parameters.pmax.values} */}

                        </Text>
                    </View>
                    <View style={{width: 110}}>
                      <Text style={{marginRight: 16}}>
                        {weatherData.parameters.ws.values}(
                        {weatherData.parameters.gust.values}) m/s
                        {/* <Image 
                                style={{}}
                                source={require('../../icons/wind.png')} /> */}
                      </Text>
                    </View>
                    <View>
                      <Text
                        style={{
                          transform: [
                            {
                              rotate: `${weatherData.parameters.wd.values}deg scale(-1, -1)`,
                            },
                          ],
                        }}>
                        ↑
                      </Text>
                    </View>
                  </View>
                </View>
              );
            })}
          </View>
        ) : null;
      })}
      <Text style={{ fontSize: 12, marginTop: 50}}>
        Data hämtas från{' '}
        <Text
          style={{color: 'blue'}}
          onPress={() => Linking.openURL('https://smhi.se')}>
          SMHI
        </Text>
      </Text>
    </View>
  );
};
