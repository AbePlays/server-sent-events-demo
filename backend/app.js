import cors from 'cors'
import crypto from 'node:crypto'
import express from 'express'

const PORT = process.env.PORT || 3000
let clients = []

const app = express()
app.use(express.json())
app.use(cors())

app.get('/', (_, res) => {
  return res.status(200).json({ ok: true })
})

app.get('/events', (req, res) => {
  const headers = {
    'Content-Type': 'text/event-stream',
    Connection: 'keep-alive',
    'Cache-Control': 'no-cache',
  }

  res.writeHead(200, headers)

  const clientId = crypto.webcrypto.randomUUID()
  clients.push({ id: clientId, res })

  req.on('close', () => {
    console.log(`${clientId} has closed their connection`)
    clients = clients.filter((client) => client.id !== clientId)
  })

  setInterval(() => {
    const formattedDate = new Intl.DateTimeFormat('en-IN', {
      dateStyle: 'medium',
      timeStyle: 'medium',
      hour12: true,
    }).format(new Date())
    const data = `data: ${JSON.stringify({ timestamp: formattedDate })}\n\n`
    res.write(data)
  }, 1000)
})

app.listen(PORT, () => {
  console.log(`Server up at PORT ${PORT}`)
})
