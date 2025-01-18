import crypto from 'node:crypto'
import express from 'express'

const PORT = process.env.PORT || 3000
const events = []
let clients = []

const app = express()
app.use(express.json())

app.get('/', (_, res) => {
  return res.status(200).json({ ok: true })
})

app.post('/event', (_, res) => {
  const formattedDate = new Intl.DateTimeFormat('en-GB', {
    dateStyle: 'medium',
    timeStyle: 'medium',
    hour12: true,
  }).format(new Date())
  events.push(formattedDate)

  for (const client of clients) {
    client.res.write(`data: ${JSON.stringify(formattedDate)}\n\n`)
  }

  return res.status(200).json({ ok: true, data: formattedDate })
})

app.get('/events', (req, res) => {
  const headers = {
    'Content-Type': 'text/event-stream',
    Connection: 'keep-alive',
    'Cache-Control': 'no-cache',
  }

  res.writeHead(200, headers)
  const data = `data: ${JSON.stringify(events)}\n\n`

  const clientId = crypto.webcrypto.randomUUID()
  clients.push({ id: clientId, res })

  req.on('close', () => {
    console.log(`${clientId} has closed their connection`)
    clients = clients.filter((client) => client.id !== clientId)
  })

  res.write(data)
})

app.listen(PORT, () => {
  console.log(`Server up at PORT ${PORT}`)
})
