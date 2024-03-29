const UserDb = require("../models").User
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const Op = require("sequelize").Op
const dotenv = require('dotenv');

dotenv.config()
let generateToken = (mail) => {
    let token = jwt.sign({mail},process.env.JWT_SECRET)
    return token
}

const userController = {
    getAllUsers: async (req, res) => {
        try {
            let users = await UserDb.findAll()
            if (!users.length) {
                res.status(404).send("No users existing yet!");
            } 
            return res.status(200).send(users)
        } catch (err) {
            res.status(500).send({ message: "Server error!" });
        }
    },
    getUserById: async (req, res) => {
        let userId = req.params.userId
        try {
            let user = await UserDb.findOne({ where: { userId } })
            if (!user) {
                res.status(404).send({message:"user does not exist"})
             }
            res.status(200).send(user)
        } catch (err) {
            res.status(500).send({ message: "Server error!" });
        }
    },
    addUser: async (req, res) => {
        try {
            console.log(req.body)
            let {
                username,lastName,firstName,password,mail,typeUser
            } = req.body
            if (!username || !password || !mail) {
                return res.status(400).send("username,password and mail are mandatory!")
            }
            let user
            try {
                user = await UserDb.findOne({
                    where: {
                        [Op.or]: [{ username }, { mail }]
                    }
                });
                if (user) {
                    return res.status(400).send("User already registered");
                } 
            } catch (err) {
                console.log(err)
                return res.status(400).send(err)
            }

            let salt=await bcrypt.genSalt(10)
            let encryptedPassw = await bcrypt.hash(password, salt)
            user = await UserDb.create( {...req.body, password: encryptedPassw})

            let accessToken = generateToken(user.mail)
            return res.status(201).json({ message: "Account created succesfully!", user ,accessToken});
        } catch (err) {
            console.log(err)
            res.status(500).send({ message: "Server error!" });
        }
    },
    deleteUser: async (req, res) => {
        let { userId } = req.params;
        try {
            let user = await UserDb.findByPk(userId);
            if (!user) {
                res.status(404).send({ message: `user does not exist` });
            }
            await user.destroy();
            res.status(200).send("account deleted");
        } catch (err) {
            res.status(500).send({ message: "Server Error!" });
        }
    },
    loginUser: async (req, res) => {
        try {
            // console.log("alala")
            let { mail, password } = req.body
            const { role } = req.params;

            if (!mail || !password) {
                return res.status(400).send("complete all the fields!")
            }
            let user = await UserDb.findOne({ where: { mail } })

            if (role === 'teacher') {
                if (!user || user.typeUser != "teacher") {
                    return res.status(403).send("invalid username or there are not any teachers with this username")
                }
            }
            if (role === 'student') {
                if (!user || user.typeUser != "student") {
                    return res.status(403).send("invalid username or there are not any students with this username")
                }
            }
    
            let passwordMatch = await bcrypt.compare(password, user.password);
            if (!passwordMatch) {
                return res.status(403).send("invalid username/password")
            }
            let accessToken = generateToken(user.mail)
            return res.status(200).send({ message: "Logged in!", user, accessToken }); 
        } catch (err) {
            console.log(err)
            res.status(500).send({ message: "Server Error!" });
        }
    }
}

module.exports = userController
