import Image from "next/image"

const Dashboard = () => {
  return (
    <div className="relative">
      <div className="flex items-center justify-center h-full mt-40">
        <Image 
          src="/empty.png" 
          width="300" 
          height="300" 
          alt="Dashboard" 
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-blue-950"></div>
      </div>
    </div>
  )
}

export default Dashboard