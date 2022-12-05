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

const city=require('./city.json')
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
    to: { coord: city.Rome, city: "Rome" },
  },
  {
    from: { coord: city.London, city: "London" },
    to: { coord: city.Lisbonne, city: "Lisbonne" },
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
