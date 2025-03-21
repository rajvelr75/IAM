import Header from "@/app/(dashboard)/_components/header";
import Image from "next/image";

const apps = [
  { name: "Document Management", src: "/icons/documents.png" },
  { name: "Medicare", src: "/icons/medicare.png" },
  { name: "ChatHub", src: "/icons/chat.png" },
  { name: "TeleMedicine", src: "/icons/telemedicine.png" },
  { name: "Dashboard", src: "/icons/dashboard.png" },
  { name: "PDF Chat", src: "/icons/pdf.png" },
  { name: "RAG Studio", src: "/icons/robotic-hand.png" },
  { name: "Password Checker", src: "/icons/reset-password.png" },
];

export default function Apps() {
    return (
      <>
        <Header />
        <div 
          className="w-screen min-h-screen flex flex-col items-center justify-center p-10 pt-24 
                     bg-[url('/background/5297078.jpg')] bg-cover bg-center bg-no-repeat"
        >
          <h1 className="text-4xl font-bold text-white tracking-wide drop-shadow-lg">
            Apps
          </h1>
  
          {/* Grid Layout for Apps */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pt-10">
            {apps.map((app, index) => (
              <div
                key={index}
                className="flex flex-col items-center p-4 bg-[#0a0f1d]/70 border border-[#ff004c]/50 
                           rounded-2xl shadow-[0_4px_10px_rgba(255,0,76,0.3)] hover:shadow-[0_6px_20px_rgba(255,0,76,0.5)]
                           transition-transform transform hover:scale-105"
              >
                <Image 
                  src={app.src} 
                  alt={app.name} 
                  width={80} 
                  height={80} 
                  className="mb-2"
                />
                <p className="text-sm font-medium text-white">{app.name}</p>
              </div>
            ))}
          </div>
        </div>
      </>
    );
  }
  