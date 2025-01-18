import './style.css'
import { setupEventSource } from './event-source'

document.querySelector('#app').innerHTML = `
  <h1>Events</h1>
  <ul id="events-container"></div/>
`

setupEventSource()
