import { SignInButton, SignedIn, SignedOut } from "@clerk/nextjs";
import Link from "next/link";

export default function Navbar() {
    return (
        <header className="sticky top-0 w-full backdrop-blur">
            <div className="flex flex-row">
                    <div className="text-gray-400 text-4xl uppercase bold flex-1 py-2">
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