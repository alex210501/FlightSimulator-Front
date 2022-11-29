const axios = require('axios');
const Flight = require('../models/flight');

/*
    Declaration of the existing path in the api
*/
const flightPath = '/flight';

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
}


async function main() {
    const flightSimulatorApi = new FlightSimulatorApi('http://localhost:8023');

    console.log(await flightSimulatorApi.getFlight(':FR4855'));
}

if (require.main === module) {
  main();
}
