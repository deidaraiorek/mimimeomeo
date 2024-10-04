
# ❤️ Love Notes

Welcome to **Love Notes**, a love-themed web application where you can manage your special moments, create to-do lists, post images, and add reminders for important dates.

## 🌟 Features

- **To-Do List**: Create and manage your to-do lists and notes.
- **Image Gallery**: Post and view images in a shared gallery.
- **Calendar**: Add special dates and set reminders to never forget an important event.
  
## 🎨 Tech Stack

### Frontend
- **React**: Frontend framework for building interactive UI.
- **Tailwind CSS**: Utility-first CSS framework for styling.

### Backend
- **Node.js**: JavaScript runtime for backend logic.
- **Express**: Web framework for handling API requests.
- **PostgreSQL**: Database for storing notes, images, and calendar events.

### Tools
- **Git & GitHub**: Version control and repository hosting.
- **Heroku/Netlify/Vercel**: For deployment (choose the service you’re using).

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

- **Node.js** (version 14 or higher)
- **PostgreSQL** (for database)
- **npm** (comes with Node.js) or **yarn** for package management

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/love-notes.git
   cd love-notes
   ```

2. **Install dependencies for the frontend**:
   ```bash
   cd frontend
   npm install
   ```

3. **Install dependencies for the backend**:
   ```bash
   cd ../backend
   npm install
   ```

4. **Set up your environment variables**:

   Create a `.env` file in the `backend` folder to store your database and server configurations:
   ```
   DATABASE_URL=your_postgres_database_url
   PORT=5000
   ```

5. **Set up the PostgreSQL database**:
   Create your PostgreSQL database locally or use a hosted service like Heroku or ElephantSQL. Update the `.env` file with the connection string.

6. **Run the backend server**:
   ```bash
   npm start
   ```

7. **Run the frontend server**:
   ```bash
   cd ../frontend
   npm start
   ```

The app should now be running on `http://localhost:3000` (frontend) and `http://localhost:5000` (backend).

## 📂 Project Structure

```
love-notes/
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── pages/         # Main pages (Notes, Gallery, Calendar)
│   │   └── App.js         # Main React app
├── backend/
│   ├── config/            # Database connection setup
│   ├── controllers/       # API route handlers
│   ├── models/            # Database models (Notes, Images, Events)
│   ├── routes/            # Express routes for API
│   └── server.js          # Main server file
└── README.md              # Project documentation
```

## 🛠️ Contribution Guide

1. **Fork the repository**.
2. **Create a new branch**:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Commit your changes**:
   ```bash
   git commit -m "feat: add your feature"
   ```
4. **Push to the branch**:
   ```bash
   git push origin feature/your-feature-name
   ```
5. **Create a pull request** on GitHub.

For more details, see the [Contribution Guide](./CONTRIBUTING.md).

## 🎯 Roadmap

- [ ] Add authentication for personalizing user content.
- [ ] Implement push notifications for reminders.
- [ ] Improve UI/UX with animations and transitions.
  
## 🤝 Contributors

- **Me**: Thanks for contributing to this project!
- **My girlfriend**: Special thanks to my teammate for helping build this!

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
