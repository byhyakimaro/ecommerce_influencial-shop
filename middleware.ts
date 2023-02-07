import { NextResponse } from 'next/server'

export async function middleware(req: any, res: any, next: any) {
  try {

    const { value } = req.cookies.get("infshop.token")

    const apiToken: any = await fetch('http://localhost:3000/api/auth/recovery/token',
    {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({ token: value })
    })
    
    const { user } = await apiToken.json()

    if (req.nextUrl.pathname.startsWith('/login')) {
      return NextResponse.redirect(new URL('/', req.url))
    }
  } catch (err) {
    if (req.nextUrl.pathname.startsWith('/shopping')) {
      return NextResponse.rewrite(new URL('/login', req.url))
    }
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/login', '/shopping'],
}
