 import axios from 'axios';

const Flight = require('../models/flight');
const Plane = require('../models/plane');

/*
    Declaration of the existing path in the api
*/
const flightPath = '/flight';
const planePath = '/plane';
const flightDepartureTime = `${flightPath}/departuretime`;

/*
    Class that deliver an API to the flight simulator backend
*/
class FlightSimulatorApi {
    #endpoint;

    constructor(endpoint) {
        this.#endpoint = endpoint;
    }

    async getFlight(flightNumber) {
        const path = `${this.#endpoint}${flightPath}/${flightNumber}`;

        try {
            const response = await axios.get(path);
            const data = response.data;

            return Flight.fromJson(data);
        } catch(e) {
            console.log(e);
            return Flight.fromJson({});
        }
    }

    async getPlane(planeNumber) {
        const path = `${this.#endpoint}${planePath}/${planeNumber}`;

        try {
            const response = await axios.get(path);
            const data = response.data;

            return Plane.fromJson(data);
        } catch(e) {
            console.log(e);
            return Plane.fromJson({});
        }
    }

    async getFlightByHour(hour) {
        const path = `${this.#endpoint}${flightDepartureTime}/:${hour}`;
        let flightArray = [];

        try {
            const response = await axios.get(path);
            const data = response.data;

            data.forEach(flight => {
                flightArray.push(Flight.fromJson(flight));
            });
            console.log(flightArray);
            return flightArray;
        } catch(e) {
            console.log("yop");
            console.log(e);
            return flightArray;
        }
    }
}

export default FlightSimulatorApi;

async function main() {
    const flightSimulatorApi = new FlightSimulatorApi('http://localhost:8023');

    // console.log(await flightSimulatorApi.getFlight(':FR4855'));
    // console.log(await flightSimulatorApi.getPlane(':0'));
    console.log(await flightSimulatorApi.getFlightByHour('3600'));
}

if (require.main === module) {
  main();
}
