import { NavLink } from "react-router-dom";
import { Video, Plus, LogOut, User } from "lucide-react";

const menuItems = [
  { title: "Videos", path: "/videos", icon: Video },
  { title: "Add Video", path: "/add-video", icon: Plus },
];

export function Sidebar() {
  return (
    <aside className="w-64 bg-black/95 backdrop-blur-md border-r border-zinc-800 flex flex-col h-screen p-4">

      {/* 📝 Navigation Menu */}
      <nav className="flex-1 flex flex-col space-y-2 pt-4">
        {menuItems.map((item) => (
          <NavLink
            key={item.title}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-lg transition-all ${
                isActive
                  ? "bg-red-600 text-white"
                  : "text-gray-400 hover:bg-zinc-800 hover:text-white"
              }`
            }
          >
            <item.icon className="h-5 w-5" />
            <span>{item.title}</span>
          </NavLink>
        ))}
      </nav>

      {/* ⚡ Quick Action / Logout */}
      <div className="mt-auto pt-4 border-t border-zinc-800">
        <button
          // onClick={signOut}
          className="flex items-center gap-3 px-3 py-2 text-red-500 hover:bg-red-600/20 rounded-lg transition-all w-full"
        >
          <LogOut className="h-5 w-5" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
