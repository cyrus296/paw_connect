# 🐾 PawConnect — Intelligent Pet Health & Monitoring Platform

[![React](https://img.shields.io/badge/Frontend-React%20%7C%20Vite%20%7C%20TailwindCSS-06B6D4?style=flat-square)](https://vitejs.dev/)
[![Node.js](https://img.shields.io/badge/Backend-Node.js%20%7C%20Express-339933?style=flat-square)](https://nodejs.org/)
[![Database](https://img.shields.io/badge/Database-MongoDB%20%7C%20Mongoose-47A248?style=flat-square)](https://mongoosejs.com/)
[![Leaflet](https://img.shields.io/badge/Mapping-OpenStreetMap%20%7C%20Leaflet-199900?style=flat-square)](https://react-leaflet.js.org/)

An all-in-one full-stack pet healthcare, continuous vital sign monitoring, GPS safe-zone geofencing, and marketplace ecosystem designed for modern pet parents and veterinary professionals.

---

## 🌟 Key Features

1. **📊 Vittatc Real-Time Vitals Dashboard**
   - High-precision continuous graphs for **Heart Rate** ($70-220\text{ bpm}$) and **Body Temperature** ($98-108^\circ\text{F}$) using Recharts.
   - Dynamic **Mood Analysis Widget** (*Happy*, *Anxious*, *Resting*) based on real-time activity and biometric stress levels.
   - **Recommendation Engine**: Evaluates the rolling 10-reading window to generate personalized activity advice and hydration alerts.

2. **🚨 Edge Inference Anomaly Alerts**
   - Detects sudden accelerometer and gyroscopic spike events (**Fall Detection** and **Tamper / Collar Detachment**).
   - Instant prominent, dismissible warning banner at the top of the dashboard.

3. **📍 Live GPS Tracking & Safe-Zone Geofencing**
   - OpenStreetMap tracking powered by `react-leaflet`.
   - Adjustable emerald safe-zone circle with interactive radius slider ($50\text{m} - 1000\text{m}$).

4. **🐾 Multi-Pet Management & Breed Directory**
   - Manage multiple companion pet profiles with species-adaptive breed selectors (Dogs, Cats, Birds, Rabbits, and custom crossbreeds).
   - **🍖 In-Section Food Ordering**: Order tailored nutritional formulas for each pet with 1-click reorder.

5. **🏥 Pet Health & Medical Passport**
   - Immunization logs with status (*Up to Date / Due Soon / Overdue*).
   - Clinical illness logs, prescriptions, and allergy directories.

6. **🔔 Vaccine & Food Alerts Manager**
   - Automated booster reminder schedules and low kibble supply alerts.
   - Daily breakfast and dinner feeding alarms with completed status tracking.

7. **🩺 Pet Vet Care**
   - **In-Person Clinic Visit Booking**: Select certified veterinarians and reserve slots.
   - **HD Online Video Consultation**: Telehealth video appointments.
   - **24/7 Live Vet Chat**: Instant real-time triage consultation.

8. **🛍️ Food & Pet Essentials Store**
   - Organic grain-free nutrition, thermal coats, cooling vests, ergonomic no-pull harnesses, bungee leashes, and IQ puzzle toys.
   - Integrated shopping cart with instant checkout.

9. **🛰️ Locate My Pet (IoT Belt Store)**
   - Showcase of the 4G LTE-M / GPS waterproof smart collar belt.
   - Live battery (88%), cellular signal stats, and direct link to satellite tracking.

10. **🎥 Care & Grooming Video Academy**
    - Certified video tutorials for at-home de-shedding baths, nail trimming, loose-leash training, canine CPR, and DIY bone broth.

11. **🏨 Pet Boarding & Luxury Daycare**
    - Reserve **Cozy Kennels**, **Sunshine Suites**, or **VIP Penthouse Villas** with 24/7 live webcam streams.

12. **👥 Pet Lover Community**
    - Social feed to share pet stories, photos, and training tips with interactive likes and comments.

13. **💕 Pet Mate Matchmaker**
    - Verified breeding matchmaker with health clearances (OFA hips, DNA panels) and pedigree verification.

14. **🏡 Pet Adoption Portal**
    - Rescue animal adoption portal connecting prospective owners with shelter dogs, cats, and rabbits.

15. **🤖 PawAI 24/7 Assistant**
    - Conversational AI assistant accessible via full-page view or persistent floating widget on every page.

---

## 🚀 Quick Start Guide

### Prerequisites
- Node.js (v18+ recommended)
- npm

### 1. Start the Backend API Server
```bash
# In the project root
npm start
```
> *Note:* If local MongoDB is not running, an embedded in-memory MongoDB database automatically initializes. If port 5000 is occupied by macOS AirPlay, the server automatically falls back to port 5001.

### 2. Start the React Frontend
```bash
# In another terminal window
npm run client
```
Open **[http://localhost:5173](http://localhost:5173)** in your browser.

### 3. (Optional) Run the Telemetry Simulator
```bash
# In a third terminal window
npm run simulator
```
Simulates real-time multi-sensor collar telemetry streaming every 5 seconds with random fall/tamper edge inference events.

---

## 🛠️ Tech Stack

- **Frontend**: React 19, Vite, Tailwind CSS v4, Recharts, React-Leaflet, Leaflet
- **Backend**: Node.js, Express 5, Mongoose, CORS, MongoMemoryServer
- **Hardware Simulation**: Multi-axis Accelerometer, Gyroscope, GPS, and Temperature Telemetry

---

## 📄 License
ISC License • Created by [cyrus296](https://github.com/cyrus296)
