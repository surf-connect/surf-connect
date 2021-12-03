import { fetch } from 'meteor/fetch';

export const surfData = async () => {
  const response = await fetch('https://api.tidesandcurrents.noaa.gov/api/prod/datagetter?begin_date=20130808 15:00&end_date=20130808 15:06&station=1612340&product=hourly_height&datum=HWI&units=english&time_zone=gmt&application=ports_screen&format=json');
  const toJSON = await response.json();
  console.log(`Object:${JSON.stringify(toJSON)}!!!!!`);
  console.log(`Location: ${toJSON.metadata.name}`);
};
