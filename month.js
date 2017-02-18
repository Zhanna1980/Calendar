/**
 * Created by zhannalibman on 15/02/2017.
 */

Month.numberOfDaysInMonths = {"January" : 31, "February" : 28, "March" : 31, "April" : 30, "May" : 31, "June" : 30,
    "July" : 31, "August" : 31, "September" : 30, "October" : 31, "November" : 30, "December": 31};

Month.weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

Month.createDaysList = function (numberOfDays, firstDayOfMonth){
    var days = [];
    var indexOfFirstDay = Month.weekDays.indexOf(firstDayOfMonth);
    for (var i = 1; i < numberOfDays + 1; i++) {
        var day = new Day(i, Month.weekDays[(i - 1 + indexOfFirstDay) % Month.weekDays.length]);
        days.push(day);
    }
    return days;
};


function Month (name, isLeapYear, firstDayOfMonth) {
    if (!Month.numberOfDaysInMonths.hasOwnProperty(name)) {
        throw new Error("Invalid month name");
    }
    if (Month.weekDays.indexOf(firstDayOfMonth) == -1) {
        throw new Error("Invalid first day of month");
    }

    this.name = name;
    this.firstDayOfMonth = firstDayOfMonth;

    if (name == "February" && isLeapYear){
        this.numberOfDays = Month.numberOfDaysInMonths[name] + 1;
    } else {
        this.numberOfDays = Month.numberOfDaysInMonths[name];
    }
    this.days = Month.createDaysList(this.numberOfDays, firstDayOfMonth);
}

Month.prototype.getName = function () {
    return this.name;
};

Month.prototype.getDaysNumber = function () {
    return this.numberOfDays;
};

Month.prototype.getDaysList = function () {
    return this.days;
};

Month.prototype.getDate = function (date) {
    if (date >= 0 && date <= this.days.length) {
        return this.days[date - 1];
    } else {
        return null;
    }
};

Month.prototype.getFirstDay = function (){
    return this.firstDayOfMonth;
};

Month.prototype.getFirstDayOfNextMonth = function () {
    var indexOfLastDay = Month.weekDays.indexOf(this.getDate(this.getDaysNumber()).getWeekDay());
    return Month.weekDays[(indexOfLastDay + 1) % Month.weekDays.length];
};


