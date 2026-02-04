import { useState } from 'react';

export default function useGoogleSheet() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const submitToSheet = async (data: any, scriptUrl: string) => {
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            // We use 'no-cors' mode because Google Scripts don't support CORS headers for simple POSTs easily
            // This means we won't get a readable response content, but the request will go through.
            await fetch(scriptUrl, {
                method: 'POST',
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            // Since we can't read the response in no-cors, we assume success if no network error occurred
            setSuccess(true);
        } catch (err) {
            setError('Failed to submit registration. Please try again.');
            console.error('Registration Error:', err);
        } finally {
            setLoading(false);
        }
    };

    return { submitToSheet, loading, error, success };
}
