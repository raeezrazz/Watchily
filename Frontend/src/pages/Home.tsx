// src/pages/Home.tsx
export function Home() {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center px-6 py-12 bg-zinc-950 rounded-tl-2xl shadow-inner">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Welcome to <span className="text-red-500">Watchly</span>
        </h1>
        <p className="text-gray-300 max-w-xl mb-6">
          Watchly is your personal video hub. Upload, discover, and watch videos
          easily in a sleek, dark-themed interface. Stay connected with your favorite
          content creators and enjoy a seamless viewing experience.
        </p>
        <button className="bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-3 rounded-lg transition-all">
          Get Started
        </button>
      </div>
    );
  }
  