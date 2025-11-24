import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { createGuest, getGuest } from "./data-service";
import bcrypt from "bcryptjs";
import Credentials from "next-auth/providers/credentials";
const authConfig = {
  providers: [
    Google({
      clientId: process.env.AUTH_GOODLE_ID,
      clientSecret: process.env.AUTH_GOODLE_SECRET,
    }),

    Credentials({
      name: "credentials",
      credentials: {
        email: {},
        password: { type: "password" },
      },

      async authorize({ email, password }) {
        const guest = await getGuest(email);

        if (!guest) return null;
        if (!guest.password) return null; // OAuth user → no password

        const match = await bcrypt.compare(password, guest.password);
        if (!match) return null;

        return {
          id: guest.id,
          email: guest.email,
          name: guest.fullName,
        };
      },
    }),
  ],

  callbacks: {
    authorized({ auth }) {
      return !!auth?.user;
    },

    async signIn({ user, account }) {
      try {
        // OAuth login (Google)
        if (account.provider !== "credentials") {
          const existingGuest = await getGuest(user.email);

          // Create guest if not exist
          if (!existingGuest) {
            await createGuest({
              email: user.email,
              fullName: user.name,
              password: null, // OAuth users have NO password
            });
          }

          return true;
        }

        // Credentials login already validated in authorize()
        return true;
      } catch (err) {
        console.error("Sign-in error:", err);
        return false;
      }
    },

    async session({ session }) {
      const guest = await getGuest(session.user.email);

      session.user.guestId = guest.id;

      // ⭐ ADD THESE 2 LINES
      session.user.name = guest.fullName;
      session.user.image = guest.image;

      return session;
    },
  },

  pages: {
    signIn: "/login",
  },
};

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth(authConfig);
