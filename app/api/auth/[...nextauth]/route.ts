import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"

if (!process.env.GITHUB_ID || !process.env.GITHUB_SECRET) {
  throw new Error('GitHub OAuth credentials are required')
}

const handler = NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      console.log('Sign in attempt:', {
        email: user.email,
        allowedEmails: process.env.ALLOWED_GITHUB_EMAILS
      })
      const allowedUsers = (process.env.ALLOWED_GITHUB_EMAILS || '').split(',')
      return allowedUsers.includes(user.email || '')
    },
  },
  pages: {
    signIn: '/admin/login',
    error: '/admin/login', // Error code passed in query string
  },
  debug: true, // Enable debug mode
})

export { handler as GET, handler as POST }
