# E-SHOP - Premium Fashion E-Commerce Platform 

A high-end, minimalist e-commerce web application inspired by luxury fashion brands. Built with **React** on the frontend and **Django REST Framework** on the backend, offering a seamless and secure shopping experience.

## Key Features

### Customer Experience
* **Luxury Aesthetic UI:** Minimalist black & white design, elegant typography, and smooth animations using Tailwind CSS.
* **Dynamic Product Catalog:** Browse trending pieces, curated collections, and view detailed product pages.
* **Smart Cart System:** Real-time cart updates, quantity management, and persistent local storage.
* **Secure Checkout & Payments:** Seamless checkout flow with a mock payment gateway (Credit Card, PayPal, Google Pay).
* **Order Management:** Customers can view their purchase history.
* **PDF E-Receipts:** Automated, downloadable PDF invoices for every completed order using `jsPDF`.

### Admin & Security
* **Executive Dashboard:** A clean, metric-driven admin panel to track Total Revenue, Orders, and Inventory.
* **Order Fulfillment:** Admins can securely mark orders as "Delivered" with a single click.
* **JWT Authentication:** Robust token-based authentication system for secure login and protected routes.

---

## Tech Stack

**Frontend:**
* React.js (Vite)
* Tailwind CSS (Styling & UI)
* React Router DOM (Navigation)
* Lucide React (Premium Icons)
* Axios (API Requests)
* jsPDF (Invoice Generation)

**Backend:**
* Django (Python)
* Django REST Framework (APIs)
* Simple JWT (Authentication)
* SQLite3 (Database - easily scalable to PostgreSQL)

---

## Default Credentials (For Testing)

**Admin Account:**
* Username: ecommerce
* Password: e123
(Use this to access the Admin Control Panel and manage orders).

## Installation & Setup

Follow these steps to run the project locally on your machine.

### 1. Clone the Repository
```bash
git clone https://github.com/UmairFar00qi/ecommerce_pro
cd e-shop-premium