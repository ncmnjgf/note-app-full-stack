import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import noteRoutes from './routes/node.route.js'
import cors from 'cors'

dotenv.config()

const app = express()
const port = process.env.PORT || 4002

app.use(express.json())
app.use(cors())  // ✅ Corrected

mongoose.connect(process.env.MONGODB_URL)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch((err) => console.error('❌ Database connection error:', err))

// Use only the router, not controller
app.use('/api/v1/noteapp', noteRoutes)

app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`)
})
