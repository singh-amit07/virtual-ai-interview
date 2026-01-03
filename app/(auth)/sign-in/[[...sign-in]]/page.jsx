import { SignIn } from '@clerk/nextjs'

export default function Page() {
  return(
    <section className="bg-white">
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
       
        <section className="relative flex items-end bg-gray-900 lg:col-span-6 lg:h-full">
          <img
            alt="Login background"
            src="https://www.tubeguruji.com/_next/image?url=%2Flogin.jpg&w=1200&q=75"
            className="absolute inset-0 h-full w-full object-cover opacity-80"
          />
          <div className="relative z-10 p-8 lg:p-12 text-white">
            <h2 className="mt-6 text-3xl font-bold sm:text-4xl md:text-5xl">
              Welcome to Virtual-Interview
            </h2>
            <p className="mt-4 max-w-md leading-relaxed text-white/90">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. 
              Ex suscipit dolorum impedit, dolorem et ipsam.
            </p>
          </div>
        </section>

        
        <main className="flex items-center justify-center px-8 py-12 lg:col-span-6">
          <div className="max-w-md w-full">
           
            <SignIn />
          </div>
        </main>
      </div>
    </section>
  ) 
}