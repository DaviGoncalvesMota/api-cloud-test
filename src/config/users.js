import dotenv from "dotenv";
dotenv.config();

export const users = [
    { id: process.env.ID1, username: process.env.USER_1, password: process.env.PASSWORD_1 },
    { id: process.env.ID2, username: process.env.USER_2, password: process.env.PASSWORD_2 },
];
