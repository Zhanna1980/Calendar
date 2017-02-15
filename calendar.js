/**
 * Created by zhannalibman on 15/02/2017.
 */

Calendar.months = ["January", "February", "March", "April", "May", "June", "July", "August",
    "September", "October", "November", "December"];

Calendar.createMonthList = function (firstDayOfYear, isLeapYear) {
    var months = [];
    for (var i = 0; i < Calendar.months.length; i ++) {
        var firstDayOfMonth = i == 0 ? firstDayOfYear : months[i-1].getFirstDayOfNextMonth();
        var month = new Month (Calendar.months[i], isLeapYear, firstDayOfMonth);
        months.push(month);
    }
    return months;
};

function Calendar (firstDayOfYear, year) {
    this.firstDayOfYear = firstDayOfYear;
    this.year = year;
    this.isLeap = (year % 4 == 0);
    this.months = Calendar.createMonthList(firstDayOfYear, this.isLeap);
}

Calendar.prototype.getMonths = function () {
    return this.months;
};

Calendar.prototype.getMonth = function (monthName) {
    var indexOfMonth = Calendar.months.indexOf(monthName);
    if (indexOfMonth != -1){
        return null;
    } else {
        return this.months[indexOfMonth];
    }
};


