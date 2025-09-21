export default async function upload_file(refid: string, file: File) {
    try {
        const formData = new FormData();
        formData.append("file", file);

        const response = await fetch(`/api/upload/${refid}`, {
            method: "POST",
            body: formData,
        });

        if (response.ok) {
            const result = await response.json();
            return { success: true, data: result };
        } else {
            const errorResult = await response.json();
            return { success: false, message: errorResult.message || "File upload failed!" };
        }
    } catch (error: unknown) {
        return {
            success: false,
            message: "Error uploading file.",
            error: error instanceof Error ? error.message : String(error),
        };
    }
}
