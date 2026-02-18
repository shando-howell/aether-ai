import { SignInButton, SignedIn, SignedOut } from "@clerk/nextjs";
import Link from "next/link";
import { Brain, CpuIcon } from "lucide-react";

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
      
      <div className="text-6xl bg-clip-text text-transparent bg-linear-to-r from-teal-600 to-green-600 items-center text-center mt-16">
        <h1>Your New Assistant.</h1>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="grid grid-rows-2 gap-2">
          <div className="row-span-3 row-start-2 w-full px-4 mx-auto max-w-7xl items-center text-center">
            <p className="text-gray-400 text-2xl">Designed for Coding</p>
            <div className="flex justify-center">
              <div className="py-2">
                <CpuIcon className="h-40 w-40 text-green-600" />
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-rows-2 gap-4">
          <div className="row-span-3 row-start-2 w-full px-4 mx-auto max-w-7xl items-center text-center">
            <p className="text-gray-400 text-2xl">Powered by Anthropic</p>
            <div className="flex justify-center">
              <div className="py-2">
                <Brain className="h-40 w-40 text-green-600" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
