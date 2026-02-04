"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";


export default function Home() {
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
 const router = useRouter()

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/mock-interviews");
        if (!res.ok) {
          throw new Error(`Failed to fetch: ${res.status}`);
        }
        const json = await res.json();
        setInterviews(json.data || []);
      } catch (e) {
        console.error("Failed to load mock interviews", e);
        setError("Could not load data from database");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
   <div
      className="relative min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/interview.webp')" }}>
      <div className="absolute inset-0 bg-black/70 pointer-events-none"></div>

      

       <div className="absolute top-6 right-8 z-50">
        <button
          onClick={() => router.push('/sign-in')}
          className="px-5 py-2 border border-white text-white hover:bg-white hover:text-black transition rounded">
          Sign In
        </button>
      </div>

     

      <div className="absolute left-10 bottom-10 z-10 max-w-sm text-white">
        <h3 className="text-lg font-semibold mb-2">Note:</h3>
        <p className="text-sm leading-relaxed text-gray-200">
          This system is developed as a college project to help students
          practice interview sessions. It provides performance ratings
          and constructive feedback for skill improvement.
        </p>
      </div>


      
      <div className="relative z-10 flex items-center justify-center min-h-screen text-center px-6">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4 tracking-wide text-white">
            Welcome to the Intelligent Virtual Interview System
          </h1>

          <p className="max-w-2xl mx-auto text-base md:text-lg text-gray-200 leading-relaxed">
            This project provides a virtual platform where candidates can
            practice interview sessions. The system evaluates responses,
            assigns performance ratings, and provides constructive feedback
            to enhance interview skills.
          </p>
        </div>
      </div>
    </div>
  


  );
}
