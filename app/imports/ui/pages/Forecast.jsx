import React from 'react';
import { Container, Table, Header } from 'semantic-ui-react';

export default class Forecast extends React.Component {

  forecastData = [
    {
      name: 'Sunset Beach',
      image: 'https://www.best-of-oahu.com/images/Sunset-Beach-Oahu-2.jpg',
      surf: '6-10',
      tide: '0.2',
      wind: '2 NNW',
      swells: '-',
      wTemp: '-',
      weather: '-',
    },
    {
      name: 'Mokuleia',
      image: 'https://d1li3p7kp8c46b.cloudfront.net/13000/12523.4756.e64f312f51.jpg',
      surf: '5-8',
      tide: '0.2',
      wind: '8 SSW',
      swells: '-',
      wTemp: '-',
      weather: '-',
    },
    {
      name: 'Laniakea',
      image: 'https://www.best-of-oahu.com/images/Laniakea-Beach-2.jpg',
      surf: '5-8',
      tide: '0.2',
      wind: '3 SSW',
      swells: '-',
      wTemp: '-',
      weather: '-',
    },
    {
      name: 'Pipeline',
      image: 'https://media-cdn.tripadvisor.com/media/photo-s/16/fc/15/cf/beach.jpg',
      surf: '6-8',
      tide: '0.2',
      wind: '2 NNW',
      swells: '-',
      wTemp: '-',
      weather: '-',
    },
    {
      name: 'Haleiwa',
      image: 'https://www.aloha-hawaii.com/wp-content/uploads/2010/07/haleiwa-beach-park.jpg',
      surf: '4-6',
      tide: '0.2',
      wind: '3 SSW',
      swells: '-',
      wTemp: '-',
      weather: '-',
    },
    {
      name: 'Waimea Bay',
      image: 'https://www.best-of-oahu.com/images/xWaimea-Bay-Hawaii.jpg.pagespeed.ic.yfWUlSbrXr.jpg',
      surf: '6-8',
      tide: '0.2',
      wind: '2 NNW',
      swells: '-',
      wTemp: '-',
      weather: '-',
    },
    {
      name: 'Barbers Point',
      image: 'https://media-cdn.tripadvisor.com/media/photo-s/16/d5/d8/fc/beach.jpg',
      surf: '2-3',
      tide: '0.9',
      wind: '8 SSE',
      swells: '-',
      wTemp: '-',
      weather: '-',
    },
    {
      name: 'Sand Island',
      image: 'https://i2.wp.com/on-walkabout.net/wp-content/uploads/2018/05/Sand-Island-beach.png?fit=1200%2C555&ssl=1',
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
      <Container>
        <Table fixed>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell><Header as='h2'>Location</Header></Table.HeaderCell>
              <Table.HeaderCell><Header as='h2'>Surf Height</Header></Table.HeaderCell>
              <Table.HeaderCell><Header as='h2'>Tide</Header></Table.HeaderCell>
              <Table.HeaderCell><Header as='h2'>Wind</Header></Table.HeaderCell>
              <Table.HeaderCell><Header as='h2'>Swells</Header></Table.HeaderCell>
              <Table.HeaderCell><Header as='h2'>Water Temp</Header></Table.HeaderCell>
              <Table.HeaderCell><Header as='h2'>Weather</Header></Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {this.forecastData.map(location => <Table.Row style={ { backgroundImage: `url(${(location.image)})`, backgroundSize: 'cover', height: '200px', backgroundPosition: 'center', color: 'white' } } key={location.name}>
              <Table.Cell>{location.name}</Table.Cell>
              <Table.Cell>{location.surf} ft</Table.Cell>
              <Table.Cell>{location.tide} ft</Table.Cell>
              <Table.Cell>{location.wind}</Table.Cell>
              <Table.Cell>{location.swells}</Table.Cell>
              <Table.Cell>{location.wTemp} &deg;F</Table.Cell>
              <Table.Cell>{location.weather} &deg;F</Table.Cell>
            </Table.Row>)}
          </Table.Body>
        </Table>
      </Container>
    );
  }
}
