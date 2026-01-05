"use client"
import { Button } from '@/components/ui/button'
import { db } from '@/utils/db'
import { users } from '@/utils/schema'
import { eq } from 'drizzle-orm'
import Webcam from 'react-webcam'
import { Lightbulb, WebcamIcon } from 'lucide-react'
import React ,{ useEffect, useState }  from 'react'


function interview({params}) {

  const resolvedParams = React.use(params);
  const [interviewData,setInterviewData]=useState(null);
  const [webCamEnabled,setWebCamEnabled]=useState(false);

  useEffect(()=>{
    console.log(resolvedParams.interviewId)
    GetInterviewDetails();
  },[resolvedParams.interviewId])

  const GetInterviewDetails=async()=>{
    const result = await db.select().from(users).where(eq(users.mockId, resolvedParams.interviewId))

    
    setInterviewData(result[0]);
  }
  return (
    <div className='my-10  flex justify-center flex-col items-center'>
      <h2 className='font-bold text-2xl'>Let's Get Started</h2>

       <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
        
        {interviewData && (
        <div className='flex flex-col my-5 gap-5'>
          <div className='flex flex-col p-5 rounded-lg border gap-5'> 
          <h2 className='text-lg'>
            <strong>Job Role/Job Position: </strong>
            {interviewData.jobPosition}
          </h2>
          <h2 className='text-lg'>
            <strong>Job Description/Tech Stack: </strong>
            {interviewData.jobDesc}
          </h2>
          <h2 className='text-lg'>
            <strong>Years of Experience: </strong>
            {interviewData.jobExperience}
          </h2>
        </div>
        <div className='p-5 border rounded-lg border-yellow-300 bg-yellow-100'>
          <h2 className='flex gap-2 items-center text-yellow-400'><Lightbulb/><strong>Information</strong></h2>
          <h2 className='my-5 text-yellow-500'>{process.env.NEXT_PUBLIC_INFORMATION}</h2>
          </div>
        </div>
      )}

       <div>
       {webCamEnabled?<Webcam
       onUserMedia={()=>setWebCamEnabled(true)}
       onUserMediaError={()=>setWebCamEnabled(false)} 
       mirrored={true}    
       style={{
        width:300,
        height:300
       }}
       />
       :
       <>
        <WebcamIcon className='w-full h-72 my-7 p-20 bg-secondary rounded-lg border'/>
        <Button  variant="ghost"  className="w-full" onClick={()=>setWebCamEnabled(true)}>Enable Web Cam and Microphone</Button>
        </>
       }

      </div>

        </div>     

<div className='flex justify-end items-end w-full px-6'>
  <Button>Start Interview</Button>
</div>
    </div>
  )
}

export default interview
