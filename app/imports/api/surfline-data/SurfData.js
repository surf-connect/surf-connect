import { fetch } from 'meteor/fetch';

export const surfData = async () => {
  const response = await fetch('https://services.surfline.com/kbyg/spots/forecasts/wave?spotId=5842041f4e65fad6a770888d&days=1&intervalHours=24&maxHeights=false&sds=false');
  const toJSON = await response.json();
  console.log(`Object:${JSON.stringify(toJSON)}!!!!!`);
  console.log(`Wave Height: ${toJSON.data.wave[0].surf.min} - ${toJSON.data.wave[0].surf.max}`);
};
