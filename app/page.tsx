import { SignInButton, SignedIn, SignedOut } from "@clerk/nextjs";
import Link from "next/link";
import { Brain, CpuIcon, MessagesSquare } from "lucide-react";

export default function Home() {
  return (
    <div className="p-4">
      <div className="flex flex-row">
        <div className="text-green-600 text-4xl uppercase bold flex-1">
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
      
      <div className="py-2 text-6xl bg-clip-text text-transparent bg-linear-to-r from-teal-600 to-green-600 items-center text-center m-16">
        <h1>Your New Coding Assistant.</h1>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="grid grid-rows-2 gap-1">
          <div className="row-span-3 row-start-1 w-full px-4 mx-auto max-w-7xl items-center text-center">
            <div className="flex justify-center">
              <div className="py-2">
                <CpuIcon className="h-30 w-30 text-gray-400" />
              </div>
            </div>
            <p className="text-gray-400 text-2xl">Engineered for Coders</p>
            <p className="text-gray-400">Built to be the go-to resource for the modern web programmer.</p>
          </div>
        </div>
        
        <div className="grid grid-rows-2 gap-1">
          <div className="row-span-3 row-start-1 w-full px-4 mx-auto max-w-7xl items-center text-center">
            <div className="flex justify-center">
              <div className="py-2">
                <Brain className="h-30 w-30 text-gray-400" />
              </div>
            </div>
            <p className="text-gray-400 text-2xl">Powered by Anthropic</p>
            <p className="text-gray-400">Using the power of Claude Sonnet to generate premium responses.</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex justify-center text-green-600 mt-42">
        <p className="">Aether AI &copy; 2026</p>
      </div>
    </div>
  );
}
