export function setupEventSource() {
  // Get container element once at setup
  const eventsContainer = document.getElementById('events-container')
  if (!eventsContainer) {
    console.error('Events container not found')
    return
  }

  // Create EventSource connection
  const eventSource = new EventSource('https://sse-node.fly.dev/events')

  // Handle successful connection
  eventSource.onopen = () => {
    console.log('Connected to event stream')
  }

  // Handle incoming messages
  eventSource.onmessage = (event) => {
    try {
      const data = JSON.parse(event.data)

      if (Array.isArray(data)) {
        for (const item of data) {
          appendEvent(item)
        }
      } else {
        appendEvent(data)
      }
    } catch (error) {
      console.error('Failed to parse event data:', error)
    }
  }

  // Handle any connection errors
  eventSource.onerror = () => {
    console.error('EventSource failed')
    eventSource.close()
  }

  // Helper to append new events
  function appendEvent(data) {
    const text = document.createElement('li')
    text.textContent = `${data}`
    eventsContainer.appendChild(text)
  }
}
