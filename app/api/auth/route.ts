import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"

export async function GET() {
  const session = await getServerSession()
  
  if (!session) {
    return NextResponse.json({ 
      authenticated: false 
    })
  }

  return NextResponse.json({ 
    authenticated: true,
    user: {
      email: session.user?.email,
      name: session.user?.name,
      image: session.user?.image
    }
  })
}
