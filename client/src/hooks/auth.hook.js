import { useState, useCallback, useEffect } from 'react'

const storageName = 'userData'

export const useAuth = () => {
    const [isReady, setIsReady] = useState(false)
    const [token, setToken] = useState(null)
    const [userId, setUserId] = useState(null)

    const login = useCallback((token, id) => {
        setToken(token)
        setUserId(id)

        localStorage.setItem(storageName, JSON.stringify({ userId: id, token }))
    }, [])

    const logout = useCallback(() => {
        setToken(null)
        setUserId(null)

        localStorage.removeItem(storageName)
    }, [])

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem(storageName))

        if (data && data.token) {
            login(data.token, data.userId)
        }

        setIsReady(true)
    }, [])

    return { login, logout, token, userId, isReady }
}