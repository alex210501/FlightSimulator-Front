import React from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Annotation,
  Marker,
  Line
} from "react-simple-maps";

import "./styles.css";

const geoUrl = "https://raw.githubusercontent.com/deldersveld/topojson/master/continents/europe.json";


const flightDestinations = [
  {
    from: { coord: [-0.128, 51.507], city: "London" },
    to: { coord: [4.469936, 50.503887], city: "Brussels" },
  },
  {
    from: { coord: [-0.128, 51.507], city: "London" },
    to: { coord: [-3.7037902,40.4167754], city: "Madrid" },
  },
  {
    from: { coord: [-0.128, 51.507], city: "London" },
    to: { coord: [13.4033203, 52.5195635], city: "Berlin" },
  },
  {
    from: { coord: [-0.128, 51.507], city: "London" },
    to: { coord: [2.3524475, 48.8565835], city: "Paris" },
  },
  {
    from: { coord: [-0.128, 51.507], city: "London" },
    to: { coord: [12.4969482, 41.902277], city: "Rome" },
  },
  {
    from: { coord: [-0.128, 51.507], city: "London" },
    to: { coord: [-9.1392517, 38.7224833], city: "Lisbonne" },
  },
  {
    from: { coord: [-0.128, 51.507], city: "London" },
    to: { coord: [10.7528687, 59.9137298], city: "Oslo" },
  },
  {
    from: { coord: [-0.128, 51.507], city: "London" },
    to: { coord: [26.1035156, 44.4259344], city: "Bugarest" },
  },
  {
    from: { coord: [-0.128, 51.507], city: "London" },
    to: { coord: [37.6171875, 55.7557135], city: "Moscou" },
  },
];

const MapChart = () => {
  return (
    <ComposableMap
      projection="geoAzimuthalEqualArea"
      projectionConfig={{
        rotate: [-10.0, -52.0, 0],
        center: [3, -3],
        scale: 900
      }}
    >
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

    {flightDestinations.map((route) => (
      <>
        <Line
          key={route.to.city}
          from={route.from.coord}
          to={route.to.coord}
          strokeWidth={1}
          className="line"
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
    {flightDestinations.map((route) => (
      <>
        <Marker coordinates={route.from.coord}>
          <circle r={2} fill="yellow" />
          <text fontSize="10px" x="3" fill="brown">{route.from.city} </text>
        </Marker>
      </>
    ))}
    

  </ComposableMap> 


  );
};

export default MapChart;
