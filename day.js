/**
 * Created by zhannalibman on 15/02/2017.
 */

function Day (dayOfMonth, weekDay) {
    this.dayOfMonth = dayOfMonth;
    this.weekDay = weekDay;
    this.events = [];
}

Day.prototype.getWeekDay = function () {
    return this.weekDay;
};

Day.prototype.addEvent = function (event) {
    if (event instanceof Event){
        this.events.push(event);
    } else {
        throw new Error ("Invalid parameter type.")
    }
};

Day.prototype.getEvents = function () {
    return this.events;
};

Day.prototype.getDayOfMonth = function () {
    return this.dayOfMonth;
};

