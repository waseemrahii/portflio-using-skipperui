export const SKILLS_DATA = {
  frontend: [
    { name: "React", level: 95, icon: "⚛️", description: "Advanced React development with hooks and context" },
    { name: "Next.js", level: 90, icon: "▲", description: "Full-stack applications with SSR and SSG" },
    { name: "TypeScript", level: 88, icon: "🔷", description: "Type-safe development and better code quality" },
    {
      name: "Tailwind CSS",
      level: 92,
      icon: "🎨",
      description: "Utility-first CSS framework for rapid UI development",
    },
    { name: "Framer Motion", level: 85, icon: "🎭", description: "Advanced animations and micro-interactions" },
    { name: "Redux", level: 80, icon: "🔄", description: "State management for complex applications" },
  ],
  backend: [
    { name: "Node.js", level: 90, icon: "🟢", description: "Server-side JavaScript runtime environment" },
    { name: "Express.js", level: 88, icon: "🚀", description: "Fast and minimalist web framework" },
    { name: "MongoDB", level: 85, icon: "🍃", description: "NoSQL database for modern applications" },
    { name: "PostgreSQL", level: 82, icon: "🐘", description: "Advanced relational database management" },
    { name: "GraphQL", level: 78, icon: "📊", description: "Query language for APIs" },
    { name: "REST APIs", level: 92, icon: "🔗", description: "RESTful web services and API design" },
  ],
  tools: [
    { name: "Git", level: 95, icon: "📦", description: "Version control and collaboration" },
    { name: "Docker", level: 75, icon: "🐳", description: "Containerization and deployment" },
    { name: "AWS", level: 70, icon: "☁️", description: "Cloud services and infrastructure" },
    { name: "Vercel", level: 88, icon: "▲", description: "Modern deployment platform" },
    { name: "Figma", level: 85, icon: "🎨", description: "UI/UX design and prototyping" },
    { name: "WordPress", level: 90, icon: "📝", description: "Custom themes and plugin development" },
  ],
}

export const PROJECTS_DATA = [
  {
    id: 1,
    title: "E-Commerce MERN Platform",
    description:
      "A comprehensive e-commerce solution built with the MERN stack, featuring advanced product filtering, secure payment integration with Stripe, real-time inventory management, user authentication, shopping cart functionality, order tracking, and an intuitive admin dashboard for managing products, orders, and customers.",
    image: "/images/project1.jpg",
    tech: ["React", "Node.js", "MongoDB", "Stripe", "Redux", "Express", "JWT", "Cloudinary"],
    github: "https://github.com/waseemrahii/ecommerce-platform",
    live: "https://ecommerce-demo.wasimdev.com",
    featured: true,
    category: "Full Stack",
    year: "2024",
    duration: "3 months",
  },
  {
    id: 2,
    title: "Next.js Analytics Dashboard",
    description:
      "Modern admin dashboard with real-time analytics, interactive data visualization using Chart.js, user management system, role-based access control, dark/light theme switching, export functionality, and responsive design optimized for all devices. Built with Next.js 14 and TypeScript.",
    image: "/images/project2.jpg",
    tech: ["Next.js", "TypeScript", "PostgreSQL", "Chart.js", "Prisma", "NextAuth", "TailwindCSS"],
    github: "https://github.com/waseemrahii/analytics-dashboard",
    live: "https://dashboard-demo.wasimdev.com",
    featured: true,
    category: "Frontend",
    year: "2024",
    duration: "2 months",
  },
  {
    id: 3,
    title: "WordPress Custom Theme",
    description:
      "Custom WordPress theme with advanced customization options, SEO optimization, page builder integration, WooCommerce compatibility, multi-language support, custom post types, and mobile-first responsive design. Includes custom admin panel and theme options.",
    image: "/images/project3.jpg",
    tech: ["WordPress", "PHP", "MySQL", "JavaScript", "SCSS", "ACF", "WooCommerce"],
    github: "https://github.com/waseemrahii/wp-custom-theme",
    live: "https://wp-theme-demo.wasimdev.com",
    featured: false,
    category: "WordPress",
    year: "2023",
    duration: "1.5 months",
  },
  {
    id: 4,
    title: "MERN Social Media App",
    description:
      "Feature-rich social media platform with real-time messaging using Socket.io, post sharing with image/video upload, user profiles with bio and followers, friend connections and requests, notification system, news feed algorithm, and mobile-responsive design.",
    image: "/images/project4.jpg",
    tech: ["React", "Node.js", "Socket.io", "MongoDB", "JWT", "Multer", "Express", "Redux"],
    github: "https://github.com/waseemrahii/social-media-app",
    live: "https://social-demo.wasimdev.com",
    featured: true,
    category: "Full Stack",
    year: "2023",
    duration: "4 months",
  },
]

export const TESTIMONIALS_DATA = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "CEO, TechStart Inc.",
    company: "TechStart Inc.",
    content:
      "Wasim delivered an exceptional e-commerce platform that exceeded our expectations. His attention to detail, technical expertise, and ability to understand our business requirements are outstanding. The project was completed on time and within budget.",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
    rating: 5,
    project: "E-Commerce Platform",
    location: "San Francisco, CA",
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "CTO, DataFlow Solutions",
    company: "DataFlow Solutions",
    content:
      "Working with Wasim was a pleasure. He transformed our complex requirements into a beautiful, functional dashboard that our team loves using. His expertise in React and data visualization is impressive.",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    rating: 5,
    project: "Analytics Dashboard",
    location: "New York, NY",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Founder, CreativeHub Agency",
    company: "CreativeHub Agency",
    content:
      "Wasim's expertise in WordPress development helped us create a stunning website that perfectly represents our brand. His communication throughout the project was excellent, and he delivered exactly what we envisioned.",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    rating: 5,
    project: "WordPress Website",
    location: "Los Angeles, CA",
  },
]

export const CONTACT_INFO = {
  email: "waseemrahii@gmail.com",
  phone: "+92 345 5998484",
  location: "Available Worldwide",
  timezone: "GMT+5 (PKT)",
  availability: "Available for new projects",
  responseTime: "Within 24 hours",
  socialLinks: {
    github: "https://github.com/waseemrahii/",
    linkedin: "https://www.linkedin.com/in/muhammad-wasim-557523224/",
    twitter: "https://twitter.com/wasimdev",
    portfolio: "https://wasimdev.com",
  },
}

export const SERVICES = [
  {
    title: "Full Stack Development",
    description: "Complete web application development using MERN stack",
    icon: "🚀",
    price: "Starting from $2000",
  },
  {
    title: "Frontend Development",
    description: "Modern, responsive user interfaces with React/Next.js",
    icon: "💻",
    price: "Starting from $1000",
  },
  {
    title: "Backend Development",
    description: "Scalable server-side applications and APIs",
    icon: "⚙️",
    price: "Starting from $1500",
  },
  {
    title: "WordPress Development",
    description: "Custom themes, plugins, and WooCommerce solutions",
    icon: "📝",
    price: "Starting from $800",
  },
  {
    title: "UI/UX Design",
    description: "User-centered design and interactive prototypes",
    icon: "🎨",
    price: "Starting from $600",
  },
  {
    title: "Consulting & Mentoring",
    description: "Technical consultation and code review services",
    icon: "🧠",
    price: "Starting from $100/hour",
  },
]
