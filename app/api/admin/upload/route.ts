import { promises as fs } from 'fs';
import path from 'path';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const folder = searchParams.get('folder');
  const filename = searchParams.get('filename');

  if (!folder || !filename) {
    return NextResponse.json(
      { message: 'Missing "folder" or "filename" query parameter.' },
      { status: 400 }
    );
  }

  if (!request.body) {
    return NextResponse.json({ message: 'No file to upload.' }, { status: 400 });
  }

  try {
    const bytes = await request.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const dirPath = path.join(process.cwd(), 'public', folder);
    await fs.mkdir(dirPath, { recursive: true });

    const filePath = path.join(dirPath, filename);
    await fs.writeFile(filePath, buffer);

    const publicPath = `/${folder}/${filename}`;

    return NextResponse.json({ success: true, filePath: publicPath });
  } catch (error: any) {
    console.error('Error saving file:', error);
    return NextResponse.json(
      { message: 'Error saving file.', error: error.message || 'Unknown error' },
      { status: 500 }
    );
  }
}
