/*
    Default values in case of a missing field in the JSON
*/
const defaultName = 'Brussels Airlines';
const defaultIata = 'SN';
const defaultOaci = 'BEL';
const defaultCountry = 'Belgium';
const defaultPlaneQuantity = 38;

/*
    Company model
*/
class Company {
    constructor(name, iata, oaci, country, planeQuantity) {
        this.name = name;
        this.iata = iata;
        this.oaci = oaci;
        this.country = country;
        this.planeQuantity = planeQuantity;
    }

    static fromJson(jsonData) {
        return new Company(
            jsonData.SK?.S ?? defaultName,
            jsonData.IATA?.S ?? defaultIata,
            jsonData.OACI?.S ?? defaultOaci,
            jsonData.CompanyCountry?.S ?? defaultCountry,
            jsonData.PlaneQuantity?.N ?? defaultPlaneQuantity,
        );
    }
}

function main() {
    const jsonData = {
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

    console.log(Company.fromJson(jsonData));
}

main();