/**
 * Created by zhannalibman on 15/02/2017.
 */

Year.months = ["January", "February", "March", "April", "May", "June", "July", "August",
    "September", "October", "November", "December"];

Year.createMonthList = function (firstDayOfYear, isLeapYear) {
    var months = [];
    for (var i = 0; i < Year.months.length; i ++) {
        var firstDayOfMonth = i == 0 ? firstDayOfYear : months[i-1].getFirstDayOfNextMonth();
        var month = new Month (Year.months[i], isLeapYear, firstDayOfMonth);
        months.push(month);
    }
    return months;
};

function Year (firstDayOfYear, year) {
    this.firstDayOfYear = firstDayOfYear;
    this.year = year;
    this.isLeap = (year % 4 == 0);
    this.months = Year.createMonthList(firstDayOfYear, this.isLeap);
}

Year.prototype.getMonths = function () {
    return this.months;
};

Year.prototype.getMonth = function (monthName) {
    var indexOfMonth = Year.months.indexOf(monthName);
    if (indexOfMonth != -1){
        return null;
    } else {
        return this.months[indexOfMonth];
    }
};

Year.prototype.getMonthByIndex = function (monthIndex) {
    return this.months[monthIndex];
};

Year.prototype.getDateDescription = function(monthIndex, date) {
    var month = this.getMonthByIndex(monthIndex);
    var monthName = month.getName();
    var day = month.getDate(date);
    if (day == null) {
        throw new Error ("Invalid date");
    }
    var weekDay = day.getWeekDay();
    return (weekDay + ", " + date + " of " + monthName);
};


