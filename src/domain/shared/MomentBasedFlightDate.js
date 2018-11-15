import FlightDate from './FlightDate';
const moment = require('moment');
const dateFormat = "YYYY-MM-DD";
export default class MomentBasedFlightDate {
    constructor(flightDate) {
        if ((!flightDate instanceof FlightDate)) {
            throw new Error("Paramenter type error");
        };
        this.startDate = moment(flightDate.startDate);
        this.endDate = moment(flightDate.endDate);
    }

    toString() {
        return `${this.startDate.format(dateFormat)}, ${this.endDate.format(dateFormat)}`;;
    }
    
    toJSON() {
        return {startDate: this.startDate.format(dateFormat),
                endDate: this.endDate.format(dateFormat)};
    }

    theSame(another) {
        this.validateParameter(another);
        if (this.startDate.isSame(another.startDate) && this.endDate.isSame(another.endDate)) {
            return true;
        }
        return false;
    }

    isInside(date) {
        var theDate = moment(date);
        if (!theDate.isValid()) {
            throw new Error("Paramenter type error");
        }

        if (theDate.isSameOrAfter(this.startDate) && theDate.isSameOrBefore(this.endDate)) {
            return true;
        }
        return false;
    }

    validateParameter(flightDate) {
        if (!(flightDate instanceof MomentBasedFlightDate)) {
            throw new Error("Paramenter type error");
        }
    }

    isOverlappedWith(another) {
        this.validateParameter(another);
        if (this.startDate.isAfter(another.endDate) || another.startDate.isAfter(this.endDate)) {
            return false;
        }
        return true;
    }

    isAdjacentWith(another) {
        this.validateParameter(another);
        const millSecsInADay = 24 * 60 * 60 * 1000;
        if (this.endDate.valueOf() + millSecsInADay === another.startDate.valueOf() ||
            another.endDate.valueOf() + millSecsInADay === this.startDate.valueOf()) {
            return true;
        }
        return false;
    }

}