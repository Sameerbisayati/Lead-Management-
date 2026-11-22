
function LeadItem({ lead, onEdit, onDelete }) {
  const statusStyles = {
    New: 'bg-blue-100 text-blue-700',
    Contacted: 'bg-yellow-100 text-yellow-700',
    Qualified: 'bg-green-100 text-green-700',
    Lost: 'bg-red-100 text-red-700'
  }

  return (
    <tr className="border-b border-gray-100 hover:bg-gray-50">
      <td className="px-5 py-4">
        <div className="font-semibold text-gray-800">
          {lead.name}
        </div>
        <div className="text-xs text-gray-500">
          {lead.email}
        </div>
      </td>

      <td className="px-5 py-4 text-sm text-gray-600">
        {lead.company}
      </td>

      <td className="px-5 py-4 text-sm text-gray-600">
        {lead.phone}
      </td>

      <td className="px-5 py-4 text-sm text-gray-600">
        {lead.source}
      </td>

      <td className="px-5 py-4">
        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[lead.status] || 'bg-gray-100 text-gray-700'}`}>
          {lead.status}
        </span>
      </td>

      <td className="px-5 py-4">
        <div className="flex gap-3">
          <button
            onClick={() => onEdit(lead)}
            className="text-sm font-medium text-blue-600 hover:text-blue-800 cursor-pointer"
          >
            Edit
          </button>

          <button
            onClick={() => onDelete(lead._id)}
            className="text-sm font-medium text-red-500 hover:text-red-700 cursor-pointer"
          >
            Delete
          </button>
        </div>
      </td>
    </tr>
  )
}

export default LeadItem
