const connectionDb = require("../config")

const dbController = {
    reset: (req, res) => {
        connectionDb.sync({alter: true})
        .then(() => {
            res.status(200).send({message: "Baza de date a fost resetata cu succes"});
        })
        .catch((err) => {
            res.status(500).send(err)
        })

    }
}
module.exports = dbController
