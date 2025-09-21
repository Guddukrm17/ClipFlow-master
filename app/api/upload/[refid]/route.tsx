import { google } from "googleapis";
import { Readable } from "stream";
import { NextRequest, NextResponse } from "next/server";
import connectDB from "../../../config/dbConnect";
import Field from "../../../models/fieldModel";

const getCredentials = () => {
    const base64Credentials = process.env.GOOGLE_CREDS;
    if (!base64Credentials) {
        throw new Error("Google credentials not found in environment variables");
    }

    // Decode base64 and parse JSON
    const credentials = JSON.parse(
        Buffer.from(base64Credentials, "base64").toString("utf-8")
    );

    return credentials;
};


const FOLDER_ID = process.env.FOLDER_ID;

const auth = new google.auth.GoogleAuth({
    credentials: getCredentials(),
    scopes: ["https://www.googleapis.com/auth/drive"],
});

// const drive = google.drive({ version: "v3", auth: oauth2Client });
const drive = google.drive({ version: "v3", auth });

export async function POST(req: NextRequest, { params }: { params: Promise<{ refid: string }>; }) {
    await connectDB();
    try {
        const formData = await req.formData();
        const file = formData.get("file");
        const { refid } = await params;

        if (!file || !(file instanceof Blob)) {
            return NextResponse.json({ message: "Invalid file upload" }, { status: 400 });
        }

        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        const fileMetadata = {
            name: file.name,
            parents: FOLDER_ID ? [FOLDER_ID] : [], // Upload to specific folder
        };

        const media = {
            mimeType: file.type,
            body: Readable.from(buffer),
        };

        // Upload file to Google Drive
        const response = await drive.files.create({
            requestBody: fileMetadata,
            media: media,
            fields: "id, webViewLink",
        });

        const fileId = response.data.id;
        if (!fileId) {
            throw new Error("File ID is missing, unable to set permissions");
        }

        await drive.permissions.create({
            fileId: fileId, // ID of the uploaded file
            requestBody: {
                role: "reader", // Read-only access
                type: "anyone", // Anyone on the internet
            },
        });

        const fileUrl = response.data.webViewLink;

        const fieldAvailable = await Field.findOne({ refid });
        if (fieldAvailable) {
            const field = await Field.findOneAndUpdate(
                { refid },  // Find field by refid
                { fileUrl },  // Update fields
                { new: true }  // Return the updated document
            );
            return NextResponse.json({ message: "File uploaded successfully", url: field.fileUrl }, { status: 201 });
        }

        const field = await Field.create({ refid, fileUrl });

        return NextResponse.json({ message: "File uploaded successfully", url: field.fileUrl }, { status: 201 });
    } catch (error) {
        console.error("Upload Error:", error);
        return NextResponse.json({ message: "File upload failed" }, { status: 500 });
    }
}

export async function GET(req: NextRequest) {
    try {
        const fileUrl = req.nextUrl.searchParams.get("fileUrl");
        if (!fileUrl) {
            return NextResponse.json({ message: "File URL is required" }, { status: 400 });
        }

        const fileId = fileUrl.split("/").slice(-2, -1)[0]; // Extract file ID from URL
        if (!fileId) {
            return NextResponse.json({ message: "Invalid File URL" }, { status: 400 });
        }

        const response = await drive.files.get({
            fileId: fileId,
            fields: "name",
        });

        return NextResponse.json({ name: response.data.name }, { status: 200 });
    } catch (error) {
        console.error("Fetch Error:", error);
        return NextResponse.json({ message: "Failed to retrieve file name" }, { status: 500 });
    }
}