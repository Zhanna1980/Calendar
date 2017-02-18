/**
 * Created by zhannalibman on 15/02/2017.
 */

(function ($) {
    "use strict";

    var year = new Year("Sunday", 2017);
    var months = year.getMonths();
    var today = new Date();
    var currentMonth = today.getMonth();
    var currentDate = today.getDate();
    var isDialogOpened = false;
    var currentMonthIndex = currentMonth;
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
        if (currentMonthIndex < year.getMonths().length - 1){
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
        var page = $('#page').html('');
        var weekDaysRow = $('<div class="row"></div>').appendTo(page);
        for (var i = 0; i < cols; i++) {
            $('<div class="weekDay">'+Month.weekDays[i] + '</div>').appendTo(weekDaysRow);
        }
        for (var r = 0; r < rows; r++) {
            var row = $('<div class="row"></div>').appendTo(page);
            for (var c = 0; c < cols; c++) {
                var col = $('<div class="col"></div>').appendTo(row);
                var colIndex = (r*cols +c);
                if(colIndex >= indexOfFirstDay && colIndex < month.getDaysNumber() + indexOfFirstDay) {
                    col.addClass("day")
                        .text(colIndex - indexOfFirstDay + 1)
                        .click(addEvent)
                        .hover(showEventsList, hideEvent);
                    if (Year.months.indexOf(month.name) == currentMonth
                        && col.text() == currentDate){
                        col.addClass("today");
                    }
                }
            }
        }
    }

    function addEvent() {
        if (isDialogOpened) {
            return;
        }
        $(".screen").addClass("active");
        var date = $(this).text();
        var template = `<div class=addEventContainer>
                            <h3 class="addEventTitle"></h3>
                            <input type="text" class="eventTitle" placeholder="Enter event title"/>
                            <br/>
                            <textarea class="eventDescription" placeholder="Enter event description" maxlength="150"/>
                            <br>
                            <button class="btnCancel">Cancel</button>
                            <button class="btnSave">Save</button>
                        </div>`;
        var addEventWindow = $(template).attr("data-date", date);
            addEventWindow.find(".addEventTitle").text(year.getDateDescription(currentMonthIndex, date));
            addEventWindow.find(".btnCancel").click(hideAddEventWindow);
            addEventWindow.find(".btnSave").click(saveEvent);
            addEventWindow.appendTo($("body"));
        isDialogOpened = true;
    }

    function saveEvent() {
        var pressedButton = $(this);
        var date = pressedButton.closest(".addEventContainer").attr("data-date");
        var title = pressedButton.siblings(".eventTitle").val();
        var description = pressedButton.siblings(".eventDescription").val();
        if (title.length > 0 || description.length > 0) {
            var event = new Event(title, description);
            var day = year.getMonthByIndex(currentMonthIndex).getDate(date);
            if (day != null) {
                day.addEvent(event);
            } else {
                alert("Error while saving event.");
            }
        }
        hideAddEventWindow();
    }

    function showEventsList(event) {
        var date = $(this).text();
        var dayEvents = year.getMonthByIndex(currentMonthIndex).getDate(date).getEvents();
        if (dayEvents.length == 0) {
           return;
        }
        var template = `<div class=showEventContainer>
                            <h3 class="eventsListTitle"></h3>
                            <ul class="eventsList"></ul>
                        </div>`;
        var eventsListContainer = $(template).attr("data-date", date)
                                    .css('left', event.pageX + 'px')
                                    .css('top', event.pageY + 'px');
        eventsListContainer.find(".eventsListTitle").text(year.getDateDescription(currentMonthIndex, date));
        var eventsList = eventsListContainer.find("ul.eventsList");
        for (var i = 0; i < dayEvents.length; i++) {
            var li = $("<li><b></b><p></p></li>");
            li.find("b").text(dayEvents[i].getTitle());
            li.find("p").text(dayEvents[i].getDescription());
            eventsList.append(li);
        }
        eventsListContainer.appendTo("#page");
    }

    function hideEvent() {
        $(".showEventContainer").remove();
    }

    function hideAddEventWindow(){
        $(".addEventContainer").remove();
        $(".screen.active").removeClass("active");
        isDialogOpened = false;
    }


})(jQuery);
