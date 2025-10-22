// MainLayout.tsx
import type { ReactNode } from "react";
import{ useState }from 'react'
import { Header } from "../components/Header";
import { Sidebar } from "../components/Sidebar";

interface MainLayoutProps {
  children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  const [isSidebarOpen, setSidebarOpen] = useState(true); 

  // const { user, loading } = useAuth();
  if (false) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-red-500 mx-auto"></div>
          <p className="mt-3 text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  // if (!user) return <Navigate to="/auth" />;

  return (
    <div className="flex min-h-screen bg-black text-white">
      {/* Sidebar */}
      <div
        className={`fixed z-20 h-full top-0 left-0 transition-transform duration-300 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Sidebar toggleSidebar={() => setSidebarOpen(!isSidebarOpen)} />
      </div>

      {/* Main content */}
      <div className={`flex flex-col flex-1 ml-0 transition-all duration-300 ${isSidebarOpen ? "md:ml-64" : "ml-0"}`}>
        <Header toggleSidebar={() => setSidebarOpen(!isSidebarOpen)} />
        <main className="p-6 flex-1 bg-zinc-950 rounded-tl-2xl shadow-inner">
          {children}
        </main>
      </div>
    </div>
  );
}
