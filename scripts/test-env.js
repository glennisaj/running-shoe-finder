require('dotenv').config({ path: '.env.local' })

console.log({
  GITHUB_ID: process.env.GITHUB_ID,
  GITHUB_SECRET_EXISTS: !!process.env.GITHUB_SECRET,
  NEXTAUTH_URL: process.env.NEXTAUTH_URL,
  ALLOWED_EMAILS: process.env.ALLOWED_GITHUB_EMAILS
})
