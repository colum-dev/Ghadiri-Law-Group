import Image from "next/image"

export default function Avatar({ m }) {
    const initials = m.name.split(' ').map((p) => p[0]).slice(0, 2).join('\u200c')
    return (
        <div className='ab-avatar'>
            <span className='ab-avatar-blob' />
            <div className='ab-avatar-frame'>
                {m.photo ? (
                    <Image src={m.photo} alt={m.name} width={320} height={320} className='ab-photo' />
                ) : (
                    <span className='ab-initials'>{initials}</span>
                )}
            </div>
        </div>
    )
}