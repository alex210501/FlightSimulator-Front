const Airport = require("./airport");

/*
    Default values in case of missing field in JSON
*/
const defaultName = 'CDG-JFK';
const defaultTimeOfFlight = 28800;  // s

/*
    Route model
*/
class Route {
    constructor(name, departureAirport, arrivalAirport, timeOfFlight) {
        this.name = name;
        this.departureAirport = departureAirport;
        this.arrivalAirport = arrivalAirport;
        this.timeOfFlight = timeOfFlight;
    }

    static fromJson(jsonData) {
        const departureAirportJson = jsonData.DepartureAirport?.J ?? {};
        const arrivalAirportJson = jsonData.ArrivalAirport?.J ?? {};

        return new Route(
            jsonData.SK?.S ?? defaultName,
            Airport.fromJson(departureAirportJson),
            Airport.fromJson(arrivalAirportJson),
            jsonData.TimeOfFlight?.N ?? defaultTimeOfFlight,
        );
    }
}

module.exports = Route;

function main() {
    const jsonData = {
        PK: {
            S: 'ROUTE'
        },
        SK: {
            S: 'CDG-MDM'
        },
        TimeOfFlight: {
            N: 3600
        },
        DepartureAirport: {
            J: {
                PK: {
                    S: 'AIRPORT'
                },
                SK: {
                    S: 'Charles de Gaulle'
                },
                AirportAcronym: {
                    S: 'CDG'
                },
                AirportCountry: {
                    S: 'France'
                },
                AirportCity: {
                    S: 'Paris'
                },
                AirportTerminal: {
                    N: 3
                }
            }
        },
        ArrivalAirport: {
            J: {
                PK: {
                    S: 'AIRPORT'
                },
                SK: {
                    S: 'Adolpho-Suarez'
                },
                AirportAcronym: {
                    S: 'MDM'
                },
                AirportCountry: {
                    S: 'Spain'
                },
                AirportCity: {
                    S: 'Madrid'
                },
                AirportTerminal: {
                    N: 3
                }
            }
        }
    }

    console.log(Route.fromJson(jsonData));
}

if (require.main === module) {
  main();
}