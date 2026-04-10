# ScentStory

ScentStory is a web application that helps users discover their perfect fragrance through a personalized quiz. It uses a 4D vector matching algorithm to recommend fragrances based on scent preferences, vibes, and occasions.

## Features

- **Personalized Quiz**: A quiz to determine your scent profile
- **Fragrance Recommendations**: Get matched with fragrances that suit your personality
- **Admin Dashboard**: Manage fragrances, questions, and view analytics
- **User Authentication**: Secure login for admin users
- **Responsive Design**: Works seamlessly on desktop and mobile

## Tech Stack

### Frontend
- **React**: UI library for building the user interface
- **Vite**: Fast build tool and development server
- **Framer Motion**: Animation library for smooth transitions
- **Recharts**: Charting library for data visualization
- **Tailwind CSS**: Utility-first CSS framework

### Backend
- **Node.js**: JavaScript runtime for the server
- **Express**: Web framework for building APIs
- **MongoDB**: NoSQL database for storing data
- **Mongoose**: ODM for MongoDB
- **JWT**: JSON Web Tokens for authentication

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/phanatcha/scentstory.git
   cd scentstory
   ```

2. **Install dependencies**
   ```bash
   #root
   npm install

   #frontend
   cd frontend
   npm install

   #backend
   cd ../backend
   npm install
   ```

3. **Start the development server**
   ```bash
   #root (run concurrently)
   npm run dev
   
   #frontend (run separately)
   cd frontend
   npm run dev

   #backend (run separately)
   cd ../backend
   npm run dev
   ```

4. **Access the application**
   - Frontend: http://localhost:5173
   - Admin Dashboard: http://admin.localhost:5173
   - API Docs: http://localhost:5001/api-docs

## Usage

### For Users
1. Go to the homepage and click "start"
2. Complete the quiz
3. View your fragrance recommendations
4. Explore the fragrance library

### For Admins
1. Login with your admin credentials
2. Manage fragrances: add, edit, or delete
3. Manage questions: add, edit, or delete
4. View analytics and charts

## Project Structure

```
scentstory/
├── backend/              # Node.js/Express backend
│   ├── config/           # Database configuration
│   ├── controllers/      # Request handlers
│   ├── models/           # Mongoose models
│   ├── routes/           # API routes
│   ├── middleware/       # Custom middleware
│   └── server.js         # Application entry point
├── frontend/             # React frontend
│   ├── src/
│   │   ├── components/   # Reusable components
│   │   ├── pages/        # Page components
│   │   ├── context/      # React context
│   │   ├── assets/       # Static assets
│   │   └── App.jsx       # Main application component
│   └── vite.config.js    # Vite configuration
└── README.md             # Project documentation
```

## License

This project is licensed under the MIT License.