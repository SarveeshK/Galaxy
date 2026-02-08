# Galaxy 2026 - Official Event Website

![Galaxy Banner](https://drive.google.com/uc?export=view&id=18EQeNdPIj-9CnQjPz2gt_shdXtlYzC6l)

Welcome to the official repository for **Galaxy 2026**, a modern, interactive event registration and information platform designed for our college technical fest. This project features a stunning space-themed UI with 3D elements, smooth animations, and a seamless registration experience.

## 🚀 About The Project

Galaxy 2026 is built to provide an immersive experience for participants. It allows users to:
- Explore various technical and non-technical events.
- View detailed information about each event, including rounds, rules, and coordinators.
- Register for events directly through the portal with real-time validation.
- Experience a dynamic "Galaxy" background with interactive elements.

The application is optimized for performance across both desktop and mobile devices, ensuring a consistent premium look and feel.

## 🛠️ Tech Stack

This project leverages a robust modern web stack to deliver a high-performance and visually appealing experience:

- **Framework:** [React](https://react.dev/) with [Vite](https://vitejs.dev/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) & [PostCSS](https://postcss.org/)
- **Animations:** 
  - **[Framer Motion](https://www.framer.com/motion/)** (Used for complex layout transitions, modal animations, and identifying UI interactions)
  - [GSAP](https://gsap.com/) (GreenSock Animation Platform for high-performance animations)
- **3D & Graphics:** [OGL](https://github.com/oframe/ogl) (Minimal WebGL library for the Galaxy background)
- **UI Components:** [Radix UI](https://www.radix-ui.com/) (Accessible, unstyled primitives)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Forms & Validation:** [React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/)
- **Backend / Integration:** Google Apps Script (Handles form submissions and data storage in Google Sheets)

## ✨ Features

- **Interactive 3D Background:** A custom-built Galaxy particle system using OGL that reacts to mouse movement.
- **Dynamic Routing:** Seamless navigation between Home, Events, About, and Registration views.
- **Event Filtering & Details:** Detailed modal views for events like "Project War", "Paper Presentation", "Stranger Things", and more.
- **Smart Registration Forms:** team-based registration with "Same as above" functionality and real-time validation.
- **Responsive Design:** tailored UI for mobile users (optimized star density, touch-friendly navigation).
- **Glassmorphism UI:** Modern aesthetic with backdrop blurs and subtle gradients.

## 📂 Project Structure

```
s:\Galaxy\app\src
├── components/       # Reusable UI components (Galaxy, Navbar, Cards)
├── sections/         # Main page sections (Hero, Events, Register)
├── data/             # Static data files (Events list, combos)
├── hooks/            # Custom React hooks
├── lib/              # Utility libraries (cn, radix setups)
└── App.tsx           # Main application entry point with routing logic
```

## ⚡ Getting Started

To run this project locally, follow these steps:

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/galaxy-2026.git
   cd galaxy-2026/app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

---
*Built by the Galaxy 2026 Web Team.*
