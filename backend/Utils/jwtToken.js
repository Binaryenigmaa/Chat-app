import jwt from "jsonwebtoken";

const jwtToken = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "20d",
  });
  res.cookie("jwt", token, {
    maxAge: 30 * 24 * 60 * 60 * 1000,
    httpsOnly: true,
    sameSite: "strict",
  });
};

export default jwtToken;
