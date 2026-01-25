"use client";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import { GoogleGenAI } from "@google/genai";
import { Mic, StopCircle } from "lucide-react";
import moment from "moment";
import Image from "next/image";
import { useEffect, useState } from "react";
import useSpeechToText from "react-hook-speech-to-text";
import Webcam from "react-webcam";
import { toast } from "sonner";

function RecordAnswerSection({
  MockInterviewQuestions,
  activeQuestionIndex,
  interviewData,
}) {
  const [userAnswer, setUserAnswer] = useState("");
  const [feedbackResult, setFeedbackResult] = useState(null);
  const { user } = useUser();
  const [loading, setLoading] = useState(false);

  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
    setResults,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
  });

  useEffect(() => {
    results.map((result) =>
      setUserAnswer((prevAns) => prevAns + result?.transcript),
    );
  }, [results]);

  useEffect(() => {
    if (!isRecording && userAnswer.length > 10) {
      UpdateUserAnswer();
    }
  }, [userAnswer]);

  const StartStopRecording = async () => {
    console.log("SaveUserAnswer clicked", {
      isRecording,
      userAnswerLength: userAnswer?.length,
    });

    if (isRecording) {
     

      stopSpeechToText();
    } else {
      

      try {
        startSpeechToText();
      } catch (error) {
        if (error.name === "InvalidStateError") {
          
        } else {
          throw error;
        }
      }
    }
  };

  const UpdateUserAnswer = async () => {
    setLoading(true);

    try {
      console.log("Sending prompt to Gemini for feedback...");
      const feedbackPrompt =
        "Question: " +
        MockInterviewQuestions[activeQuestionIndex]?.question +
        ", User Answer: " +
        userAnswer +
        ", Depends on question and user answer for given interview question " +
        "please give us rating for answer (out of 5) and feedback as area of improvement if any " +
        'in just 3 to 5 lines in JSON format with "rating" and "feedback" fields only.';

      const ai = new GoogleGenAI({
        apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY,
      });

      if (!process.env.NEXT_PUBLIC_GEMINI_API_KEY) {
        console.warn("NEXT_PUBLIC_GEMINI_API_KEY is not defined");
      }

      const model = "gemini-3-flash-preview";
      const contents = [
        {
          role: "user",
          parts: [
            {
              text: feedbackPrompt,
            },
          ],
        },
      ];

      const result = await ai.models.generateContent({
        model,
        contents,
      });

      console.log("Raw Gemini response object", result);

      let mockJsonResp = result.text;
      console.log("Raw Gemini text response before cleaning:", mockJsonResp);

      mockJsonResp = mockJsonResp
        .replace(/```json/i, "")
        .replace(/```/g, "")
        .trim();

      const parsed = JSON.parse(mockJsonResp);
      console.log("Parsed AI feedback JSON:", parsed);

      
      setFeedbackResult(parsed);
      toast("AI feedback generated");

      const resp = await fetch("/api/save-answer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mockIdRef: interviewData?.mockId,
          question: MockInterviewQuestions[activeQuestionIndex]?.question,
          correctAns: MockInterviewQuestions[activeQuestionIndex]?.answer,
          userAns: userAnswer,
          feedback: parsed.feedback,
          rating: parsed.rating,
          userEmail: user?.primaryEmailAddress?.emailAddress,
          createdAt: moment().format("DD-MM-yyyy"),
        }),
      });

      if (!resp.ok) {
        toast("Failed to save your answer, please try again");
      } else {
        toast("User Answer recorded successfully");
        setUserAnswer("");
        setResults([]);
      }
    } catch (err) {
      console.error("Error while generating/saving feedback", err);
      toast("Error while saving your answer");
    }

    setResults([]);
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex flex-col mt-20 justify-center items-center bg-black rounded-lg p-5">
        <Image
          src="/webcam.png"
          width={300}
          height={200}
          alt="Webcam preview placeholder"
          className="absolute"
        />
        <Webcam
          mirrored={true}
          style={{
            height: 300,
            width: "100",
            zIndex: 10,
          }}
        />
      </div>
      <Button
        disabled={loading}
        variant="outline"
        className="my-10 border border-black !text-black bg-transparent hover:bg-gray-100 hover:!text-black"
        onClick={StartStopRecording}
      >
        {isRecording ? (
          <h2 className="text-red-700 flex gap-2">
            <StopCircle /> Stop Recording
          </h2>
        ) : (
          <h2 className="flex gap-2 items-center">
            <Mic /> Record Answer
          </h2>
        )}
      </Button>
    </div>
  );
}

export default RecordAnswerSection;
