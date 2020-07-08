const { user, tenant, solicitation } = require('../models/');
const bcrypt = require('bcrypt-nodejs');
const { Sequelize } = require('sequelize');

module.exports = {
    store(req, res) {
        const userReceived = user.build(req.body);
        userReceived.role = 'tenant'
        userReceived.cpf = userReceived.cpf.replace(/\D/gim, '');

        userReceived.password = bcrypt.hashSync(userReceived.cpf, bcrypt.genSaltSync(10), null);
        userReceived.save().then((savedCandidate) => {
            tenant.create({
                userId: savedCandidate.id
            }).then((savedTenant) => {
                savedCandidate.tenant = savedTenant;
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

    findSolicitation(req, res) {
        solicitation.findAll({
            where: {
                tenantId: req.params.id
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