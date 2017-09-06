
/**
 * Created by aleksandar.mechkaros on 4/11/2017.
 */

const advertRoutes = require("./adverts");
const userRoutes = require("./users");

module.exports = (app, db) => {

    advertRoutes(app, db);
    userRoutes(app, db);

};

