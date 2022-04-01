const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
var connector = require('../poolconnect');
exports.homePage = function (req, res) {
    connector.query(
        'CREATE TABLE register (email varchar(25), password varchar(200), dob varchar(10), username varchar(20))',
        function (err, results, fields) {
            res.json({ err, results, fields });
        }
    );
};
exports.addUser = function (req, res) {
    let { email, password, dob, username } = req.body;
    let encryptedPassword;
    try {
        let salt = bcrypt.genSaltSync(10);
        console.log(salt);
        encryptedPassword = bcrypt.hashSync(req.body.password, salt);
        console.log(encryptedPassword);
    } catch (err) {
        console.log(err);
    }
    const checkusername = `SELECT * FROM register where username = "${username}"`;
    connector.query(checkusername, function (err, results, fields) {
        if (err) {
            res.json(err);
        } else {
            if (results.length > 0) {
                res.json({ status: 0, debug_data: 'user already exists' });
            } else {
                const checkemail = `SELECT * FROM register where email = "${email}"`;
                connector.query(checkemail, function (err, results, fields) {
                    if (err) {
                        res.json(err);
                    } else {
                        if (results.length > 0) {
                            res.json({
                                status: 0,
                                debug_data: 'email already exists',
                            });
                        } else {
                            const sql = `INSERT INTO register VALUES("${email}", "${encryptedPassword}", "${dob}", "${username}");`;
                            connector.query(
                                sql,
                                function (err, results, fields) {
                                    if (err) {
                                        res.json(err);
                                    } else {
                                        res.json('added user');
                                    }
                                }
                            );
                        }
                    }
                });
            }
        }
    });
};
exports.checkUserName = (req, res) => {
    const username = req.params.username;
    const sqlQuery = `SELECT * FROM register WHERE username = "${username}"`;
    connector.query(sqlQuery, (err, results, fields) => {
        if (err) {
            res.json(err);
        } else {
            if (results.length > 0) {
                res.json({ status: 0, debug_data: 'user exists' });
            } else {
                res.json({ status: 1, debug_data: 'user doesnot exists' });
            }
        }
    });
};
exports.checkEmail = (req, res) => {
    const email = req.params.email;
    const sqlQuery = `SELECT * FROM register WHERE email="${email}" `;
    connector.query(sqlQuery, (err, results, fields) => {
        if (err) {
            res.json(err);
        } else {
            if (results.length > 0) {
                res.json({ status: 0, debug_data: 'email exists' });
            } else {
                res.json({ status: 1, debug_data: 'email doesnot exists' });
            }
        }
    });
};