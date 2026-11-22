
import { useContext, useState } from 'react'
import { LeadContext } from '../context/LeadContext'

function EditLead({ lead, onClose }) {
  const { editLead } = useContext(LeadContext)

  const [formData, setFormData] = useState({
    name: lead.name,
    email: lead.email,
    phone: lead.phone,
    company: lead.company,
    source: lead.source,
    status: lead.status
  })

  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target

    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (Object.values(formData).some(value => !value.trim())) {
      setError('Please fill all fields')
      return
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError('Please enter a valid email')
      return
    }

    if (!/^\d{10,15}$/.test(formData.phone)) {
      setError('Enter a valid phone number')
      return
    }

    try {
      setSaving(true)
      await editLead(lead._id, formData)
      onClose()
    } catch (error) {
      setError(error.message)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <form
        onSubmit={handleSubmit}
        className="max-h-[90vh] w-full max-w-lg space-y-4 overflow-y-auto rounded-2xl bg-white p-6 shadow-xl"
      >
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-800">Edit Lead</h2>
            <p className="text-sm text-gray-500">Update lead information</p>
          </div>

          <button type="button" onClick={onClose} className="text-2xl text-gray-500">
            ×
          </button>
        </div>

        {[
          { name: 'name', label: 'Full Name' },
          { name: 'email', label: 'Email', type: 'email' },
          { name: 'phone', label: 'Phone' },
          { name: 'company', label: 'Company' }
        ].map(field => (
          <div key={field.name}>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              {field.label}
            </label>

            <input
              name={field.name}
              type={field.type || 'text'}
              value={formData[field.name]}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>
        ))}

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Source
          </label>

          <select
            name="source"
            value={formData.source}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 px-3 py-2"
          >
            {['Website', 'Referral', 'Social Media', 'Advertisement', 'Other'].map(source => (
              <option key={source}>{source}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Status
          </label>

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 px-3 py-2"
          >
            {['New', 'Contacted', 'Qualified', 'Lost'].map(status => (
              <option key={status}>{status}</option>
            ))}
          </select>
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <div className="flex justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={saving}
            className="rounded-lg bg-blue-600 px-5 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-50 cursor-pointer"
          >
            {saving ? 'Updating...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default EditLead
