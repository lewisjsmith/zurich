import express from 'express'
import cors from 'cors'
import applicationsRouter from './routes/applications'

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors())
app.use(express.json())

app.use('/api/applications', applicationsRouter)

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' })
})

app.listen(PORT, () => {
  console.log(`Insurance API server running on http://localhost:${PORT}`)
})
