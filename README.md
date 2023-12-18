# Musical Mystery

![Banner](/images/Cover.png)
<br>

![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-039BE5?style=for-the-badge&logo=Firebase&logoColor=white)
![Framer](https://img.shields.io/badge/Framer-black?style=for-the-badge&logo=framer&logoColor=blue)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)

---

## About

Guess the correct song among three options within a time limit to earn points. Each player starts with 3 lives. A correct guess scores you 10 points, but failing to guess in time or making an incorrect guess results in losing 1 life point. Aim to gain as many points as possible to secure a spot on the leaderboard.

## Why did I build this?

I thought it was a cool and enjoyable side project to work on. Initially, I loosely designed the idea using Figma (not being a UI/UX person myself). The first version was constructed while I was learning React—[check it out here](https://github.com/Vansitha/musical-mystery). During the development of version 1, I encountered various issues and eventually decided to abandon it. However, I didn't want the idea to go to waste. So, I revamped the UI and created version 2 with a more robust structure. I am open to feedback and suggestions for improvements! 😄

## Why not host it?

Regrettably, I am unable to host and make it accessible to users because Spotify only grants API keys for development. Although it's possible to request full access, Spotify does not extend its quota to accommodate apps classified as "hobby projects" or "games" 😟.

## Setting it up locally

First, clone or download the project to your system:

```bash
git clone https://github.com/Vansitha/musical-mystery-v2.git
```

Create a .env file and place the following keys:

```
  VITE_SPOTIFY_CLIENT_ID=
  VITE_REDIRECT_TARGET=http://localhost:5173/
```

To generate a new client ID, visit the Spotify Developer Dashboard. The following guide will assist you:

- [Client ID Generation Guide](https://developer.spotify.com/documentation/web-api/concepts/apps)
- [Developer Dashboard](https://developer.spotify.com/dashboard)

At the ensure that you copy and paste the target URL shown above (👉 http://localhost:5173/) into the Redirect URIs list under settings in the dashboard. Don't forget to copy-paste the client ID into your `.env` file.

Run the following command to install dependencies: `npm install`<br>
Open the development server by running: `npm run dev`

Version 2.0
