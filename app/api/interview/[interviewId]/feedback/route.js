import { NextResponse } from 'next/server'
import { db } from '@/utils/db'
import { UserAnswer } from '@/utils/schema'
import { eq } from 'drizzle-orm'

export async function GET(_request, { params }) {
  const { interviewId } = params

  if (!process.env.DATABASE_URL) {
    console.warn('DATABASE_URL is not set; returning empty feedback')
    return NextResponse.json({ data: [] })
  }

  try {
    const rows = await db
      .select()
      .from(UserAnswer)
      .where(eq(UserAnswer.mockIdRef, interviewId))
      .orderBy(UserAnswer.id)

    return NextResponse.json({ data: rows })
  } catch (error) {
    console.error('Error fetching interview feedback', error)
    return NextResponse.json({ data: [], error: 'DB_UNAVAILABLE' }, { status: 500 })
  }
}
