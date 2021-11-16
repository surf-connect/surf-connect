import React from 'react';
import { Table, Image, Header } from 'semantic-ui-react';

export default class Forecast extends React.Component {

  forecastData = [
    {
      name: 'Sunset Beach',
      image: 'https://hioceansafety.com/wp-content/uploads/2018/11/Hawaii’s-Surf-Seasons.jpg',
      surf: '6-10',
      tide: '0.2',
      wind: '2 NNW',
      swells: '-',
      wTemp: '-',
      weather: '-',
    },
    {
      name: 'Mokuleia',
      image: 'https://hioceansafety.com/wp-content/uploads/2018/11/Hawaii’s-Surf-Seasons.jpg',
      surf: '5-8',
      tide: '0.2',
      wind: '8 SSW',
      swells: '-',
      wTemp: '-',
      weather: '-',
    },
    {
      name: 'Laniakea',
      image: 'https://hioceansafety.com/wp-content/uploads/2018/11/Hawaii’s-Surf-Seasons.jpg',
      surf: '5-8',
      tide: '0.2',
      wind: '3 SSW',
      swells: '-',
      wTemp: '-',
      weather: '-',
    },
    {
      name: 'Pipeline',
      image: 'https://hioceansafety.com/wp-content/uploads/2018/11/Hawaii’s-Surf-Seasons.jpg',
      surf: '6-8',
      tide: '0.2',
      wind: '2 NNW',
      swells: '-',
      wTemp: '-',
      weather: '-',
    },
    {
      name: 'Haleiwa',
      image: 'https://hioceansafety.com/wp-content/uploads/2018/11/Hawaii’s-Surf-Seasons.jpg',
      surf: '4-6',
      tide: '0.2',
      wind: '3 SSW',
      swells: '-',
      wTemp: '-',
      weather: '-',
    },
    {
      name: 'Waimea Bay',
      image: 'https://hioceansafety.com/wp-content/uploads/2018/11/Hawaii’s-Surf-Seasons.jpg',
      surf: '6-8',
      tide: '0.2',
      wind: '2 NNW',
      swells: '-',
      wTemp: '-',
      weather: '-',
    },
    {
      name: 'Barbers Point',
      image: 'https://hioceansafety.com/wp-content/uploads/2018/11/Hawaii’s-Surf-Seasons.jpg',
      surf: '2-3',
      tide: '0.9',
      wind: '8 SSE',
      swells: '-',
      wTemp: '-',
      weather: '-',
    },
    {
      name: 'Sand Island',
      image: 'https://hioceansafety.com/wp-content/uploads/2018/11/Hawaii’s-Surf-Seasons.jpg',
      surf: '2-3',
      tide: '0.8',
      wind: '9 S',
      swells: '-',
      wTemp: '-',
      weather: '-',
    },
  ]

  render() {
    return (
      <Table fixed>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell/>
            <Table.HeaderCell>Location</Table.HeaderCell>
            <Table.HeaderCell>Surf Height</Table.HeaderCell>
            <Table.HeaderCell>Tide</Table.HeaderCell>
            <Table.HeaderCell>Wind</Table.HeaderCell>
            <Table.HeaderCell>Swells</Table.HeaderCell>
            <Table.HeaderCell>Water Temp</Table.HeaderCell>
            <Table.HeaderCell>Weather</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {this.forecastData.map(location => <Table.Row key={location.name}>
            <Table.Cell><Image src={location.image} size='small'/></Table.Cell>
            <Table.Cell><Header as='h2'>{location.name}</Header></Table.Cell>
            <Table.Cell>{location.surf}</Table.Cell>
            <Table.Cell>{location.tide}</Table.Cell>
            <Table.Cell>{location.wind}</Table.Cell>
            <Table.Cell>{location.swells}</Table.Cell>
            <Table.Cell>{location.wTemp}</Table.Cell>
            <Table.Cell>{location.weather}</Table.Cell>
          </Table.Row>)}
        </Table.Body>
      </Table>
    );
  }
}
