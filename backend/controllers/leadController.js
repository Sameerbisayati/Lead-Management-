
import mongoose from 'mongoose'
import Lead from '../models/Lead.js'

const allowedFields = [
  'name',
  'email',
  'phone',
  'company',
  'source',
  'status'
]

const validateLeadData = (data, isUpdate = false) => {
  if (!data || typeof data !== 'object' || Array.isArray(data)) {
    return 'Invalid request data'
  }

  const fields = Object.keys(data)

  if (fields.some(field => !allowedFields.includes(field))) {
    return 'Request contains invalid fields'
  }

  if (!isUpdate) {
    const requiredFields = [
      'name',
      'email',
      'phone',
      'company',
      'source'
    ]

    if (requiredFields.some(field =>
      typeof data[field] !== 'string' || !data[field].trim()
    )) {
      return 'Please fill all required fields'
    }
  }

  if (
    data.email !== undefined &&
    (typeof data.email !== 'string' ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim()))
  ) {
    return 'Please enter a valid email'
  }

  if (
    data.phone !== undefined &&
    (typeof data.phone !== 'string' ||
      !/^\d{10,15}$/.test(data.phone.trim()))
  ) {
    return 'Please enter a valid phone number'
  }

  return null
}

// Create Lead
export const createLead = async (req, res) => {
  try {
    const validationError = validateLeadData(req.body)

    if (validationError) {
      return res.status(400).json({
        message: validationError
      })
    }

    const lead = await Lead.create(req.body)

    return res.status(201).json({
      message: 'Lead created successfully',
      lead
    })
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        message: error.message
      })
    }

    return res.status(500).json({
      message: 'Failed to create lead'
    })
  }
}

// Get All Leads
export const getLeads = async (req, res) => {
  try {
    const leads = await Lead.find().sort({ createdAt: -1 })

    return res.status(200).json(leads)
  } catch (error) {
    return res.status(500).json({
      message: 'Failed to fetch leads'
    })
  }
}

// Update Lead
export const updateLead = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({
        message: 'Invalid lead ID'
      })
    }

    const validationError = validateLeadData(req.body, true)

    if (validationError) {
      return res.status(400).json({
        message: validationError
      })
    }

    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({
        message: 'No update data provided'
      })
    }

    const lead = await Lead.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    )

    if (!lead) {
      return res.status(404).json({
        message: 'Lead not found'
      })
    }

    return res.status(200).json({
      message: 'Lead updated successfully',
      lead
    })
  } catch (error) {
    if (error.name === 'ValidationError' || error.name === 'CastError') {
      return res.status(400).json({
        message: error.message
      })
    }

    return res.status(500).json({
      message: 'Failed to update lead'
    })
  }
}

// Delete Lead
export const deleteLead = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({
        message: 'Invalid lead ID'
      })
    }

    const lead = await Lead.findByIdAndDelete(req.params.id)

    if (!lead) {
      return res.status(404).json({
        message: 'Lead not found'
      })
    }

    return res.status(200).json({
      message: 'Lead deleted successfully'
    })
  } catch (error) {
    return res.status(500).json({
      message: 'Failed to delete lead'
    })
  }
}
