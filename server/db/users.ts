import { prisma } from "../utils/index";
// import bcrypt from "bcrypt";

export const createUser = (userData) => {
  const finalUserData = {
    ...userData,
    // password: bcrypt.hashSync(userData.password, 10),
    password: userData.password,
  };

  return prisma.user.create({
    data: finalUserData,
  });
};

export const getUserByUsername = (username) => {
  return prisma.user.findUnique({
    where: {
      username,
    },
  });
};

export const getUserById = (userId) => {
  return prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
};