const { solicitation, tenant, realEstate } = require('../models/');
const { Sequelize } = require('sequelize');

module.exports = {
    store(req, res) {
        const solicitationReceived = solicitation.build(req.body);

        solicitationReceived.dataValues.locatorId = req.body.locatorId;
        solicitationReceived.dataValues.tenantId = req.body.tenantId;
        solicitationReceived.dataValues.realEstateId = req.body.realEstateId;

        solicitationReceived.save().then((savedSolicitation) => {
            res.json(savedSolicitation);

        })
            .catch(Sequelize.ValidationError, (retorno) => {
                res.status(400).json({ success: false, error: retorno.errors });
            })
            .catch((retorno) => {
                res.status(500).json({ success: false, error: retorno.message });
            });

    },

    async storeAlternative(req, res) {
        const solicitationReceived = solicitation.build(req.body);

        console.log(req.body);
        solicitationReceived.dataValues.realEstateId = req.body.realEstateId;

        var locatorId = await realEstate.findOne({
            where: {
                id: req.body.realEstateId
            }
        }).then(response => {
            return response.dataValues.locatorId;
        });

        solicitationReceived.dataValues.locatorId = locatorId;

        var tenantId = await tenant.findOne({
            where: {
                userId: req.body.fromUserId
            }
        }).then(response => {
            if (response) {
                return response.dataValues.id;
            }else{
                throw new Error("Only tenants can send solicitations");
            }
        })
        .catch(response => {
            res.status(400)
            return;
        });


        solicitationReceived.dataValues.tenantId = tenantId;

        solicitationReceived.save().then((savedSolicitation) => {
            res.json(savedSolicitation);
        })
            .catch(Sequelize.ValidationError, (retorno) => {
                res.status(400).json({ success: false, error: retorno.errors });
            })
            .catch((retorno) => {
                res.status(500).json({ success: false, error: retorno.message });
            });

        // res.status(200).send();

    }

}