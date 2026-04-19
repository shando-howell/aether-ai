import { SignInButton, SignedIn, SignedOut } from "@clerk/nextjs";
import Link from "next/link";

export default function Navbar() {
    return (
        <header className="sticky top-0 w-full bg-teal-600/60 backdrop-blur z-50">
            <div className="flex flex-row px-4 py-1">
                    <div className="text-green-600 text-4xl uppercase bold flex-1 py-2">
                      <h1>Aether AI</h1>
                    </div>
                    <div className="py-2">
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
        </header>
    )
}