<!-- @format -->

# 🎧 Music Portal

**Music Portal** is a full-featured web application that allows users to stream music using the **Deezer API**, manage personal playlists, and discover new tracks. The app features a built-in audio player, search functionality, user authentication, and seamless playlist management.

In addition, the backend server allows downloading MP3 audio from YouTube videos using `ytdl-core`.

---

## ✨ Features

- 🔐 Authorization via Deezer API  
- 🔍 Search and explore music by track, artist, or album  
- 🎵 Integrated player with playback controls  
- ❤️ Add and remove tracks from favorites  
- 📁 Create, delete, and manage playlists  
- 📌 Add and remove tracks from playlists  
- 🎶 Backend support for streaming MP3 from YouTube  
- 🌙 Modern, responsive UI

---

## 🚀 Tech Stack

- React  
- TypeScript  
- React Router  
- React Hot Toast  
- SCSS  
- Deezer API  
- Custom Node.js Backend  
- `ytdl-core` for MP3 support

---

## UI Preview

![11](https://github.com/user-attachments/assets/bcc72a73-1209-47e4-9147-2533ff13995c)
![1](https://github.com/user-attachments/assets/2186890b-debc-4b61-ba59-7774edef1f9a)
![4](https://github.com/user-attachments/assets/d8ce0e65-3ea7-4ca7-9e6e-d35d444ee50c)
![2](https://github.com/user-attachments/assets/a470be44-5b0f-41df-a4c1-06f3800156df)
![3](https://github.com/user-attachments/assets/ea8337ab-d8f5-44d7-bfe6-acca0e8e906f)

## Installation Process

To set up and run the application, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/martha-555/my-app.git
   cd music-portal
   ```
2. Install dependencies: Run the following command to install the required packages: `npm install`
3. Start the frontend: After installing the dependencies, start the application: `npm start`
4. Set up the backend: You need to start the backend server as well. Clone the backend repository:

```bash
  git clone https://github.com/martha-555/music-backend.git
  cd music-backend
```

5. Install backend dependencies: Run the following command in the backend directory: `npm install`

6.Start the backend server: Start the backend server on port 3001: `npm start`

Now your frontend will be able to make requests to the backend server running on port 3001.

## Usage

Once both servers are running, you can access the Music Portal in your browser at `http://localhost:3000`. Enjoy exploring music and managing your playlists!


