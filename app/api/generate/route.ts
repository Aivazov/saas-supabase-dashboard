// app/api/generate/route.ts

import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json()

    // fake gen (without AI for now)
    const tasks = [
      `Learn ${prompt}`,
      `Create project of ${prompt}`,
      `Repeat ${prompt}`,
    ]

    return NextResponse.json({ tasks })
  } catch (error) {
    return NextResponse.json(
      { error: 'Generation error' },
      { status: 500 }
    )
  }
}