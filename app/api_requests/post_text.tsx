export default async function post_text(refid: string, text: string) {
    try {
        const response = await fetch(`/api/text/${refid}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ text })
        });

        if (response.ok) {
            const result = await response.json();
            return { success: true, data: result };
        } else {
            const errorResult = await response.json();
            return { success: false, message: errorResult.message || 'No data found!' };
        }
    } catch (error: unknown) {
        return { success: false, message: 'Error posting field.', error: error instanceof Error ? error.message : String(error) };
    }
}
