import { fetch } from 'meteor/fetch';
import { Locations } from '../location/Location';

const calculateAbility = (minWaveHeight, maxWaveHeight) => {
  const averageWaveHeight = (maxWaveHeight + minWaveHeight)/2;
  const ability = Math.floor(averageWaveHeight / 1.3);
  if (ability <= 0) {
    return 1;
  } else if (ability > 5) {
    return 5;
  }
  return ability;
};


export const surfData = async (spotId, spotName, spotImage) => {
  const waveInfo = await fetch(`https://services.surfline.com/kbyg/spots/forecasts/wave?spotId=${spotId}&days=1&intervalHours=24&maxHeights=false&sds=false`);
  const waveInfoToJson = await waveInfo.json();
  const minWaveHeight = Math.floor(waveInfoToJson.data.wave[0].surf.min);
  const maxWaveHeight = Math.floor(waveInfoToJson.data.wave[0].surf.max);
  const swellHeight = waveInfoToJson.data.wave[0].swells[0].height;

  const windInfo = await fetch(`https://services.surfline.com/kbyg/spots/forecasts/wind?spotId=${spotId}&days=1&intervalHours=24&maxHeights=false&sds=false`);
  const windInfoToJson = await windInfo.json();
  const windSpeed = windInfoToJson.data.wind[0].speed;

  const tideInfo = await fetch(`https://services.surfline.com/kbyg/spots/forecasts/tides?spotId=${spotId}&days=1&intervalHours=24&maxHeights=false&sds=false`);
  const tideInfoToJson = await tideInfo.json();
  const tide = tideInfoToJson.data.tides[0].height;

  const weatherInfo = await fetch(`https://services.surfline.com/kbyg/spots/forecasts/weather?spotId=${spotId}&days=1&intervalHours=24&maxHeights=false&sds=false`);
  const weatherInfoToJson = await weatherInfo.json();
  const temp = weatherInfoToJson.data.weather[0].temperature;

  const ability = calculateAbility(minWaveHeight, maxWaveHeight);

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
  console.log(JSON.stringify(location));
  Locations.collection.insert(location);
  console.log(`Inserted location: ${spotName} to DB.`);
  console.log(`Location data: ${JSON.stringify(location)}`);
  // console.log(`${spotName}: ${minWaveHeight}-${maxWaveHeight} ft`);
};
