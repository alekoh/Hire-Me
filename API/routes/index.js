/**
 * Created by aleksandar.mechkaros on 4/11/2017.
 */
var advertRoutes = require("./adverts");
var userRoutes = require("./users");
module.exports = function (app, db) {
    advertRoutes(app, db);
    userRoutes(app, db);
};
