import jwt from "jsonwebtoken";
import User from "../Models/userModels.js";

const isLogin = (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token)
      return res
        .status(500)
        .send({ success: false, message: "Unauthorized User" });
    const decode = jwt.verify(token, process.env.SECRET_JWT);
    if (!decode)
      return res.status(500).send({
        success: false,
        message: "Unauthorized User - unmatched Token",
      });
    const user = User.findById(decode.userId).select("-password");
    if (!user)
      return res
        .status(500)
        .send({ success: false, message: "User not found" });
    (req.user = user), next();
  } catch (error) {
    console.log(`Erros in middleware isLogin ${error}`);
    res.status(500).send({
      success: false,
      message: error,
    });
  }
};

export default isLogin;
