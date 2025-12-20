import { writeFile, readFile } from "fs/promises"
import { NextResponse } from "next/server"
import path from "path"

const GALLERY_FILE = path.join(process.cwd(), "app/gallery/page.tsx")

export async function GET() {
  try {
    const content = await readFile(GALLERY_FILE, "utf-8")
    
    // Extract the galleryImages array from the file
    const match = content.match(/const galleryImages = \[([\s\S]*?)\]/)
    if (!match) {
      return NextResponse.json({ error: "Could not parse gallery data" }, { status: 400 })
    }
    
    // Parse the array content
    const arrayContent = match[1]
    const items: any[] = []
    const itemRegex = /\{\s*id:\s*(\d+),\s*image:\s*"([^"]+)",?\s*\}/g
    let itemMatch
    
    while ((itemMatch = itemRegex.exec(arrayContent)) !== null) {
      items.push({
        id: parseInt(itemMatch[1]),
        image: itemMatch[2],
      })
    }
    
    return NextResponse.json(items)
  } catch (error) {
    console.error("Error reading gallery:", error)
    return NextResponse.json({ error: "Failed to read gallery data" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const { action, item, items } = await request.json()
    
    if (action === "update" && items) {
      // Update the entire gallery array in the TSX file
      const content = await readFile(GALLERY_FILE, "utf-8")
      
      // Format the new array
      const itemsCode = items
        .map(
          (item: any) => `  {
    id: ${item.id},
    image: "${item.image}",
  }`
        )
        .join(",\n")
      
      const newContent = content.replace(
        /const galleryImages = \[([\s\S]*?)\]/,
        `const galleryImages = [\n${itemsCode},\n]`
      )
      
      await writeFile(GALLERY_FILE, newContent)
      return NextResponse.json({ success: true })
    }
    
    return NextResponse.json({ error: "Invalid action" }, { status: 400 })
  } catch (error) {
    console.error("Error updating gallery:", error)
    return NextResponse.json({ error: "Failed to update gallery data" }, { status: 500 })
  }
}
