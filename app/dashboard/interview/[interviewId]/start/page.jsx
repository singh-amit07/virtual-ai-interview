'use client'
import { db } from '@/utils/db';
import { users } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import { useEffect, useState } from 'react';
import QuestionSection from './_components/QuestionSection';
import dynamic from 'next/dynamic';
import { useParams } from 'next/navigation';

// Load RecordAnswerSection only on the client to avoid `window is not defined` from react-hook-speech-to-text
const RecordAnswerSection = dynamic(
  () => import('./_components/RecordAnswerSection'),
  { ssr: false }
);

function StartInterview() {
  const params = useParams();
  const interviewId = params?.interviewId;

  const [interviewData, setInterviewData] = useState();
  const [mockInterviewQuestions, setMockInterviewQuestions] = useState();
  const [activeQuestionIndex, setactiveQuestionIndex] = useState(0);

  useEffect(() => {
    if (!interviewId) return;
    console.log(interviewId);
    GetInterviewDetails();
  }, [interviewId]);

  const GetInterviewDetails = async () => {
    const result = await db
      .select()
      .from(users)
      .where(eq(users.mockId, interviewId));

    const jsonMockResp = JSON.parse(result[0].jsonMockResp);
    console.log(jsonMockResp);
    setMockInterviewQuestions(jsonMockResp);
    setInterviewData(result[0]);
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Questions */}
        <QuestionSection
          MockInterviewQuestions={mockInterviewQuestions}
          activeQuestionIndex={activeQuestionIndex}
        />

        {/* Video / Audio Recording */}
        <RecordAnswerSection />
      </div>
    </div>
  );
}

export default StartInterview
