import express from 'express'
import cors from 'cors'
import applicationsRouter from './routes/applications'
import { seedStore } from './store/seed'

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors())
app.use(express.json())

app.use('/api/applications', applicationsRouter)

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' })
})

if (process.env.SEED_DATA === 'true') {
  seedStore()
} else {
  console.log('[seed] Skipping seed data. Set SEED_DATA=true to enable.')
}

app.listen(PORT, () => {
  console.log(`Insurance API server running on http://localhost:${PORT}`)
})
