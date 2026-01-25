import { NextResponse } from 'next/server'
import { db } from '@/utils/db'
import { UserAnswer } from '@/utils/schema'

export async function POST(request) {
  try {
    const body = await request.json()

    const resp = await db.insert(UserAnswer).values({
      mockIdRef: body.mockIdRef,
      question: body.question,
      correctAns: body.correctAns,
      userAns: body.userAns,
      feedback: body.feedback,
      rating: body.rating,
      userEmail: body.userEmail,
      createdAt: body.createdAt,
    })

    return NextResponse.json({ success: true, data: resp })
  } catch (error) {
    console.error('Error saving user answer', error)
    return NextResponse.json(
      { success: false, error: 'Failed to save user answer' },
      { status: 500 }
    )
  }
}