export default async function get_name(refid: string, fileUrl: string) {
    try {
        const response = await fetch(`/api/upload/${refid}?fileUrl=${encodeURIComponent(fileUrl)}`, {
            method: 'GET'
        });
        if (response.ok) {
            const result = await response.json();
            return { success: true, data: result };
        } else {
            const errorResult = await response.json();
            return { success: false, message: errorResult.message || 'No data found!' };
        }
    } catch (error: unknown) {
        return { success: false, message: 'Error getting result.', error: error instanceof Error ? error.message : String(error) };
    }
}