"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import Head from "next/head"
import { Phone, Mail, MapPin, ArrowRight, Star, CheckCircle, Clock, PenToolIcon as Tool, AlertCircle, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { useContactForm } from "@/hooks/use-contact-form"

// Structured Data for Local Business SEO
const structuredData = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "AGC Home Renovation & Handymen service LLC",
  "image": "https://agchomerenovation.com/logo.png",
  "@id": "https://agchomerenovation.com",
  "url": "https://agchomerenovation.com",
  "telephone": "+13363292502",
  "email": "carlosr0415@yahoo.com",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "209 Smith St",
    "addressLocality": "Burlington",
    "addressRegion": "NC",
    "postalCode": "27217",
    "addressCountry": "US"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 36.0956,
    "longitude": -79.4378
  },
  "description": "Expert home renovation & handyman services in Burlington NC. Kitchen remodeling, bathroom renovation, flooring, fencing & shed construction.",
  "priceRange": "$$",
  "servesCuisine": [],
  "hasMap": "https://maps.google.com/?q=209+Smith+St,+Burlington,+NC+27217",
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "08:00",
      "closes": "18:00"
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": "Saturday",
      "opens": "09:00",
      "closes": "16:00"
    }
  ],
  "areaServed": [
    {
      "@type": "City",
      "name": "Burlington, NC"
    },
    {
      "@type": "City", 
      "name": "Greensboro, NC"
    },
    {
      "@type": "City",
      "name": "Durham, NC"
    },
    {
      "@type": "City",
      "name": "Chapel Hill, NC"
    }
  ],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Home Renovation Services",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Kitchen Remodeling",
          "description": "Transform your kitchen with custom cabinets, countertops, and modern appliances."
        }
      },
      {
        "@type": "Offer", 
        "itemOffered": {
          "@type": "Service",
          "name": "Bathroom Remodeling",
          "description": "Update your bathroom with new fixtures, tile work, and modern designs."
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service", 
          "name": "Flooring Installation",
          "description": "Expert installation of hardwood, laminate, tile, and vinyl flooring."
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Handyman Services", 
          "description": "From minor repairs to home maintenance, we've got all your handyman needs covered."
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Fence Installation",
          "description": "Custom fence design and installation to enhance your property's security and appeal."
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Shed Construction",
          "description": "Custom-built sheds designed to match your home and meet your storage needs."
        }
      }
    ]
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "5",
    "reviewCount": "50"
  },
  "sameAs": [
    "https://www.facebook.com/profile.php?id=61574488941619"
  ]
}

// Breadcrumb Schema
const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://agchomerenovation.com"
    }
  ]
}

// FAQ Schema for better SERP features
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What services does AGC Home Renovation offer?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "AGC Home Renovation offers kitchen remodeling, bathroom renovation, flooring installation, handyman services, fence installation, and shed construction in Burlington NC and surrounding areas."
      }
    },
    {
      "@type": "Question", 
      "name": "Do you provide free estimates?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, we provide free estimates for all our home renovation and handyman services. Contact us at (336) 329-2502 to schedule your consultation."
      }
    },
    {
      "@type": "Question",
      "name": "What areas do you serve?",
      "acceptedAnswer": {
        "@type": "Answer", 
        "text": "We serve Burlington NC and surrounding areas including Greensboro, Durham, Chapel Hill, and the greater North Carolina Triangle region."
      }
    }
  ]
}

export default function Home() {
  // State for the hero section
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isQuoteFormOpen, setIsQuoteFormOpen] = useState(false)
  const heroRef = useRef(null)

  // Form state
  const { isSubmitting, isSuccess, error, submitForm, reset } = useContactForm()
  
  // Form data states
  const [quoteFormData, setQuoteFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  })
  
  const [estimateFormData, setEstimateFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  })
  
  const [contactFormData, setContactFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })

  // Parallax effect
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  // Project showcase data
  const showcaseProjects = [
    {
      title: "Kitchen Transformation",
      description: "Modern design with premium materials",
      image: "/kitchen-showcase.jpg",
      category: "Kitchen Remodeling",
    },
    {
      title: "Bathroom Elegance",
      description: "Luxury fixtures and custom tilework",
      image: "/bathroom-showcase.jpg",
      category: "Bathroom Remodeling",
    },
    // {
    //   title: "Living Space Renewal",
    //   description: "Complete home renovation with custom details",
    //   image: "/living-showcase.jpg",
    //   category: "Home Renovation",
    // },
  ]

  // Auto-rotate through showcase projects
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % showcaseProjects.length)
    }, 6000)
    return () => clearInterval(interval)
  }, [showcaseProjects.length])

  // Form submission handlers
  const handleQuoteSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await submitForm({
      ...quoteFormData,
      formType: 'quote'
    })
    if (isSuccess) {
      setQuoteFormData({ name: '', email: '', phone: '', service: '', message: '' })
      setTimeout(() => {
        setIsQuoteFormOpen(false)
        reset()
      }, 2000)
    }
  }

  const handleEstimateSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await submitForm({
      ...estimateFormData,
      formType: 'estimate'
    })
    if (isSuccess) {
      setEstimateFormData({ name: '', email: '', phone: '', service: '', message: '' })
    }
  }

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await submitForm({
      ...contactFormData,
      formType: 'contact'
    })
    if (isSuccess) {
      setContactFormData({ name: '', email: '', phone: '', subject: '', message: '' })
    }
  }

  // Reset form when opening quote modal
  const handleOpenQuoteForm = () => {
    setIsQuoteFormOpen(true)
    reset()
  }

  return (
    <div className="flex min-h-screen flex-col">
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      
      {/* Header/Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white/95 backdrop-blur-sm border-b border-gray-200/80">
        <div className="container flex h-20 items-center justify-between">
          <div className="flex items-center gap-2">
            <Image src="/logo.png" alt="AGC Home Renovation Logo" width={120} height={50} className="h-auto" />
          </div>
          <nav className="hidden md:flex gap-8">
            <Link href="#services" className="text-sm font-medium hover:text-primary transition-colors">
              Services
            </Link>
            <Link href="#gallery" className="text-sm font-medium hover:text-primary transition-colors">
              Our Work
            </Link>
            <Link href="#about" className="text-sm font-medium hover:text-primary transition-colors">
              About Us
            </Link>
            <Link href="#contact" className="text-sm font-medium hover:text-primary transition-colors">
              Contact
            </Link>
          </nav>
          <div className="flex items-center gap-6">
            <a href="tel:3363292502" className="hidden md:flex items-center gap-2 text-sm font-medium group">
              <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <Phone className="h-4 w-4 text-primary" />
              </div>
              <span>(336) 329-2502</span>
            </a>
            <Button className="bg-primary hover:bg-primary/90 px-6" onClick={handleOpenQuoteForm}>
              Get a Quote
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 pt-20">
        {/* Professional & Creative Hero Section */}
        <section ref={heroRef} className="relative bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden" aria-labelledby="hero-heading">
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            <motion.div
              style={{ y, opacity }}
              className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 rounded-bl-[200px]"
            />
            <div className="absolute bottom-0 left-0 w-1/4 h-1/3 bg-secondary/5 rounded-tr-[100px]" />
            {/* <div className="absolute top-20 left-[10%] w-16 h-16 border-2 border-primary/20 rounded-full" /> */}
            <div className="absolute bottom-32 right-[15%] w-24 h-24 border border-secondary/30 rounded-full" />
          </div>

          <div className="container relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 min-h-[calc(100vh-5rem)] items-center py-16 md:py-24">
              {/* Left content area */}
              <div className="lg:col-span-5 space-y-8 z-10">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                    <span className="h-2 w-2 rounded-full bg-primary"></span>
                    <span>Professional Craftsmanship</span>
                  </div>

                  <h1 id="hero-heading" className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 leading-[1.1]">
                    <span className="block">Elevate Your</span>
                    <span className="block mt-2 text-primary">Living Space</span>
                    <span className="sr-only">- AGC Home Renovation Burlington NC</span>
                  </h1>

                  <p className="mt-6 text-lg md:text-xl text-gray-600 max-w-lg">
                    Expert home renovation and handyman services that transform your vision into reality with precision
                    and care.
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="flex flex-col sm:flex-row gap-4"
                >
                  <Button
                    size="lg"
                    className="bg-primary hover:bg-primary/90 text-white px-8 rounded-full h-14"
                    onClick={handleOpenQuoteForm}
                  >
                    Request Free Consultation
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-gray-300 hover:bg-gray-100 text-gray-800 px-8 rounded-full h-14"
                    onClick={() => document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    Explore Our Work
                  </Button>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="pt-8 grid grid-cols-3 gap-6"
                >
                  <div className="text-center">
                    <div className="text-3xl font-bold text-gray-900">15+</div>
                    <div className="text-sm text-gray-600 mt-1">Years Experience</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-gray-900">250+</div>
                    <div className="text-sm text-gray-600 mt-1">Projects Completed</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-gray-900">100%</div>
                    <div className="text-sm text-gray-600 mt-1">Client Satisfaction</div>
                  </div>
                </motion.div>
              </div>

              {/* Right showcase area */}
              <div className="lg:col-span-7 relative">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8 }}
                  className="relative"
                >
                  {/* Main showcase image */}
                  <div className="relative h-[500px] md:h-[600px] rounded-2xl overflow-hidden shadow-2xl">
                    {/* Project showcase carousel */}
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentSlide}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8 }}
                        className="absolute inset-0"
                      >
                        <Image
                          src={showcaseProjects[currentSlide].image || "/placeholder.svg"}
                          alt={`${showcaseProjects[currentSlide].title} - AGC Home Renovation Burlington NC`}
                          fill
                          className="object-cover"
                          priority
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />

                        {/* Gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                      </motion.div>
                    </AnimatePresence>

                    {/* Project info card */}
                    <div className="absolute left-6 right-6 bottom-6 bg-white/95 backdrop-blur-sm rounded-xl p-6 shadow-lg">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={currentSlide}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.5 }}
                        >
                          <div className="text-sm font-medium text-primary mb-1">
                            {showcaseProjects[currentSlide].category}
                          </div>
                          <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
                            {showcaseProjects[currentSlide].title}
                          </h3>
                          <p className="text-gray-600">{showcaseProjects[currentSlide].description}</p>

                          <div className="flex justify-between items-center mt-4">
                            <div className="flex gap-2">
                              {showcaseProjects.map((_, index) => (
                                <button
                                  key={index}
                                  onClick={() => setCurrentSlide(index)}
                                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                                    index === currentSlide ? "bg-primary w-8" : "bg-gray-300"
                                  }`}
                                  aria-label={`View project ${index + 1}`}
                                />
                              ))}
                            </div>
                            {/* <Button
                              variant="ghost"
                              className="text-primary hover:text-primary/90 hover:bg-primary/5 p-0 h-auto font-medium"
                            >
                              View Project <ArrowRight className="h-4 w-4 ml-1" />
                            </Button> */}
                          </div>
                        </motion.div>
                      </AnimatePresence>
                    </div>
                  </div>

                  {/* Decorative elements */}
                  <div className="absolute -top-6 -left-6 w-24 h-24 bg-primary/10 rounded-full blur-2xl" />
                  <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-secondary/10 rounded-full blur-3xl" />
                </motion.div>

                {/* Floating service cards */}
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="absolute -left-4 top-1/4 bg-white rounded-xl shadow-lg p-4 hidden md:block"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-primary"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                        />
                      </svg>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-900">Custom Design</div>
                      <div className="text-xs text-gray-600">Tailored to your needs</div>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                  className="absolute -right-4 bottom-1/3 bg-white rounded-xl shadow-lg p-4 hidden md:block"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-primary"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-900">On-Time Delivery</div>
                      <div className="text-xs text-gray-600">Every project, every time</div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Curved separator */}
          <div className="absolute bottom-0 left-0 right-0 h-16 overflow-hidden">
            <svg
              viewBox="0 0 1200 120"
              preserveAspectRatio="none"
              className="absolute bottom-0 left-0 w-full h-full"
              fill="white"
            >
              <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118.11,130.83,141.14,213.2,56.44Z"></path>
            </svg>
          </div>
        </section>

        {/* Quote Form Modal */}
        <AnimatePresence>
          {isQuoteFormOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setIsQuoteFormOpen(false)}
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ type: "spring", damping: 20 }}
                className="bg-white rounded-2xl p-8 max-w-lg w-full shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900">Request a Free Consultation</h3>
                  <button
                    onClick={() => setIsQuoteFormOpen(false)}
                    className="text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {isSuccess ? (
                  <div className="text-center py-8">
                    <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h3>
                    <p className="text-gray-600 mb-4">
                      Your request has been submitted successfully. We'll get back to you as soon as possible.
                    </p>
                    <p className="text-sm text-gray-500">
                      You should receive a confirmation email shortly.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleQuoteSubmit} className="space-y-5">
                    {error && (
                      <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700">
                        <AlertCircle className="h-5 w-5 flex-shrink-0" />
                        <span className="text-sm">{error}</span>
                      </div>
                    )}
                    
                    <div className="grid grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="quote-name" className="block text-sm font-medium text-gray-700 mb-1">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          id="quote-name"
                          required
                          value={quoteFormData.name}
                          onChange={(e) => setQuoteFormData(prev => ({ ...prev, name: e.target.value }))}
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                          placeholder="John Smith"
                        />
                      </div>
                      <div>
                        <label htmlFor="quote-phone" className="block text-sm font-medium text-gray-700 mb-1">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          id="quote-phone"
                          required
                          value={quoteFormData.phone}
                          onChange={(e) => setQuoteFormData(prev => ({ ...prev, phone: e.target.value }))}
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                          placeholder="(123) 456-7890"
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="quote-email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="quote-email"
                        required
                        value={quoteFormData.email}
                        onChange={(e) => setQuoteFormData(prev => ({ ...prev, email: e.target.value }))}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                        placeholder="john@example.com"
                      />
                    </div>
                    <div>
                      <label htmlFor="quote-service" className="block text-sm font-medium text-gray-700 mb-1">
                        Service Interested In
                      </label>
                      <select
                        id="quote-service"
                        value={quoteFormData.service}
                        onChange={(e) => setQuoteFormData(prev => ({ ...prev, service: e.target.value }))}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                      >
                        <option value="">Select a Service</option>
                        <option value="Kitchen Remodeling">Kitchen Remodeling</option>
                        <option value="Bathroom Remodeling">Bathroom Remodeling</option>
                        <option value="Flooring Installation">Flooring Installation</option>
                        <option value="Handyman Services">Handyman Services</option>
                        <option value="Fence Installation">Fence Installation</option>
                        <option value="Shed Construction">Shed Construction</option>
                        <option value="Other Services">Other Services</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="quote-message" className="block text-sm font-medium text-gray-700 mb-1">
                        Project Details *
                      </label>
                      <textarea
                        id="quote-message"
                        rows={4}
                        required
                        value={quoteFormData.message}
                        onChange={(e) => setQuoteFormData(prev => ({ ...prev, message: e.target.value }))}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all resize-none"
                        placeholder="Tell us about your project and any specific requirements..."
                      />
                    </div>
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-primary hover:bg-primary/90 text-white py-3 rounded-lg text-base font-medium h-auto disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? 'Submitting...' : 'Submit Request'}
                    </Button>
                    <p className="text-xs text-gray-500 text-center">
                      We respect your privacy. Your information will not be shared with third parties.
                    </p>
                  </form>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Services Section */}
        <section id="services" className="py-16 bg-muted/30">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold">Our Services</h2>
              <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
                We offer a wide range of home renovation and handyman services to help you transform your living space.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Service Card 1 */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-48 relative">
                  <Image 
                    src="/kitchen-remodel.jpg" 
                    alt="Kitchen Remodeling Services Burlington NC - Custom Cabinets and Countertops by AGC Home Renovation" 
                    fill 
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">Kitchen Remodeling</h3>
                  <p className="text-muted-foreground mb-4">
                    Transform your kitchen with custom cabinets, countertops, and modern appliances.
                  </p>
                  {/*<Link href="#" className="text-primary font-medium flex items-center gap-1 hover:underline">
                    Learn more <ArrowRight className="h-4 w-4" />
                  </Link>
                  */}
                </div>
              </div>

              {/* Service Card 2 */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-48 relative">
                  <Image src="/bathroom-remodel.jpg" alt="Bathroom Remodeling" fill className="object-cover" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">Bathroom Remodeling</h3>
                  <p className="text-muted-foreground mb-4">
                    Update your bathroom with new fixtures, tile work, and modern designs.
                  </p>
                  {/*<Link href="#" className="text-primary font-medium flex items-center gap-1 hover:underline">
                    Learn more <ArrowRight className="h-4 w-4" />
                  </Link>
                  */}
                </div>
              </div>

              {/* Service Card 3 */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-48 relative">
                  <Image src="/flooring.jpg" alt="Flooring Installation" fill className="object-cover" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">Flooring Installation</h3>
                  <p className="text-muted-foreground mb-4">
                    Expert installation of hardwood, laminate, tile, and vinyl flooring.
                  </p>
                  {/*<Link href="#" className="text-primary font-medium flex items-center gap-1 hover:underline">
                    Learn more <ArrowRight className="h-4 w-4" />
                  </Link>
                  */}
                </div>
              </div>

              {/* Service Card 4 */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-48 relative">
                  <Image src="/handyman.jpg" alt="Handyman Services" fill className="object-cover" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">Handyman Services</h3>
                  <p className="text-muted-foreground mb-4">
                    From minor repairs to home maintenance, we've got all your handyman needs covered.
                  </p>
                   {/*<Link href="#" className="text-primary font-medium flex items-center gap-1 hover:underline">
                    Learn more <ArrowRight className="h-4 w-4" />
                  </Link>
                  */}
                </div>
              </div>

              {/* Service Card 5 */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-48 relative">
                  <Image src="/fence.jpg" alt="Fence Installation" fill className="object-cover" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">Fence Installation</h3>
                  <p className="text-muted-foreground mb-4">
                    Custom fence design and installation to enhance your property's security and appeal.
                  </p>
                   {/*<Link href="#" className="text-primary font-medium flex items-center gap-1 hover:underline">
                    Learn more <ArrowRight className="h-4 w-4" />
                  </Link>
                  */}
                </div>
              </div>

              {/* Service Card 6 */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-48 relative">
                  <Image src="/original-shed-resized.jpg" alt="Shed Construction" fill className="object-cover" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">Shed Construction</h3>
                  <p className="text-muted-foreground mb-4">
                    Custom-built sheds designed to match your home and meet your storage needs.
                  </p>
                  {/*<Link href="#" className="text-primary font-medium flex items-center gap-1 hover:underline">
                    Learn more <ArrowRight className="h-4 w-4" />
                  </Link>
                  */}
                </div>
              </div>
            </div>

            <div className="mt-12 text-center">
               {/*<Button size="lg" className="bg-primary hover:bg-primary/90">
                View All Services
              </Button> */}
            </div>
          </div>
        </section>
         {/* Why Choose Us Section */}
        <section className="py-16 bg-white">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">Why Choose AGC Home Renovation</h2>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <CheckCircle className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Quality Craftsmanship</h3>
                      <p className="text-muted-foreground">
                        We take pride in our attention to detail and commitment to excellence in every project.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0 h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Clock className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">On-Time Completion</h3>
                      <p className="text-muted-foreground">
                        We understand the importance of timelines and work efficiently to complete projects on schedule.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0 h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Tool className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Experienced Professionals</h3>
                      <p className="text-muted-foreground">
                        Our team brings years of experience and expertise to every renovation and repair project.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative h-[400px] rounded-lg overflow-hidden shadow-xl">
                <Image
                  src="/kitchen-showcase.jpg"
                  alt="Our team working on a renovation project"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Project Gallery */}
        <section id="gallery" className="py-16 bg-muted/30">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold">Our Recent Projects</h2>
              <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
                Take a look at some of our recently completed renovation and handyman projects.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Project 1 */}
              <div className="group relative h-64 overflow-hidden rounded-lg">
                <Image
                  src="/fire-pit.jpg"
                  alt="Fire Pit Project"
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <h3 className="text-white font-bold text-xl">Backyard Fire Pit Retreat</h3>
                  <p className="text-white/80">Burlington, NC</p>
                </div>
              </div>

              {/* Project 2 */}
              <div className="group relative h-64 overflow-hidden rounded-lg">
                <Image
                  src="/bathroom-remodel.jpg"
                  alt="Bathroom Remodel Project"
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <h3 className="text-white font-bold text-xl">Master Bathroom Remodel</h3>
                  <p className="text-white/80">Greensboro, NC</p>
                </div>
              </div>

              {/* Project 3 */}
              <div className="group relative h-64 overflow-hidden rounded-lg">
                <Image
                  src="/outdoor-porch-with-stairs.jpg"
                  alt="Custom Decks"
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <h3 className="text-white font-bold text-xl">Custom Deck for Apartment Complex</h3>
                  <p className="text-white/80">Burlington, NC</p>
                </div>
              </div>

              {/* Project 4 */}
              <div className="group relative h-64 overflow-hidden rounded-lg">
                <Image
                  src="/original-flooring.jpg"
                  alt="Flooring Installation Project"
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <h3 className="text-white font-bold text-xl">Hardwood Flooring Installation</h3>
                  <p className="text-white/80">Durham, NC</p>
                </div>
              </div>

              {/* Project 5 */}
              <div className="group relative h-64 overflow-hidden rounded-lg">
                <Image
                  src="/door-framing-resized.jpg"
                  alt="Door Framing Project"
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <h3 className="text-white font-bold text-xl">French Doors Installation</h3>
                  <p className="text-white/80">Chapel Hill, NC</p>
                </div>
              </div>

              {/* Project 6 */}
              <div className="group relative h-64 overflow-hidden rounded-lg">
                <Image
                  src="/original-shed-resized.jpg"
                  alt="Shed Construction Project"
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <h3 className="text-white font-bold text-xl">Custom Storage Shed</h3>
                  <p className="text-white/80">Burlington, NC</p>
                </div>
              </div>
            </div>

            <div className="mt-12 text-center">
             {/* <Button size="lg" className="bg-primary hover:bg-primary/90">
                View All Projects
              </Button>*/}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-primary text-white">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-4">Ready to Start Your Home Renovation Project?</h2>
                <p className="text-white/90 text-lg mb-6">
                  Contact us today for a free consultation and estimate. We're here to bring your vision to life!
                </p>
               {/* <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" variant="outline" className="bg-white text-primary hover:bg-white/10">
                    Request a Quote
                  </Button>
                  <Button size="lg" variant="outline" className="border-white hover:bg-white/10">
                    Call (336) 329-2502
                  </Button>
                </div> */}
              </div>

              <div className="bg-white p-8 rounded-xl shadow-2xl border-2 border-white/20 relative">
                <div className="absolute -top-5 right-8 bg-primary text-white px-4 py-2 rounded-full font-bold text-sm shadow-lg">
                  Free Estimate
                </div>
                <h3 className="text-2xl font-bold mb-6 text-primary">Get a Free Estimate</h3>
                
                {isSuccess ? (
                  <div className="text-center py-8">
                    <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto mb-4" />
                    <h4 className="text-xl font-bold text-gray-900 mb-2">Request Submitted!</h4>
                    <p className="text-gray-600 mb-4">
                      We'll contact you as soon as possible to schedule your free estimate.
                    </p>
                    <Button
                      onClick={reset}
                      variant="outline"
                      className="border-primary text-primary hover:bg-primary/5"
                    >
                      Submit Another Request
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleEstimateSubmit} className="space-y-4">
                    {error && (
                      <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 mb-4">
                        <AlertCircle className="h-5 w-5 flex-shrink-0" />
                        <span className="text-sm">{error}</span>
                      </div>
                    )}
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="estimate-name" className="block text-sm font-medium mb-1 text-gray-700">
                          Name *
                        </label>
                        <input
                          type="text"
                          id="estimate-name"
                          required
                          value={estimateFormData.name}
                          onChange={(e) => setEstimateFormData(prev => ({ ...prev, name: e.target.value }))}
                          className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-gray-900 focus:ring-2 focus:ring-primary focus:border-primary"
                          placeholder="Your Name"
                        />
                      </div>
                      <div>
                        <label htmlFor="estimate-phone" className="block text-sm font-medium mb-1 text-gray-700">
                          Phone *
                        </label>
                        <input
                          type="tel"
                          id="estimate-phone"
                          required
                          value={estimateFormData.phone}
                          onChange={(e) => setEstimateFormData(prev => ({ ...prev, phone: e.target.value }))}
                          className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-gray-900 focus:ring-2 focus:ring-primary focus:border-primary"
                          placeholder="Your Phone"
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="estimate-email" className="block text-sm font-medium mb-1 text-gray-700">
                        Email *
                      </label>
                      <input
                        type="email"
                        id="estimate-email"
                        required
                        value={estimateFormData.email}
                        onChange={(e) => setEstimateFormData(prev => ({ ...prev, email: e.target.value }))}
                        className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-gray-900 focus:ring-2 focus:ring-primary focus:border-primary"
                        placeholder="Your Email"
                      />
                    </div>
                    <div>
                      <label htmlFor="estimate-service" className="block text-sm font-medium mb-1 text-gray-700">
                        Service Needed
                      </label>
                      <select
                        id="estimate-service"
                        value={estimateFormData.service}
                        onChange={(e) => setEstimateFormData(prev => ({ ...prev, service: e.target.value }))}
                        className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-gray-900 focus:ring-2 focus:ring-primary focus:border-primary"
                      >
                        <option value="">Select a Service</option>
                        <option value="Kitchen Remodeling">Kitchen Remodeling</option>
                        <option value="Bathroom Remodeling">Bathroom Remodeling</option>
                        <option value="Flooring Installation">Flooring Installation</option>
                        <option value="Handyman Services">Handyman Services</option>
                        <option value="Fence Installation">Fence Installation</option>
                        <option value="Shed Construction">Shed Construction</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="estimate-message" className="block text-sm font-medium mb-1 text-gray-700">
                        Project Details *
                      </label>
                      <textarea
                        id="estimate-message"
                        rows={4}
                        required
                        value={estimateFormData.message}
                        onChange={(e) => setEstimateFormData(prev => ({ ...prev, message: e.target.value }))}
                        className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-gray-900 focus:ring-2 focus:ring-primary focus:border-primary"
                        placeholder="Tell us about your project"
                      />
                    </div>
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-primary text-white hover:bg-primary/90 font-bold text-lg py-6 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? 'Submitting...' : 'Submit Request'}
                    </Button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-16 bg-white">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1">
                <h2 className="text-3xl font-bold mb-6">About AGC Home Renovation</h2>
                <p className="text-muted-foreground mb-4">
                  AGC Home Renovation & Handymen service LLC is a trusted provider of home renovation and handyman
                  services in Burlington, NC and surrounding areas. Led by Carlos Rodriguez, our team brings years of
                  experience and dedication to every project.
                </p>
                <p className="text-muted-foreground mb-4">
                  We specialize in kitchen and bathroom remodels, basic home repairs, handyman services, flooring
                  installation, fences, and sheds. Our mission is to deliver high-quality craftsmanship and exceptional
                  customer service on every project, no matter the size.
                </p>
                <p className="text-muted-foreground mb-6">
                  Whether you're looking to update a single room or renovate your entire home, we have the skills and
                  expertise to bring your vision to life.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    className="bg-primary hover:bg-primary/90"
                    onClick={() => window.location.href = 'tel:3363292502'}
                  >
                    Contact Us
                  </Button>
                  {/*<Button variant="outline">Learn More</Button>*/}
                </div>
              </div>

              <div className="order-1 lg:order-2 relative h-[400px] rounded-lg overflow-hidden shadow-xl">
                <Image src="/bathroom-showcase.jpg" alt="AGC Home Renovation Team" fill className="object-cover" />
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16 bg-muted/30">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold">What Our Clients Say</h2>
              <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
                Don't just take our word for it. Here's what our satisfied customers have to say about our work.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Testimonial 1 */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center gap-1 mb-4 text-amber-400">
                  <Star className="fill-current h-5 w-5" />
                  <Star className="fill-current h-5 w-5" />
                  <Star className="fill-current h-5 w-5" />
                  <Star className="fill-current h-5 w-5" />
                  <Star className="fill-current h-5 w-5" />
                </div>
                <p className="italic text-muted-foreground mb-6">
                  "AGC Home Renovation transformed our outdated kitchen into a modern, functional space. The team was
                  professional, punctual, and the quality of work exceeded our expectations. Highly recommend!"
                </p>
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center">
                    <span className="font-bold text-lg">JD</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">John Davis</h4>
                    <p className="text-sm text-muted-foreground">Burlington, NC</p>
                  </div>
                </div>
              </div>

              {/* Testimonial 2 */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center gap-1 mb-4 text-amber-400">
                  <Star className="fill-current h-5 w-5" />
                  <Star className="fill-current h-5 w-5" />
                  <Star className="fill-current h-5 w-5" />
                  <Star className="fill-current h-5 w-5" />
                  <Star className="fill-current h-5 w-5" />
                </div>
                <p className="italic text-muted-foreground mb-6">
                  "We hired AGC to remodel our bathroom and couldn't be happier with the results. Carlos and his team
                  were attentive to our needs and delivered exactly what we wanted. The project was completed on time
                  and within budget."
                </p>
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center">
                    <span className="font-bold text-lg">SM</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Sarah Miller</h4>
                    <p className="text-sm text-muted-foreground">Greensboro, NC</p>
                  </div>
                </div>
              </div>

              {/* Testimonial 3 */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center gap-1 mb-4 text-amber-400">
                  <Star className="fill-current h-5 w-5" />
                  <Star className="fill-current h-5 w-5" />
                  <Star className="fill-current h-5 w-5" />
                  <Star className="fill-current h-5 w-5" />
                  <Star className="fill-current h-5 w-5" />
                </div>
                <p className="italic text-muted-foreground mb-6">
                  "AGC installed hardwood flooring throughout our home and built a custom storage shed in our backyard.
                  Both projects were completed with exceptional craftsmanship. We'll definitely use them again for
                  future projects."
                </p>
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center">
                    <span className="font-bold text-lg">RJ</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Robert Johnson</h4>
                    <p className="text-sm text-muted-foreground">Durham, NC</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-16 bg-white">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <h2 className="text-3xl font-bold mb-6">Contact Us</h2>
                <p className="text-muted-foreground mb-8">
                  Have questions or ready to start your project? Get in touch with us today. We serve Burlington and
                  surrounding areas in North Carolina.
                </p>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <MapPin className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Address</h3>
                      <p className="text-muted-foreground">209 Smith St, Burlington, NC 27217</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Phone className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Phone</h3>
                      <p className="text-muted-foreground">
                        <a href="tel:3363292502" className="hover:text-primary">
                          (336) 329-2502
                        </a>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Mail className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Email</h3>
                      <p className="text-muted-foreground">
                        <a href="mailto:carlosr0415@yahoo.com" className="hover:text-primary">
                          carlosr0415@yahoo.com
                        </a>
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <h3 className="font-semibold text-lg mb-4">Service Areas</h3>
                  <p className="text-muted-foreground">
                    We proudly serve Burlington and surrounding areas including Greensboro, Durham, Chapel Hill, and
                    more.
                  </p>
                </div>
              </div>

              <div className="bg-muted/30 p-8 rounded-lg">
                <h3 className="text-xl font-bold mb-6">Send Us a Message</h3>
                
                {isSuccess ? (
                  <div className="text-center py-8">
                    <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto mb-4" />
                    <h4 className="text-xl font-bold text-gray-900 mb-2">Message Sent!</h4>
                    <p className="text-gray-600 mb-4">
                      Thank you for contacting us. We'll respond to your message as soon as possible.
                    </p>
                    <Button
                      onClick={reset}
                      variant="outline"
                      className="border-primary text-primary hover:bg-primary/5"
                    >
                      Send Another Message
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleContactSubmit} className="space-y-4">
                    {error && (
                      <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 mb-4">
                        <AlertCircle className="h-5 w-5 flex-shrink-0" />
                        <span className="text-sm">{error}</span>
                      </div>
                    )}
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="contact-name" className="block text-sm font-medium mb-1">
                          Name *
                        </label>
                        <input
                          type="text"
                          id="contact-name"
                          required
                          value={contactFormData.name}
                          onChange={(e) => setContactFormData(prev => ({ ...prev, name: e.target.value }))}
                          className="w-full px-3 py-2 border border-muted rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
                          placeholder="Your Name"
                        />
                      </div>
                      <div>
                        <label htmlFor="contact-phone" className="block text-sm font-medium mb-1">
                          Phone *
                        </label>
                        <input
                          type="tel"
                          id="contact-phone"
                          required
                          value={contactFormData.phone}
                          onChange={(e) => setContactFormData(prev => ({ ...prev, phone: e.target.value }))}
                          className="w-full px-3 py-2 border border-muted rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
                          placeholder="Your Phone"
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="contact-email" className="block text-sm font-medium mb-1">
                        Email *
                      </label>
                      <input
                        type="email"
                        id="contact-email"
                        required
                        value={contactFormData.email}
                        onChange={(e) => setContactFormData(prev => ({ ...prev, email: e.target.value }))}
                        className="w-full px-3 py-2 border border-muted rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
                        placeholder="Your Email"
                      />
                    </div>
                    <div>
                      <label htmlFor="contact-subject" className="block text-sm font-medium mb-1">
                        Subject
                      </label>
                      <input
                        type="text"
                        id="contact-subject"
                        value={contactFormData.subject}
                        onChange={(e) => setContactFormData(prev => ({ ...prev, subject: e.target.value }))}
                        className="w-full px-3 py-2 border border-muted rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
                        placeholder="Subject"
                      />
                    </div>
                    <div>
                      <label htmlFor="contact-message" className="block text-sm font-medium mb-1">
                        Message *
                      </label>
                      <textarea
                        id="contact-message"
                        rows={5}
                        required
                        value={contactFormData.message}
                        onChange={(e) => setContactFormData(prev => ({ ...prev, message: e.target.value }))}
                        className="w-full px-3 py-2 border border-muted rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
                        placeholder="Your Message"
                      />
                    </div>
                    <Button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="w-full bg-primary hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </Button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
        {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Image
                  src="/logo-white.png"
                  alt="AGC Home Renovation Logo"
                  width={120}
                  height={50}
                  className="h-auto"
                />
              </div>
              <p className="text-gray-400 mb-4">
                Quality home renovations and handyman services in Burlington and surrounding areas.
              </p>
              <div className="flex gap-4">
                <a href="https://www.facebook.com/profile.php?id=61574488941619" className="text-white hover:text-primary transition-colors">
                  <span className="sr-only">Facebook</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
                {/* <a href="#" className="text-white hover:text-primary transition-colors">
                  <span className="sr-only">Instagram</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a> */}
              </div>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-4">Services</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#services" className="text-gray-400 hover:text-white transition-colors">
                    Kitchen Remodeling
                  </Link>
                </li>
                <li>
                  <Link href="#services" className="text-gray-400 hover:text-white transition-colors">
                    Bathroom Remodeling
                  </Link>
                </li>
                <li>
                  <Link href="#services" className="text-gray-400 hover:text-white transition-colors">
                    Flooring Installation
                  </Link>
                </li>
                <li>
                  <Link href="#services" className="text-gray-400 hover:text-white transition-colors">
                    Handyman Services
                  </Link>
                </li>
                <li>
                  <Link href="#services" className="text-gray-400 hover:text-white transition-colors">
                    Fence Installation
                  </Link>
                </li>
                <li>
                  <Link href="#services" className="text-gray-400 hover:text-white transition-colors">
                    Shed Construction
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="#services" className="text-gray-400 hover:text-white transition-colors">
                    Services
                  </Link>
                </li>
                <li>
                  <Link href="#gallery" className="text-gray-400 hover:text-white transition-colors">
                    Our Work
                  </Link>
                </li>
                <li>
                  <Link href="#about" className="text-gray-400 hover:text-white transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="#contact" className="text-gray-400 hover:text-white transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-4">Contact</h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <MapPin className="h-5 w-5 text-primary mt-0.5" />
                  <span className="text-gray-400">209 Smith St, Burlington, NC 27217</span>
                </li>
                <li className="flex items-start gap-2">
                  <Phone className="h-5 w-5 text-primary mt-0.5" />
                  <a href="tel:3363292502" className="text-gray-400 hover:text-white transition-colors">
                    (336) 329-2502
                  </a>
                </li>
                <li className="flex items-start gap-2">
                  <Mail className="h-5 w-5 text-primary mt-0.5" />
                  <a href="mailto:carlosr0415@yahoo.com" className="text-gray-400 hover:text-white transition-colors">
                    carlosr0415@yahoo.com
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} AGC Home Renovation & Handymen service LLC. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
