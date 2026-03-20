# Chat App — Client

React frontend for Chat App. This is the frontend part of the project. For the backend, see [chat-app-server](https://github.com/Jackan04/chat-app-server).

## Tech

- React.js
- Vite 
- oat.ink (CSS component library)

## Features

- Register and log in
- Browse users and start conversations
- Send and receive messages
- Edit your profile (display name, bio, online status)

## Screenshots

![Screenshot 1](public/screenshots/screenshot-1.png)
![Screenshot 2](public/screenshots/screenshot-2.png)
![Screenshot 3](public/screenshots/screenshot-3.png)
![Screenshot 4](public/screenshots/screenshot-4.png)
![Screenshot 5](public/screenshots/screenshot-5.png)

## Setup

**Requirements:** Node.js, a running instance of [chat-app-server](https://github.com/Jackan04/chat-app-server)

```bash
git clone https://github.com/Jackan04/chat-app
cd chat-app
npm install
```
Start the dev server:

```bash
npm run dev
```

The client proxies `/api` requests to `http://localhost:3000` by default. If your server runs on a different port, update `vite.config.js` accordingly.
