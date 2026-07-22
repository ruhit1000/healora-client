# 🩺 Healora – Full-Stack Doctor Appointment & Scheduling Platform

Healora is a modern, secure, and scalable doctor appointment booking platform that connects patients with verified healthcare professionals through an intuitive online experience. The platform streamlines appointment scheduling, prevents double bookings through a concurrency control system, and provides dedicated dashboards for patients, doctors, and administrators.

Designed with scalability, security, and user experience in mind, Healora leverages Next.js, TypeScript, MongoDB, and modern web technologies to deliver a seamless healthcare management solution.

---

## 🌐 Live Demo

**Live Website:** https://healora-client.vercel.app

---

# ✨ Key Features

### 👤 Authentication & Authorization
- Secure JWT-based authentication
- Role-Based Access Control (RBAC)
- Protected dashboard routes
- Dynamic navigation based on user role
- Doctor approval workflow before platform access

---

### 🏥 Patient Features

- Browse verified doctors
- Search doctors by name or specialty
- Filter doctors by:
  - Consultation Fee
  - Rating
  - Location
- View complete doctor profile
- Interactive appointment booking calendar
- View upcoming appointments
- Appointment history
- Cancel pending appointments
- Personalized dashboard

---

### 👨‍⚕️ Doctor Features

- Doctor registration with verification
- Weekly availability management
- Generate appointment slots
- Manage patient appointments
- Accept appointment requests
- Reject appointment requests
- Mark appointments as:
  - Completed
  - No Show
- Patient management
- Analytics dashboard
- Revenue estimation

---

### 🛡️ Admin Features

- Doctor approval & rejection system
- User management
- Block users
- Delete users
- Platform analytics dashboard
- Overall system monitoring

---

### 📊 Analytics

- Daily appointments overview
- Weekly appointment statistics
- Estimated revenue
- Platform-wide analytics
- Interactive charts using Recharts

---

### ⚡ Smart Booking System

- Prevents double booking
- Automatic slot locking
- Temporary reservation system
- Slot expiration after timeout
- Real-time booking validation

---

### 🎨 Modern UI/UX

- Fully responsive design
- Sticky navigation
- Skeleton loading states
- Clean dashboard interface
- Consistent design system
- Mobile-first experience

---

# 🛠 Tech Stack

### Frontend

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Recharts

### Backend

- Next.js API Routes
- TypeScript

### Database

- MongoDB Atlas
- Mongoose

### Authentication

- NextAuth.js
- JWT Authentication

### Deployment

- Vercel
- MongoDB Atlas

---

# 👥 User Roles

## Patient

- Browse doctors
- Book appointments
- Manage appointments
- View booking history

---

## Doctor

- Register professional profile
- Manage availability
- Handle appointments
- View analytics
- Manage patients

---

## Admin

- Approve doctors
- Manage users
- Monitor platform
- View analytics

---

# 📄 Core Pages

## Public Pages

- Home
- Explore Doctors
- Doctor Details
- Login
- Register

---

## Protected Pages

### Patient Dashboard

- Upcoming Appointments
- Appointment History
- Cancel Appointments

### Doctor Dashboard

- Add Time Slots
- Manage Slots
- Manage Patients
- Analytics

### Admin Dashboard

- Doctor Verification
- User Management
- Platform Analytics

---

# 🔐 Security Features

- JWT Authentication
- Protected API Routes
- Role-Based Authorization
- Edge Middleware Protection
- Secure Booking Validation
- Doctor Verification System

---

# 🚀 Concurrency Control

Healora implements a slot-locking mechanism to eliminate double booking.

### Booking Flow

1. Patient selects an available slot.
2. Slot status changes from **Available** → **Pending**.
3. Slot is temporarily locked.
4. Appointment must be confirmed within the timeout period.
5. If confirmation fails, the slot automatically becomes available again.

This approach ensures that multiple users cannot reserve the same appointment simultaneously.

---

# 📁 Database Collections

### Users

- Name
- Email
- Password
- Role
- Created At

### Doctor Profiles

- Specialty
- Experience
- Consultation Fee
- Bio
- Rating
- Approval Status

### Time Slots

- Doctor Reference
- Start Time
- End Time
- Booking Status
- Lock Timestamp

### Appointments

- Patient Reference
- Doctor Reference
- Slot Reference
- Status
- Patient Notes

---

# 📦 Installation

Clone the repository

```bash
git clone https://github.com/your-username/Healora.git
```

Move into the project

```bash
cd Healora
```

Install dependencies

```bash
npm install
```

Create a `.env.local` file

```env
MONGODB_URI=

NEXTAUTH_SECRET=

NEXTAUTH_URL=

JWT_SECRET=
```

Run the development server

```bash
npm run dev
```

Open

```
http://localhost:3000
```

---

# 📁 Project Structure

```
src/
│
├── app/
├── components/
├── dashboard/
├── models/
├── lib/
├── middleware/
├── hooks/
├── services/
├── utils/
├── types/
└── api/
```

---

# 🎯 Future Improvements

- Online payment gateway
- Video consultation
- Email notifications
- SMS reminders
- Prescription management
- Medical records
- Doctor availability synchronization
- Real-time chat
- Push notifications
- Multi-language support

---

# 📈 Performance Goals

- Fast page loads
- Optimized server-side rendering
- Responsive across all devices
- Secure authentication
- Reliable concurrent booking
- Scalable architecture

---

# 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to your branch
5. Open a Pull Request

---

# 📄 License

This project is licensed under the **MIT License**.

---

# 👨‍💻 Author

**Ruhit**

Passionate Full-Stack Developer focused on building scalable, user-centric web applications using modern JavaScript technologies.
