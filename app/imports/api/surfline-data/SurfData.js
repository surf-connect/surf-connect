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

/** Makes several API calls to the Surfline API to receive wave, tide, tide, and weather data for a spot. */
export const surfData = async (spotId, spotName, spotImage) => {
  // Makes API call to receive wave data for the spot given.
  const waveInfo = await fetch(`https://services.surfline.com/kbyg/spots/forecasts/wave?spotId=${spotId}&days=1&intervalHours=24&maxHeights=false&sds=false`);
  const waveInfoToJson = await waveInfo.json();
  const minWaveHeight = Math.ceil(waveInfoToJson.data.wave[0].surf.min);
  const maxWaveHeight = Math.ceil(waveInfoToJson.data.wave[0].surf.max);
  const swellHeight = waveInfoToJson.data.wave[0].swells[0].height;
  // Makes API call to receive wind data for the spot given.
  const windInfo = await fetch(`https://services.surfline.com/kbyg/spots/forecasts/wind?spotId=${spotId}&days=1&intervalHours=24&maxHeights=false&sds=false`);
  const windInfoToJson = await windInfo.json();
  const windSpeed = windInfoToJson.data.wind[0].speed;
  // Makes API call to receive tide data for the spot given.
  const tideInfo = await fetch(`https://services.surfline.com/kbyg/spots/forecasts/tides?spotId=${spotId}&days=1&intervalHours=24&maxHeights=false&sds=false`);
  const tideInfoToJson = await tideInfo.json();
  const tide = tideInfoToJson.data.tides[0].height;
  // Makes API call to receive weather data for the spot given.
  const weatherInfo = await fetch(`https://services.surfline.com/kbyg/spots/forecasts/weather?spotId=${spotId}&days=1&intervalHours=24&maxHeights=false&sds=false`);
  const weatherInfoToJson = await weatherInfo.json();
  const temp = Math.floor(weatherInfoToJson.data.weather[0].temperature);
  // Calculates the surf ability of the spot.
  const ability = calculateAbility(minWaveHeight, maxWaveHeight);
  // Creates a location object with the given information.
  const location = {
    name: spotName,
    image: spotImage,
    surf: `${minWaveHeight}-${maxWaveHeight} ft`,
    tide: tide,
    wind: windSpeed,
    swells: swellHeight,
    weather: temp,
    ability: ability,
  };
  // Checks if DB is empty.
  if (Locations.collection.find({}).count() === 0) {
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
