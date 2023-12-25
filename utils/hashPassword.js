import bcrypt from "bcrypt";

export const hashPassword = async (password, saltRound = 5) => {
  const salt = await bcrypt.genSalt(saltRound);
  const hash = await bcrypt.hash(password, salt);
  return hash;
};