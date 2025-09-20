# AIde – Your own AI helper

AIde is a **context-aware AI chat application** built with React Native and powered by a MERN stack backend.  
It delivers personalized AI conversations across three categories:

- **Recipe Assistant** – Get cooking guidance and meal ideas.
- **Itinerary Planner** – Plan trips and daily schedules with AI.
- **General Assistance** – Everyday Q&A and productivity help.

The app provides a **real-time, low-latency chat experience** using WebSockets and supports **Google OAuth login** for secure authentication.

## Features

- 🔐 **Google OAuth Login** – Simple and secure authentication.
- 🗂️ **Chat Categories** – Recipe, Itinerary, and General Assistance.
- 📜 **Context-Aware Conversations** – Each chat strictly caters to its category.
- 💾 **Persistent Conversations** – User chats are loaded by type.
- ⚡ **Real-Time Messaging** – Bi-directional communication via WebSockets.
- 📱 **Cross-Platform** – Optimized React Native app for Android (APK provided).

<!-- ## 📸 Screenshots   -->

<!-- --- -->

## 📦 APK Download

[Download APK](https://github.com/MiheerSharma22/AIde/releases/download/v1.0.0/aide-v1.0.apk)

- if asked, allow installation from unknown sources on your android device.

## Tech Stack

- **Frontend:** React Native (Expo), Nativewind
- **Backend:** Node.js, Express.js, MongoDB, Mongoose
- **Authentication & Authorization:** Google OAuth, JWT
- **Real-Time Messaging:** Socket.IO
- **Testing:** Postman
- **Deployment:** Android APK

## Installation & Setup

### Prerequisites

- Node.js >= 18
- Expo CLI (`npm install -g expo-cli`)
- Android Studio / Emulator OR a physical Android device

### Steps

```bash
# Clone the repository
git clone https://github.com/MiheerSharma22/AIde.git

# Navigate into the project directory
cd AIde

# Install dependencies
npm install

# Start the app
npx expo start
```
