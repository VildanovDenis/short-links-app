export const LinkCard = ({ link }) => {
    return (
        <>
            <h2>Link: </h2>
            <p>Short link: <a href={link.to} target='_blank' rel="noopener noreferrer">{link.to}</a></p>
            <p>Original link: <a href={link.from} target='_blank' rel='noopener noreferrer'>{link.from}</a></p>
            <p>Times, link opened: <strong>{link.clicks}</strong></p>
            <p>Created: <strong>{new Date(link.date).toLocaleDateString()}</strong></p>
        </>
    )
}
