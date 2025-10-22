// Header.tsx
import { Video, Menu } from "lucide-react";

interface HeaderProps {
  toggleSidebar: () => void;
}

export function Header({ toggleSidebar }: HeaderProps) {
  return (
    <header className="h-16 border-b border-zinc-800 bg-black sticky top-0 z-10 flex items-center justify-between px-6 shadow-sm">
      <div className="flex items-center gap-3">
        <button
          onClick={toggleSidebar}
          className="p-2 bg-zinc-900 hover:bg-zinc-800 rounded-full transition-all flex items-center justify-center"
        >
          <Menu className="h-4 w-4 text-white" />
        </button>
        <div className="flex items-center gap-3">
          <div className="p-2 bg-red-600/20 rounded-lg">
            <Video className="h-5 w-5 text-red-500" />
          </div>
          <h1 className="text-xl font-bold text-white">Watchly</h1>
        </div>
      </div>
    </header>
  );
}
