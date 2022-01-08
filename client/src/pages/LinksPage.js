import React, { useCallback, useContext, useEffect, useState } from 'react'
import { LinkList } from '../components/LinksList'
import { Loader } from '../components/Loader'
import { AuthContext } from '../context/AuthContext'
import { useHttp } from '../hooks/http.hook'

export const LinksPage = () => {
    const [links, setLinks] = useState([])
    const { isLoading, request } = useHttp()
    const { token } = useContext(AuthContext)

    const fetchLinks = useCallback(async () => {
        try {
            const data = await request('/api/link', 'GET', null, { Authorization: `Bearer ${token}` })
            setLinks(data)
        } catch (e) {}
    }, [token, request])

    useEffect(() => {
        fetchLinks()
    }, [fetchLinks])

    if (isLoading) {
        return <Loader />
    }

    return (
        <>
            {!isLoading && <LinkList links={links} />}
        </>
    )
}
