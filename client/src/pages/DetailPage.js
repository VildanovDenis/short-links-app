import React, { useContext, useEffect, useState, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import { LinkCard } from '../components/LinkCard'
import { Loader } from '../components/Loader'
import { AuthContext } from '../context/AuthContext'
import { useHttp } from '../hooks/http.hook'

export const DetailPage = () => {
    const auth = useContext(AuthContext)
    const { request, isLoading } = useHttp()
    const params = useParams()
    const [link, setLink] = useState(null)

    const getLink = useCallback(async () => {
        try {
            const data = await request(`/api/link/${params.id}`, 'GET', null, { Authorization: `Bearer ${auth.token}`})
            setLink(data)
        } catch (e) {}
    }, [auth.token, params, request])

    useEffect(() => {
        getLink()
    }, [getLink])

    if (isLoading) {
        return <Loader />
    }

    return (
        <>
            {!isLoading && link && <LinkCard link={link} />}
        </>
    )
}
