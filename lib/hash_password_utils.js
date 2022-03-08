import bcrypt from "bcrypt";

export const hashPassword = (password) => {
  const hashedPassword = bcrypt.hashSync(password, 10);
  return hashedPassword;
};

export const compareHash = (password, hash) => {
  return bcrypt.compareSync(password, hash);
};
