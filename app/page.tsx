import { Brain, CpuIcon } from "lucide-react";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <div>
      <Navbar />
      <main className="relative overflow-hidden">
        <div className="relative mx-auto max-w-7xl px-4 py-60 md:py-45">
          <div className="py-1 md:py-2 text-4xl md:text-6xl bg-clip-text text-transparent bg-linear-to-r from-teal-600 to-green-600 items-center text-center mt-12 md:mt-16">
            <h1>Your New Study Companion.</h1>
          </div>
          <div className="text-2xl items-center text-center text-gray-400 mb-8 md:mb-16">
            <p>Built to be the on the go resource for the modern web developer.</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 mb-12 md:mb-24">    
          <div className="grid grid-rows-2 gap-1 mb-8 md:mb-0">
            <div className="row-span-3 row-start-1 w-full px-4 mx-auto max-w-7xl items-center text-center">
              <div className="flex justify-center">
                <div className="py-2">
                  <Brain className="h-30 w-30 text-gray-400" />
                </div>
              </div>
              <p className="text-gray-400 text-2xl md:text-4xl">Powered by Anthropic</p>
              <p className="text-gray-400 text-2xl">Using the power of Claude Sonnet to generate premium responses.</p>
            </div>
          </div>

          <div className="grid grid-rows-2 gap-1">
            <div className="row-span-3 row-start-1 w-full px-4 mx-auto max-w-7xl items-center text-center">
              <div className="flex justify-center">
                <div className="py-2">
                  <CpuIcon className="h-30 w-30 text-gray-400" />
                </div>
              </div>
              <p className="text-gray-400 text-2xl md:text-4xl">Agentic Search</p>
              <p className="text-gray-400 text-2xl">Harness the power of Agentic search tool-calling for up to date information.</p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <div className="flex justify-center text-gray-400 text-2xl mt-6 md:mt-18">
        <p>Aether AI &copy; 2026</p>
      </div>
    </div>
  );
}
