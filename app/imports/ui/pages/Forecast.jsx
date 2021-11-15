import React from 'react';
import { Table, Image, Header } from 'semantic-ui-react';

export default class User extends React.Component {

  forecastData = [
    {
      name: 'Sunset Beach',
      image: 'https://hioceansafety.com/wp-content/uploads/2018/11/Hawaii’s-Surf-Seasons.jpg',
      surf: '6-10',
      tide: '0.2',
      wind: '2 NNW',
    },
    {
      name: 'Mokuleia',
      image: 'https://hioceansafety.com/wp-content/uploads/2018/11/Hawaii’s-Surf-Seasons.jpg',
      surf: '5-8',
      tide: '0.2',
      wind: '8 SSW',
    },
    {
      name: 'Laniakea',
      image: 'https://hioceansafety.com/wp-content/uploads/2018/11/Hawaii’s-Surf-Seasons.jpg',
      surf: '5-8',
      tide: '0.2',
      wind: '3 SSW',
    },
    {
      name: 'Pipeline',
      image: 'https://hioceansafety.com/wp-content/uploads/2018/11/Hawaii’s-Surf-Seasons.jpg',
      surf: '6-8',
      tide: '0.2',
      wind: '2 NNW',
    },
    {
      name: 'Haleiwa',
      image: 'https://hioceansafety.com/wp-content/uploads/2018/11/Hawaii’s-Surf-Seasons.jpg',
      surf: '4-6',
      tide: '0.2',
      wind: '3 SSW',
    },
    {
      name: 'Waimea Bay',
      image: 'https://hioceansafety.com/wp-content/uploads/2018/11/Hawaii’s-Surf-Seasons.jpg',
      surf: '6-8',
      tide: '0.2',
      wind: '2 NNW',
    },
    {
      name: 'Barbers Point',
      image: 'https://hioceansafety.com/wp-content/uploads/2018/11/Hawaii’s-Surf-Seasons.jpg',
      surf: '2-3',
      tide: '0.9',
      wind: '8 SSE',
    },
    {
      name: 'Sand Island',
      image: 'https://hioceansafety.com/wp-content/uploads/2018/11/Hawaii’s-Surf-Seasons.jpg',
      surf: '2-3',
      tide: '0.8',
      wind: '9 S',
    },
  ]

  render() {
    return (
      <Table fixed>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell/>
            <Table.HeaderCell>Location</Table.HeaderCell>
            <Table.HeaderCell>Surf Height (ft)</Table.HeaderCell>
            <Table.HeaderCell>Tide (ft)</Table.HeaderCell>
            <Table.HeaderCell>Wind (kts)</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {this.forecastData.map(location => <Table.Row key={location.name}>
            <Table.Cell><Image src={location.image} size='small'/></Table.Cell>
            <Table.Cell><Header as='h2'>{location.name}</Header></Table.Cell>
            <Table.Cell>{location.surf}</Table.Cell>
            <Table.Cell>{location.tide}</Table.Cell>
            <Table.Cell>{location.wind}</Table.Cell>
          </Table.Row>)}
        </Table.Body>
      </Table>
    );
  }
}
