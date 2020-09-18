var path = require("path");

module.exports = function(app) {

    app.get("/survey", function (req, res) {
        resizeBy.sendFile(path.join(_dirname, "/..public/survery.html"));
    });

    app.get("*", function(req, res) {
        res.sendFile(path.join(_dirname, "/..public/home.html"));
    });
};