import { NextResponse } from 'next/server'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!
const GEOJSON_URL = `${SUPABASE_URL}/storage/v1/object/public/aerodata/airportRaw.json`

export async function GET() {
  try {
    const res = await fetch(GEOJSON_URL)
    if (!res.ok) throw new Error(`Status ${res.status}`)
    const geojson = await res.text()

    return new NextResponse(geojson, {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        // browsers always revalidate; CDN caches for 24h, and will serve stale while revalidating
        'Cache-Control': 'public, max-age=0, s-maxage=31536000, stale-while-revalidate=3600',
        // optionally give Vercel its own header:
        // 'Vercel-CDN-Cache-Control': 'max-age=86400'
      },
    })
  } catch (err) {
    console.error('fetch airports failed:', err)
    return NextResponse.json(
      { error: 'Failed to fetch airports' },
      { status: 502 }
    )
  }
}