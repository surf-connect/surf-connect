import { fetch } from 'meteor/fetch';

export const surfData = async (spotId, spotName) => {
  const response = await fetch(`https://services.surfline.com/kbyg/spots/forecasts/wave?spotId=${spotId}&days=1&intervalHours=24&maxHeights=false&sds=false`);
  const toJSON = await response.json();
  const minWaveHeight = Math.floor(toJSON.data.wave[0].surf.min);
  const maxWaveHeight = Math.floor(toJSON.data.wave[0].surf.max);
  console.log(`${spotName}: ${minWaveHeight}-${maxWaveHeight} ft`);
};
