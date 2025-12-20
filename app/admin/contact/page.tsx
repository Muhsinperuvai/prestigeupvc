"use client"

import { useState, useEffect } from "react"
import { AdminLayout } from "@/components/admin/admin-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import type { ContactInfo } from "@/lib/contact-data"
import { Trash2, Plus } from "lucide-react"

const AdminContactPage = () => {
  const [contactInfo, setContactInfo] = useState<ContactInfo | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    const fetchContactInfo = async () => {
      try {
        const response = await fetch("/api/admin/contact")
        if (!response.ok) {
          throw new Error("Failed to fetch contact info")
        }
        const data = await response.json()
        setContactInfo(data)
      } catch (error) {
        console.error(error)
        toast({
          title: "Error",
          description: "Failed to load contact information.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }
    fetchContactInfo()
  }, [toast])

  const handleSave = async () => {
    if (!contactInfo) return
    try {
      const response = await fetch("/api/admin/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contactInfo),
      })

      if (!response.ok) {
        throw new Error("Failed to save contact info")
      }

      toast({
        title: "Success",
        description: "Contact information saved successfully.",
      })
    } catch (error) {
      console.error(error)
      toast({
        title: "Error",
        description: "Failed to save contact information.",
        variant: "destructive",
      })
    }
  }

  const handleInputChange = (field: keyof ContactInfo, index: number, value: string) => {
    if (!contactInfo) return
    const updatedValues = [...(contactInfo[field] as string[])]
    updatedValues[index] = value
    setContactInfo({ ...contactInfo, [field]: updatedValues })
  }
  
  const handleAddressChange = (value: string) => {
    if (!contactInfo) return
    setContactInfo({ ...contactInfo, address: value.split('\\n') });
  };

  const handleHoursChange = (index: number, value: string) => {
    if (!contactInfo) return
    const updatedHours = [...contactInfo.hours]
    updatedHours[index] = value
    setContactInfo({ ...contactInfo, hours: updatedHours })
  }

  const handleAddItem = (field: keyof ContactInfo) => {
    if (!contactInfo) return
    const updatedValues = [...(contactInfo[field] as string[]), ""]
    setContactInfo({ ...contactInfo, [field]: updatedValues })
  }

  const handleRemoveItem = (field: keyof ContactInfo, index: number) => {
    if (!contactInfo) return
    const updatedValues = (contactInfo[field] as string[]).filter((_, i) => i !== index)
    setContactInfo({ ...contactInfo, [field]: updatedValues })
  }

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="p-6">Loading...</div>
      </AdminLayout>
    )
  }

  if (!contactInfo) {
    return (
      <AdminLayout>
        <div className="p-6">Failed to load contact information.</div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="p-6 space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Manage Contact Information</h1>
          <Button onClick={handleSave}>Save Changes</Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <Label className="text-lg font-semibold">Address</Label>
            <Textarea
              value={contactInfo.address.join('\\n')}
              onChange={(e) => handleAddressChange(e.target.value)}
              rows={5}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="space-y-4">
            <Label className="text-lg font-semibold">Business Hours</Label>
            {contactInfo.hours.map((hour, index) => (
              <Input
                key={index}
                value={hour}
                onChange={(e) => handleHoursChange(index, e.target.value)}
                className="w-full p-2 border rounded"
              />
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label className="text-lg font-semibold">Phone Numbers</Label>
            <Button size="sm" onClick={() => handleAddItem("phones")}>
              <Plus className="h-4 w-4 mr-2" /> Add Phone
            </Button>
          </div>
          <div className="space-y-2">
            {contactInfo.phones.map((phone, index) => (
              <div key={index} className="flex items-center gap-2">
                <Input
                  type="tel"
                  value={phone}
                  onChange={(e) => handleInputChange("phones", index, e.target.value)}
                  className="w-full p-2 border rounded"
                />
                <Button size="icon" variant="destructive" onClick={() => handleRemoveItem("phones", index)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label className="text-lg font-semibold">Email Addresses</Label>
            <Button size="sm" onClick={() => handleAddItem("emails")}>
              <Plus className="h-4 w-4 mr-2" /> Add Email
            </Button>
          </div>
          <div className="space-y-2">
            {contactInfo.emails.map((email, index) => (
              <div key={index} className="flex items-center gap-2">
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => handleInputChange("emails", index, e.target.value)}
                  className="w-full p-2 border rounded"
                />
                <Button size="icon" variant="destructive" onClick={() => handleRemoveItem("emails", index)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}

export default AdminContactPage
