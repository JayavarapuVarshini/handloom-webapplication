🧵 HandloomHub - E-Commerce Platform for Artisans

> Connecting Artisans with the World** - A modern e-commerce platform that bridges the gap between skilled artisans and global buyers.

---
🌟 Features

🔐 Multi-Role Authentication
- **Buyer**: Browse products, add to cart, wishlist, and checkout
- **Artisan**: Manage products, track sales, and view orders
- **Marketing**: Run campaigns, analyze performance metrics
- **Admin**: Full system administration and user management

🛍️ Buyer Features
- Product browsing with search functionality
- Shopping cart with quantity management
- Wishlist for saving favorite items
- Secure checkout process
- Order confirmation and tracking

🎨 Artisan Features
- Product inventory management
- Sales tracking dashboard
- Order management system
- Quick stats and analytics

 📊 Marketing Features
- Campaign management
- Performance analytics
- Customer acquisition metrics
- Conversion tracking

 ⚙️ Admin Features
- User management dashboard
- System monitoring and alerts
- Role-based access control
- System configuration settings

---

## 📁 Project Structure

handloomhub/
├── public/
│   ├── index.html
│   └── favicon.ico
│
├── src/
│   ├── components/
│   │   ├── AdminDashboard.jsx
│   │   ├── ArtisanDashboard.jsx
│   │   ├── BuyerDashboard.jsx
│   │   ├── Cart.jsx
│   │   ├── Checkout.jsx
│   │   ├── Header.jsx
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── MarketingDashboard.jsx
│   │   ├── ProductDetail.jsx
│   │   ├── ProductListing.jsx
│   │   ├── Register.jsx
│   │   └── Wishlist.jsx
│   │
│   ├── context/
│   │   ├── AuthContext.jsx
│   │   └── CartContext.jsx
│   │
│   ├── ProtectedRoute.jsx
│   ├── data/
│   │   └── Products.jsx
│   │
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
│
├── .gitignore
├── package.json
├── package-lock.json
└── README.md
---

---

👤 Demo Credentials

| Role         | Email                                                 | Password   |
| ------------ | ----------------------------------------------------- | ---------- |
| 🛒 Buyer     | [buyer@example.com](mailto:buyer@example.com)         | `password` |
| 🎨 Artisan   | [artisan@example.com](mailto:artisan@example.com)     | `password` |
| 📊 Marketing | [marketing@example.com](mailto:marketing@example.com) | `password` |
| 🔒 Admin     | `admin@example.com`                                   | `admin123` |

---

 🚀 Quick Start

 Prerequisites
- Node.js (v14 or higher)
- npm (v6 or higher)
- Git

 Step 1: Create React App

```bash
# Create the React app
npx create-react-app handloomhub

# Navigate into the project folder
cd handloomhub
git clone https://github.com/JayavarapuVarshini/handloomhub.git
cd handloomhub
---

# Install Material-UI and its dependencies
npm install @mui/material @emotion/react @emotion/styled

# Install Material-UI Icons
npm install @mui/icons-material

# Install React Router for navigation
npm install react-router-dom

# Install all dependencies at once (optional)
npm install @mui/material @emotion/react @emotion/styled @mui/icons-material react-router-dom

---

✈️Start the Development Server
  npm start
---
Open Your Browser
 http://localhost:3000

