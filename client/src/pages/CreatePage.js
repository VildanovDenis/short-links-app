import React, { useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { useHttp } from '../hooks/http.hook'

export const CreatePage = () => {
    const auth = useContext(AuthContext)
    const history = useHistory() 
    const {request, isLoading, } = useHttp()
    const [link, setLink] = useState('')

    const onInputChange = (e) => setLink(e.target.value)

    const onKeypress = async (e) => {
        if (isLoading) {
            return
        }

        if (e.key !== 'Enter') {
            return
        }

        try {
            const data = await request(
                '/api/link/generate',
                'POST',
                { from: link },
                { Authorization: `Bearer ${auth.token}` }
            )

            history.push(`/detail/${data.link._id}`)
        } catch (e) {}
    }

    return (
        <div className='row'>
            <div className='col s8 offset-s2' style={{ paddingTop: '2rem' }}>

                <div className='input-field'>
                    <input
                        // placeholder='link'
                        id='link'
                        type='text'
                        className='validate'
                        value={link}
                        onChange={onInputChange}
                        onKeyPress={onKeypress}
                    />
                    <label htmlFor='link'>Link</label>
                </div>

            </div>
        </div>
    )
}
