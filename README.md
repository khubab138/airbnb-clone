Airbnb Clone – Node.js / Express / EJS / MongoDB

A full-stack Airbnb-style application built using Node.js, Express, EJS, and MongoDB, featuring authentication, authorization, file uploads, favorites, and full CRUD functionality.
This project allows both Guest users and Admin users to interact with listings with different permissions.

🚀 Features
🔐 Authentication & Authorization

Secure login & registration system

Password hashing

Role-based authorization:

Admin: Full access to manage all listings

Guest: Can browse, add favorites, and manage their own actions

🧾 Listings Management

Add new listings

Edit listings

Delete listings

View listing details

Admin can manage all listings; guest can only view

⭐ Favorites System

Logged-in users can add listings to favorites

Remove individual favorites

Delete all favorites at once

Favorites saved to MongoDB per user

📤 File Uploads

Upload images/files from local device

File stored in MongoDB using middleware

Validation for file size and type

🎨 EJS Frontend

Responsive layout with EJS templates

Clean UI for browsing listings

Dynamic views for logged-in vs logged-out users

🛠️ Tech Stack
Frontend

EJS

CSS / Bootstrap / Tailwind (depending on your setup)

Backend

Node.js

Express.js

MongoDB + Mongoose

Other Tools

Multer (file uploads)

Passport / JWT (depending on your auth choice)
