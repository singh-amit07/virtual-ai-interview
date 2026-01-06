import { Lightbulb, Volume2 } from 'lucide-react'
import React from 'react'

function QuestionSection({MockInterviewQuestions,activeQuestionIndex}) {

     const textToSpeach=(text)=>{
        if('speechSynthesis' in window){
            const speech=new SpeechSynthesisUtterance(text);
          window.speechSynthesis.speak(speech);
        }
        else{
           alert('Sorry, your browser does not support text to speech')
        }
     }

  return MockInterviewQuestions&&(
    <div className='p-5 border rounded-lg my-10'>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 ">
            {MockInterviewQuestions && MockInterviewQuestions.map((question,index)=>(
                <h2 
                key={index}
                className={`p-2 border rounded-full *:text-xs text-sm
                 text-center  cursor-pointer  ${  activeQuestionIndex==index ? `bg-blue-400 text-white` : '' 

                 }`}>Question #{index+1}</h2>
            ))}
     
        
    </div>
    <div className='my-5 mx-4 flex items-center gap-3 flex-col'>
      <h2 className='text-md md:text-lg flex-1'>
        {MockInterviewQuestions[activeQuestionIndex]?.question}
      </h2>
      <button
        type='button'
        className='p-2 rounded-full border border-black bg-black text-white hover:bg-gray-900 flex items-center justify-center'
        onClick={() => textToSpeach(MockInterviewQuestions[activeQuestionIndex]?.question)}
      >
        <Volume2 className='w-6 h-6 text-white' />
      </button>
    </div>

    <div className='border rounded-lg p-5 bg-blue-100 mt-20'>
        <h2 className='flex gap-2 items-center text-blue-500'>
        <Lightbulb/>
        <strong>Note:</strong>
        </h2>
        <h2 className='text-sm text-blue-500 my-2'>
          {process.env.NEXT_PUBLIC_QUESTION_NOTE}  
        </h2>
    </div>
    
    </div>
  )
}

export default QuestionSection
