import { fetch } from 'meteor/fetch';
import { Locations } from '../location/Location';

/** Calculates the surf ability of a location given the minWaveHeight and maxWaveHeight. */
const calculateAbility = (minWaveHeight, maxWaveHeight) => {
  const averageWaveHeight = (maxWaveHeight + minWaveHeight) / 2;
  // Divides by constant that gives a reasonable indicator of surf ability for the location.
  const ability = Math.floor(averageWaveHeight / 1.3);
  if (ability <= 0) {
    return 1;
  }
  if (ability > 5) {
    return 5;
  }
  return ability;
};

const searchSpot = (waveInfo, spotName) => {
  for (let i = 0; i < waveInfo.length; i++) {
    if (waveInfo[i].beach === spotName) {
      return waveInfo[i];
    }
  }
  return 'NOT FOUND!!!';
};

const getHeightRange = (waveHeight) => {
  const waveHeights = [];
  let minHeight = '';
  let endPoint = '';
  for (let i = 0; i < waveHeight.length; i++) {
    if (waveHeight.charAt(i) === '-') {
      waveHeights.push(parseInt(minHeight, 10));
      endPoint = i;
      break;
    }
    minHeight += waveHeight.charAt(i);
  }

  let maxHeight = '';
  for (let i = endPoint + 1; i < waveHeight.length; i++) {
    if (waveHeight.charAt(i) === ' ') {
      waveHeights.push(parseInt(maxHeight, 10));
      break;
    }
    maxHeight += waveHeight.charAt(i);
  }
  return waveHeights;
};

/** Makes several API calls to the Surfline API to receive wave, tide, tide, and weather data for a spot. */
export const updateSurfData = async (locationName, spotName, spotImage) => {
  // Makes API call to receive wave data for the spot given.
  const waveInfo = await fetch('https://hawaiibeachsafety.com/rest/conditions.json?beach_id=5');
  const waveInfoToJson = await waveInfo.json();
  const locationInfo = searchSpot(waveInfoToJson, spotName);
  const waveHeight = locationInfo.surf;
  const wind = locationInfo.wind;
  const weather = locationInfo.weather;
  const temperature = locationInfo.temp;
  const newHeight = getHeightRange(waveHeight);
  const minWaveHeight = newHeight[0];
  const maxWaveHeight = newHeight[1];
  // Calculates the surf ability of the spot.
  const ability = calculateAbility(minWaveHeight, maxWaveHeight);
  // Creates a location object with the given information.
  const location = {
    name: locationName,
    image: spotImage,
    surf: `${minWaveHeight}-${maxWaveHeight} ft`,
    wind: windSpeed,
    weather: weather,
    temperature: temperature,
    ability: ability,
  };
  // Checks if location is in DB.
  if (Locations.collection.find({ name: location.name }).count() === 0) {
    // Adds locations to DB.
    Locations.collection.insert(location);
  } else {
    // Updates LocationCollection with new data from API.
    Locations.collection.update({ name: spotName }, { $set: location }, (error) => (error ?
      console.log(`Error updating location: ${spotName}`) :
      console.log(`Successfully updated location: ${spotName}`)));
  }
  // Debugging messages on server side.
  console.log(`Inserted location: ${spotName} to DB.`);
  console.log(`Location data: ${JSON.stringify(location)}`);
};
