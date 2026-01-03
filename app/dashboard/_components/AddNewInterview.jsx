"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useState } from "react";

import { Textarea } from "@/components/ui/textarea";
import { db } from "@/utils/db";
import { users } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { LoaderCircle } from "lucide-react";

function AddNewInterview() {
  const [openDialog, setOpenDialog] = useState(false);
  const [jobPosition, setJobPosition] = useState();
  const [jobDescription, setJobDescription] = useState();
  const [jobexperience, setjobExperience] = useState();
  const [loading, setLoading] = useState(false);
  const [jsonResponse, setJsonResponse] = useState([]);
  const [error, setError] = useState(null);
  const { user } = useUser();

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    console.log(jobDescription, jobPosition, jobexperience);
    const ai = new GoogleGenAI({
      apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY,
    });

    const inputpromt = `Job Position: ${jobPosition}, Job Description: ${jobDescription}, Years of Experience: ${jobexperience}. Based on this information, please give me ${process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT} interview questions with answers in JSON format. The JSON should have "question" and "answer" as fields.`;

    const MockjsonResp = result.response
      .text()
      .replace("json", "")
      .replace("", "");
    console.log(JSON.parse(MockjsonResp));
    setJsonResponse(MockjsonResp);

    if (!MockjsonResp) {
      const resp = await db
        .insert(users)
        .values({
          mockId: uuidv4(),
          jsonMockResp: MockjsonResp,
          jobPosition: jobPosition,
          jobDesc: jobDescription,
          jobExperience: jobexperience,
          createdBy: user?.primaryEmailAddress?.emailAddress,
          createdAt: moment().format("YYYY-MM-DD"),
        })
        .returning({ mockId: users.mockId });
      console.log("Inserted ID:", resp);
    } else {
      console.log("ERROR");
    }
    setLoading(false);
  };

  return (
    <div>
      <div
        className="p-10 mr-9 border rounded-lg bg-secondary hover:scale-105 hover:shadow-md cursor-pointer transition-all"
        onClick={() => setOpenDialog(true)}
      >
        <h2 className="font-bold text-lg text-center">+ Add New </h2>
      </div>
      <Dialog open={openDialog}>
        <DialogContent className="max-w-15xl">
          <DialogHeader>
            <DialogTitle className="text-2xl ">
              Tell us more about your job interview
            </DialogTitle>

            <form onSubmit={onSubmit}>
              <div>
                <h2>
                  Add details about your job position/role, Job description and
                  year of experience
                </h2>
                <div className="mt-5 my-3 ">
                  <label className="font-medium">Job Role/Job Position</label>
                  <Input
                    placeholder="Ex.Full Stack Developer"
                    required
                    onChange={(e) => setJobPosition(e.target.value)}
                  />
                </div>
                <div className="my-3">
                  <label className="font-medium">
                    Job Description/ Tech Stack(In Short)
                  </label>
                  <Textarea
                    placeholder="Ex. React, Angular , NodeJs , mySQL , etc"
                    required
                    onChange={(e) => setJobDescription(e.target.value)}
                  />
                </div>
                <div className=" my-3 ">
                  <label className="font-medium">Years of experiences</label>
                  <Input
                    placeholder="Ex.5"
                    type="number"
                    max="50"
                    required
                    onChange={(e) => setjobExperience(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex gap-5 justify-end">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setOpenDialog(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={loading}>
                  {loading ? (
                    <>
                      <LoaderCircle className="animate-spin" />
                      'Generating from AI'
                    </>
                  ) : (
                    "Start Interview"
                  )}
                </Button>
              </div>
            </form>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddNewInterview;
