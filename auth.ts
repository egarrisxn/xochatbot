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
      // User object is available only on first sign-in (when 'account' is present)
      if (account) {
        token.id = user.id;
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
      // Assign the ID from the token to the session.user object
      if (token.id) {
        session.user.id = token.id;
      } else if (token.sub) {
        session.user.id = token.sub; // Fallback to token.sub if token.id wasn't set for some reason
      }
      if (token.accessToken) session.accessToken = token.accessToken;
      if (token.googleAccessToken) session.googleAccessToken = token.googleAccessToken;
      return session;
    },
  },
});

// export const { handlers, auth, signIn, signOut } = NextAuth({
//   providers: [GitHub, Google],
//   basePath: "/api/auth",
//   session: { strategy: "jwt" },
//   callbacks: {
//     authorized({ request, auth }) {
//       const { pathname } = request.nextUrl;
//       if (pathname === "/dashboard") return !!auth;
//       return true;
//     },
//     jwt({ token, trigger, session, account }) {
//       if (trigger === "update") token.name = session.user.name;
//       if (account) {
//         switch (account.provider) {
//           case "github":
//             token.accessToken = account.access_token;
//             break;
//           case "google":
//             token.googleAccessToken = account.access_token;
//             break;
//           default:
//             break;
//         }
//       }
//       return token;
//     },
//     async session({ session, token }) {
//       if (token.accessToken) session.accessToken = token.accessToken;
//       if (token.googleAccessToken) session.googleAccessToken = token.googleAccessToken;
//       console.log("NextAuth Session Callback - Session object:", session);
//       return session;
//     },
//   },
// });
