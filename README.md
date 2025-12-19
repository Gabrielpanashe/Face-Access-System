# Face Access System

A modern, biometric access control system using face recognition and liveness detection.

## 🚀 Features
- **Face Recognition**: Accurate identification using deep learning.
- **Liveness Detection**: Anti-spoofing mechanism to prevent bypass using photos or videos.
- **Modern UI**: Sleek frontend built with Next.js and Tailwind CSS.
- **FastAPI Backend**: Efficient and scalable backend for real-time processing.

## 🛠️ Tech Stack
- **Frontend**: Next.js, React, Tailwind CSS, Lucide Icons.
- **Backend**: Python, FastAPI, OpenCV, Face Recognition libraries.
- **AI/ML**: Liveness detection models and face embeddings.

## 📂 Structure
- `/frontend`: Next.js application for the user interface.
- `/backend`: FastAPI server handling face processing and database logic.
- `/.gitignore`: Root-level ignore file for clean commits.

## 🚦 Getting Started

### Backend
1. Navigate to `/backend`.
2. Install dependencies: `pip install -r requirements.txt`.
3. Run the server: `python main.py`.

### Frontend
1. Navigate to `/frontend`.
2. Install dependencies: `npm install`.
3. Start the dev server: `npm run dev`.

## 🔒 Security
This system implements liveness detection to ensure that the biometric data provided is from a real, present human being.
