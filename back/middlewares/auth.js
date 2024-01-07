const jwt = require("jsonwebtoken")
const UserDb = require("../models").User
const dotenv = require('dotenv');

dotenv.config()
const SAFE_ROUTES = ['/user/login/teacher','/user/login/student', '/user/register/', '/reset/']

const authenticateToken = async (req, res, next) => {
  if (SAFE_ROUTES.includes(req.path)) {
    return next()
  }
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
      return res.status(401).send("Authorization failed. No access token.");
    }
  try {
    const { mail } = jwt.verify(token, process.env.JWT_SECRET);
    const user = await UserDb.findOne({ where: { mail } });
    if (!user) {
        return res.status(404).send("User not found");
    }

    req.user = user.userId; 
    return next();
  } catch (err) {
        console.error(err);
        return res.status(403).send("Could not verify token");
  }

};
  
module.exports=authenticateToken