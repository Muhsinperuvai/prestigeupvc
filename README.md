# Prestige UPVC Doors & Windows Website

This is a Next.js project for Prestige UPVC Doors & Windows, featuring a public-facing website and a built-in admin panel for content management.

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (v14+ with App Router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
- **Package Manager**: [pnpm](https://pnpm.io/)

---

## Project Setup

Follow these steps to get the project running on your local machine.

### 1. Clone the Repository

First, clone the project repository to your local machine:

```bash
git clone https://github.com/Muhsinperuvai/PrestigeUPvcDoors.git
cd PrestigeUPvcDoors
```

### 2. Install Dependencies

This project uses `pnpm` as the package manager. To install all the necessary dependencies, run the following command in the project's root directory:

```bash
pnpm install
```

If you don't have `pnpm` installed, you can install it via `npm`:
```bash
npm install -g pnpm
```

### 3. Run the Development Server

Once the dependencies are installed, you can start the local development server:

```bash
pnpm dev
```

This will launch the website. You can view it by opening your web browser and navigating to:

[http://localhost:3000](http://localhost:3000)

---

## Admin Panel Guide

The admin panel allows you to manage the content of the website directly. This includes updating the gallery, managing projects, and changing contact information.

### 1. How to Log In

The admin panel is protected by a simple password.

- **URL**: [http://localhost:3000/admin](http://localhost:3000/admin)
- **Password**: `Prestige`

When you first visit the admin URL, you will be prompted for a password. Enter the password to gain access. The system will remember you, so you won't need to log in every time.

### 2. Admin Dashboard

After logging in, you will see the main dashboard. This is your control center for managing all the website's content.

The dashboard has three main sections:
- **Manage Gallery**: Add or remove images in the photo gallery.
- **Manage Projects**: Create, update, or delete project showcases.
- **Manage Contact Info**: Update the phone numbers, email, and address displayed on the website.

### 3. How to Manage the Gallery

1.  **Navigate**: From the dashboard, click on "Manage Gallery".
2.  **Add an Image**:
    - Click the "**+ Add Image**" button.
    - A dialog box will appear. Click "**Choose File**" and select the image you want to upload from your computer.
    - Click "**Add to Gallery**". The new image will appear on the website's gallery page.
3.  **Delete an Image**:
    - Hover over the image you wish to remove.
    - Click the red **trash can icon**.
    - Confirm your choice. The image will be removed from the gallery and the corresponding file will be deleted from the server.
4.  **Edit/Replace an Image**:
    - Hover over the image you wish to replace.
    - Click the gray **pencil icon**.
    - In the dialog, click "**Choose File**" under "Upload New Image" to select a replacement file.
    - Click "**Save Changes**". The old image will be replaced with the new one.

### 4. How to Manage Projects

1.  **Navigate**: From the dashboard, click on "Manage Projects".
2.  **Add a New Project**:
    - Click the "**+ Add Project**" button.
    - Fill in the project details in the form:
        - **Project Image**: Upload the main image for the project.
        - **Project Title**: The name of the project (e.g., "Luxury Villa").
        - **Location**: Where the project is located.
        - **Category**: The type of project (e.g., "Residential").
        - **Description**: A brief summary of the project.
    - Click "**Add Project**". The new project will be added to the projects page.
3.  **Edit a Project**:
    - Find the project in the list and click the **pencil icon** on the right side.
    - A dialog box will appear where you can update the project's title, location, category, and description.
    - You can also upload a new image to replace the existing one.
    - Click "**Save Changes**" to update the project.
4.  **Delete a Project**:
    - Find the project in the list and click the **trash can icon** on the right side.
    - Confirm your choice. The project will be removed from the website.

### 5. How to Manage Contact Information

1.  **Navigate**: From the dashboard, click on "Manage Contact Info".
2.  **Update Information**:
    - You will see fields for **Phone Numbers**, **Email Addresses**, and the **Physical Address**.
    - To add a new phone number or email, click the "**+**" button next to the respective section.
    - To remove an entry, click the "**-**" button next to it.
    - You can directly edit the text in any of the fields.
3.  **Save Changes**:
    - After making your changes, click the "**Save Changes**" button at the bottom.
    - The new contact information will be immediately reflected in the website's footer and on the contact page.
