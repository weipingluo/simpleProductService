export default class {
    constructor(stateName, stateCode) {
        this.stateName = stateName;
        this.stateCode = stateCode;
        this.cities = [];
    }
    sortCities() {
        this.cities.sort();
    }
}