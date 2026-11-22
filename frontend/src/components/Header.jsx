
function Header() {
  return (
    <header className="flex items-center justify-between border-b border-gray-200 bg-white px-6 py-4 md:px-9">
      <div>
        <h2 className="text-lg font-bold text-gray-800">
          Welcome back!
        </h2>
        <p className="text-xs text-gray-500">
          Here's your lead management workspace.
        </p>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-700">
          S
        </div>

        <div className="hidden sm:block">
          <p className="text-sm font-semibold text-gray-800">
            Sales Manager
          </p>
          <p className="text-xs text-gray-500">
            Administrator
          </p>
        </div>
      </div>
    </header>
  )
}

export default Header
