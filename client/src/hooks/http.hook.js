import { useCallback, useState } from "react"


export const useHttp = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    const request = useCallback(
        async (url, method = 'GET', body = null, headers = {}) => {
            setIsLoading(true)

            try {
                if (body) {
                    body = JSON.stringify(body)
                    headers['Content-type'] = 'application/json'
                }

                const res = await fetch(url, { method, body, headers })
                const data = await res.json()

                if (!res.ok) {
                    throw new Error(data.message || 'Something went wrong')
                }

                return data
            } catch (e) {
                setError(e.message)

                throw e
            } finally {
                setIsLoading(false)
            }
        },
        []
    )

    const clearError = useCallback(() => setError(null), [])

    return { isLoading, request, error, clearError }
}