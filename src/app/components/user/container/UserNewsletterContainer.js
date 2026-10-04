import React from 'react'

export default function UserNewsletterContainer({
    eyebrow = 'خبرنامه',
    title = 'مقالهٔ تازه، در صندوق ایمیل‌تان',
    subtitle = 'این یک متن نمونه است. هر چند وقت یک‌بار، بدون مزاحمت.',
    onSubmit,
}) {
    const submit = (e) => {
        e.preventDefault()
        onSubmit?.(new FormData(e.currentTarget).get('email'))
    }

    return (
        <section className='ab-full ab-panel ab-panel--navy'>
            <span className='ab-gridbg' />
            <span className='ab-blob ab-blob--2' />
            <div className='main-user-layout ab-inner'>
                <div className='ar-news'>
                    <div>
                        <span className='ab-eyebrow'>{eyebrow}</span>
                        <h2 className='ab-h2'>{title}</h2>
                        <p className='ab-sub'>{subtitle}</p>
                    </div>
                    <form className='ar-news-form' onSubmit={submit}>
                        <input type='email' name='email' required placeholder='ایمیل شما' dir='ltr' />
                        <button type='submit' className='ab-btn ab-btn--gold'>عضویت <span aria-hidden>←</span></button>
                    </form>
                </div>
            </div>
        </section>
    )
}
