import React from 'react'
import { Link } from 'react-router-dom'

export const LinkList = ({ links }) => {
    if (links.length === 0) {
        return <p>There is not links yet</p>
    }

    return (
        <table className='highlight'>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Original link</th>
                    <th>Short link</th>
                    <th></th>
                </tr>
            </thead>

            <tbody>
                {links.map((link, index) => (
                    <tr key={link._id}>
                        <td>{index + 1}</td>
                        <td>{link.from}</td>
                        <td>{link.to}</td>
                        <td>
                            <Link to={`/detail/${link._id}`}>Open</Link>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>   
    )
}
