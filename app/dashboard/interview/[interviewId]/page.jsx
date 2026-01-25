import InterviewClient from "./InterviewClient";

export default async function InterviewPage({ params }) {
  const { interviewId } = await params;
  return <InterviewClient interviewId={interviewId} />;
}
