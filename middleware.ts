import { NextResponse } from 'next/server'

export async function middleware(req: any, res: any, next: any) {
  if (req.cookies.get("infshop.token")) {

    const { value } = req.cookies.get("infshop.token")

    const apiToken: any = await fetch(`${req.nextUrl.origin}/api/auth/recovery/token`,
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
      return NextResponse.redirect(new URL('/account', req.url))
    }
  } else {
    if (req.nextUrl.pathname.startsWith('/cart')) {
      return NextResponse.rewrite(new URL('/login', req.url))
    }
    else if (req.nextUrl.pathname.startsWith('/precart')) {
      return NextResponse.rewrite(new URL('/login', req.url))
    }
    else if (req.nextUrl.pathname.startsWith('/provider')) {
      return NextResponse.rewrite(new URL('/login', req.url))
    }
    else if (req.nextUrl.pathname.startsWith('/categories')) {
      return NextResponse.rewrite(new URL('/login', req.url))
    }
    else if (req.nextUrl.pathname.startsWith('/admin')) {
      return NextResponse.rewrite(new URL('/login', req.url))
    }
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/login', '/cart', '/precart', '/provider', '/categories', '/admin'],
}
