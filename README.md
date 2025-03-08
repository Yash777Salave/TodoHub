# React Native To-Do App

## 📌 Overview
This is a **React Native To-Do App** that includes authentication and task management. It uses **MMKV** for local storage and integrates with the dummy API for managing to-dos.

## 🚀 Features
- **User Authentication** (Register/Login using MMKV local storage)
- **To-Do Management**
  - Fetch To-Dos from API (`https://dummyjson.com/docs/todos`)
  - Add, Edit, and Delete To-Dos
  - Pagination for displaying 10+ records
  - Live search from local list
- **Profile Management**
  - View & Edit Profile details stored in MMKV

## 🛠 Tech Stack
- **Frontend**: React Native
- **State Management**: useState, useEffect
- **Storage**: MMKV (for local storage)
- **API**: DummyJSON To-Do API


## 📥 Installation & Setup
### 1️⃣ Clone the Repository
```sh
git clone https://github.com/YOUR_USERNAME/my-todo-app.git
cd my-todo-app
```

### 2️⃣ Install Dependencies
```sh
yarn install  # OR npm install
```

### 3️⃣ Run the Project
```sh
yarn android  # For Android
yarn ios      # For iOS (Mac only)
```

## 📝 API Endpoints Used
- **Fetch All Todos**: `GET https://dummyjson.com/todos`
- **Add Todo**: `POST https://dummyjson.com/todos/add`
- **Edit Todo**: `PUT https://dummyjson.com/todos/{id}`
- **Delete Todo**: `DELETE https://dummyjson.com/todos/{id}`

## 📌 MMKV Storage Keys
- **User Data**: `user`
- **Todos (Local Cache)**: `todos`

## 📸 Screenshots
🚧 (Add screenshots here if needed)

