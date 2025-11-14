import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import "next-auth/jwt";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [GitHub, Google],
  basePath: "/api/auth",
  session: { strategy: "jwt" },

  callbacks: {
    authorized({ request, auth }) {
      const { pathname } = request.nextUrl;
      if (pathname === "/dashboard") return !!auth;
      return true;
    },

    async jwt({ token, user, account, session, trigger }) {
      if (user) {
        token.id = user.id;
      }

      if (account) {
        switch (account.provider) {
          case "github":
            token.accessToken = account.access_token;
            break;
          case "google":
            token.googleAccessToken = account.access_token;
            break;
          default:
            break;
        }
      }

      if (trigger === "update" && session?.user?.name) {
        token.name = session.user.name;
      }

      return token;
    },

    async session({ session, token }) {
      if (token.id) {
        session.user.id = token.id;
      } else if (token.sub) {
        session.user.id = token.sub;
      }

      if (token.accessToken) session.accessToken = token.accessToken;
      if (token.googleAccessToken)
        session.googleAccessToken = token.googleAccessToken;

      return session;
    },
  },
});
