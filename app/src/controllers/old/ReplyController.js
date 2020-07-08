const { Reply, Candidate } = require('../../models');
const { Sequelize } = require('sequelize');

module.exports = {
    store(req, res) {

        const reply = Reply.build(req.body);

        Reply.update(
            { deleted: true },
            { where: { deleted: false, candidateId: reply.candidateId } }

        )

            .then((resp) => {
                reply.save().then((savedReply) => {
                    return res.json(savedReply);
                })
                    .catch(Sequelize.ValidationError, (retorno) => {
                        res.status(400);
                        res.json({ success: false, error: retorno.errors });
                    })
                    .catch((retorno) => {
                        res.status(500);
                        res.json({ success: false, error: retorno.message });
                    });
            })
            .catch((retorno) => {
                res.status(500);
                res.json({ success: false, error: retorno.message });
            });
    },

    findByCandidateId(req, res) {
        Reply.findAll({
            where: {
                deleted: false
            },
            includeIgnoreAttributes:false,
            include: [{
                model: Candidate,
                where: { id: req.query.candidateId },
            }]
        })
            .then((retorno) => {
                res.json({ retorno });
            })
            .catch((retorno) => {
                res.status(500);
                res.json({ success: false, error: retorno.message });
            });

    },
    findAll(req, res) {
        Reply.findAll({
            includeIgnoreAttributes: false,
            include: [{
                model: Candidate,
                where: { id: req.query.candidateId },
            }]
        })
            .then((retorno) => {
                res.json({ retorno });
            })
            .catch((retorno) => {
                res.status(500);
                res.json({ success: false, error: retorno.message });
            });
    }
}