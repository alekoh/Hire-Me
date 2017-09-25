/**
 * Created by aleksandar.mechkaros on 4/11/2017.
 */

let passport = require("passport");

let mysql = require("mysql");
let connection = require("../config/mysql");
let jwt = require("jwt-simple");


module.exports = (app) => {
    connection.connect();

    // Get all adverts
    app.get("/adverts", (req, res) => {
        connection.query("SELECT * FROM adverts", (err, results) => {
            if (err) {
                res.send("Something wrong with the database");
            } else {
                res.send(results);
            }
        });
    });

    // Getting advert by id
    app.get("/adverts/:id", (req, res) => {

        console.log("Sara");
        const id = req.params.id;

        connection.query("SELECT * FROM adverts WHERE id=?", id, (err, result) => {
            if (err) {
                res.send("There is no such advert!");
            } else { res.send(result); }
        });
    });

    // Search by location
    app.get("/searchloc/:location", (req, res) => {

        const location = req.params.location;
        console.log(location);

        connection.query(`SELECT * FROM adverts WHERE location='${location}'`, (err, result) => {
            if (err) {
                res.send("There is no such advert!");
            } else { res.send(result); }
        });
    });

    // Search by jobType
    app.get("/searchjt/:jobType", (req, res) => {

        const jobType = req.params.jobType;

        connection.query("SELECT * FROM adverts WHERE jobType=?", jobType, (err, result) => {
            if (err) {
                res.send("There is no such advert!");
            } else { res.send(result); }
        });
    });

    // Creating adverts
    app.post("/adverts", (req, res) => {

        /***
         * jwt.decode is a function that accepts two arguments:
         * @param token => req.body.token is the actual encoded token
         * @param key =>   "secret" is the key by which the token can be encoded
         ***/

        let advert = {
            name: req.body.name,
            location: req.body.location,
            jobType: req.body.jobType,
            description: req.body.description,
            company: req.body.company,
            website: req.body.website
        };
        let query = `INSERT INTO adverts (name, location, jobType, description, company, website) VALUES ('${advert.name}', '${advert.location}', '${advert.jobType}', '${advert.description}', '${advert.company}', '${advert.website}')`;

        connection.query(query, (err) => {
            if (err) {
                res.send(err)
            } else {
                connection.query("SELECT * FROM adverts WHERE id IN (SELECT LAST_INSERT_ID() FROM adverts)", (error, result) => {
                    if (error) {
                        res.send("Error!");
                    } else {
                        res.send(result);
                    }
                });
            }
        });

        /*if (jwt.decode(req.body.token, "secret")) {
        } else {
            res.send("Unauthorized");
        }*/
    });

    // Deleting advert by id
    app.delete("/adverts/:id", (req, res) => {

        let token = req.body.token;

        if (jwt.decode(token, "secret")) {
            const id = req.params.id;

            connection.query("DELETE FROM adverts WHERE id=?", id, (err, result) => {
                if (err) {
                    res.send("Error deleting advert!");
                } else {
                    res.status(200).send(result);
                }
            });
        }});

    // todo: Updating advert by id
    app.put("/adverts/:id", (req, res) => {

        if (jwt.decode(req.body.token, "secret")) {

            let advert = {
                id: req.params.id,
                name: req.body.name,
            };

            let query = "UPDATE adverts SET ?? = ? WHERE ?? = ?";
            let inserts = ["name", advert.name, "id", advert.id];
            query = mysql.format(query, inserts);

            connection.query(query, (err, result) => {
                if (err) {
                    res.send("Error! You must insert valid username and id");
                } else {
                    res.send(result);
                }
            });
        }
    });

};
