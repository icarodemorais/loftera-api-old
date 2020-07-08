const { user } = require('../models');
const bcrypt = require('bcrypt-nodejs');
const { Sequelize } = require('sequelize');

module.exports = {

    auth(req, res) {
        var { email, password } = req.headers;

        user.findOne({
            where: {
                email: email,
            }
        }).then((foundUser) => {
            if (foundUser) {
                if (bcrypt.compareSync(password, foundUser.password)) {
                    return res.status(200).send({ user: foundUser });
                }
            }
            return res.status(401).send({});
        });
    },
    findOne(req, res) {
        user.findAll({
            where: {
                id: req.params.id
            }
        }).then((retorno) => {
            res.json({ retorno });
        })
            .catch((retorno) => {
                res.status(500);
                res.json({ success: false, error: retorno.message });
            })
    }

}