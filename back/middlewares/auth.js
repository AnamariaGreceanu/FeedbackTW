const jwt = require("jsonwebtoken")
const UserDb = require("../models").User

const SAFE_ROUTES = ['/user/login/', '/user/register/', '/reset/']

const authenticateToken = (req, res, next) => {
    if(SAFE_ROUTES.includes(req.path)) return next()
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).send("Authorization failed. No access token.");
    }
    jwt.verify(token, process.env.JWT_SECRET, async(err, mail) => {
      if (err) {
        return res.status(403).send("Could not verify token");
      }
      const user = await UserDb.findOne({where:{mail}})
      req.user = user.id
    });
    return next();
};
  
module.exports=authenticateToken