"use client"

import React, { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence, useScroll, useTransform, useInView } from "framer-motion"
import { Github, Linkedin, Mail, ExternalLink, Code, ChevronDown, Star, Calendar, MapPin, Download, Send, MessageCircle, X, Menu, Heart, Server, Layers, Users, Award, Coffee, Sparkles, Rocket, Brain, Phone, Globe, ChevronLeft, ChevronRight, Facebook, Twitter, Link } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import HoverExpand from "@/components/ui/hover-expand"
import { AiInput } from "@/components/ui/ai-input"
import ImageCursorTrail from "@/components/ui/image-cursor-trail"
import ShareButton from "@/components/ui/share-button"
import WrapButton from "@/components/ui/wrap-button"
import FlipLink from "@/components/ui/text-effect-flipper"
import { PopoverForm, PopoverFormButton, PopoverFormSuccess } from "@/components/ui/popover-form"
import MaskedDiv from "@/components/ui/masked-div"
import { CONTACT_INFO, SKILLS, PROJECTS, TESTIMONIALS } from "@/lib/constants"
import {
  DialogStack,
  DialogStackBody,
  DialogStackContent,
  DialogStackFooter,
  DialogStackHeader,
  DialogStackNext,
  DialogStackOverlay,
  DialogStackPrevious,
  DialogStackTrigger,
} from "@/components/ui/stacked-dialog"
import ImageRipple from "@/components/ui/image-ripple"

// CV Download Function with actual CV content
const downloadCV = () => {
  const cvContent = `
MUHAMMAD WASIM
FULL STACK DEVELOPER

CONTACT
Phone: +92 345 5998484
Email: waseemrahii@gmail.com
Address: 6th Road, Rawalpindi, Pakistan
GitHub: https://github.com/waseemrahii
LinkedIn: www.linkedin.com/in/muhammad-wasim-557523224

PROFILE
Skilled Senior MERN Stack Developer specializing in building scalable web applications and leading high-impact projects. Expert in developing high-traffic e-commerce platforms with real-time features such as live store locators. Adept at creating smart, 3D, and visually stunning designs, with a strong focus on performance optimization, client satisfaction, and delivering top-quality solutions.

EDUCATION
BS Computer Science (2019 - 2023)
University of Science and Technology Bannu
GPA: 3.49/4.0

FSC in Computer Science (2017 - 2019)
Govt Post Graduate College Lakki

EXPERIENCE

MERN Stack Developer - Parwaz Digital Company (May 2024 - July 2025)
• Built a complete multi-vendor e-commerce platform with vendor onboarding, product management, order tracking, JazzCash integration, and admin-managed payouts
• Delivered restaurant and business management systems with modules for inventory, billing, and reporting
• Currently working with the Ministry of E-Commerce Pakistan on a national platform for import/export product management
• Developed a bulk email campaign system with real-time tracking and subscription management
• Led a large-scale e-commerce project, optimizing backend performance and team delivery using the MERN stack
• Managed deployments on AWS, DigitalOcean, and Hostinger, with strong Git-based workflows

Full Stack Developer - CodesVista Company, Rawalpindi (Apr 2023 - Nov 2023)
• Developed a bulk email platform with real-time analytics, subscription management, and customizable templates to improve marketing efficiency
• Delivered full-stack web applications for pharmacy, e-commerce, and business platforms using the MERN stack, ensuring scalability and robust performance
• Managed collaborative development through Git, maintaining clean version control and streamlined team workflows
• Handled end-to-end deployment on AWS, DigitalOcean, and Hostinger, applying DevOps best practices for uptime and reliability

Software Developer - Lighthouse Development Company (Mar 2022 - Jan 2023)
• Led development of Final Year Projects (FYPs) and custom software solutions with a focus on scalability and security
• Mentored junior developers and provided technical leadership to ensure quality outcomes
• Collaborated closely with clients to deliver tailored applications, achieving high satisfaction and successful deliveries

SKILLS
Frontend: HTML, CSS, JavaScript, React.js, Three.js, Next.js
Backend: Node.js, Express.js
Database: MongoDB, PostgreSQL
Full Stack Framework: Next.js

STRENGTHS
• Programming
• Strategic Planning
• Teamwork
• Time Management
• Effective Communication
• Critical Thinking

LANGUAGES
• English (Intermediate)
• Pashto (Fluent)
• Urdu (Fluent)
  `

  // Create and download the file
  const blob = new Blob([cvContent], { type: 'text/plain' })
  const url = window.URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'Muhammad_Wasim_CV.txt'
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  window.URL.revokeObjectURL(url)
}

// Enhanced Card Swipe Component with 3D Effect
const CardSwipe = ({
  images,
  autoplayDelay = 4000,
  className,
}: {
  images: Array<{ src: string; alt: string; title?: string; description?: string }>
  autoplayDelay?: number
  className?: string
}) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [dragOffset, setDragOffset] = useState(0)
  const [isDragging, setIsDragging] = useState(false)

  useEffect(() => {
    if (autoplayDelay > 0 && !isDragging) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % images.length)
      }, autoplayDelay)
      return () => clearInterval(interval)
    }
  }, [images.length, autoplayDelay, isDragging])

  const handleDragStart = () => {
    setIsDragging(true)
  }

  const handleDragEnd = (event: any, info: any) => {
    setIsDragging(false)
    const threshold = 100
    
    if (info.offset.x > threshold) {
      setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
    } else if (info.offset.x < -threshold) {
      setCurrentIndex((prev) => (prev + 1) % images.length)
    }
    setDragOffset(0)
  }

  return (
    <div className={cn("relative w-full h-[500px] overflow-hidden", className)}>
      <div className="relative w-full h-full flex items-center justify-center">
        {images.map((image, index) => {
          const offset = index - currentIndex
          const isActive = index === currentIndex
          const isPrev = index === (currentIndex - 1 + images.length) % images.length
          const isNext = index === (currentIndex + 1) % images.length
          
          return (
            <motion.div
              key={index}
              className="absolute w-80 h-96 rounded-3xl overflow-hidden shadow-2xl cursor-grab active:cursor-grabbing no-cursor-trail"
              style={{
                zIndex: isActive ? 3 : isPrev || isNext ? 2 : 1,
              }}
              initial={false}
              animate={{
                x: offset * 60 + (isActive ? 0 : offset > 0 ? 40 : -40),
                y: isActive ? 0 : Math.abs(offset) * 20,
                scale: isActive ? 1 : 0.85,
                rotateY: offset * -15,
                opacity: Math.abs(offset) > 2 ? 0 : 1,
              }}
              drag="x"
              dragConstraints={{ left: -200, right: 200 }}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
              whileDrag={{ scale: 1.05 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
              }}
            >
              <div className="relative w-full h-full bg-gradient-to-br from-white to-gray-50 border border-gray-200">
                <img
                  src={image.src || "/placeholder.svg"}
                  alt={image.alt}
                  className="w-full h-64 object-cover"
                  draggable={false}
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{image.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{image.description}</p>
                </div>
                
                {/* Glassmorphism overlay for non-active cards */}
                {!isActive && (
                  <div className="absolute inset-0 bg-white/20 backdrop-blur-sm" />
                )}
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Navigation dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={cn(
              "w-2 h-2 rounded-full transition-all duration-300 no-cursor-trail",
              index === currentIndex 
                ? "w-8 bg-yellow-500" 
                : "bg-gray-300 hover:bg-gray-400"
            )}
          />
        ))}
      </div>

      {/* Side navigation */}
      <button
        onClick={() => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/80 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-colors flex items-center justify-center no-cursor-trail"
      >
        <ChevronLeft className="w-6 h-6 text-gray-700" />
      </button>
      <button
        onClick={() => setCurrentIndex((prev) => (prev + 1) % images.length)}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/80 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-colors flex items-center justify-center no-cursor-trail"
      >
        <ChevronRight className="w-6 h-6 text-gray-700" />
      </button>
    </div>
  )
}

// Enhanced Card Carousel Component
const CardCarousel = ({
  images,
  autoplayDelay = 3000,
  showPagination = true,
  showNavigation = true,
  className,
}: {
  images: Array<{ src: string; alt: string; title?: string; description?: string }>
  autoplayDelay?: number
  showPagination?: boolean
  showNavigation?: boolean
  className?: string
}) => {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (autoplayDelay > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % images.length)
      }, autoplayDelay)
      return () => clearInterval(interval)
    }
  }, [images.length, autoplayDelay])

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }

  return (
    <div className={cn("relative w-full overflow-hidden rounded-3xl shadow-2xl", className)}>
      <div className="relative h-96">
        {images.map((image, index) => (
          <div
            key={index}
            className={cn(
              "absolute inset-0 transition-opacity duration-700 ease-in-out",
              index === currentIndex ? "opacity-100" : "opacity-0"
            )}
          >
            <img
              src={image.src || "/placeholder.svg"}
              alt={image.alt}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            <div className="absolute bottom-8 left-8 text-white">
              <h3 className="text-2xl font-bold mb-2">{image.title}</h3>
              <p className="text-lg opacity-90">{image.description}</p>
            </div>
          </div>
        ))}
      </div>

      {showNavigation && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white rounded-full transition-colors flex items-center justify-center no-cursor-trail"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white rounded-full transition-colors flex items-center justify-center no-cursor-trail"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </>
      )}

      {showPagination && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={cn(
                "h-1 rounded-full transition-all duration-300 no-cursor-trail",
                index === currentIndex ? "w-8 bg-white" : "w-2 bg-white/50 hover:bg-white/70"
              )}
            />
          ))}
        </div>
      )}
    </div>
  )
}

// Special Card Component
const SpecialCard = ({
  children,
  className = "",
}: { children: React.ReactNode; className?: string }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -5 }}
      whileTap={{ scale: 0.98 }}
      className={`relative group ${className}`}
    >
      <div className="absolute -inset-0.5 bg-yellow-400 rounded-lg blur opacity-20 group-hover:opacity-40 transition duration-500" />
      <div className="relative bg-white border border-yellow-200 rounded-lg hover:border-yellow-400 transition-all duration-300 shadow-sm hover:shadow-md">
        {children}
      </div>
    </motion.div>
  )
}

// Expanded Tabs Component
const ExpandedTabs = ({
  tabs,
}: { tabs: Array<{ label: string; content: React.ReactNode; icon: React.ReactNode }> }) => {
  const [activeTab, setActiveTab] = useState(0)

  return (
    <div className="w-full">
      <div className="flex flex-wrap gap-3 mb-8 justify-center">
        {tabs.map((tab, index) => (
          <motion.button
            key={index}
            onClick={() => setActiveTab(index)}
            className={`flex items-center space-x-2 px-6 py-3 rounded-full transition-all duration-300 font-medium no-cursor-trail ${
              activeTab === index
                ? "bg-yellow-500 text-white shadow-lg"
                : "bg-white text-gray-700 hover:bg-yellow-50 border border-yellow-200"
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div animate={activeTab === index ? { rotate: 360 } : { rotate: 0 }} transition={{ duration: 0.3 }}>
              {tab.icon}
            </motion.div>
            <span>{tab.label}</span>
          </motion.button>
        ))}
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
        >
          {tabs[activeTab].content}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

// Animated Number Component
const AnimatedNumber = ({
  value,
  duration = 2000,
  suffix = "",
}: { value: number; duration?: number; suffix?: string }) => {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (!isInView) return

    let start = 0
    const end = value
    const increment = end / (duration / 16)

    const timer = setInterval(() => {
      start += increment
      if (start >= end) {
        setCount(end)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, 16)

    return () => clearInterval(timer)
  }, [value, duration, isInView])

  return (
    <span ref={ref} className="text-yellow-600 font-bold">
      {count}
      {suffix}
    </span>
  )
}

// Minimal Card Component
const MinimalCard = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`bg-white border border-yellow-200 rounded-xl p-6 transition-all duration-300 hover:bg-yellow-50 hover:border-yellow-400 hover:shadow-lg ${className}`}
    >
      {children}
    </motion.div>
  )
}

// Flipper Text Effect Component
const Flipper = ({ texts, interval = 3000 }: { texts: string[]; interval?: number }) => {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % texts.length)
    }, interval)
    return () => clearInterval(timer)
  }, [texts.length, interval])

  return (
    <div className="relative inline-block h-8 overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.span
          key={currentIndex}
          initial={{ y: 20, opacity: 0, rotateX: 90 }}
          animate={{ y: 0, opacity: 1, rotateX: 0 }}
          exit={{ y: -20, opacity: 0, rotateX: -90 }}
          transition={{ duration: 0.5, type: "spring", stiffness: 200 }}
          className="absolute inset-0 flex items-center text-yellow-600 font-bold"
        >
          {texts[currentIndex]}
        </motion.span>
      </AnimatePresence>
    </div>
  )
}

// Arrow Icon Component
const ArrowIcon = (props: any) => (
  <svg
    width="8"
    height="10"
    viewBox="0 0 8 10"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M6.98298 6.19679C7.90428 5.66488 7.90428 4.33509 6.98298 3.80318L1.00704 0.352971C0.516375 0.0696831 -0.00492265 0.671685 0.345598 1.11682V1.11682C2.13943 3.39485 2.13943 6.60512 0.345598 8.88315V8.88315C-0.00492251 9.32828 0.516376 9.93029 1.00704 9.647L6.98298 6.19679Z"
      fill="currentColor"
    />
  </svg>
)

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("home")
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])

  // Scroll to section function
  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId)
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setIsMenuOpen(false)
  }

  // Add state for projects
  const [displayedProjects, setDisplayedProjects] = useState(4)

  const loadMoreProjects = () => {
    setDisplayedProjects(prev => Math.min(prev + 4, PROJECTS.length))
  }

  // Real project images for carousel and swipe with better quality
  const carouselImages = [
    { 
      src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop", 
      alt: "Analytics Dashboard",
      title: "Analytics Dashboard",
      description: "Real-time data visualization and insights"
    },
    { 
      src: "/images/vistamart.png", 
      alt: "E-commerce Platform",
      title: "E-commerce Platform", 
      description: "Modern shopping experience with secure payments"
    },
    { 
      src: "/images/image.png", 
      alt: "Food Delivery App",
      title: "Food Delivery System",
      description: "Real-time tracking and order management"
    },
    { 
      src: "/images/pharmacy.png", 
      alt: "Pharmacy Platform",
      title: "Pharmacy Management",
      description: "Prescription handling and inventory system"
    },
    { 
      src: "/images/email.png", 
      alt: "Email Marketing",
      title: "Email Marketing Platform",
      description: "Bulk email campaigns with analytics"
    },
  ]

  // Enhanced swipe images with more variety and better quality - Fixed missing images
  const swipeImages = [
    {
      src: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=500&h=400&fit=crop",
      alt: "Project 1",
      title: "Mobile Dashboard",
      description: "Responsive admin panel with real-time updates and intuitive user interface."
    },
    {
      src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&h=400&fit=crop",
      alt: "Project 2", 
      title: "Data Analytics",
      description: "Advanced analytics platform with interactive charts and reporting."
    },
    {
      src: "/images/vistamart.png",
      alt: "Project 3",
      title: "E-commerce Store",
      description: "Full-featured online store with payment integration and inventory management."
    },
    {
      // src: "https://images.unsplash.com/photo-1596526131083-e8c633c948d2?w=500&h=400&fit=crop",
      src:"/images/email.png",
      alt: "Project 4",
      title: "Email Marketing",
      description: "Comprehensive email marketing solution with automation and analytics."
    },
    {
      src: "/images/image.png",
      alt: "Project 5",
      title: "Food Delivery",
      description: "Modern food delivery platform with real-time tracking and GPS integration."
    },
    {
      src: "/images/pharmacy.png",
      alt: "Project 6",
      title: "Pharmacy System",
      description: "Complete pharmacy management with prescription handling and inventory."
    },
  ]

  const cursorTrailImages = [
    "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=120&h=150&fit=crop",
    "/images/vistamart.png",
    "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=120&h=150&fit=crop",
    "/images/email.png",
    "/images/pharmacy.png",
    "/images/project-7.png",
    "/images/project-8.png",
    "/images/project-9.png",
    "/images/project-10.png",
    "/images/project-11.png",
    "/images/project-12.png",
  ]

  const galleryImages = [
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
    // "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=600&fit=crop",
    "/images/pharmacy.png",
    // "https://images.unsplash.com/photo-1596526131083-e8c633c948d2?w=800&h=600&fit=crop",
    "/images/email.png",
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
    // "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&h=600&fit=crop",
    // "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=600&fit=crop",
    "/images/vistamart.png",
     "/images/project-8.png",
    "/images/project-9.png",
    "/images/project-10.png",
    "/images/project-11.png",
    "/images/project-12.png",
  ]

  const tabsData = [
    {
      label: "Frontend",
      icon: <Code className="w-5 h-5" />,
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SKILLS.frontend.map((skill) => (
            <MinimalCard key={skill.name} className="text-center">
              <div className="text-4xl mb-4">{skill.icon}</div>
              <div className="font-semibold text-gray-800 mb-3 text-lg">{skill.name}</div>
              <div className="w-full bg-yellow-100 rounded-full h-2 mb-2">
                <motion.div
                  className="bg-yellow-500 h-2 rounded-full"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  transition={{ duration: 1, delay: 0.2 }}
                />
              </div>
              <div className="text-sm text-gray-600">{skill.level}% Proficiency</div>
            </MinimalCard>
          ))}
        </div>
      ),
    },
    {
      label: "Backend",
      icon: <Server className="w-5 h-5" />,
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SKILLS.backend.map((skill) => (
            <MinimalCard key={skill.name} className="text-center">
              <div className="text-4xl mb-4">{skill.icon}</div>
              <div className="font-semibold text-gray-800 mb-3 text-lg">{skill.name}</div>
              <div className="w-full bg-yellow-100 rounded-full h-2 mb-2">
                <motion.div
                  className="bg-yellow-500 h-2 rounded-full"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  transition={{ duration: 1, delay: 0.2 }}
                />
              </div>
              <div className="text-sm text-gray-600">{skill.level}% Proficiency</div>
            </MinimalCard>
          ))}
        </div>
      ),
    },
    {
      label: "Tools & DevOps",
      icon: <Layers className="w-5 h-5" />,
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SKILLS.tools.map((skill) => (
            <MinimalCard key={skill.name} className="text-center">
              <div className="text-4xl mb-4">{skill.icon}</div>
              <div className="font-semibold text-gray-800 mb-3 text-lg">{skill.name}</div>
              <div className="w-full bg-yellow-100 rounded-full h-2 mb-2">
                <motion.div
                  className="bg-yellow-500 h-2 rounded-full"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  transition={{ duration: 1, delay: 0.2 }}
                />
              </div>
              <div className="text-sm text-gray-600">{skill.level}% Proficiency</div>
            </MinimalCard>
          ))}
        </div>
      ),
    },
  ]

  // Share links
  const shareLinks = [
    {
      icon: Twitter,
      onClick: () => window.open("https://twitter.com/intent/tweet?text=Check out this amazing portfolio!"),
      label: "Share on Twitter",
    },
    {
      icon: Facebook,
      onClick: () => window.open("https://facebook.com/sharer/sharer.php?u=" + window.location.href),
      label: "Share on Facebook",
    },
    {
      icon: Linkedin,
      onClick: () => window.open("https://linkedin.com/sharing/share-offsite/?url=" + window.location.href),
      label: "Share on LinkedIn",
    },
    {
      icon: Link,
      onClick: () => navigator.clipboard.writeText(window.location.href),
      label: "Copy link",
    },
  ]

  // Stacked Dialog Items with updated pricing
  const stackedDialogItems = [
    {
      title: "Let's Discuss Your Project",
      description: "Tell me about your vision",
      content: (
        <div className="space-y-4">
          <p className="text-gray-600">
            I'd love to hear about your project ideas and how we can bring them to life together. 
            What kind of application are you looking to build?
          </p>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <h4 className="font-semibold text-gray-800 mb-2">Web Applications</h4>
              <p className="text-sm text-gray-600">Full-stack web apps with modern frameworks</p>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h4 className="font-semibold text-gray-800 mb-2">E-commerce</h4>
              <p className="text-sm text-gray-600">Online stores with payment integration</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Technology Stack",
      description: "Choose your preferred technologies",
      content: (
        <div className="space-y-4">
          <p className="text-gray-600">
            Let's select the best technology stack for your project based on your requirements and goals.
          </p>
          <div className="space-y-3">
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <div className="text-2xl">⚛️</div>
              <div>
                <h4 className="font-semibold">MERN Stack</h4>
                <p className="text-sm text-gray-600">MongoDB, Express, React, Node.js</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <div className="text-2xl">▲</div>
              <div>
                <h4 className="font-semibold">Next.js</h4>
                <p className="text-sm text-gray-600">Full-stack React framework</p>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Project Timeline",
      description: "Let's plan your project timeline",
      content: (
        <div className="space-y-4">
          <p className="text-gray-600">
            Based on your requirements, here's a typical project timeline and process.
          </p>
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-yellow-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
              <div>
                <h4 className="font-semibold">Planning & Design</h4>
                <p className="text-sm text-gray-600">1-2 weeks for wireframes and architecture</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-yellow-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
              <div>
                <h4 className="font-semibold">Development</h4>
                <p className="text-sm text-gray-600">4-8 weeks depending on complexity</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-yellow-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</div>
              <div>
                <h4 className="font-semibold">Testing & Launch</h4>
                <p className="text-sm text-gray-600">1 week for testing and deployment</p>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Budget & Investment",
      description: "Transparent pricing for quality work",
      content: (
        <div className="space-y-4">
          <p className="text-gray-600">
            I believe in transparent pricing and delivering exceptional value for your investment.
          </p>
          <div className="grid grid-cols-1 gap-4">
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <h4 className="font-semibold text-gray-800 mb-2">Small Projects</h4>
              <p className="text-2xl font-bold text-green-600 mb-2">$20 - $100</p>
              <p className="text-sm text-gray-600">Landing pages, small business websites</p>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h4 className="font-semibold text-gray-800 mb-2">Medium Projects</h4>
              <p className="text-2xl font-bold text-blue-600 mb-2">$100 - $500</p>
              <p className="text-sm text-gray-600">Web applications, e-commerce stores</p>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
              <h4 className="font-semibold text-gray-800 mb-2">Large Projects</h4>
              <p className="text-2xl font-bold text-purple-600 mb-2">$500+</p>
              <p className="text-sm text-gray-600">Complex platforms, enterprise solutions</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Let's Get Started!",
      description: "Ready to begin your project?",
      content: (
        <div className="space-y-6">
          <p className="text-gray-600">
            I'm excited to work with you! Let's start with a detailed discussion about your project.
          </p>
          <AiInput onSubmit={(message, file) => {
            console.log("Project inquiry:", { message, file })
            // Handle the form submission
          }} />
          <div className="flex items-center justify-center space-x-4 pt-4">
            <div className="flex items-center space-x-2 text-green-600">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm">Available for new projects</span>
            </div>
          </div>
        </div>
      ),
    },
  ]

  return (
    <ImageCursorTrail
      items={cursorTrailImages}
      maxNumberOfImages={5}
      distance={25}
      imgClass="sm:w-40 w-28 sm:h-48 h-36 rounded-lg"
      className="min-h-screen bg-yellow-50"
    >
      <div className="min-h-screen bg-yellow-50 text-gray-800 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="fixed inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 25% 25%, #FECD45 0%, transparent 50%), radial-gradient(circle at 75% 75%, #FFA500 0%, transparent 50%)`,
            }}
          />
        </div>

        {/* Navigation */}
        <nav className="fixed top-0 left-0 right-0 z-40 bg-white/90 backdrop-blur-md border-b border-yellow-200">
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-3xl font-bold"
              >
                <span className="bg-gradient-to-r from-yellow-500 via-orange-500 to-yellow-600 bg-clip-text text-transparent relative">
                  Wasim
                  <motion.div
                    className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-yellow-400 to-orange-500"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                  />
                </span>
              </motion.div>

              <div className="hidden md:flex space-x-8">
                {["Home", "About", "Skills", "Projects", "Testimonials", "Contact"].map((item) => (
                  <motion.button
                    key={item}
                    onClick={() => scrollToSection(item.toLowerCase())}
                    className={`transition-all duration-300 hover:text-yellow-600 relative no-cursor-trail ${
                      activeSection === item.toLowerCase() ? "text-yellow-600" : "text-gray-700"
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {item}
                    {activeSection === item.toLowerCase() && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-yellow-500"
                      />
                    )}
                  </motion.button>
                ))}
              </div>

              <motion.button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden text-gray-700 p-2 rounded-lg hover:bg-yellow-100 no-cursor-trail"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Menu className="w-6 h-6" />
              </motion.button>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section id="home" className="min-h-screen flex items-center justify-center relative pt-20 overflow-hidden">
          <div className="container mx-auto px-6 text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, type: "spring", stiffness: 100 }}
            >
              <div className="mb-12">
                <motion.img
                  src="/images/wasim-profile.jpg"
                  alt="Wasim Profile"
                  className="w-40 h-40 rounded-full mx-auto mb-8 border-4 border-yellow-400 shadow-2xl object-cover no-cursor-trail"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                />
              </div>

              <motion.h1
                className="text-6xl md:text-8xl font-bold mb-8"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
              >
                Hi, I'm{" "}
                <span className="text-yellow-600">
                  Wasim
                </span>
              </motion.h1>

              <motion.div
                className="text-3xl md:text-4xl mb-6 text-gray-700 font-semibold"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
              >
                MERN Stack Developer & Web Expert
              </motion.div>

              <motion.div
                className="text-2xl md:text-3xl mb-6 text-gray-600 h-12"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
              >
                <Flipper
                  texts={[
                    "Building exceptional digital experiences",
                    "Specialized in MERN Stack development",
                    "Expert in Next.js applications",
                    "WordPress customization specialist",
                    "Turning ideas into reality",
                  ]}
                  interval={3500}
                />
              </motion.div>

              <motion.p
                className="text-xl text-gray-600 mb-16 max-w-4xl mx-auto leading-relaxed"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.8 }}
              >
                {CONTACT_INFO.summary}
              </motion.p>

              <motion.div
                className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-20"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.8 }}
              >
                <Button 
                  onClick={downloadCV}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-8 py-4 text-lg font-semibold rounded-full no-cursor-trail"
                >
                  <Download className="w-5 h-5 mr-2" />
                  Download CV
                </Button>

                <DialogStack>
                  <DialogStackTrigger asChild>
                    <Button className="bg-white hover:bg-yellow-50 text-gray-800 border border-yellow-300 px-8 py-4 text-lg font-semibold rounded-full no-cursor-trail">
                      <MessageCircle className="w-5 h-5 mr-2" />
                      Let's Talk
                    </Button>
                  </DialogStackTrigger>

                  <DialogStackOverlay className="backdrop-blur-[2px]" />

                  <DialogStackBody>
                    {stackedDialogItems.map((item, index) => (
                      <DialogStackContent key={index}>
                        <DialogStackHeader className="mt-2 flex flex-row items-center gap-2">
                          <Avatar>
                            <AvatarImage
                              src="/images/wasim-profile.jpg"
                              alt="Wasim"
                            />
                          </Avatar>
                          <div>
                            <h1 className="text-2xl font-semibold leading-none tracking-tight">
                              {item.title}
                            </h1>
                            <p className="text-black/50 dark:text-white/50">
                              {item.description}
                            </p>
                          </div>
                        </DialogStackHeader>

                        <div className="min-h-[200px] py-4">{item.content}</div>

                        <DialogStackFooter>
                          <DialogStackPrevious className="flex gap-3">
                            <ArrowIcon className="rotate-180" /> Previous
                          </DialogStackPrevious>
                          <DialogStackNext className="flex gap-3">
                            Next <ArrowIcon />
                          </DialogStackNext>
                        </DialogStackFooter>
                      </DialogStackContent>
                    ))}
                  </DialogStackBody>
                </DialogStack>

                <ShareButton links={shareLinks} className="text-lg font-medium">
                  <Link size={15} />
                  Share
                </ShareButton>
              </motion.div>

              {/* Enhanced Stats */}
              <motion.div
                className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.8 }}
              >
                {[
                  { label: "Projects Completed", value: 150, suffix: "+", icon: <Rocket className="w-8 h-8" /> },
                  { label: "Happy Clients", value: 75, suffix: "+", icon: <Users className="w-8 h-8" /> },
                  { label: "Years Experience", value: 3, suffix: "+", icon: <Award className="w-8 h-8" /> },
                  { label: "Technologies", value: 7, suffix: "+", icon: <Layers className="w-8 h-8" /> },
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.4 + 0.1 * index }}
                  >
                    <SpecialCard className="text-center p-6 h-full">
                      <div className="text-yellow-500 mb-4 flex justify-center">{stat.icon}</div>
                      <div className="text-4xl font-bold mb-3">
                        <AnimatedNumber value={stat.value} suffix={stat.suffix} />
                      </div>
                      <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
                    </SpecialCard>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>

          <motion.div
            animate={{ y: [0, 15, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <div className="p-2 rounded-full bg-white/80 backdrop-blur-sm">
              <ChevronDown className="w-8 h-8 text-gray-600" />
            </div>
          </motion.div>
        </section>

        {/* About Section */}
        <section id="about" className="py-24 relative">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-20"
            >
              <h2 className="text-5xl md:text-6xl font-bold mb-8 text-yellow-600">
                About Me
              </h2>
              <div className="w-32 h-1 bg-yellow-500 mx-auto mb-10"></div>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <img
                  src="/images/wasim-profile.jpg"
                  alt="Wasim"
                  className="rounded-3xl w-full max-w-lg mx-auto shadow-2xl object-cover no-cursor-trail"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="space-y-6"
              >
                <h3 className="text-3xl font-bold text-yellow-600">
                  Senior MERN Stack Developer
                </h3>

                <div className="space-y-4 text-lg text-gray-600 leading-relaxed">
                  <p>
                    I specialize in building scalable web applications and leading high-impact projects. 
                    With expertise in developing high-traffic e-commerce platforms, I focus on creating 
                    smart, visually stunning designs with optimal performance.
                  </p>
                  <p>
                    My technical stack includes React, Node.js, MongoDB, Express.js, Next.js, and WordPress development.
                    I'm committed to delivering solutions that exceed client expectations.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
                  <SpecialCard className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className="p-3 bg-yellow-100 rounded-full">
                        <MapPin className="w-6 h-6 text-yellow-600" />
                      </div>
                      <div>
                        <div className="text-gray-800 font-semibold text-lg">Location</div>
                        <div className="text-gray-600">{CONTACT_INFO.location}</div>
                      </div>
                    </div>
                  </SpecialCard>

                  <SpecialCard className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className="p-3 bg-green-100 rounded-full">
                        <Calendar className="w-6 h-6 text-green-600" />
                      </div>
                      <div>
                        <div className="text-gray-800 font-semibold text-lg">Status</div>
                        <div className="text-green-600">Available for projects</div>
                      </div>
                    </div>
                  </SpecialCard>
                </div>

                <div className="flex flex-wrap gap-4 pt-6">
                  <DialogStack>
                    <DialogStackTrigger asChild>
                      <Button className="bg-yellow-500 hover:bg-yellow-600 text-white px-8 py-3 text-lg font-semibold no-cursor-trail">
                        <Heart className="w-5 h-5 mr-2" />
                        Hire Me
                      </Button>
                    </DialogStackTrigger>

                    <DialogStackOverlay className="backdrop-blur-[2px]" />

                    <DialogStackBody>
                      {stackedDialogItems.map((item, index) => (
                        <DialogStackContent key={index}>
                          <DialogStackHeader className="mt-2 flex flex-row items-center gap-2">
                            <Avatar>
                              <AvatarImage
                                src="/images/wasim-profile.jpg"
                                alt="Wasim"
                              />
                            </Avatar>
                            <div>
                              <h1 className="text-2xl font-semibold leading-none tracking-tight">
                                {item.title}
                              </h1>
                              <p className="text-black/50 dark:text-white/50">
                                {item.description}
                              </p>
                            </div>
                          </DialogStackHeader>

                          <div className="min-h-[200px] py-4">{item.content}</div>

                          <DialogStackFooter>
                            <DialogStackPrevious className="flex gap-3">
                              <ArrowIcon className="rotate-180" /> Previous
                            </DialogStackPrevious>
                            <DialogStackNext className="flex gap-3">
                              Next <ArrowIcon />
                            </DialogStackNext>
                          </DialogStackFooter>
                        </DialogStackContent>
                      ))}
                    </DialogStackBody>
                  </DialogStack>

                  <WrapButton>
                    <Coffee className="w-4 h-4 mr-2" />
                    Let's Chat
                  </WrapButton>
                </div>

                {/* Social Links with FlipLink */}
                <div className="flex items-center space-x-6 pt-6">
                  <FlipLink href={CONTACT_INFO.socialLinks.github} className="text-gray-600 hover:text-yellow-600 text-lg font-medium">
                    GitHub
                  </FlipLink>
                  <FlipLink href={CONTACT_INFO.socialLinks.linkedin} className="text-gray-600 hover:text-yellow-600 text-lg font-medium">
                    LinkedIn
                  </FlipLink>
                  <FlipLink href={`mailto:${CONTACT_INFO.email}`} className="text-gray-600 hover:text-yellow-600 text-lg font-medium">
                    Email
                  </FlipLink>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-24 relative">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-20"
            >
              <h2 className="text-5xl md:text-6xl font-bold mb-8 text-yellow-600">
                Skills & Technologies
              </h2>
              <div className="w-32 h-1 bg-yellow-500 mx-auto mb-10"></div>
            </motion.div>

            <ExpandedTabs tabs={tabsData} />
          </div>
        </section>

        {/* Projects Section with Interactive Components */}
        <section id="projects" className="py-24 relative">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-20"
            >
              <h2 className="text-5xl md:text-6xl font-bold mb-8 text-yellow-600">
                Featured Projects
              </h2>
              <div className="w-32 h-1 bg-yellow-500 mx-auto mb-10"></div>
            </motion.div>

            {/* Enhanced Card Carousel */}
            <div className="mb-20">
              <Badge
                variant="outline"
                className="mb-8 rounded-[14px] border border-black/10 bg-white text-base mx-auto block w-fit"
              >
                <Sparkles className="w-4 h-4 fill-[#EEBDE0] stroke-1 text-neutral-800 mr-2" />
                Project Showcase
              </Badge>
              <CardCarousel
                images={carouselImages}
                autoplayDelay={4000}
                showPagination={true}
                showNavigation={true}
              />
            </div>

            {/* Enhanced 3D Card Swipe */}
            <div className="mb-20">
              <Badge
                variant="outline"
                className="mb-8 rounded-[14px] border border-black/10 bg-white text-base mx-auto block w-fit"
              >
                <Sparkles className="w-4 h-4 fill-[#EEBDE0] stroke-1 text-neutral-800 mr-2" />
                3D Card Swipe Experience
              </Badge>
              <CardSwipe images={swipeImages} autoplayDelay={5000} />
            </div>

            {/* Hover Expand Gallery */}
            <div className="mb-16">
              <Badge
                variant="outline"
                className="mb-8 rounded-[14px] border border-black/10 bg-white text-base mx-auto block w-fit"
              >
                <Sparkles className="w-4 h-4 fill-[#EEBDE0] stroke-1 text-neutral-800 mr-2" />
                Interactive Gallery - Hover to Expand
              </Badge>
              <HoverExpand
                images={galleryImages}
                initialSelectedIndex={0}
                thumbnailHeight={200}
                modalImageSize={300}
                maxThumbnails={10}
              />
            </div>

            {/* Creative Masked Layouts with Videos - Improved Design */}
            <div className="mb-16">
              <Badge
                variant="outline"
                className="mb-8 rounded-[14px] border border-black/10 bg-white text-base mx-auto block w-fit"
              >
                <Sparkles className="w-4 h-4 fill-[#EEBDE0] stroke-1 text-neutral-800 mr-2" />
                Creative Video Masks
              </Badge>
              <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-center justify-items-center">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  >
                    <MaskedDiv maskType="type-1" size={0.9} className="w-80 h-60 shadow-2xl rounded-lg overflow-hidden">
                      <video
                        className="cursor-pointer transition-all duration-300 hover:scale-105 w-full h-full object-cover"
                        autoPlay
                        loop
                        muted
                        playsInline
                      >
                        <source
                          src="https://videos.pexels.com/video-files/7710243/7710243-uhd_2560_1440_30fps.mp4"
                          type="video/mp4"
                        />
                      </video>
                    </MaskedDiv>
                  </motion.div>
                  
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  >
                    <MaskedDiv maskType="type-3" className="w-80 h-80 shadow-2xl rounded-full overflow-hidden">
                      <video
                        className="cursor-pointer transition-all duration-300 hover:scale-105 w-full h-full object-cover"
                        autoPlay
                        loop
                        muted
                        playsInline
                      >
                        <source
                          src="https://videos.pexels.com/video-files/18069166/18069166-uhd_2560_1440_24fps.mp4"
                          type="video/mp4"
                        />
                      </video>
                    </MaskedDiv>
                  </motion.div>
                  
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  >
                    <MaskedDiv maskType="type-1" size={0.9} className="rotate-180 w-80 h-60 shadow-2xl rounded-lg overflow-hidden">
                      <video
                        className="cursor-pointer transition-all duration-300 hover:scale-105 w-full h-full object-cover"
                        autoPlay
                        loop
                        muted
                        playsInline
                      >
                        <source
                          src="https://videos.pexels.com/video-files/18069803/18069803-uhd_1440_2560_24fps.mp4"
                          type="video/mp4"
                        />
                      </video>
                    </MaskedDiv>
                  </motion.div>
                  
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  >
                    <MaskedDiv maskType="type-4" className="w-80 h-80 shadow-2xl rounded-lg overflow-hidden">
                      <video
                        className="cursor-pointer transition-all duration-300 hover:scale-105 w-full h-full object-cover"
                        autoPlay
                        loop
                        muted
                        playsInline
                      >
                        <source
                          src="https://videos.pexels.com/video-files/18069701/18069701-uhd_2560_1440_24fps.mp4"
                          type="video/mp4"
                        />
                      </video>
                    </MaskedDiv>
                  </motion.div>
                  
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  >
                    <MaskedDiv maskType="type-2" className="w-80 h-60 shadow-2xl rounded-lg overflow-hidden">
                      <video
                        className="cursor-pointer transition-all duration-300 hover:scale-105 w-full h-full object-cover"
                        autoPlay
                        loop
                        muted
                        playsInline
                      >
                        <source
                          src="https://videos.pexels.com/video-files/18069232/18069232-uhd_2560_1440_24fps.mp4"
                          type="video/mp4"
                        />
                      </video>
                    </MaskedDiv>
                  </motion.div>
                </div>
              </div>
            </div>

            {/* Image Ripple Interactive Section */}
            <div className="mb-16">
              <Badge
                variant="outline"
                className="mb-8 rounded-[14px] border border-black/10 bg-white text-base mx-auto block w-fit"
              >
                <Sparkles className="w-4 h-4 fill-[#EEBDE0] stroke-1 text-neutral-800 mr-2" />
                Interactive Experience
              </Badge>
              <div className="h-96 rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-yellow-100 to-orange-100">
                <ImageRipple />
              </div>
            </div>

            {/* Update the projects grid section to use PROJECTS and add load more functionality */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {PROJECTS.slice(0, displayedProjects).map((project, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                >
                  <SpecialCard className="h-full">
                    <CardContent className="p-8 h-full flex flex-col">
                      <div className="relative mb-6 overflow-hidden rounded-xl">
                        <img
                          src={project.image || "/placeholder.svg"}
                          alt={project.title}
                          className="w-full h-48 object-cover rounded-xl transition-transform duration-300 hover:scale-110 no-cursor-trail"
                        />
                        <div className="absolute top-4 right-4">
                          <span className="px-3 py-1 bg-yellow-500 text-white text-sm rounded-full font-medium">
                            {project.category}
                          </span>
                        </div>
                      </div>
                      <h3 className="text-2xl font-bold mb-3 text-gray-800">{project.title}</h3>
                      <p className="text-gray-600 mb-6 flex-grow leading-relaxed">{project.description}</p>
                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.tech.map((tech) => (
                          <span key={tech} className="px-3 py-1 bg-yellow-100 text-yellow-700 text-sm rounded-full border border-yellow-200">
                            {tech}
                          </span>
                        ))}
                      </div>
                      <div className="flex gap-3">
                        <Button
                          onClick={() => window.open(project.github)}
                          className="flex-1 bg-white hover:bg-gray-50 text-gray-800 border border-gray-300 no-cursor-trail"
                        >
                          <Github className="w-4 h-4 mr-2" />
                          Code
                        </Button>
                        <Button
                          onClick={() => window.open(project.live)}
                          className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white no-cursor-trail"
                        >
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Live Demo
                        </Button>
                      </div>
                    </CardContent>
                  </SpecialCard>
                </motion.div>
              ))}
            </div>

            {/* Load More Projects Button */}
            {displayedProjects < PROJECTS.length && (
              <div className="text-center">
                <Button
                  onClick={loadMoreProjects}
                  className="bg-white hover:bg-yellow-50 text-gray-800 border border-yellow-300 px-8 py-3 text-lg font-semibold rounded-full no-cursor-trail"
                >
                  Load More Projects ({PROJECTS.length - displayedProjects} remaining)
                </Button>
              </div>
            )}
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="py-24 relative">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-20"
            >
              <h2 className="text-5xl md:text-6xl font-bold mb-8 text-yellow-600">
                Client Testimonials
              </h2>
              <div className="w-32 h-1 bg-yellow-500 mx-auto mb-10"></div>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {TESTIMONIALS.map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                >
                  <SpecialCard className="h-full">
                    <CardContent className="p-8 h-full flex flex-col">
                      <div className="flex items-center mb-6">
                        <img
                          src={testimonial.avatar || "/placeholder.svg"}
                          alt={testimonial.name}
                          className="w-16 h-16 rounded-full mr-4 object-cover no-cursor-trail"
                        />
                        <div>
                          <h4 className="font-bold text-gray-800 text-lg">{testimonial.name}</h4>
                          <p className="text-gray-600">{testimonial.role}</p>
                        </div>
                      </div>
                      <div className="flex mb-4">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                        ))}
                      </div>
                      <p className="text-gray-600 leading-relaxed italic flex-grow">"{testimonial.content}"</p>
                    </CardContent>
                  </SpecialCard>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-24 relative">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-20"
            >
              <h2 className="text-5xl md:text-6xl font-bold mb-8 text-yellow-600">
                Let's Work Together
              </h2>
              <div className="w-32 h-1 bg-yellow-500 mx-auto mb-10"></div>
              <p className="text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Ready to transform your ideas into powerful web applications? Let's discuss your next project and create
                something amazing together.
              </p>
            </motion.div>

            <div className="max-w-5xl mx-auto">
              <div className="grid md:grid-cols-3 gap-8 mb-16">
                {[
                  {
                    icon: <Mail className="w-8 h-8" />,
                    title: "Email",
                    value: CONTACT_INFO.email,
                    link: "mailto:" + CONTACT_INFO.email,
                    color: "#FECD45",
                  },
                  {
                    icon: <Phone className="w-8 h-8" />,
                    title: "Phone",
                    value: CONTACT_INFO.phone,
                    link: "tel:" + CONTACT_INFO.phone.replace(/\s/g, ''),
                    color: "#FFA500",
                  },
                  {
                    icon: <Globe className="w-8 h-8" />,
                    title: "Location",
                    value: CONTACT_INFO.location,
                    link: "#",
                    color: "#FECD45",
                  },
                ].map((contact, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.2 }}
                  >
                    <SpecialCard className="text-center p-8 h-full">
                      <div className="mb-6 flex justify-center">
                        <div className="p-4 bg-yellow-100 rounded-full">
                          <div className="text-yellow-600">{contact.icon}</div>
                        </div>
                      </div>
                      <h3 className="text-xl font-bold mb-4 text-gray-800">{contact.title}</h3>
                      <a
                        href={contact.link}
                        className="text-gray-600 hover:text-yellow-600 transition-colors text-lg font-medium no-cursor-trail"
                      >
                        {contact.value}
                      </a>
                    </SpecialCard>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center space-y-8"
              >
                <DialogStack>
                  <DialogStackTrigger asChild>
                    <Button className="bg-yellow-500 hover:bg-yellow-600 text-white text-xl px-12 py-6 font-semibold rounded-full mb-8 no-cursor-trail">
                      <Sparkles className="w-6 h-6 mr-3" />
                      Start Your Project
                    </Button>
                  </DialogStackTrigger>

                  <DialogStackOverlay className="backdrop-blur-[2px]" />

                  <DialogStackBody>
                    {stackedDialogItems.map((item, index) => (
                      <DialogStackContent key={index}>
                        <DialogStackHeader className="mt-2 flex flex-row items-center gap-2">
                          <Avatar>
                            <AvatarImage
                              src="/images/wasim-profile.jpg"
                              alt="Wasim"
                            />
                          </Avatar>
                          <div>
                            <h1 className="text-2xl font-semibold leading-none tracking-tight">
                              {item.title}
                            </h1>
                            <p className="text-black/50 dark:text-white/50">
                              {item.description}
                            </p>
                          </div>
                        </DialogStackHeader>

                        <div className="min-h-[200px] py-4">{item.content}</div>

                        <DialogStackFooter>
                          <DialogStackPrevious className="flex gap-3">
                            <ArrowIcon className="rotate-180" /> Previous
                          </DialogStackPrevious>
                          <DialogStackNext className="flex gap-3">
                            Next <ArrowIcon />
                          </DialogStackNext>
                        </DialogStackFooter>
                      </DialogStackContent>
                    ))}
                  </DialogStackBody>
                </DialogStack>

                {/* PopoverForm Examples */}
                <div className="flex flex-wrap gap-4 justify-center">
                  <PopoverForm
                    title="Quick Contact"
                    open={false}
                    setOpen={() => {}}
                    width="320px"
                    showCloseButton={true}
                    showSuccess={false}
                    openChild={
                      <div className="p-4">
                        <div className="mb-4 space-y-2">
                          <label className="block text-sm font-medium text-muted-foreground mb-1">
                            Your Message
                          </label>
                          <textarea
                            placeholder="Tell me about your project..."
                            className="w-full px-3 py-2 border rounded-md shadow-sm placeholder-muted-foreground focus:outline-none focus:ring-primary focus:border-primary"
                            rows={4}
                          />
                        </div>
                        <PopoverFormButton text="Send Message" />
                      </div>
                    }
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 border-t border-yellow-200 relative">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
              <div className="text-gray-600 text-center md:text-left">
                <p className="text-lg">© 2024 {CONTACT_INFO.name}. All rights reserved.</p>
                <p className="text-sm mt-2">Built with ❤️ using MERN Stack & Next.js</p>
              </div>
              <div className="flex space-x-6">
                {[
                  { icon: <Github className="w-6 h-6" />, href: CONTACT_INFO.socialLinks.github, label: "GitHub" },
                  { icon: <Linkedin className="w-6 h-6" />, href: CONTACT_INFO.socialLinks.linkedin, label: "LinkedIn" },
                  { icon: <Mail className="w-6 h-6" />, href: "mailto:" + CONTACT_INFO.email, label: "Email" },
                ].map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    className="text-gray-600 hover:text-yellow-600 transition-colors p-3 rounded-full hover:bg-yellow-100 no-cursor-trail"
                    aria-label={social.label}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </div>
          </div>
        </footer>

        {/* Mobile Menu - Enhanced Design */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              className="fixed top-0 right-0 w-full h-full bg-gradient-to-br from-yellow-50 via-white to-orange-50 backdrop-blur-md z-50 md:hidden"
            >
              <div className="flex flex-col items-center justify-center h-full space-y-8 relative">
                {/* Close Button */}
                <motion.button
                  onClick={() => setIsMenuOpen(false)}
                  className="absolute top-8 right-8 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center text-gray-800 hover:bg-yellow-100 transition-colors no-cursor-trail"
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X className="w-6 h-6" />
                </motion.button>

                {/* Logo */}
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-4xl font-bold bg-gradient-to-r from-yellow-500 via-orange-500 to-yellow-600 bg-clip-text text-transparent mb-8"
                >
                  Wasim
                </motion.div>

                {/* Menu Items */}
                {["Home", "About", "Skills", "Projects", "Testimonials", "Contact"].map((item, index) => (
                  <motion.button
                    key={item}
                    onClick={() => scrollToSection(item.toLowerCase())}
                    className="relative group no-cursor-trail"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <div className="text-3xl font-bold text-gray-800 group-hover:text-yellow-600 transition-colors duration-300 px-8 py-4 rounded-full group-hover:bg-white/50 backdrop-blur-sm">
                      {item}
                    </div>
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                      whileHover={{ scale: 1.05 }}
                    />
                  </motion.button>
                ))}

                {/* Social Links */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="flex space-x-6 mt-8"
                >
                  {[
                    { icon: <Github className="w-6 h-6" />, href: CONTACT_INFO.socialLinks.github },
                    { icon: <Linkedin className="w-6 h-6" />, href: CONTACT_INFO.socialLinks.linkedin },
                    { icon: <Mail className="w-6 h-6" />, href: "mailto:" + CONTACT_INFO.email },
                  ].map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.href}
                      className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center text-gray-700 hover:text-yellow-600 hover:bg-yellow-100 transition-colors no-cursor-trail"
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      {social.icon}
                    </motion.a>
                  ))}
                </motion.div>

                {/* Decorative Elements */}
                <div className="absolute top-20 left-10 w-20 h-20 bg-yellow-200 rounded-full opacity-20 animate-pulse" />
                <div className="absolute bottom-32 right-16 w-16 h-16 bg-orange-200 rounded-full opacity-30 animate-bounce" />
                <div className="absolute top-1/3 right-8 w-12 h-12 bg-yellow-300 rounded-full opacity-25" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </ImageCursorTrail>
  )
}
