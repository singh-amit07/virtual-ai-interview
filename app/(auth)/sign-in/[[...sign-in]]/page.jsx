import Image from 'next/image'
import { SignIn } from '@clerk/nextjs'

export default function Page() {
  return(
    <section className="bg-white">
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
       
        <section className="relative flex items-end bg-gray-900 lg:col-span-6 lg:h-full">
          <Image
  alt="Login background"
  src="https://guptadeepak.com/content/images/size/w2000/2024/07/The-Future-of-AI-and-Its-Impact-on-Humanity.webp"
  className="absolute inset-0 object-cover opacity-80"
  fill
  priority
/>

          
          <div className="relative z-10 p-8 lg:p-12 text-white">
            <h2 className="mt-6 text-3xl font-bold sm:text-4xl md:text-5xl">
              Welcome to Virtual-Interview
            </h2>
            <p className="mt-4 max-w leading-relaxed text-white/90">
             This Virtual Interview System offers an AI-driven platform for interview practice.
It evaluates user responses and provides a structured interview experience.
The project is designed to support effective and confident interview preparation.
            </p>
          </div>
        </section>

        
        <main className="flex items-center justify-center px-8 py-12 lg:col-span-6">
          <div className="max-w-md w-full">
           
            <SignIn 
             routing="path"
             path="/sign-in"
             redirectUrl="/dashboard"
            />
          </div>
        </main>
      </div>
    </section>
  ) 
}