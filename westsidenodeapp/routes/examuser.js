var express = require('express');
var router = express.Router();
const connector = require('../poolconnect');
const jwt = require("jsonwebtoken");

router.get('/createtable', function (req, res) {
    const sqlQuery = `CREATE TABLE examaccount(id INT(5), username VARCHAR(25), password VARCHAR(100), PRIMARY KEY(id))`;
    connector.query(sqlQuery, function (err, results, fields) {
        res.json(results);
    });
});

router.post('/', function (req, res) {
    const { id, username, password } = req.body;
    connector.query(
        "SELECT username FROM examaccount where username = '" +
        req.body.username +
        "'",
        function (err, result, field) {
            if (result.length === 0) {
                const sql = `INSERT INTO examaccount VALUES (?,?,?)`;
                connector.query(
                    sql,
                    [id, username, password],
                    function (err, results, fields) {
                        res.json({ status: 1, data: 'user created' });
                    }
                );
            } else {
                res.json({ status: 0, debug_data: 'username already exists' });
            }
        }
    );
});

router.post('/checklogin/:username/:password', function (req, res) {
    let username = req.params.username;
    let password = req.params.password;
    connector.query(
        "SELECT * FROM examaccount where username = '" +
        username +
        "' AND password = '" +
        password +
        "'",
        function (err, result, field) {
            if (result.length === 0) {
                req.session.isLoggedIn = 0;
                res.json({ status: 0, data: 'incorrect login details' });
            } else {
                const payload = {
                    user: {
                        username: username,
                    }
                };
                jwt.sign(
                    payload,
                    "secret_String",
                    {
                        expiresIn: 1200,
                    },
                    (err, token) => {
                        if (err) {
                            throw error,
                            res.json({
                                status: 0,
                                debug_data: "Temporary error in backend",
                            });
                        }
                        res.status(200).json({
                            token,
                        })
                    }
                )
            }
        }
    );
});

router.get('/', function (req, res) {
    const sqlQuery = `SELECT * FROM examaccount`;
    connector.query(sqlQuery, function (err, results) {
        if (err) {
            res.json({ err });
        } else {
            res.json({ results });
        }
    });
});


module.exports = router;
