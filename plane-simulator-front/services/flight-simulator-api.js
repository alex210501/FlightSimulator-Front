const axios = require('axios');
const Flight = require('../models/flight');
const Plane = require('../models/plane');

/*
    Declaration of the existing path in the api
*/
const flightPath = '/flight';
const planePath = '/plane';

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
            return Flight.fromJson({});
        }
    }
}


async function main() {
    const flightSimulatorApi = new FlightSimulatorApi('http://localhost:8023');

    console.log(await flightSimulatorApi.getFlight(':FR4855'));
    console.log(await flightSimulatorApi.getPlane(':0'));
}

if (require.main === module) {
  main();
}