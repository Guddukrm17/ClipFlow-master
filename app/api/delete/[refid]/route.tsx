import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";
import Field from "../../../models/fieldModel";
import connectDB from "@/app/config/dbConnect";


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

const auth = new google.auth.GoogleAuth({
    credentials: getCredentials(),
    scopes: ["https://www.googleapis.com/auth/drive"],
});

const drive = google.drive({ version: "v3", auth });

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ refid: string }>; }) {
    try {
        await connectDB();
        const { refid } = await params;

        const fieldResult = await Field.findOne({ refid });
        if (!fieldResult || fieldResult.fileUrl === 'None') {
            return NextResponse.json({ message: "File not found" }, { status: 404 });
        }

        const fileId = fieldResult.fileUrl.split("/").slice(-2, -1)[0]; // Extract file ID from URL

        // Delete file from Google Drive
        await drive.files.delete({ fileId });

        // Remove reference from the database
        await Field.findOneAndUpdate({ refid }, { fileUrl: 'None' });

        return NextResponse.json({ message: "File deleted successfully" }, { status: 200 });
    } catch (error) {
        console.error("Delete Error:", error);
        return NextResponse.json({ message: "File deletion failed" }, { status: 500 });
    }
}