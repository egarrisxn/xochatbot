import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import "next-auth/jwt";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [GitHub, Google],
  basePath: "/auth",
  session: { strategy: "jwt" },
  callbacks: {
    authorized({ request, auth }) {
      const { pathname } = request.nextUrl;
      if (pathname === "/dashboard") return !!auth;
      return true;
    },
    jwt({ token, trigger, session, account }) {
      if (trigger === "update") token.name = session.user.name;
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
      return token;
    },
    async session({ session, token }) {
      if (token.accessToken) session.accessToken = token.accessToken;
      if (token.googleAccessToken)
        session.googleAccessToken = token.googleAccessToken;
      return session;
    },
  },
});
