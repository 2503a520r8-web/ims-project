# 🎓 NexusAttendance - Enterprise Attendance & Infrastructure Platform

A modern, multi-role academic attendance and leave management system built with responsive SaaS UI, MongoDB persistence, and real-time analytics.

---

## 📁 Repository Structure (Public Hosting Optimized)

```text
IMS PROJECTE/
├── index.html            # Production-ready web app (Vercel, Netlify & GitHub Pages ready)
├── vercel.json           # Vercel 1-click deployment configuration
├── netlify.toml          # Netlify 1-click deployment configuration
├── Procfile              # Render / Railway unified fullstack deployment
├── .gitignore            # Optimized gitignore (prevents node_modules & secrets upload)
├── README.md             # Complete deployment & setup documentation
│
├── backend/              # Node.js + Express + MongoDB (Mongoose) Backend API
│   ├── server.js         # REST API & static frontend server (Port 5001)
│   ├── mongodb_schema.js # MongoDB BSON schema & collection specifications
│   ├── .env.example      # Sample environment variables
│   └── package.json      # Lightweight dependencies (Express, Mongoose, Cors, Dotenv)
│
└── frontend/             # Alternative React (Vite) Single Page App
    ├── src/
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css
    ├── index.html
    └── package.json
```

---

## 🌐 How to Host Publicly Online (100% Free)

### Option 1: Netlify Drop (Easiest - 30 Seconds, No Terminal Needed)
1. Open [app.netlify.com/drop](https://app.netlify.com/drop) in your browser.
2. Drag and drop this `IMS PROJECTE` folder directly into the browser upload box.
3. Netlify will deploy it instantly and give you a public URL (e.g., `https://nexus-attendance.netlify.app`) that works on any phone, tablet, or laptop worldwide!

### Option 2: Vercel (1-Click Deployment)
1. Push this repository to your GitHub account:
   ```bash
   git push origin main
   ```
2. Go to [vercel.com](https://vercel.com) and click **"Add New Project"** -> Import this repository.
3. Keep default settings and click **Deploy**. Vercel will automatically read `vercel.json` and deploy it live!

### Option 3: GitHub Pages
1. On GitHub, go to your repository **Settings** -> **Pages**.
2. Under **Build and deployment**, select **Deploy from a branch**.
3. Set the branch to `main` and folder to `/ (root)`, then click **Save**.
4. Your site will be live at `https://<your-username>.github.io/<repo-name>/`.

### Option 4: Fullstack with MongoDB on Render / Railway
1. Create a free MongoDB database at [mongodb.com/atlas](https://www.mongodb.com/atlas).
2. Deploy this repository to [render.com](https://render.com) as a **Web Service**.
3. Set Environment Variable: `MONGO_URI=<your-mongodb-atlas-uri>`.
4. Render will start `node backend/server.js`, hosting both the REST API and the frontend together!

---

## 💻 Local Development

### Option A: Open with Live Server (Instant)
Right-click on `index.html` in VS Code and select **"Open with Live Server"**.

### Option B: Run MongoDB Backend
```bash
cd backend
npm install
npm start
```
The server will run on `http://localhost:5001`.
