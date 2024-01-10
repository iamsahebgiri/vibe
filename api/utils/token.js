import jwt from "jsonwebtoken";

export const generateToken = (user) => {
  const token = jwt.sign(
    {
      userId: user.id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "30d",
    }
  );
  return token;
};
