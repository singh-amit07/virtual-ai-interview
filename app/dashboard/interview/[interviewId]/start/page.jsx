'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { useParams } from 'next/navigation';
import QuestionSection from './_components/QuestionSection';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
const RecordAnswerSection = dynamic(
  () => import('./_components/RecordAnswerSection'),
  { ssr: false }
);

function StartInterview() {
  const params = useParams();
  const interviewId = params?.interviewId;

  const [interviewData, setInterviewData] = useState(null);
  const [mockInterviewQuestions, setMockInterviewQuestions] = useState([]);
  const [activeQuestionIndex, setactiveQuestionIndex] = useState(0);

  useEffect(() => {
    if (!interviewId) return;

    async function load() {
      try {
        const res = await fetch(`/api/mock-interviews/${interviewId}`);
        if (!res.ok) {
          throw new Error(`Failed to fetch: ${res.status}`);
        }
        const json = await res.json();
        const data = json.data;

        if (data?.jsonMockResp) {
          const parsed = JSON.parse(data.jsonMockResp);
          setMockInterviewQuestions(parsed);
        }
        setInterviewData(data || null);
      } catch (e) {
        console.error('Failed to load interview questions', e);
        setMockInterviewQuestions([]);
      }
    }

    load();
  }, [interviewId]);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Questions */}
        <QuestionSection
          MockInterviewQuestions={mockInterviewQuestions}
          activeQuestionIndex={activeQuestionIndex}
        />

        {/* Video / Audio Recording */}
        <RecordAnswerSection 
         MockInterviewQuestions={mockInterviewQuestions}
          activeQuestionIndex={activeQuestionIndex}
          interviewData={interviewData}
        
        />
      </div>
      <div className='flex justify-end gap-6 mr-18'>
       {activeQuestionIndex>0 && 
       <Button onClick={()=>setactiveQuestionIndex(activeQuestionIndex-1) }>Previous Question</Button>}
         {activeQuestionIndex!=mockInterviewQuestions?.length-1&&
         <Button onClick={()=>setactiveQuestionIndex(activeQuestionIndex+1) }>Next Question</Button>}
          {activeQuestionIndex==mockInterviewQuestions?.length-1&&
          <Link href={'/dashboard/interview/'+interviewData?.mockId+"/feedback"}>
          <Button>End Interview</Button>
          </Link>}
      </div>
    </div>
  ); 
}

export default StartInterview;
