
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import Dashboard from './components/Dashboard'
import LeadList from './components/LeadList'

function App() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <div className="min-w-0 flex-1">
        <Header />

        <main className="p-5 md:p-9">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/leads" element={<LeadList />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}

export default App
