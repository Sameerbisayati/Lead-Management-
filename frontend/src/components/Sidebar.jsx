
import { NavLink } from 'react-router-dom'

function Sidebar() {
  return (
    <aside className="flex min-h-screen w-64 flex-col bg-slate-950 px-5 py-7 text-white max-md:w-20 max-md:px-3">

      <h2 className="mb-12 px-2 text-2xl font-bold tracking-tight text-blue-400">
        LeadFlow
      </h2>

      <p className="mb-4 px-3 text-xs font-semibold tracking-widest text-slate-500 max-md:hidden">
        WORKSPACE
      </p>

      <nav className="space-y-2">
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            `flex items-center gap-3 rounded-lg px-3 py-3 text-sm transition ${
              isActive
                ? 'bg-blue-600 text-white'
                : 'text-slate-400 hover:bg-slate-800 hover:text-white'
            }`
          }
        >
          <span>▦</span>
          <span className="max-md:hidden">Dashboard</span>
        </NavLink>

        <NavLink
          to="/leads"
          className={({ isActive }) =>
            `flex items-center gap-3 rounded-lg px-3 py-3 text-sm transition ${
              isActive
                ? 'bg-blue-600 text-white'
                : 'text-slate-400 hover:bg-slate-800 hover:text-white'
            }`
          }
        >
          <span>♙</span>
          <span className="max-md:hidden">All Leads</span>
        </NavLink>
      </nav>

      <div className="mt-auto border-t border-slate-800 pt-5 max-md:hidden">
        <p className="font-semibold">LeadFlow</p>
        <p className="mt-1 text-xs text-slate-500">
          Lead Management System
        </p>
      </div>
    </aside>
  )
}

export default Sidebar
