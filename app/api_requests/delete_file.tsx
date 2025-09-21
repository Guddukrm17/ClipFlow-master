export default async function delete_file(refid: string) {
    try {
        const response = await fetch(`/api/delete/${refid}`, {
            method: "DELETE"
        });

        if (response.ok) {
            const result = await response.json();
            return { success: true, message: result.message };
        } else {
            const errorResult = await response.json();
            return { success: false, message: errorResult.message || "File delete failed!" };
        }
    } catch (error: unknown) {
        return {
            success: false,
            message: "Error deleting file.",
            error: error instanceof Error ? error.message : String(error),
        };
    }
}
