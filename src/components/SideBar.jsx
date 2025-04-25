// src/components/SideBar.jsx
export default function AppSidebar() {
    return (
      <div className="h-full flex flex-col px-4 py-6 space-y-6">
        <div className="text-xl font-bold">YourBrand</div>
        {/* Nav links */}
        <nav className="flex flex-col space-y-2">
          <a href="/organizer/dashboard" className="text-gray-700 hover:text-indigo-600">Dashboard</a>
          <a href="/organizer/create" className="text-gray-700 hover:text-indigo-600">Create Event</a>
          {/* More... */}
        </nav>
      </div>
    );
  }
  