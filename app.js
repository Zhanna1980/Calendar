/**
 * Created by zhannalibman on 15/02/2017.
 */

(function ($) {
    "use strict";

    var calendar = new Calendar("Sunday", 2017);
    var months = calendar.getMonths();
    var currentMonthIndex = 0;
    var toDay = new Date();
    initMyCalendar();

    function initMyCalendar() {
        buildUI(months[currentMonthIndex]);
        $(".btnPrevious").click(toPreviousMonth);
        $(".btnNext").click(toNextMonth);
    }
    function buildUI(month) {
        $(".month").text(month.getName());
        buildMonthMatrix(month);
    }

    function toNextMonth(){
        if (currentMonthIndex < calendar.getMonths().length - 1){
            buildUI(months[++currentMonthIndex]);
        }
    }

    function toPreviousMonth(){
        if (currentMonthIndex > 0){
            buildUI(months[--currentMonthIndex]);
        }
    }

    function buildMonthMatrix(month) {
        var cols = Month.weekDays.length;
        var indexOfFirstDay = Month.weekDays.indexOf(month.getFirstDay());
        var numberOfDays = indexOfFirstDay + 1 + month.getDaysNumber();
        var rows = Math.ceil(numberOfDays/7);
        var stage = $('#stage').html('');
        var weekDaysRow = $('<div class="row"></div>').appendTo(stage);
        for (var i = 0; i < cols; i++) {
            var weekDay = $('<div class="weekDay">'+Month.weekDays[i] + '</div>').appendTo(weekDaysRow);
        }
        for (var r = 0; r < rows; r++) {
            var row = $('<div class="row"></div>').appendTo(stage);
            for (var c = 0; c < cols; c++) {
                var col = $('<div class="col"></div>').appendTo(row);
                var colIndex = (r*cols +c);
                if(colIndex >= indexOfFirstDay && colIndex < month.getDaysNumber() + indexOfFirstDay) {
                    col.addClass("day");
                    col.text(colIndex - indexOfFirstDay + 1);
                };
            }
        }
    }


})(jQuery);
