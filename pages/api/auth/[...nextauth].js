import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axiosInstance from "../../../services/axios";

const credentialInstance = CredentialsProvider({
  async authorize(credentials) {
    const { username, password } = credentials;
    const resGetUser = await axiosInstance.get("/users/login", {
      params: { username, password },
    });
    const user = resGetUser.data[0];

    if (!user) {
      throw new Error("Username atau Password salah");
    }

    return { email: user.email };
  },
});

export default NextAuth({
  session: {
    jwt: true,
  },
  providers: [credentialInstance],
});
