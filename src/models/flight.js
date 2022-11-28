/*
    Default value in case of field missing in the JSON
*/
const defaultFlightNumber = "FR2105";
const defaultDepartureTime = 43200;  // 12h00
const defaultTerminal = 1;

/*
    Flight model
*/
class Flight {
    constructor(flightNumber, route, departureTime, plane, terminal) {
        this.flightNumber = flightNumber;
        this.route = route;
        this.departureTime = departureTime;
        this.plane = plane;
        this.terminal = terminal;
    }

    static fromJson(jsonData) {
        const routeJson = jsonData.Route?.J ?? {};
        const planeJson = jsonData.Plane?.J ?? {};

        return new Flight(
            jsonData.FlightNumber?.S ?? defaultFlightNumber,
            routeJson,
            jsonData.DepartureTime?.N ?? defaultDepartureTime,
            planeJson,
            jsonData.Terminal?.N ?? defaultTerminal,
        );
    }
}

module.exports = Flight;

function main() {
    const planeJson = {
        PK: {
            S: 'PLANE'
        },
        SK: {
            S: '0'
        },
        Company: {
            J: {
                PK: {
                    S: 'COMPANY'
                },
                SK: {
                    S: 'Lufthansa'
                },
                IATA: {
                    S: 'LH'
                },
                OACI: {
                    S: 'DLH'
                },
                CompanyCountry: {
                    S: 'Germany'
                },
                PlaneQuantity: {
                    N: 279
                }
            }
        },
        PlaneType: {
            J: {
                PK: {
                    S: 'PLANE-TYPE'
                },
                SK: {
                    S: '0'
                },
                Constructor: {
                    S: 'Boeing'
                },
                Model: {
                    S: '737 MAX'
                },
                PlanePassengers: {
                    N: 50
                },
                CruisingSpeed: {
                    N: 850
                },
                MaxSpeed: {
                    N: 1000
                }
            }
        }
    };

    const routeJson = {
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
    };

    const jsonData = {
        PK: {
            S: 'FLIGHT'
        },
        SK: {
            S: 'FR4855'
        },
        DepartureTime: {
            N: 3600
        },
        Terminal: {
            N: 1
        },
        Plane: {
            J: {
                planeJson
            }
        },
        Route: {
            J: {
                routeJson
            }
        },
    };

    console.log(Flight.fromJson(jsonData));
}

if (require.main === module) {
  main();
}
