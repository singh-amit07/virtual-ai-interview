'use client'

import React, { useEffect, useState } from 'react'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { ChevronsUpDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useRouter, useParams } from 'next/navigation'

function Feedback() {
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const router = useRouter()
  const { interviewId } = useParams()

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const res = await fetch(`/api/interview/${interviewId}/feedback`)
        if (!res.ok) {
          throw new Error('Failed to load feedback')
        }
        const data = await res.json()
        setRows(data.data || [])
      } catch (err) {
        console.error('Error fetching feedback', err)
        setError('Failed to load feedback')
      } finally {
        setLoading(false)
      }
    }

    if (interviewId) {
      fetchFeedback()
    }
  }, [interviewId])

  const overallRating =
    rows.length > 0
      ? (
          rows.reduce((sum, row) => sum + (Number(row.rating) || 0), 0) /
          rows.length
        ).toFixed(1)
      : null

  return (
    <div className='p-10'>
      <h2 className='text-2xl font-bold text-green-500'>Congratulation!</h2>
      <h2 className='font-bold text-2xl'>Here is your interview feedback</h2>

      {overallRating && !loading && !error && (
        <h2 className='text-blue-400 text-lg my-3'>
          Your overall interview rating: <strong>{overallRating}/5</strong>
        </h2>
      )}

      <h2 className='text-sm text-gray-500 mb-4'>
        Find below interview questions with correct answer, your answer and feedback
        for improvement
      </h2>

      {loading && <p className='text-sm text-gray-500'>Loading feedback...</p>}
      {error && <p className='text-sm text-red-500'>{error}</p>}

      {rows.map((item, index) => (
        <Collapsible key={index} className='mt-7'>
          <CollapsibleTrigger className='p-2 bg-secondary rounded-lg my-2 text-left gap-7 w-full'>
            {item.question}
            <ChevronsUpDown className='h-5 w-5' />
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className='flex flex-col gap-2'>
              <h2 className='text-red-500 p-2 rounded-lg'>
                <strong>Rating: </strong>
                {item.rating}
              </h2>
              <h2 className='p-2 border rounded-lg bg-red-50 text-sm text-red-900'>
                <strong>Your Answer: </strong>
                {item.userAns}
              </h2>
              <h2 className='p-2 border rounded-lg bg-green-50 text-sm text-green-900'>
                <strong>Correct Answer: </strong>
                {item.correctAns}
              </h2>
              <h2 className='p-2 border rounded-lg bg-blue-50 text-sm text-blue-900'>
                <strong>Feedback: </strong>
                {item.feedback}
              </h2>
            </div>
          </CollapsibleContent>
        </Collapsible>
      ))}

      {!loading && !error && rows.length === 0 && (
        <p className='text-sm text-gray-500'>No feedback found yet.</p>
      )}

      <Button className='mt-6' onClick={() => router.replace('/dashboard')}>
        Go Home
      </Button>
    </div>
  )
}

export default Feedback
