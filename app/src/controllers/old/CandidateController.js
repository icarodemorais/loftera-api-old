const { Candidate, Reply } = require('../../models');
const bcrypt = require('bcrypt-nodejs');
const { Sequelize } = require('sequelize');

module.exports = {
    store(req, res) {
        const candidate = Candidate.build(req.body);
        candidate.role = 'candidate'
        candidate.cpf = candidate.cpf.replace(/\D/gim, '');

        candidate.password = bcrypt.hashSync(candidate.cpf, bcrypt.genSaltSync(10), null);
        candidate.phase = 2;

        candidate.save().then((savedCandidate) => {
            return res.json(savedCandidate);
        })
            .catch(Sequelize.ValidationError, (retorno) => {
                res.status(400);
                res.json({ success: false, error: retorno.errors });
            })
            .catch((retorno) => {
                res.status(500);
                res.json({ success: false, error: retorno.message });
            });

    },

    findByKey(req, res) {
        const keys = Object.keys(req.query);

        if (keys) {
            Candidate.findOne({
                where: {
                    [keys[0]]: req.query[keys[0]]
                }
            }).then((foundCandidate) => {
                return res.send(foundCandidate);
            });
        } else {
            return res.send({});
        }

    },

    findAll(req, res) {
        Candidate.findAll({
            where: {
                role: 'candidate'
            }
        }).then((foundCandidates) => {
            foundCandidates.map((candidate) => {
                candidate.description = candidate.description.split("\r\n").join("'\'")
            })
            return res.send(foundCandidates);
        });
    },

    auth(req, res) {
        var { email, password } = req.headers;

        Candidate.findOne({
            where: {
                email: email,
            }
        }).then((foundCandidate) => {
            if (foundCandidate) {
                if (bcrypt.compareSync(password, foundCandidate.password)) {
                    res.status(200);
                    return res.send({ user: foundCandidate });
                }
            }
            res.status(401);
            return res.send({});
        });
    }

};