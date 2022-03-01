import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";
let userSession = null;
const prisma = new PrismaClient();

export default NextAuth({
  cookie: {
    secure: process.env.NODE_ENV && process.env.NODE_ENV === "production",
  },
  session: {
    jwt: true,
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  // adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "johndoe@example.com",
        },
        password: { label: "Password", type: "password" },
      },

      authorize: async (credentials) => {
        console.log("AUTHORIZING");
        const result = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
          include: {
            Auth: {
              select: {
                password: true,
              },
            },
          },
        });
        console.log("RESULT: ", result);
        if (result) {
          console.dir(result, { depth: 0 });
          if (result.Auth.password === credentials.password) {
            console.log("AUTHORIZED");
            // create session

            return {
              id: result.id,
              email: result.email,
            };
          }
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt(token, user, account) {
      console.log("JWT CALLED");
      if (user) {
        token.id = user.id;
      }

      console.log("FINAL", token);
      return token;
    },
    async session(session, user, token) {
      console.log("SESSION CALLED");
      if (token) {
        session.id = token.id;
      }
      if (user) {
        session.user = user;
      }

      return session;
    },
    async signIn(user, account, profile) {
      console.log("SIGN IN CALLED");
      return true;
    },
    async redirect({ url, baseUrl }) {
      console.log("REDIRECT CALLED");
      return baseUrl;
    },
  },
  secret: "test",
  jwt: {
    secret: "test",
    encryption: true,
  },
});
