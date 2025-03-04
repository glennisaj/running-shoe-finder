import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    githubId: process.env.GITHUB_ID,
    hasGithubSecret: !!process.env.GITHUB_SECRET,
    nextAuthUrl: process.env.NEXTAUTH_URL,
  })
}
