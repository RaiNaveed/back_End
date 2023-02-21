const userModel = require('../Models/userModels');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userRegister = async (req, res) => {
    try {
        const { firstName, lastName, Email, Password } = req.body;
        const docToCreat = new userModel({
            firstName,
            lastName,
            Email,
            Password
        });
        const docToSave = await docToCreat.save();

        res.json({
            Status: true,
            message: "data Save",
            body: docToSave
        })
    } catch (error) {
        res.json({
            Status: false,
            message: error.message,
            body: null
        })
    }
};

const userLogin = async (req, res) => {
    try {
        let Email = req.body.Email;
        let login = await userModel.findOne({ Email: Email });
        if (!login) {
            res.json({
                Status: false,
                message: "Email not found"
            })
        } else {
            let compare = await bcrypt.compare(req.body.Password, login.Password);
            if (!compare) {
                res.json({
                    Status: false,
                    message: "Password incorrect"
                })
            } else {
                let token = await jwt.sign({ Email: login.Email }, 'MyNameIsNaveed', { expiresIn: '1hr' });
                res.json({
                    token: token
                })
            }
        }
    } catch (error) {
        res.json({
            Status: false,
            message: error.message
        })
    }
}

module.exports = { userRegister, userLogin };
