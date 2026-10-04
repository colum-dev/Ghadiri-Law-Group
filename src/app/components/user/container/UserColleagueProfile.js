import React from 'react'
import Avatar from '../avatar/EmployeeAvatar'
import UserSectionHead from '../title/UserSectionHead'
import SocialLinkButton from '../common/SocialLinkButton'
import TimelineList from '../common/TimelineList'
import BlogCard from '../card/BlogCard'

const EDU_ICON = <path d='M2 9l10-5 10 5-10 5L2 9zm5 3v5c0 1 2.2 2 5 2s5-1 5-2v-5' />
const HONOR_ICON = <path d='M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9L12 3z' />

export default function UserColleagueProfile({ colleague: c, posts = [], categories = [], icons = {}, index, digits, tone = 'bone' }) {
    const catLabel = Object.fromEntries(categories.map((x) => [x.key, x.t]))

    const body = (
        <div className='tm-profile'>
            <aside className='tm-side'>
                <Avatar m={c} />
                <span className='ab-pill'>{c.role}</span>
                {c.linkedin && <SocialLinkButton href={c.linkedin} label='پروفایل لینکدین' />}
            </aside>

            <div className='tm-main'>
                <UserSectionHead eyebrow={`${digits[index]} · ${c.field}`} title={c.name} subtitle={c.intro} />

                <div className='tm-bio'>
                    {c.bio.map((p) => <p key={p} className='ab-text'>{p}</p>)}
                </div>

                <div className='tm-cols'>
                    <TimelineList title='تحصیلات' icon={EDU_ICON} items={c.education} />
                    <TimelineList title='سوابق و افتخارات' icon={HONOR_ICON} items={c.honors} />
                </div>

                <div className='tm-posts-wrap'>
                    <h3 className='tm-posts-h'>مطالب نوشته‌شده توسط {c.name}</h3>
                    {posts.length === 0 ? (
                        <p className='tm-posts-empty'>هنوز مطلبی از این همکار منتشر نشده است.</p>
                    ) : (
                        <div className='ar'>
                            <div className='tm-posts'>
                                {posts.map((a) => (
                                    <BlogCard key={a.slug} article={a} categoryLabel={catLabel[a.cat]} icon={icons[a.cat]} />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )

    if (tone === 'navy') {
        return (
            <section id={c.slug} className='ab-full ab-panel ab-panel--navy'>
                <span className='ab-gridbg' />
                <span className={`ab-blob ab-blob--${index % 2 ? 2 : 1}`} />
                <div className='main-user-layout ab-inner'>{body}</div>
            </section>
        )
    }

    return (
        <div className='main-user-layout'>
            <section id={c.slug} className='ab-panel ab-panel--bone radius-md'>
                <span className='ab-blob ab-blob--gold' />
                {body}
            </section>
        </div>
    )
}
