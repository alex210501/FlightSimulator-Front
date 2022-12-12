import { React, useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Annotation,
  Marker,
  Line,
  Graticule
} from "react-simple-maps";

import "./styles.css";
import Timer from "./time";
import FlightSimulatorApi from "./services/flight-simulator-api";

const geoUrl = "https://raw.githubusercontent.com/deldersveld/topojson/master/continents/europe.json";


const city = require('./city.json')
const flightDestinations = [
  {
    from: { coord: city.London, city: "London" },
    to: { coord: city.Brussels, city: "Brussels" },
  },
  {
    from: { coord: city.London, city: "London" },
    to: { coord: city.Madrid, city: "Madrid" },
  },
  {
    from: { coord: city.London, city: "London" },
    to: { coord: city.Berlin, city: "Berlin" },
  },
  {
    from: { coord: city.London, city: "London" },
    to: { coord: city.Paris, city: "Paris" },
  },
  {
    from: { coord: city.London, city: "London" },
    to: { coord: city.Roma, city: "Roma" },
  },
  {
    from: { coord: city.London, city: "London" },
    to: { coord: city.Lisbon, city: "Lisbon" },
  },
  {
    from: { coord: city.London, city: "London" },
    to: { coord: city.Oslo, city: "Oslo" },
  },
  {
    from: { coord: city.London, city: "London" },
    to: { coord: city.Bugarest, city: "Bugarest" },
  },
  {
    from: { coord: city.London, city: "London" },
    to: { coord: city.Moscou, city: "Moscou" },
  },
];

function jsonToDestination(jsonDestination) {
  return jsonDestination.map(element => {
    const departureAirport = element.route.departureAirport;
    const arrivalAirport = element.route.arrivalAirport;

    return {
      from: { coord: city[departureAirport.city], city: departureAirport.name },
      to: { coord: city[arrivalAirport.city], city: arrivalAirport.name },
    };
  });
}

const MapChart = () => {
  const [destinations, setDestinations] = useState(flightDestinations);

  const onChange = (time) => {
    const currentTime = time.$H * 3600 + time.$m * 60 + time.$s;
    const flightSimulatorApi = new FlightSimulatorApi('http://localhost:8023');

    flightSimulatorApi.getFlightByHour(currentTime).then((result) => {
      setDestinations(jsonToDestination(result));
    });
  };

  return (
    <div>
      <div className="timer"><Timer onChange={onChange} /></div>

      <ComposableMap
        projection="geoAzimuthalEqualArea"
        width={800}
        height={800}
        projectionConfig={{
          rotate: [-10.0, -53.0, 0],
          center: [3, -3],
          scale: 600
        }}
      >
        <Graticule stroke="#EAEAEC" />

        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                fill="#EAEAEC"
                stroke="#D6D6DA"
              />
            ))
          }
        </Geographies>

        {destinations.map((route) => (
          <>
            <Line
              key={route.to.city}
              from={route.from.coord}
              to={route.to.coord}
              strokeWidth={1}
              stroke="yellow"
              className="round"
            />
            <Marker coordinates={route.to.coord}>
              <circle r={2} fill="yellow" />
            </Marker>
            <Annotation subject={route.to.coord} dx={0} dy={0} fill="yellow">
              <text fontSize="10px" x="3" fill="brown">
                {route.to.city}
              </text>
            </Annotation>
          </>
        ))}
        {destinations.map((route) => (
          <>
            <Marker coordinates={route.from.coord}>
              <circle r={2} fill="yellow" />
              <text fontSize="10px" x="3" fill="brown">{route.from.city} </text>
            </Marker>
          </>
        ))}
      </ComposableMap>
    </div>
  );
};

export default MapChart;
