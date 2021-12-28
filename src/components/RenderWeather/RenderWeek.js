import React from 'react';
import {Text, View, Image, Linking} from 'react-native';
import {useState} from 'react';
import moment from 'moment';
import 'moment/locale/sv';

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
  const [expanded, setExpanded] = useState(-1);

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
                        {/* <Image 
                                style={{}}
                                source={require('../../icons/temp.png')} /> */}
                        {weatherData.parameters.t.values}°
                      </Text>
                    </View>
                    <View style={{width: 110}}>
                      <Text style={{marginRight: 16}}>
                        {weatherData.parameters.ws.values}(
                        {weatherData.parameters.gust.values}) m/s
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
