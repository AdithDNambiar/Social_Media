🌐 ConnectSphere – Social Media Web App

ConnectSphere is a full-stack social media application where users can connect, share posts, chat in real-time, and interact with others — similar to modern platforms like Instagram and Facebook.

---

 Features

 Authentication

- User Registration & Login
- Secure user sessions using localStorage

---

 Home Feed

- View all posts
- Create new posts (text, image, video)
- Like / Unlike posts
- Comment on posts
- Real-time feed updates

---

 Saved Posts

- Bookmark posts
- View all saved posts in "/saved"
- Toggle save/unsave functionality

---

 Profile Page

- View your own profile
- View other users' profiles
- Profile picture, name, email, bio
- View user posts
- Edit & delete your own posts

---

 Messaging System

- One-to-one chat system
- Send and receive messages
- Chat UI with active user highlight
- Message bubbles (sender/receiver)
- Chat header with profile info

---

 Notifications

- Like notifications
- Comment notifications
- New post notifications

---

 Stories

- Upload stories (image/video/text)
- View others' stories
- Instagram-style story UI

---

 UI Features

- Modern responsive layout
- Sidebar navigation
- Story bar
- Clean card-based post UI
- Active chat highlight
- Bookmark toggle UI

---

 Tech Stack

Frontend

- React.js
- Axios
- React Router
- CSS (custom styling)
- React Icons

---

Backend

- Node.js
- Express.js
- MongoDB (Mongoose)
- Multer (file uploads)

---

 Project Structure

/frontend
  /src
    /components
    /pages
    App.js

/backend
  /models
  /routes
  app.js

---

 Installation & Setup

 Clone the repository

git clone https://github.com/your-username/connectsphere.git

---

 Backend Setup

cd backend
npm install
npm start

Backend runs on:

http://localhost:3000

---

 Frontend Setup

cd frontend
npm install
npm start

Frontend runs on:

http://localhost:3001

---

 Key Functional Logic

 Save Post System

- Posts are stored in user's "savedPosts"
- Toggle save/unsave via API:

PUT /posts/save/:postId

---

 Messaging System

- Messages stored with sender & receiver IDs
- Chat fetched using:

GET /messages/:user1/:user2

---

 Profile Handling

- Own profile → uses logged-in user
- Other profile → fetched via user ID

---

 Future Improvements

-  Real-time chat using Socket.io
-  Real-time notifications
-  Online/offline status
-  Typing indicator
-  Follow / Unfollow system
-  Dark mode toggle
-  Mobile optimization

---

 Developer

Adith

---

 Final Note

This project demonstrates a complete full-stack social media system including:

- Authentication
- CRUD operations
- Real-time UI interactions
- Clean UI/UX design

---

💥 Built with passion & lots of debugging 
