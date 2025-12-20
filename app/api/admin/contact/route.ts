import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { contactData, ContactInfo } from '@/lib/contact-data';

const dataFilePath = path.join(process.cwd(), 'lib', 'contact-data.ts');

export async function GET() {
  try {
    // The data is imported directly, so we can just return it.
    // In a real-world scenario with a database, you would fetch it here.
    return NextResponse.json(contactData);
  } catch (error) {
    console.error('Error reading contact data:', error);
    return NextResponse.json({ message: 'Error reading contact data' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const updatedData: ContactInfo = await request.json();

    const fileContent = `export interface ContactInfo {
  address: string[];
  phones: string[];
  emails: string[];
  hours: string[];
}

export const contactData: ContactInfo = ${JSON.stringify(updatedData, null, 2)};
`;

    await fs.writeFile(dataFilePath, fileContent, 'utf8');

    return NextResponse.json({ message: 'Contact information updated successfully' });
  } catch (error) {
    console.error('Error writing contact data:', error);
    return NextResponse.json({ message: 'Error writing contact data' }, { status: 500 });
  }
}
