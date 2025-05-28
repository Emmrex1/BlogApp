
// const jwt = require('jsonwebtoken');

// const JWT_SECRET = process.env.JWT_SECRET_KEY;

// const verifyToken = (req, res, next) => {
//   try {
//     const authHeader = req.headers.authorization;
//     const token = authHeader?.split(' ')[1];

//     if (!token) {
//       return res.status(401).send({ message: "No token provided" });
//     }

//     const decoded = jwt.verify(token, JWT_SECRET);

//     if (!decoded.userId) {
//       return res.status(401).send({ message: "Invalid token payload" });
//     }

//     req.userId = decoded.userId;
//     req.role = decoded.role;
//     next();
//   } catch (error) {
//     console.error('Error verifying token', error);
//     res.status(401).send({ message: "Invalid token" });
//   }
// };

// module.exports = verifyToken;
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET_KEY;

const verifyToken = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1]; // FIXED

    if (!token) {
      return res.status(401).send({ message: "No token provided" });
    }

    const decoded = jwt.verify(token, JWT_SECRET);

    if (!decoded.userId) {
      return res.status(401).send({ message: "Invalid token" });
    }

    req.userId = decoded.userId;
    req.role = decoded.role;
    next();
  } catch (error) {
    console.error('Error verifying token', error);
    res.status(401).send({ message: "Invalid token" });
  }
};

module.exports = verifyToken;
