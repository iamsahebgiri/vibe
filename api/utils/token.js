import jwt from 'jsonwebtoken';

// eslint-disable-next-line import/prefer-default-export
export const generateToken = (user) => {
  const token = jwt.sign(
    {
      userId: user.id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '30d',
    },
  );
  return token;
};
