
import mongoose from 'mongoose'

const leadSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true
    },

    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please enter a valid email']
    },

    phone: {
      type: String,
      required: [true, 'Phone is required'],
      trim: true,
      match: [/^\d{10,15}$/, 'Please enter a valid phone number']
    },

    company: {
      type: String,
      required: [true, 'Company is required'],
      trim: true
    },

    source: {
      type: String,
      required: [true, 'Source is required'],
      enum: ['Website', 'Referral', 'Social Media', 'Advertisement', 'Other']
    },

    status: {
      type: String,
      enum: ['New', 'Contacted', 'Qualified', 'Lost'],
      default: 'New'
    }
  },
  {
    timestamps: true
  }
)

const Lead = mongoose.model('Lead', leadSchema)

export default Lead
