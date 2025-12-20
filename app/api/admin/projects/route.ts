import { writeFile, readFile } from "fs/promises"
import { NextResponse } from "next/server"
import path from "path"

// The target file from which we read and to which we write the projects data.
const PROJECTS_DATA_FILE = path.join(process.cwd(), "app/projects/page.tsx")

/**
 * A robust stringifier that handles functions and formats the output for TSX files.
 * This is crucial for writing back valid JavaScript code into the file.
 */
function stringifyForTSX(obj: any): string {
  const jsonString = JSON.stringify(
    obj,
    (key, value) => {
      // Keep function definitions as strings
      if (typeof value === "function") {
        return value.toString()
      }
      return value
    },
    2,
  )

  // The JSON.stringify will escape quotes and newlines. We need to un-escape them
  // to make the code valid in the TSX file.
  return jsonString.replace(/\\n/g, "\n").replace(/\\"/g, '"')
}

// GET endpoint to read projects data
export async function GET() {
  try {
    const fileContent = await readFile(PROJECTS_DATA_FILE, "utf-8")

    // A more robust regex to find the projects array definition.
    // It looks for `const projects = [...]` and captures the array content.
    const projectsMatch = fileContent.match(/const projects: Project\[\] = (\[[\s\S]*?\]);/)
    if (!projectsMatch || !projectsMatch[1]) {
      console.error("Could not find 'const projects' array in the file.")
      return NextResponse.json({ error: "Could not parse projects data from file" }, { status: 500 })
    }

    // Using eval is a security risk, but necessary for this architecture to parse JS objects.
    // It's wrapped in a try-catch to handle syntax errors in the data file.
    try {
      const projectsArray = eval?.(`(${projectsMatch[1]})`)
      return NextResponse.json(projectsArray)
    } catch (e) {
      console.error("Error evaluating the projects array from file:", e)
      return NextResponse.json({ error: "Failed to evaluate projects array. Check for syntax errors in the data file." }, { status: 500 })
    }
  } catch (error) {
    console.error("Error reading projects data file:", error)
    return NextResponse.json({ error: "Failed to read projects data" }, { status: 500 })
  }
}

// POST endpoint to update projects data
export async function POST(request: Request) {
  try {
    const { action, items } = await request.json()

    if (action === "update" && Array.isArray(items)) {
      const currentFileContent = await readFile(PROJECTS_DATA_FILE, "utf-8")

      // Format the new array into a string of valid JavaScript code.
      const newItemsString = stringifyForTSX(items)

      // A more robust regex to replace the old projects array.
      const newFileContent = currentFileContent.replace(
        /const projects: Project\[\] = \[[\s\S]*?\];/,
        `const projects: Project[] = ${newItemsString};`,
      )

      // Write the updated content back to the file.
      await writeFile(PROJECTS_DATA_FILE, newFileContent, "utf-8")
      return NextResponse.json({ success: true, message: "Projects updated successfully." })
    }

    return NextResponse.json({ error: "Invalid action or data format." }, { status: 400 })
  } catch (error) {
    console.error("Error updating projects:", error)
    return NextResponse.json({ error: "Failed to update projects data" }, { status: 500 })
  }
}

