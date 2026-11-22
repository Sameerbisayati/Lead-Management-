
import { useContext, useState } from 'react'
import { LeadContext } from '../context/LeadContext'

function AddLead({ onClose }) {
  const { addNewLead } = useContext(LeadContext)

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    source: 'Website',
    status: 'New'
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
      await addNewLead(formData)
      onClose()
    } catch (error) {
      setError(error.message)
    } finally {
      setSaving(false)
    }
  }

  const inputClass =
    'w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100'

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <form
        onSubmit={handleSubmit}
        className="max-h-[90vh] w-full max-w-lg space-y-4 overflow-y-auto rounded-2xl bg-white p-6 shadow-xl"
      >
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-800">
              Add New Lead
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Enter your potential customer's information.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="text-2xl text-gray-400 hover:text-gray-800"
          >
            ×
          </button>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Full Name
          </label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter full name"
            className={inputClass}
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Email Address
          </label>
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter email address"
            className={inputClass}
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Phone Number
          </label>
          <input
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter phone number"
            className={inputClass}
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Company
          </label>
          <input
            name="company"
            value={formData.company}
            onChange={handleChange}
            placeholder="Enter company name"
            className={inputClass}
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Lead Source
          </label>
          <select
            name="source"
            value={formData.source}
            onChange={handleChange}
            className={inputClass}
          >
            <option>Website</option>
            <option>Referral</option>
            <option>Social Media</option>
            <option>Advertisement</option>
            <option>Other</option>
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
            className={inputClass}
          >
            <option>New</option>
            <option>Contacted</option>
            <option>Qualified</option>
            <option>Lost</option>
          </select>
        </div>

        {error && (
          <p className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
            {error}
          </p>
        )}

        <div className="flex justify-end gap-3 border-t border-gray-100 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 cursor-pointer"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={saving}
            className="rounded-lg bg-blue-600 px-5 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
          >
            {saving ? 'Saving...' : 'Add Lead'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default AddLead
