const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const authHeader  = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(403).json({});
  } 
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if(decoded.id) {
      req.userId = decoded.id;
      next();
    } else {
      res.status(401).json({
        message: "Unauthorized",
      });
    }
  } catch (e) {
    res.status(401).json({
      message: "Unauthorized",
    });
  }
}

module.exports= {
  authMiddleware
} ;