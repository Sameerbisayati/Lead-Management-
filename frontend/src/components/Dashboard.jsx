
import { useContext } from 'react'
import { LeadContext } from '../context/LeadContext'

function Dashboard() {
  const { leadList, loading, error } = useContext(LeadContext)

  const stats = [
    {
      title: 'Total Leads',
      count: leadList.length,
      color: 'text-gray-800',
      icon: '👥',
      background: 'bg-blue-50'
    },
    {
      title: 'New Leads',
      count: leadList.filter(lead => lead.status === 'New').length,
      color: 'text-blue-600',
      icon: '✨',
      background: 'bg-blue-50'
    },
    {
      title: 'Contacted',
      count: leadList.filter(lead => lead.status === 'Contacted').length,
      color: 'text-yellow-600',
      icon: '📞',
      background: 'bg-yellow-50'
    },
    {
      title: 'Qualified',
      count: leadList.filter(lead => lead.status === 'Qualified').length,
      color: 'text-green-600',
      icon: '✓',
      background: 'bg-green-50'
    },
    {
      title: 'Lost',
      count: leadList.filter(lead => lead.status === 'Lost').length,
      color: 'text-red-600',
      icon: '↗',
      background: 'bg-red-50'
    }
  ]

  const recentLeads = [...leadList]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5)

  const statusStyles = {
    New: 'bg-blue-100 text-blue-700',
    Contacted: 'bg-yellow-100 text-yellow-700',
    Qualified: 'bg-green-100 text-green-700',
    Lost: 'bg-red-100 text-red-700'
  }

  if (loading) {
    return (
      <div className="p-10 text-center text-gray-500">
        Loading dashboard...
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">
          Dashboard
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Here's an overview of your lead management activity.
        </p>
      </div>

      {error && (
        <div className="rounded-lg bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-5">
        {stats.map(stat => (
          <div
            key={stat.title}
            className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-gray-500">
                {stat.title}
              </p>

              <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${stat.background}`}>
                <span>{stat.icon}</span>
              </div>
            </div>

            <h2 className={`mt-4 text-3xl font-bold ${stat.color}`}>
              {stat.count}
            </h2>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="border-b border-gray-100 px-6 py-5">
          <h2 className="text-lg font-bold text-gray-800">
            Recent Leads
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Your latest added leads.
          </p>
        </div>

        {recentLeads.length === 0 ? (
          <div className="py-12 text-center text-sm text-gray-500">
            No leads available yet. Add your first lead to get started.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-162.5 text-left">
              <thead className="bg-gray-50 text-xs uppercase text-gray-500">
                <tr>
                  <th className="px-6 py-4">Lead</th>
                  <th className="px-6 py-4">Company</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Added On</th>
                </tr>
              </thead>

              <tbody>
                {recentLeads.map(lead => (
                  <tr key={lead._id} className="border-b border-gray-100 last:border-0">
                    <td className="px-6 py-4">
                      <p className="text-sm font-semibold text-gray-800">
                        {lead.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {lead.email}
                      </p>
                    </td>

                    <td className="px-6 py-4 text-sm text-gray-600">
                      {lead.company}
                    </td>

                    <td className="px-6 py-4">
                      <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[lead.status] || 'bg-gray-100 text-gray-700'}`}>
                        {lead.status}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-sm text-gray-500">
                      {new Date(lead.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

export default Dashboard
