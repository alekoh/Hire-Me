/**
 * Created by aleksandar.mechkaros on 4/11/2017.
 */
var passport = require("passport");
var mysql = require("mysql");
var connection = require("../config/mysql");
var jwt = require("jwt-simple");
module.exports = function (app) {
    connection.connect();
    // Get all adverts
    app.get("/adverts", function (req, res) {
        connection.query("SELECT * FROM adverts", function (err, results) {
            if (err) {
                res.send("Something wrong with the database");
            }
            else {
                res.send(results);
            }
        });
    });
    // Getting advert by id
    app.get("/adverts/:id", function (req, res) {
        console.log("Sara");
        var id = req.params.id;
        connection.query("SELECT * FROM adverts WHERE id=?", id, function (err, result) {
            if (err) {
                res.send("There is no such advert!");
            }
            else {
                res.send(result);
            }
        });
    });
    // Search by location
    app.get("/searchloc/:location", function (req, res) {
        var location = req.params.location;
        console.log(location);
        connection.query("SELECT * FROM adverts WHERE location='" + location + "'", function (err, result) {
            if (err) {
                res.send("There is no such advert!");
            }
            else {
                res.send(result);
            }
        });
    });
    // Search by jobType
    app.get("/searchjt/:jobType", function (req, res) {
        var jobType = req.params.jobType;
        connection.query("SELECT * FROM adverts WHERE jobType=?", jobType, function (err, result) {
            if (err) {
                res.send("There is no such advert!");
            }
            else {
                res.send(result);
            }
        });
    });
    // Creating adverts
    app.post("/adverts", function (req, res) {
        /***
         * jwt.decode is a function that accepts two arguments:
         * @param token => req.body.token is the actual encoded token
         * @param key =>   "secret" is the key by which the token can be encoded
         ***/
        var advert = {
            name: req.body.name,
            location: req.body.location,
            jobType: req.body.jobType,
            description: req.body.description,
            company: req.body.company,
            website: req.body.website
        };
        var query = "INSERT INTO adverts (name, location, jobType, description, company, website) VALUES ('" + advert.name + "', '" + advert.location + "', '" + advert.jobType + "', '" + advert.description + "', '" + advert.company + "', '" + advert.website + "')";
        connection.query(query, function (err) {
            if (err) {
                res.send(err);
            }
            else {
                connection.query("SELECT * FROM adverts WHERE id IN (SELECT LAST_INSERT_ID() FROM adverts)", function (error, result) {
                    if (error) {
                        res.send("Error!");
                    }
                    else {
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
    app.delete("/adverts/:id", function (req, res) {
        var token = req.body.token;
        if (jwt.decode(token, "secret")) {
            var id = req.params.id;
            connection.query("DELETE FROM adverts WHERE id=?", id, function (err, result) {
                if (err) {
                    res.send("Error deleting advert!");
                }
                else {
                    res.status(200).send(result);
                }
            });
        }
    });
    // todo: Updating advert by id
    app.put("/adverts/:id", function (req, res) {
        if (jwt.decode(req.body.token, "secret")) {
            var advert = {
                id: req.params.id,
                name: req.body.name,
            };
            var query = "UPDATE adverts SET ?? = ? WHERE ?? = ?";
            var inserts = ["name", advert.name, "id", advert.id];
            query = mysql.format(query, inserts);
            connection.query(query, function (err, result) {
                if (err) {
                    res.send("Error! You must insert valid username and id");
                }
                else {
                    res.send(result);
                }
            });
        }
    });
};
