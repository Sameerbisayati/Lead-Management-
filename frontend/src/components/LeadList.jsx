
import { useContext, useMemo, useState } from 'react'
import { LeadContext } from '../context/LeadContext'
import LeadItem from './LeadItem'
import AddLead from './AddLead'
import EditLead from './EditLead'

function LeadList() {
  const { leadList, loading, error, removeLead } = useContext(LeadContext)

  const [search, setSearch] = useState('')
  const [filterStatus, setFilterStatus] = useState('All')
  const [sortBy, setSortBy] = useState('newest')
  const [currentPage, setCurrentPage] = useState(1)
  const [showAdd, setShowAdd] = useState(false)
  const [selectedLead, setSelectedLead] = useState(null)

  const leadsPerPage = 5

  const filteredLeads = useMemo(() => {
    const result = leadList.filter(lead => {
      const matchesSearch = lead.name
        .toLowerCase()
        .includes(search.toLowerCase())

      const matchesStatus =
        filterStatus === 'All' || lead.status === filterStatus

      return matchesSearch && matchesStatus
    })

    return [...result].sort((a, b) => {
      switch (sortBy) {
        case 'name-asc':
          return a.name.localeCompare(b.name)

        case 'name-desc':
          return b.name.localeCompare(a.name)

        case 'oldest':
          return new Date(a.createdAt) - new Date(b.createdAt)

        case 'status':
          return a.status.localeCompare(b.status)

        case 'newest':
        default:
          return new Date(b.createdAt) - new Date(a.createdAt)
      }
    })
  }, [leadList, search, filterStatus, sortBy])

  const totalPages = Math.ceil(filteredLeads.length / leadsPerPage)

  const safePage = Math.min(currentPage, Math.max(totalPages, 1))

  const startIndex = (safePage - 1) * leadsPerPage

  const currentLeads = filteredLeads.slice(
    startIndex,
    startIndex + leadsPerPage
  )

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this lead?'
    )

    if (confirmDelete) {
      try {
        await removeLead(id)
      } catch (error) {
        alert(error.message)
      }
    }
  }

  if (loading) {
    return (
      <div className="p-10 text-center text-gray-500">
        Loading leads...
      </div>
    )
  }

  return (
    <div className="space-y-7">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            All Leads
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage and track all your potential customers.
          </p>
        </div>

        <button
          onClick={() => setShowAdd(true)}
          className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
        >
          + Add New Lead
        </button>
      </div>

      {error && (
        <div className="rounded-lg bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
        <div className="mb-5 flex flex-col gap-3 lg:flex-row">
          <input
            type="text"
            placeholder="Search by lead name..."
            value={search}
            onChange={e => {
              setSearch(e.target.value)
              setCurrentPage(1)
            }}
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-blue-500 lg:max-w-sm"
          />

          <select
            value={filterStatus}
            onChange={e => {
              setFilterStatus(e.target.value)
              setCurrentPage(1)
            }}
            className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-blue-500"
          >
            <option value="All">All Statuses</option>
            <option value="New">New</option>
            <option value="Contacted">Contacted</option>
            <option value="Qualified">Qualified</option>
            <option value="Lost">Lost</option>
          </select>

          <select
            value={sortBy}
            onChange={e => {
              setSortBy(e.target.value)
              setCurrentPage(1)
            }}
            className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-blue-500"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="name-asc">Name: A to Z</option>
            <option value="name-desc">Name: Z to A</option>
            <option value="status">Sort by Status</option>
          </select>
        </div>

        <div className="mb-4 text-sm text-gray-500">
          Showing {filteredLeads.length === 0 ? 0 : startIndex + 1}–{Math.min(startIndex + leadsPerPage, filteredLeads.length)} of {filteredLeads.length} leads
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-212.5 text-left">
            <thead className="bg-gray-50 text-xs uppercase text-gray-500">
              <tr>
                <th className="px-5 py-3">Lead</th>
                <th className="px-5 py-3">Company</th>
                <th className="px-5 py-3">Phone</th>
                <th className="px-5 py-3">Source</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3">Actions</th>
              </tr>
            </thead>

            <tbody>
              {currentLeads.map(lead => (
                <LeadItem
                  key={lead._id}
                  lead={lead}
                  onEdit={setSelectedLead}
                  onDelete={handleDelete}
                />
              ))}
            </tbody>
          </table>

          {filteredLeads.length === 0 && (
            <div className="py-12 text-center text-sm text-gray-500">
              {leadList.length === 0
                ? 'No leads added yet. Start by adding your first lead.'
                : 'No leads match your search or filter.'}
            </div>
          )}
        </div>

        {totalPages > 1 && (
          <div className="mt-5 flex flex-col items-center justify-between gap-4 border-t border-gray-100 pt-5 sm:flex-row">
            <p className="text-sm text-gray-500">
              Page {safePage} of {totalPages}
            </p>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={safePage === 1}
                className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Previous
              </button>

              {Array.from({ length: totalPages }, (_, index) => index + 1).map(page => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`h-9 w-9 rounded-lg text-sm font-medium ${
                    safePage === page
                      ? 'bg-blue-600 text-white'
                      : 'border border-gray-300 text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {page}
                </button>
              ))}

              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={safePage === totalPages}
                className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {showAdd && (
        <AddLead onClose={() => setShowAdd(false)} />
      )}

      {selectedLead && (
        <EditLead
          lead={selectedLead}
          onClose={() => setSelectedLead(null)}
        />
      )}
    </div>
  )
}

export default LeadList
