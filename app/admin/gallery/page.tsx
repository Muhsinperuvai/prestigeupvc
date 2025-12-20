"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { AdminLayout } from "@/components/admin/admin-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Plus, Pencil, Trash2, Search, Upload } from "lucide-react"

interface GalleryItem {
  id: number
  image: string
}

export default function AdminGalleryPage() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<GalleryItem | null>(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [uploading, setUploading] = useState(false)

  // Check authentication and load gallery data
  useEffect(() => {
    const loggedIn = localStorage.getItem("adminLoggedIn")
    if (!loggedIn) {
      router.push("/admin/login")
    } else {
      setIsAuthenticated(true)
      loadGalleryData()
    }
  }, [router])

  const handleFileUpload = async (file: File): Promise<string | null> => {
    setUploading(true)
    try {
      const response = await fetch(
        `/api/admin/upload?folder=gallery&filename=${file.name}`,
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

  const loadGalleryData = async () => {
    try {
      const response = await fetch("/api/admin/gallery")
      const data = await response.json()
      setGalleryItems(data)
    } catch (error) {
      console.error("Error loading gallery:", error)
    }
  }

  if (!isAuthenticated) {
    return null
  }

  const filteredItems = galleryItems.filter((item) =>
    item.image.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleDelete = async (id: number) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this image? This will also delete the file from the server.")
    if (isConfirmed) {
      const itemToDelete = galleryItems.find((item) => item.id === id)

      // First, update the data file
      const updated = galleryItems.filter((item) => item.id !== id)
      setGalleryItems(updated)
      await saveGalleryData(updated)

      // After data is saved, delete the associated image file
      if (itemToDelete?.image) {
        try {
          await fetch("/api/admin/delete-file", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ filePath: itemToDelete.image }),
          })
        } catch (error) {
          console.error("Error deleting image file:", error)
        }
      }
    }
  }

  const handleAdd = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const fileInput = event.currentTarget.image as HTMLInputElement
    const file = fileInput.files?.[0]

    if (!file) {
      alert("Please select a file to upload.")
      return
    }

    const uploadedPath = await handleFileUpload(file)
    if (!uploadedPath) {
      return // Stop if upload fails
    }

    const nextId = galleryItems.length > 0 ? Math.max(...galleryItems.map((item) => item.id)) + 1 : 1
    const newItem: GalleryItem = {
      id: nextId,
      image: uploadedPath,
    }

    const updated = [...galleryItems, newItem]
    setGalleryItems(updated)
    await saveGalleryData(updated)
    setIsAddDialogOpen(false)
  }

  const handleEdit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!editingItem) return

    const fileInput = event.currentTarget.image as HTMLInputElement
    const file = fileInput.files?.[0]
    
    let imageUrl = editingItem.image

    if (file) {
      const uploadedPath = await handleFileUpload(file)
      if (uploadedPath) {
        imageUrl = uploadedPath
      } else {
        return // Stop if upload fails
      }
    }

    const updatedItem = { ...editingItem, image: imageUrl }
    const updated = galleryItems.map((item) => (item.id === updatedItem.id ? updatedItem : item))
    setGalleryItems(updated)
    await saveGalleryData(updated)
    setEditingItem(null)
    setIsEditDialogOpen(false)
  }

  const saveGalleryData = async (items: GalleryItem[]) => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/admin/gallery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "update", items }),
      })
      if (!response.ok) {
        throw new Error("Failed to save")
      }
    } catch (error) {
      console.error("Error saving gallery:", error)
      alert("Failed to save changes. Please try again.")
      // Reload data on error
      await loadGalleryData()
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="font-serif text-3xl font-semibold">Manage Gallery</h1>
            <p className="text-muted-foreground mt-1">
              Manage gallery images from /app/gallery/page.tsx
            </p>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button disabled={isLoading}>
                <Plus className="h-4 w-4 mr-2" />
                Add Image
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Image</DialogTitle>
                <DialogDescription>
                  Upload a new image to add to your gallery.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleAdd} className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="image">Image File</Label>
                  <Input id="image" name="image" type="file" accept="image/*" required />
                </div>
                <Button
                  type="submit"
                  className="w-full"
                  disabled={isLoading || uploading}
                >
                  {uploading ? "Uploading..." : isLoading ? "Saving..." : "Add to Gallery"}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Search */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by image path..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Gallery Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="group bg-card rounded-lg border border-border overflow-hidden"
            >
              <div className="aspect-[4/3] overflow-hidden relative">
                <img
                  src={item.image || "/placeholder.svg"}
                  alt="Gallery"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/40 transition-colors flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                  <Dialog
                    open={editingItem?.id === item.id && isEditDialogOpen}
                    onOpenChange={(isOpen) => {
                      setIsEditDialogOpen(isOpen)
                      if (!isOpen) setEditingItem(null)
                    }}
                  >
                    <DialogTrigger asChild>
                      <Button
                        size="icon"
                        variant="secondary"
                        className="h-9 w-9"
                        onClick={() => {
                          setEditingItem(item)
                          setIsEditDialogOpen(true)
                        }}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Edit Image</DialogTitle>
                        <DialogDescription>Upload a new image to replace the existing one.</DialogDescription>
                      </DialogHeader>
                      {editingItem && (
                        <form onSubmit={handleEdit} className="space-y-4 mt-4">
                          <div className="space-y-2">
                            <Label>Current Image</Label>
                            <div className="aspect-video rounded-lg overflow-hidden bg-muted">
                              <img
                                src={editingItem.image || "/placeholder.svg"}
                                alt="Gallery"
                                className="w-full h-full object-cover"
                              />
                            </div>
                             <p className="text-xs text-muted-foreground truncate">{editingItem.image}</p>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="edit-image">Upload New Image</Label>
                            <Input id="edit-image" name="image" type="file" accept="image/*" />
                          </div>
                          <Button
                            type="submit"
                            className="w-full"
                            disabled={isLoading || uploading}
                          >
                            {uploading ? "Uploading..." : isLoading ? "Saving..." : "Save Changes"}
                          </Button>
                        </form>
                      )}
                    </DialogContent>
                  </Dialog>
                  <Button
                    size="icon"
                    variant="destructive"
                    className="h-9 w-9"
                    onClick={() => handleDelete(item.id)}
                    disabled={isLoading}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="p-4">
                <p className="text-xs text-muted-foreground truncate">{item.image}</p>
              </div>
            </div>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No images found matching your search.</p>
          </div>
        )}
      </div>
    </AdminLayout>
  )
}
