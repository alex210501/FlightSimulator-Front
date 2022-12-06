const Company = require("./company");
const PlaneType = require("./plane-type");

/*
    Plane model
*/
class Plane {
    constructor(planeNumber, company, type) {
        this.planeNumber = planeNumber;
        this.company = company;
        this.type = type;
    }

    static fromJson(jsonData) {
        const companyJson = jsonData.Company?.J ?? {};
        const planeTypeJson = jsonData.PlaneType?.J ?? {};

        return new Plane(
            jsonData.SK?.S ?? 0,
            Company.fromJson(companyJson),
            PlaneType.fromJson(planeTypeJson),
        );
    }
}

module.exports = Plane;

function main() {
    const jsonData = {
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
    }

    console.log(Plane.fromJson(jsonData));
}

if (require.main === module) {
  main();
}