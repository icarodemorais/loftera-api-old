const { user, locator, realEstate, solicitation } = require('../models/');
const bcrypt = require('bcrypt-nodejs');
const { Sequelize } = require('sequelize');

module.exports = {
    store(req, res) {
        const userReceived = user.build(req.body);
        if(req.body.fullName){
            userReceived.name = req.body.fullName;
        }
        userReceived.role = 'locator'
        userReceived.cpf = userReceived.cpf.replace(/\D/gim, '');

        userReceived.password = bcrypt.hashSync(userReceived.cpf, bcrypt.genSaltSync(10), null);
        userReceived.save().then((savedCandidate) => {
            locator.create({
                userId: savedCandidate.id
            }).then((savedLocator) => {
                savedCandidate.locator = savedLocator;
                res.json(savedCandidate);
            })
        })
            .catch(Sequelize.ValidationError, (retorno) => {
                res.status(400).json({ success: false, error: retorno.errors });
            })
            .catch((retorno) => {
                res.status(500).json({ success: false, error: retorno.message });
            });

    },

    findRealEstate(req, res) {
        realEstate.findAll({
            where: {
                locatorId: req.params.id
            }
        }).then((retorno) => {
            res.json({ retorno });
        })
            .catch((retorno) => {
                res.status(500);
                res.json({ success: false, error: retorno.message });
            })
    },

    findSolicitation(req, res) {
        solicitation.findAll({
            where: {
                locatorId: req.params.id
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