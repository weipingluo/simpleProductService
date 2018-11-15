import MomentBasedFlightDate from './MomentBasedFlightDate';
const moment = require('moment');
const firstDate = '1970-01-01';
const foreverDate = '9999-12-31';
const dateFormat = "YYYY-MM-DD";
export default class FlightDate {
    static FOREVER = new FlightDate();
    constructor(startDate = firstDate, endDate = foreverDate) {
        const fd = moment(startDate);
        const ed = moment(endDate);
        fd.isValid() ? this.startDate = fd.format(dateFormat) : this.startDate = firstDate;
        ed.isValid() ? this.endDate = ed.format(dateFormat) : this.endDate = foreverDate;
    }

    theSame(another) {
        this.validateParameter(another);
        return new MomentBasedFlightDate(this).theSame(new MomentBasedFlightDate(another));
    }

    isInside(date) {
        var theDate = moment(date);
        return new MomentBasedFlightDate(this).isInside(date);
    }

    validateParameter(flightDate) {
        if (!(flightDate instanceof FlightDate)) {
            throw new Error("Paramenter type error");
        }
    }

    isOverlappedWith(another) {
        this.validateParameter(another);
        return new MomentBasedFlightDate(this).isOverlappedWith(new MomentBasedFlightDate(another));
    
        if (this.startDate.isAfter(another.endDate) || another.startDate.isAfter(this.endDate)) {
            return false;
        }
        return true;
    }

    isAdjacentWith(another) {
        this.validateParameter(another);
        return new MomentBasedFlightDate(this).isAdjacentWith(new MomentBasedFlightDate(another));
    }

    static sort(flightDates) {
        if (!Array.isArray(flightDates)) {
            throw new Error("Paramenter type error");
        }

        flightDates.forEach(function (fd) {
            if (!(fd instanceof FlightDate)) {
                throw new Error("Paramenter type error");
            }
        });

        flightDates.sort(function (a, b) {
            if (moment(a.startDate).isAfter(moment(b.startDate))) {
                return 1;
            } else if (moment(a.startDate).isBefore(moment(b.startDate))) {
                return -1;
            } else if (moment(a.endDate).isAfter(moment(b.endDate))) {
                return 1;
            } else if (moment(a.endDate).isBefore(moment(b.endDate))) {
                return -1;
            }
            return 0;
        })
        return flightDates;
    }

}