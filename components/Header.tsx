import { Button } from "./ui/button";
// import { HamburgerMenuIcon } from "lucide-react";

const Header = () => {
  return (
    <header className="border-b border-green-400 bg-green-500 backdrop-blur-xl sticky top-0 z-50">
        <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center gap-3">
                <Button
                    variant="ghost"
                    size="icon"
                    // onClick={() => setIsMobileNavOpen(true)}
                    className="md:hidden text-blue-500 hover:text-blue-700 hover:bg-green-400"
                >
                    {/* <HamburgerMenuIcon className="h-5 w-5" /> */}
                    #
                </Button>
                <div className="font-semibold bg-linear-to-r from-green-800 to-green-400 bg-clip-text text-blue-950">
                    Chat with an Agent
                </div>
            </div>
        </div>
    </header>
  )
}

export default Header