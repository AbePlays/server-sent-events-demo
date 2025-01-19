# Event Source Demo App

This is a simple demonstration application that shows how to use Server-Sent Events (SSE) in a web application. The app establishes a connection to a server endpoint and displays real-time events as they arrive.

## Overview

The application uses the EventSource API to create a persistent connection with the server. As new events are pushed from the server, they are automatically displayed in the browser. This demonstrates a one-way, real-time communication pattern that's useful for scenarios like:

- Live activity feeds
- Real-time notifications
- System status updates
- Live data streaming

## Technical Details

The application is built using vanilla JavaScript and relies on the following technologies:

- **EventSource API**: For establishing a server-sent events connection
- **Node.js**: For running the server
- **Express**: For serving the application and managing event streams

## Setup and Installation

1. Clone this repository:

```bash
git clone server-sent-events-demo
cd server-sent-events-demo
```

2. Install dependencies:

```bash
pnpm install:all
```

3. Start the servers:

```bash
pnpm start
```

## How It Works

The application creates an EventSource connection to `http://localhost:3000/events`. When events are received from the server, they are displayed in real-time on the webpage. The connection is automatically managed, with built-in reconnection handling if the connection is lost.

## Development

To modify the event stream behavior, you can adjust the following:

- Update the EventSource URL in `setupEventSource()` if your server endpoint changes
- Modify the event display format in the `appendEvent()` function
- Add additional event handlers for custom event types

## Browser Support

This demo uses the EventSource API, which is supported in all modern browsers. For older browsers, you may need to include a polyfill.

## Contributing

Feel free to submit issues and pull requests to improve the demo.
