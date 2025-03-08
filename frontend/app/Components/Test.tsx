import { useState } from "react";

export default function LeftSideOverlay() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Main Page Content */}
      <div className={`transition-all duration-300 ${isOpen ? 'overflow-hidden' : ''}`}>
        <h1 className="text-2xl font-bold p-5">Main Page Content</h1>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded"
          onClick={() => setIsOpen(true)}
        >
          Open Left Panel
        </button>
      </div>

      {/* Left Side Overlay */}
      {isOpen && (
        <div className="fixed top-0 left-0 h-screen w-1/4 bg-white shadow-xl z-50">
          <div className="p-5 flex flex-col gap-4">
            <h2 className="text-xl font-semibold">Left Panel</h2>
            <p>This is the left-side panel content.</p>
            <button
              className="px-4 py-2 bg-red-500 text-white rounded"
              onClick={() => setIsOpen(false)}
            >
              Close Panel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
