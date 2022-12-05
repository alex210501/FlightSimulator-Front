/*
    Default data in case of missing fields in the JSON
*/
const defaultName = 'Airbus A318';
const defaultConstructor = 'Airbus';
const defaultModel = 'A318';
const defaultPlanePassengers = 100;
const defaultCruisingSpeed = 829;
const defaultMaxSpeed = 870;

/*
    Container for the plane type
*/
class PlaneType {
    constructor(name, constructor, model, planePassengers, cruisingSpeed, maxSpeed) {
        this.name = name;
        this.constructor = constructor;
        this.model = model;
        this.planePassengers = planePassengers;
        this.cruisingSpeed = cruisingSpeed;
        this.maxSpeed = maxSpeed;
    }


    static fromJson(jsonData) {
        return new PlaneType(
            jsonData.SK?.S ?? defaultName,
            jsonData.Constructor?.S ?? defaultConstructor,
            jsonData.Model?.S ?? defaultModel,
            jsonData.PlanePassengers?.N ?? defaultPlanePassengers,
            jsonData.CruisingSpeed?.N ?? defaultPlanePassengers,
            jsonData.MaxSpeed?.N ?? defaultMaxSpeed,
        );
    }
}

module.exports = PlaneType;

function main() {
    const jsonData = {
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

    console.log(PlaneType.fromJson(jsonData));
}

if (require.main === module) {
  main();
}