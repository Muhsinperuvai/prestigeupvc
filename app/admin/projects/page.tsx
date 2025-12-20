"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { AdminLayout } from "@/components/admin/admin-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Pencil, Trash2, Search, Upload } from "lucide-react"

const categories = ["Residential", "Commercial"]
const locations = ["New Delhi", "Mumbai", "Bangalore", "Goa", "Jaipur", "Chennai", "Pune", "Hyderabad"]

interface Project {
  id: number
  title: string
  location: string
  category: string
  description: string
  image: string
  featured?: boolean
  details?: any
  windowSpecs?: any
  gallery?: string[]
}

export default function AdminProjectsPage() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [projects, setProjects] = useState<Project[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [editingProject, setEditingProject] = useState<Project | null>(null)
  const [newProject, setNewProject] = useState({
    title: "",
    location: "",
    category: "",
    description: "",
    image: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    const loggedIn = localStorage.getItem("adminLoggedIn")
    if (!loggedIn) {
      router.push("/admin/login")
    } else {
      setIsAuthenticated(true)
      loadProjectsData()
    }
  }, [router])

  const handleFileUpload = async (file: File): Promise<string | null> => {
    setUploading(true);
    try {
      const response = await fetch(
        `/api/admin/upload?folder=projects&filename=${file.name}`,
        {
          method: 'POST',
          body: file,
        },
      );
      const result = await response.json();
      if (result.success) {
        return result.filePath;
      } else {
        throw new Error(result.message || "Upload failed");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("File upload failed. Please try again.");
      return null;
    } finally {
      setUploading(false);
    }
  };

  const loadProjectsData = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/admin/projects")
      const data = await response.json()
      // The API returns the array directly, so we check if it's an array
      if (Array.isArray(data)) {
        setProjects(data)
      } else {
        // If it's not an array, it might be an error object from the API
        console.error("Received non-array data from projects API:", data)
        setProjects([]) // Reset to an empty array on error
      }
    } catch (error) {
      console.error("Error loading projects:", error)
      setProjects([]) // Reset to an empty array on fetch failure
    } finally {
      setIsLoading(false)
    }
  }

  const saveProjectsData = async (items: Project[]) => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/admin/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "update", items }),
      })
      if (!response.ok) {
        throw new Error("Failed to save")
      }
      // Re-fetch data to ensure UI is in sync with the source file
      await loadProjectsData()
    } catch (error) {
      console.error("Error saving projects:", error)
      alert("Failed to save changes. Please try again.")
      // Rollback optimistic update on failure by reloading
      await loadProjectsData()
    } finally {
      setIsLoading(false)
    }
  }

  if (!isAuthenticated) {
    return null
  }

  const filteredProjects = projects.filter(
    (project) =>
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.location.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleDelete = async (id: number) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this project? This will also delete the image file.")
    if (isConfirmed) {
      const projectToDelete = projects.find((p) => p.id === id)
      
      // First, update the data file
      const updated = projects.filter((p) => p.id !== id)
      setProjects(updated) // Optimistic update
      await saveProjectsData(updated)

      // After data is saved, delete the associated image file
      if (projectToDelete?.image) {
        try {
          await fetch("/api/admin/delete-file", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ filePath: projectToDelete.image }),
          })
        } catch (error) {
          console.error("Error deleting image file:", error)
          // Not showing an alert here as the primary goal (removing from data) succeeded.
        }
      }
    }
  }

  const handleAdd = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const fileInput = event.currentTarget.image as HTMLInputElement
    const file = fileInput.files?.[0]

    let imageUrl = "/projects/new-project-placeholder.jpg" // Default placeholder

    if (file) {
      const uploadedPath = await handleFileUpload(file)
      if (uploadedPath) {
        imageUrl = uploadedPath
      } else {
        return // Stop if upload fails
      }
    }

    if (newProject.title && newProject.location && newProject.category) {
      const nextId = projects.length > 0 ? Math.max(...projects.map((p) => p.id)) + 1 : 1
      const projectToAdd: Project = {
        id: nextId,
        title: newProject.title,
        location: newProject.location,
        category: newProject.category,
        description: newProject.description,
        image: imageUrl,
      }
      const updated = [...projects, projectToAdd]
      setProjects(updated) // Optimistic update
      setIsAddDialogOpen(false)
      await saveProjectsData(updated)
      setNewProject({ title: "", location: "", category: "", description: "", image: "" })
    } else {
      alert("Please fill in all required fields.")
    }
  }

  const handleEdit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!editingProject) return

    const fileInput = event.currentTarget.image as HTMLInputElement
    const file = fileInput.files?.[0]
    
    let imageUrl = editingProject.image

    if (file) {
      const uploadedPath = await handleFileUpload(file)
      if (uploadedPath) {
        imageUrl = uploadedPath
      } else {
        return // Stop if upload fails
      }
    }

    const updatedProject = { ...editingProject, image: imageUrl }
    const updated = projects.map((p) => (p.id === updatedProject.id ? updatedProject : p))
    setProjects(updated) // Optimistic update
    setEditingProject(null)
    await saveProjectsData(updated)
  }

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="font-serif text-3xl font-semibold">Manage Projects</h1>
            <p className="text-muted-foreground mt-1">
              Manage projects from /app/projects/page.tsx
            </p>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button disabled={isLoading}>
                <Plus className="h-4 w-4 mr-2" />
                Add Project
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Add New Project</DialogTitle>
                <DialogDescription>Create a new project entry for your portfolio.</DialogDescription>
              </DialogHeader>
              <form onSubmit={handleAdd} className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="image">Project Image</Label>
                  <Input id="image" name="image" type="file" accept="image/*" />
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="add-title">Project Title</Label>
                    <Input
                      id="add-title"
                      placeholder="e.g., Luxury Villa"
                      value={newProject.title}
                      onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="add-location">Location</Label>
                    <Select
                      value={newProject.location}
                      onValueChange={(value) => setNewProject({ ...newProject, location: value })}
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select location" />
                      </SelectTrigger>
                      <SelectContent>
                        {locations.map((loc) => (
                          <SelectItem key={loc} value={loc}>
                            {loc}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2 sm:col-span-2">
                    <Label htmlFor="add-category">Category</Label>
                    <Select
                      value={newProject.category}
                      onValueChange={(value) => setNewProject({ ...newProject, category: value })}
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((cat) => (
                          <SelectItem key={cat} value={cat}>
                            {cat}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="add-description">Description</Label>
                  <Textarea
                    id="add-description"
                    placeholder="Describe the project..."
                    rows={3}
                    value={newProject.description}
                    onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                  />
                </div>
                <Button type="submit" className="w-full" disabled={isLoading || uploading}>
                  {uploading ? "Uploading..." : isLoading ? "Adding..." : "Add Project"}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Search */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search projects..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Projects Table */}
        <div className="bg-card rounded-lg border border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  <th className="text-left py-4 px-6 text-sm font-medium text-muted-foreground">Project</th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-muted-foreground">Location</th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-muted-foreground">Category</th>
                  <th className="text-right py-4 px-6 text-sm font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProjects.map((project) => (
                  <tr key={project.id} className="border-b border-border last:border-0">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                          <img
                            src={project.image || "/placeholder.svg"}
                            alt={project.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-medium text-sm">{project.title}</p>
                          <p className="text-xs text-muted-foreground truncate max-w-[200px]">{project.description}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-sm text-muted-foreground">{project.location}</td>
                    <td className="py-4 px-6 text-sm text-muted-foreground">{project.category}</td>
                    <td className="py-4 px-6">
                      <div className="flex items-center justify-end gap-2">
                        <Dialog onOpenChange={(isOpen) => !isOpen && setEditingProject(null)}>
                          <DialogTrigger asChild>
                            <Button
                              size="icon"
                              variant="ghost"
                              className="h-8 w-8"
                              onClick={() => setEditingProject(project)}
                              disabled={isLoading}
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>Edit Project</DialogTitle>
                              <DialogDescription>Update project details.</DialogDescription>
                            </DialogHeader>
                            {editingProject && (
                              <form onSubmit={handleEdit} className="space-y-4 mt-4">
                                <div className="space-y-2">
                                  <Label>Current Image</Label>
                                  <div className="aspect-video rounded-lg overflow-hidden bg-muted">
                                    <img
                                      src={editingProject.image || "/placeholder.svg"}
                                      alt={editingProject.title}
                                      className="w-full h-full object-cover"
                                    />
                                  </div>
                                </div>
                                 <div className="space-y-2">
                                  <Label htmlFor="edit-image">Upload New Image (optional)</Label>
                                  <Input id="edit-image" name="image" type="file" accept="image/*" />
                                </div>
                                <div className="grid sm:grid-cols-2 gap-4">
                                  <div className="space-y-2">
                                    <Label>Project Title</Label>
                                    <Input
                                      value={editingProject.title}
                                      onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                                      required
                                    />
                                  </div>
                                  <div className="space-y-2">
                                    <Label>Location</Label>
                                    <Select
                                      value={editingProject.location}
                                      onValueChange={(value) =>
                                        setEditingProject({ ...editingProject, location: value })
                                      }
                                      required
                                    >
                                      <SelectTrigger>
                                        <SelectValue />
                                      </SelectTrigger>
                                      <SelectContent>
                                        {locations.map((loc) => (
                                          <SelectItem key={loc} value={loc}>
                                            {loc}
                                          </SelectItem>
                                        ))}
                                      </SelectContent>
                                    </Select>
                                  </div>
                                  <div className="space-y-2 sm:col-span-2">
                                    <Label>Category</Label>
                                    <Select
                                      value={editingProject.category}
                                      onValueChange={(value) =>
                                        setEditingProject({ ...editingProject, category: value })
                                      }
                                      required
                                    >
                                      <SelectTrigger>
                                        <SelectValue />
                                      </SelectTrigger>
                                      <SelectContent>
                                        {categories.map((cat) => (
                                          <SelectItem key={cat} value={cat}>
                                            {cat}
                                          </SelectItem>
                                        ))}
                                      </SelectContent>
                                    </Select>
                                  </div>
                                </div>
                                <div className="space-y-2">
                                  <Label>Description</Label>
                                  <Textarea
                                    rows={3}
                                    value={editingProject.description}
                                    onChange={(e) =>
                                      setEditingProject({ ...editingProject, description: e.target.value })
                                    }
                                  />
                                </div>
                                <Button type="submit" className="w-full" disabled={isLoading || uploading}>
                                  {uploading ? "Uploading..." : isLoading ? "Saving..." : "Save Changes"}
                                </Button>
                              </form>
                            )}
                          </DialogContent>
                        </Dialog>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                          onClick={() => handleDelete(project.id)}
                          disabled={isLoading}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
