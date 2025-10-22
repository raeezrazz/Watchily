import { NavLink } from "react-router-dom";
import { Video, Plus, LogOut, User,X } from "lucide-react";
import { logout } from "../api/user";
import { useNavigate } from "react-router-dom";

const menuItems = [
  { title: "Videos", path: "/videos", icon: Video },
  { title: "Add Video", path: "/add-video", icon: Plus },
];


interface HeaderProps {
    toggleSidebar: () => void;
  }

export function Sidebar({ toggleSidebar }: HeaderProps) {
    const navigate = useNavigate()

    const handleLogout = async () => {
        try {
            localStorage.removeItem("accessToken");
    
            localStorage.removeItem("user");
          
           
          navigate("/auth"); 
        } catch (err) {
          console.error("Logout failed", err);
        }
      };

  return (
    <aside className="w-64 bg-black/95 backdrop-blur-md border-r border-zinc-800 flex flex-col h-screen p-4">

      {/* 📝 Navigation Menu */}
      <button
        onClick={toggleSidebar}
        className="absolute top-3 right-3 p-2 rounded-full bg-zinc-900 hover:bg-red-600/30 transition-all text-gray-400 hover:text-white"
      >
        <X className="h-5 w-5" />
      </button>
      <nav className="flex-1 flex flex-col space-y-2 pt-5">
      
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
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2 text-red-500 hover:bg-red-600/20 rounded-lg transition-all w-full"
        >
          <LogOut className="h-5 w-5" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
