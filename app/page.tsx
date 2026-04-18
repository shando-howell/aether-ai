import { SignInButton, SignedIn, SignedOut } from "@clerk/nextjs";
import Link from "next/link";
import { Brain, CpuIcon } from "lucide-react";

export default function Home() {
  return (
    <div className="p-4">
      <div className="flex flex-row">
        <div className="text-gray-400 text-4xl uppercase bold flex-1">
          <h1>Aether AI</h1>
        </div>
        <div>
          <SignedIn>
            <Link href="/dashboard">
              <button className="bg-green-600 p-2 text-white">
                Dashboard
              </button>
            </Link>
          </SignedIn>

          <SignedOut>
            <SignInButton
              mode="modal"
              fallbackRedirectUrl={"/dashboard"}
              forceRedirectUrl={"/dashboard"}
            >
              <button className="bg-green-600 p-2 text-white">
                Sign In
              </button>
            </SignInButton>
          </SignedOut>
        </div>  
      </div>
      
      <div className="sm:py-2 py-1 sm:text-6xl text-4xl bg-clip-text text-transparent bg-linear-to-r from-teal-600 to-green-600 items-center text-center sm:m-16 m-12">
        <h1>Your New Study Companion.</h1>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
        <div className="grid grid-rows-2 gap-1">
          <div className="row-span-3 row-start-1 w-full px-4 mx-auto max-w-7xl items-center text-center">
            <div className="flex justify-center">
              <div className="py-2">
                <CpuIcon className="h-30 w-30 text-gray-400" />
              </div>
            </div>
            <p className="text-gray-400 sm:text-4xl text-2xl">Engineered for Coders</p>
            <p className="text-gray-400 sm:text-2xl">Built to be the on the go resource for the modern web developer.</p>
          </div>
        </div>
        
        <div className="grid grid-rows-2 gap-1">
          <div className="row-span-3 row-start-1 w-full px-4 mx-auto max-w-7xl items-center text-center">
            <div className="flex justify-center">
              <div className="py-2">
                <Brain className="h-30 w-30 text-gray-400" />
              </div>
            </div>
            <p className="text-gray-400 sm:text-4xl text-2xl">Powered by Anthropic</p>
            <p className="text-gray-400 sm:text-2xl">Using the power of Claude Sonnet to generate premium responses.</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex justify-center text-gray-400 sm:text-2xl sm:mt-28 mt-6">
        <p>Aether AI &copy; 2026</p>
      </div>
    </div>
  );
}
