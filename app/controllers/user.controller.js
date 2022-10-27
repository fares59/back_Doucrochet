const Role = require('../controllers/role.controller')
const bcrypt = require('bcryptjs')
const User = require('../models/user.model');
const asyncHandler = require("express-async-handler");
const generateToken = require('../security/jwt.security');
const userService = require('../services/user.service');


const insert =  async (req, res, err) => {
    // .then() => qu'est ce que je fais si ça passe
    //.catch => ce que je fais si ça cass
    await userService.insert(req, res)
        .then((user)=> {
            res.status(200).send({
                message : 'Votre compte a été créer',
                user,
            })
        }
        ).catch(() => {
            res.status(500).send({
                message: "un probleme est survenu",
            });
        
        })
}
//On récupère les utilisateurs
const findAll = async (req, res) => {
    await userService.findAll(req)
    .then((user) => {
        res.status(200).send(user);
    })
    .catch((err) => {
        res.status(500).send({
            message: err.message || 'Some error occurred while retrieving users.',
        });
    });
}

//On vérifie si le mail et le mdp sont les mêmes dans la bdd
const checkUser = async (req, res) => {
    return await userService.checkUser(req, res)
}

const profileUser = async (req, res) => {
    return await userService.profileUser(req);
}

module.exports = {findAll, checkUser, profileUser, insert}
