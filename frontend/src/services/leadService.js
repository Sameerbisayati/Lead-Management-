
const API_URL = import.meta.env.VITE_API_URL

export const getLeads = async () => {
  const response = await fetch(API_URL)

  if (!response.ok) {
    throw new Error('Failed to fetch leads')
  }

  return response.json()
}

export const addLead = async (leadData) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(leadData)
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.message || 'Failed to add lead')
  }

  return data
}

export const updateLead = async (id, leadData) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(leadData)
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.message || 'Failed to update lead')
  }

  return data
}

export const deleteLead = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE'
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.message || 'Failed to delete lead')
  }

  return data
}
