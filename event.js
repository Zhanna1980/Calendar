/**
 * Created by zhannalibman on 15/02/2017.
 */

function Event (title, description) {
    if (title == undefined || title.length == 0){
        this.title = "Unnamed event";
    } else {
        this.title = title;
    }
    this.description = description;
}

Event.prototype.getTitle = function () {
    return this.title;
};

Event.prototype.setTitle = function (title) {
    this.title = title;
};

Event.prototype.getDescription = function () {
    return this.description;
};

Event.prototype.setDescription = function (description) {
    this.description = description;
};
