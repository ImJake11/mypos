# 📌 Project Title
**Nexustock Point of Sale (POS) System – Next.js + PostgreSQL**

## 📖 Overview
This is a full-featured Point of Sale (POS) web application designed for small to medium businesses, built with **Next.js**, **PostgreSQL**, and **Prisma**.  
It supports **inventory management**, **sales tracking**, and **user authentication** with secure session handling.

The app is **fully responsive** and optimized for both desktop and mobile devices, ensuring a seamless experience for store owners and staff.

---

## ✨ Key Features
- 🔐 **Authentication & Authorization** – Custom-built session token system using PostgreSQL & Prisma for secure user logins and role-based access.
- 📦 **Inventory Management** – Add, edit, delete, and track stock levels in real time.
- 🛒 **Sales Processing** – Create, edit, and finalize transactions with automatic total calculations.
- 📊 **Reporting Dashboard** – View sales summaries and inventory insights.
- 🌐 **Real-Time Updates (WebSocket-ready)** – Designed to support instant stock and sales updates (coming soon).
- 🎨 **Responsive UI** – Built with Tailwind CSS for a clean, modern look across devices.

---

## 🛠 Tech Stack
**Frontend:** Next.js, React, Tailwind CSS, Framer Motion  
**Backend:** Next.js API Routes, Prisma ORM, Node.js  
**Database:** PostgreSQL (hosted on Neon)  
**Version Control:** Git & GitHub  
**Deployment:** Vercel  
**Authentication:** Custom session-based auth system with Prisma

---

## 🚀 Getting Started

### 1️⃣ Clone the repository
```bash
git clone https://github.com/yourusername/pos-system.git
cd mypos
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Configure environment variables
**Create a `.env` file** and set:
```env
DATABASE_URL=your_database_connection_url
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
```

### 4️⃣ Run database migrations
```bash
npx prisma migrate dev
```

### 5️⃣ Start the development server
```bash
npm run dev
```
The app will be available at: http://localhost:3000


## 📸 Screenshots

<img width="800" height="500" alt="Screenshot 2025-08-12 110734" src="https://github.com/user-attachments/assets/42bb7736-f55d-4268-b3e3-a76404dc90b3" />
<img width="800" height="500" alt="Screenshot 2025-08-12 110614" src="https://github.com/user-attachments/assets/beddcd53-0051-46c9-b3c3-f10da6ab2292" />
<img width="800" height="500" alt="Screenshot 2025-08-12 111245" src="https://github.com/user-attachments/assets/f3019b44-515f-4eee-8077-df2096b8c065" />

##🔮 Roadmap

 ## Phase 1 – Base Setup (✅ Completed)

- Next.js Project Initialization – Set up Next.js with TypeScript support.
- Tailwind CSS Integration – Configured for responsive, utility-first styling.
- Database Setup – PostgreSQL database hosted on Neon.
- Prisma ORM Configuration – Prisma schema for users, products, and sales tables.
- Git Version Control – Repository initialized and committed to GitHub.

  ## Phase 2 – Core Features (✅ Completed)
- Authentication System – Custom session tokens stored in PostgreSQL.
- User Roles – Basic role-based access (admin vs staff).
- Inventory Management – Add, edit, delete products with stock tracking.
- Sales Transactions – Process orders, calculate totals, and store sales history.
- Basic Dashboard – Display inventory count and total sales overview.

  ## Phase 3 – UI & UX Improvements (🚧 In progress)
- Reusable Components – Navbar, modals, and form components.
- Responsive Layout – Mobile and desktop compatibility.
- Loading & Error States – User-friendly feedback for API calls.
- Toast Notifications – Confirmation and error alerts.

  ## Phase 4 – Additional Functionalities (🚧 In Progress)
- WebSocket Integration (not yet deployed) – For live inventory/sales updates.
- Pagination & Search – Improve performance for large product lists.
- Advanced Filters – Filter by category, stock level, or sales date.

### 📬 Contact
- For inquiries, feel free to reach out:
**Name:** Jake Juguilon
**Portfolio:** https://porfolio-jake-benitez-juguilon.vercel.app/
**Email:** jakejuguilon843@gmail.com
