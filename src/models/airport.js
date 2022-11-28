/*
    Default values in case of a missing data in the JSON
*/
const defaultName = 'Brussels Airport';
const defaultAcronym = 'BRU';
const defaultCountry = 'Belgium';
const defaultCity = 'Brussels';
const defaultTerminal = 1;

/*
    Model for the airport informations
*/
class Airport {
    constructor(name, acronym, country, city, terminals) {
        this.name = name;
        this.acronym = acronym;
        this.country = country;
        this.city = city;
        this.terminals = terminals;
    }

    static fromJson(jsonData) {
        return new Airport(
            jsonData.SK?.S ?? defaultName,
            jsonData.AirportAcronym?.S ?? defaultAcronym,
            jsonData.AirportCountry?.S ?? defaultCountry,
            jsonData.AirportCity?.S ?? defaultCity,
            jsonData.AirportTerminal?.N ?? defaultTerminal
        );
    }
}

function main() {
    const jsonData = {
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

    console.log(Airport.fromJson(jsonData));
}

main();