# Mindly - The Gamified Mental Health Tracker 🧠✨

## Project Description

**Mindly** is a comprehensive, gamified mental health tracking application designed to help users manage their emotional well-being through engaging, interactive features. By blending psychological tools with game mechanics, Mindly encourages consistent mental health tracking and provides positive reinforcement for healthy habits.

The application features a modern, responsive interface with mood tracking, gamification elements, achievement systems, and detailed analytics to help users understand their emotional patterns and build healthy mental health habits.

## Screenshots

### Landing Page & Authentication
![Landing Page](./client/screenshots/Screenshot%202025-08-11%20230120.png)

### User Dashboard
![Dashboard](./client/screenshots/Screenshot%202025-08-11%20230151.png)

### Mood Tracking Interface
![Mood Tracker](./client/screenshots/Screenshot%202025-08-11%20230108.png)

### Gamification & Achievements
![Gamification System](./client/screenshots/Screenshot%202025-08-11%20230040.png)

### Mood Analytics & Charts
![Mood Analytics](./client/screenshots/Screenshot%202025-08-11%20230212.png)

### User Profile & Settings
![User Profile](./client/screenshots/Screenshot%202025-08-11%20230223.png)

### Additional Features
![Additional Features](./client/screenshots/Screenshot%202025-08-11%20230250.png)

### Application Overview
![App Overview](./client/screenshots/Screenshot%202025-08-11%20230138.png)

*These screenshots showcase the current development progress of Mindly, featuring the landing page, user dashboard, mood tracking system, gamification elements, and various user interface components.*

## Hosted URL

**Development Status:** Currently in development  
**Live Demo:** Coming soon  
**GitHub Repository:** https://github.com/Harsh63870/MINDLY

## Features Implemented

### Frontend

- **Responsive User Interface**
  - Modern, mobile-first design
  - Interactive mood selection with emoji interface
  - Beautiful card-based layout system
  - Smooth animations and transitions

- **User Authentication System**
  - Secure login and registration forms
  - Protected routes and navigation
  - JWT token management
  - User session handling

- **Dashboard & Navigation**
  - Personalized user dashboard
  - Quick mood check functionality
  - Recent mood history display
  - Achievement showcase
  - Quick action buttons

- **Mood Tracking Interface**
  - 8 different mood options with scoring (1-10 scale)
  - Activity tracking and selection
  - Notes and reflection input
  - Real-time mood history
  - Statistical overview

- **Gamification System**
  - Level progression (1-10 levels)
  - Experience points and rewards
  - Daily and weekly challenges
  - Achievement unlocking system
  - Rewards shop with point system

- **Analytics & Insights**
  - Chart-based mood visualization
  - Trend analysis and patterns
  - Weekly and monthly statistics
  - Progress tracking metrics

- **UI Components**
  - Reusable Card, Button, and Input components
  - Loading spinners and error boundaries
  - Responsive grid layouts
  - Interactive form elements

### Backend

- **Server Architecture**
  - Express.js REST API
  - MongoDB database integration
  - JWT authentication middleware
  - CORS configuration
  - Error handling and validation

- **User Management**
  - User registration and login
  - Password encryption with bcrypt
  - JWT token generation and verification
  - User profile management

- **Mood Data Management**
  - CRUD operations for mood entries
  - Activity and notes storage
  - Timestamp tracking
  - User-specific data isolation

- **Achievement System**
  - Achievement tracking and unlocking
  - Progress monitoring
  - Reward distribution
  - Challenge completion logic

- **API Endpoints**
  - Authentication routes (/api/auth)
  - Mood management (/api/mood)
  - Achievement system (/api/achievements)
  - Dashboard data (/api/dashboard)
  - Health monitoring (/api/health)

- **Database Models**
  - User schema with validation
  - MoodEntry schema with relationships
  - Achievement schema with progress tracking
  - Questionnaire schema for assessments

## Technologies/Libraries/Packages Used

### Frontend Technologies
- **React 19.1.0** - JavaScript library for building user interfaces
- **React Router DOM 7.6.3** - Client-side routing
- **Chart.js 4.4.0** - Data visualization library
- **React Chart.js 2 5.2.0** - React wrapper for Chart.js
- **CSS3** - Styling and animations
- **Web Vitals 2.1.4** - Performance monitoring

### Backend Technologies
- **Node.js** - JavaScript runtime environment
- **Express.js 5.1.0** - Web application framework
- **MongoDB 8.16.1** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **bcryptjs 3.0.2** - Password hashing
- **jsonwebtoken 9.0.2** - JWT authentication
- **cors 2.8.5** - Cross-origin resource sharing
- **dotenv 17.0.1** - Environment variable management

### Development Tools
- **ESLint** - Code linting and quality
- **Create React App** - React development setup
- **npm** - Package management
- **Git** - Version control

## Local Setup

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local installation or MongoDB Atlas account)
- npm or yarn package manager
- Git

### Step-by-Step Setup

1. **Clone the Repository**
   ```bash
   git clone https://github.com/Harsh63870/MINDLY.git
   cd Mindly_TheGamifiedMentalHealthTracker
   ```

2. **Install Backend Dependencies**
   ```bash
   cd server
   npm install
   ```

3. **Install Frontend Dependencies**
   ```bash
   cd ../client
   npm install
   ```

4. **Environment Configuration**
   
   Create a `.env` file in the `server` directory:
   ```env
   MONGODB_URI=mongodb://localhost:27017/mindly
   JWT_SECRET=your_secure_jwt_secret_key_here
   PORT=5000
   ```

5. **Database Setup**
   
   **MongoDB Atlas**
   - Create free MongoDB Atlas account
   - Create new cluster
   - Get connection string and update MONGODB_URI

6. **Start Backend Server**
   ```bash
   cd server
   npm start
   # or for development with auto-reload
   npm run dev
   ```
   
   Server will start on http://localhost:5000

7. **Start Frontend Application**
   ```bash
   cd client
   npm start
   ```
   
   Application will open on http://localhost:3000

8. **Verify Installation**
   - Backend health check: http://localhost:5000/api/health
   - Frontend: http://localhost:3000
   - Check console for any error messages

### Troubleshooting

- **Port Conflicts**: If ports 3000 or 5000 are busy, change them in package.json
- **MongoDB Connection**: Ensure MongoDB is running and connection string is correct
- **Dependencies**: Delete node_modules and package-lock.json, then run npm install again
- **Environment Variables**: Double-check .env file location and variable names

## Team Members

- **Harsh Vardhan Pandey** - Project Lead & Full Stack Developer
  - GitHub: [@Harsh63870](https://github.com/Harsh63870)
  - Role: Project architecture, backend development, database design

---

**Project Status:** Active Development  
**Last Updated:** August 2025 
**Version:** 1.0.0  

---

*Built with ❤️ for better mental health awareness and support*

**Mindly - Where mental health meets motivation**
