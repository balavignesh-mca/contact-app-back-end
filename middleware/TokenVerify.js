const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

const tokenVerify = asyncHandler(async (req, res, next) => {
  let token;

  const authorization = req.headers.Authorization || req.headers.authorization;

  if (authorization && authorization.startsWith("Bearer")) {
    token = authorization.split(" ")[1];
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (err) {
        res
          .status(404)
          .json({
            success: false,
            message: "Oops! Something went wrong. Please try logging in again.",
          });
      } else {
        req.user = decoded.user;
        
        next();
      }
    });
  } else {
    res
      .status(404)
      .json({
        success: false,
        message: "Authentication failed. Please log in to get access.",
      });
  }
});

module.exports = tokenVerify;
