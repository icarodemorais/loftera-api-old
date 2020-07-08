const { realEstate, image } = require('../models/');
const { Sequelize } = require('sequelize');

module.exports = {
    store(req, res) {
        const realEstateReceived = realEstate.build(req.body);
        let images = req.body.images;

        realEstateReceived.dataValues.locatorId = req.body.locatorId;

        realEstateReceived.save().then((savedRealEstate) => {

            images.map((image) => {
                image.realEstateId = savedRealEstate.id;
                return image;
            });

            image.bulkCreate(images).then((images) => {
                res.json(savedRealEstate);
            })

        })
            .catch(Sequelize.ValidationError, (retorno) => {
                res.status(400).json({ success: false, error: retorno.errors });
            })
            .catch((retorno) => {
                res.status(500).json({ success: false, error: retorno.message });
            });

    },

    findAll(req, res) {
        realEstate.findAll().then((retorno) => {
            res.json({ retorno });
        })
            .catch((retorno) => {
                res.status(500);
                res.json({ success: false, error: retorno.message });
            })
    },

    findOne(req, res) {
        realEstate.findAll({
            where: {
                id: req.params.id
            },
            include : [image]
        }).then((retorno) => {
            res.json({ retorno });
        })
            .catch((retorno) => {
                res.status(500);
                res.json({ success: false, error: retorno.message });
            })
    }
}