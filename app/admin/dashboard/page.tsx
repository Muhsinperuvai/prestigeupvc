"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { LogOut, Image, FolderOpen, Contact } from "lucide-react"

export default function AdminDashboard() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if user is logged in
    const loggedIn = localStorage.getItem("adminLoggedIn")
    if (!loggedIn) {
      router.push("/admin/login")
    } else {
      setIsAuthenticated(true)
      setIsLoading(false)
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("adminLoggedIn")
    localStorage.removeItem("adminLoginTime")
    router.push("/admin/login")
  }

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-primary text-primary-foreground sticky top-0 z-40">
        <div className="mx-auto max-w-7xl px-6 py-4 lg:px-8 flex items-center justify-between">
          <div>
            <h1 className="font-serif text-2xl font-bold">Admin Dashboard</h1>
            <p className="text-sm text-primary-foreground/70">Prestige Windows Solution</p>
          </div>
          <Button variant="outline" size="sm" onClick={handleLogout} className="text-primary-foreground border-primary-foreground hover:bg-primary-foreground/10">
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="mb-8">
          <h2 className="font-serif text-3xl font-semibold mb-4">Manage Content</h2>
          <p className="text-muted-foreground">Update gallery images, project details, and contact information</p>
        </div>

        {/* Admin Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Gallery Management */}
          <Link href="/admin/gallery">
            <div className="bg-card rounded-lg border border-border p-8 hover:shadow-lg transition-shadow cursor-pointer flex flex-col h-full">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Image className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-serif text-xl font-semibold mb-2">Gallery Management</h3>
              <p className="text-muted-foreground text-sm mb-4 flex-grow">
                Add, edit, or remove gallery images. Update titles and manage image organization.
              </p>
              <Button variant="outline" className="w-full mt-auto">
                Manage Gallery
                <Image className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </Link>

          {/* Projects Management */}
          <Link href="/admin/projects">
            <div className="bg-card rounded-lg border border-border p-8 hover:shadow-lg transition-shadow cursor-pointer flex flex-col h-full">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <FolderOpen className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-serif text-xl font-semibold mb-2">Projects Management</h3>
              <p className="text-muted-foreground text-sm mb-4 flex-grow">
                Add, edit, or remove projects. Update project details, images, and specifications.
              </p>
              <Button variant="outline" className="w-full mt-auto">
                Manage Projects
                <FolderOpen className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </Link>

          {/* Contact Management */}
          <Link href="/admin/contact">
            <div className="bg-card rounded-lg border border-border p-8 hover:shadow-lg transition-shadow cursor-pointer flex flex-col h-full">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Contact className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-serif text-xl font-semibold mb-2">Contact Management</h3>
              <p className="text-muted-foreground text-sm mb-4 flex-grow">
                Update contact details like address, phone numbers, and emails.
              </p>
              <Button variant="outline" className="w-full mt-auto">
                Manage Contact Info
                <Contact className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </Link>
        </div>

        {/* Quick Info */}
        <div className="mt-12 bg-secondary rounded-lg p-6">
          <h3 className="font-serif text-xl font-semibold mb-4">Quick Information</h3>
          <p className="text-muted-foreground text-sm">
            This is your central hub for managing the content on the Prestige Windows Solution website.
          </p>
        </div>
      </main>
    </div>
  )
}
