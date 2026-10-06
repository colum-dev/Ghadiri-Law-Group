import React from 'react'
import Link from 'next/link'
import AuthorBadge from '@/app/components/user/avatar/AuthorBadge'
export default function BlogCard({article,categoryLabel,featured=false}){const {slug,title,excerpt,date,read,author}=article;const Title=featured?'h2':'h3';return <Link href={`/articles/${slug}`} className={`ar-card${featured?' ar-card--feat':''} hover-to-background-navy bg-bone border border-1`}><span className='ar-tag'>{categoryLabel}</span><Title>{title}</Title><p>{excerpt}</p>{author&&<AuthorBadge name={author}/>}<div className='ar-meta'><span>{date}</span><i/><span>{read} دقیقه مطالعه</span></div></Link>}
