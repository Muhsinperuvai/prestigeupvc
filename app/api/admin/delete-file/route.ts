import { unlink } from "fs/promises"
import { NextRequest, NextResponse } from "next/server"
import path from "path"

export async function POST(request: NextRequest) {
  try {
    const { filePath } = await request.json()

    if (!filePath) {
      return NextResponse.json({ success: false, error: "File path is required." }, { status: 400 })
    }

    // Security: Ensure the path is relative and does not traverse directories.
    // It should start with /gallery/ or /projects/
    if (!filePath.startsWith("/gallery/") && !filePath.startsWith("/projects/")) {
        return NextResponse.json({ success: false, error: "Invalid file path." }, { status: 400 })
    }

    // Construct the absolute path within the /public directory
    const absolutePath = path.join(process.cwd(), "public", filePath)

    // Check if the resolved path is still within the public directory
    const publicDir = path.join(process.cwd(), "public")
    if (!absolutePath.startsWith(publicDir)) {
        return NextResponse.json({ success: false, error: "Attempted to access a restricted path." }, { status: 403 })
    }

    // Delete the file
    await unlink(absolutePath)

    return NextResponse.json({ success: true, message: `File ${filePath} deleted.` })
  } catch (error: any) {
    // Handle cases where the file doesn't exist
    if (error.code === 'ENOENT') {
        console.warn(`File not found for deletion, but proceeding: ${error.message}`)
        return NextResponse.json({ success: true, message: "File not found, but entry removed." })
    }
    console.error("Error deleting file:", error)
    return NextResponse.json({ success: false, error: "Failed to delete file from server." }, { status: 500 })
  }
}
