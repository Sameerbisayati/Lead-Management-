
import { createContext, useEffect, useState } from 'react'
import {
  getLeads,
  addLead,
  updateLead,
  deleteLead
} from '../services/leadService'

export const LeadContext = createContext()

function LeadProvider({ children }) {
  const [leadList, setLeadList] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const fetchLeads = async () => {
    try {
      setError('')
      const data = await getLeads()
      setLeadList(data)
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchLeads()
  }, [])

  const addNewLead = async (leadData) => {
    const data = await addLead(leadData)
    setLeadList(prev => [data.lead, ...prev])
  }

  const editLead = async (id, leadData) => {
    const data = await updateLead(id, leadData)

    setLeadList(prev =>
      prev.map(lead =>
        lead._id === id ? data.lead : lead
      )
    )
  }

  const removeLead = async (id) => {
    await deleteLead(id)

    setLeadList(prev =>
      prev.filter(lead => lead._id !== id)
    )
  }

  return (
    <LeadContext.Provider
      value={{
        leadList,
        loading,
        error,
        addNewLead,
        editLead,
        removeLead,
        fetchLeads
      }}
    >
      {children}
    </LeadContext.Provider>
  )
}

export default LeadProvider
