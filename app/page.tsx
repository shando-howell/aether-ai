import { Button } from "@/components/ui/button";
import { SignInButton, SignedIn, SignedOut } from "@clerk/nextjs";
import Link from "next/link";

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
      <div className="flex items-center justify-center">
        <main className="w-full px-4 py-8 mx-auto max-w-7xl flex flex-col items-center text-center">
          <h2 className="text-white text-3xl">AI Agent</h2>
          <p className="text-gray-400 text-2xl">Designed for Software Development</p>
        </main>
      </div>
    </div>
  );
}
