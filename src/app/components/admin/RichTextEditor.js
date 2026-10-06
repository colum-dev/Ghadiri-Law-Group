'use client'

import React, { useMemo, useRef, useState } from 'react'
import { Editor } from '@tinymce/tinymce-react'
import 'tinymce/tinymce'
import 'tinymce/icons/default'
import 'tinymce/themes/silver'
import 'tinymce/models/dom'
import 'tinymce/plugins/advlist'
import 'tinymce/plugins/autolink'
import 'tinymce/plugins/code'
import 'tinymce/plugins/codesample'
import 'tinymce/plugins/emoticons'
import 'tinymce/plugins/image'
import 'tinymce/plugins/link'
import 'tinymce/plugins/lists'
import 'tinymce/plugins/media'
import 'tinymce/plugins/searchreplace'
import 'tinymce/plugins/table'
import 'tinymce/plugins/wordcount'
import { api, API_URL } from '@/app/utilities/api'
import '../../assets/styles/common/ArticleBody.scss'
import '../../assets/styles/components/admin/RichTextEditor.scss'

const MAX_IMAGE = 3 * 1024 * 1024
const PLUGINS = 'advlist autolink code codesample emoticons image link lists media searchreplace table wordcount'
const TOOLBAR = [
    'undo redo | blocks | bold italic underline strikethrough | forecolor backcolor',
    'alignright aligncenter alignleft alignjustify | bullist numlist outdent indent | blockquote codesample',
    'link image media table | hr removeformat code',
].join(' ')

function getHeadings(html) {
    const result = []
    const used = new Map()
    const source = html || ''
    source.replace(/<h([2-4])(?:\s[^>]*)?>([\s\S]*?)<\/h\1>/gi, (_match, level, raw) => {
        const text = raw.replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').trim()
        if (!text) return _match
        const base = text.toLowerCase().replace(/[^\p{L}\p{N}]+/gu, '-').replace(/^-|-$/g, '') || 'section'
        const index = used.get(base) || 0
        used.set(base, index + 1)
        result.push({ level: Number(level), text, id: index ? `${base}-${index + 1}` : base })
        return _match
    })
    return result
}

function addTocIds(html) {
    const used = new Map()
    return (html || '').replace(/<h([2-4])((?:\s[^>]*)?)>([\s\S]*?)<\/h\1>/gi, (match, level, attrs, inner) => {
        const text = inner.replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ').trim()
        if (!text) return match
        const base = text.toLowerCase().replace(/[^\p{L}\p{N}]+/gu, '-').replace(/^-|-$/g, '') || 'section'
        const index = used.get(base) || 0
        used.set(base, index + 1)
        const id = index ? `${base}-${index + 1}` : base
        const cleaned = attrs.replace(/\s+id=(['"]).*?\1/gi, '')
        return `<h${level}${cleaned} id="${id}">${inner}</h${level}>`
    })
}

export default function RichTextEditor({ value, onChange, onError }) {
    const editorRef = useRef(null)
    const [uploading, setUploading] = useState(false)
    const headings = useMemo(() => getHeadings(value), [value])

    const uploadImage = async (blobInfo, progress) => {
        const file = blobInfo.blob()
        if (file.size > MAX_IMAGE) throw new Error('حجم تصویر نباید بیشتر از ۳ مگابایت باشد')
        setUploading(true)
        try {
            const formData = new FormData()
            formData.append('file', file, blobInfo.filename())
            const uploaded = await api('/api/admin/uploads', { method: 'POST', formData })
            progress?.(100)
            return `${API_URL}${uploaded.path}`
        } catch (error) {
            onError?.(error.message)
            throw error
        } finally {
            setUploading(false)
        }
    }

    const focusHeading = (heading) => {
        const editor = editorRef.current
        if (!editor) return
        const node = editor.getBody().querySelector(`#${CSS.escape(heading.id)}`)
        node?.scrollIntoView({ behavior: 'smooth', block: 'center' })
        if (node) editor.selection.select(node, true)
    }

    return (
        <div className='rte-wrap rte-wrap--tinymce'>
            <div className='rte rte--tinymce'>
                <Editor
                    onInit={(_event, editor) => { editorRef.current = editor }}
                    initialValue={value || ''}
                    onEditorChange={(html) => onChange(addTocIds(html))}
                    init={{
                        license_key: 'gpl',
                        height: 620,
                        menubar: 'file edit view insert format tools table help',
                        plugins: PLUGINS,
                        toolbar: TOOLBAR,
                        directionality: 'rtl',
                        language: 'fa',
                        language_url: '/tinymce/langs/fa.js',
                        branding: false,
                        promotion: false,
                        resize: true,
                        statusbar: true,
                        elementpath: false,
                        browser_spellcheck: true,
                        content_css: false,
                        content_style: `body { font-family: YekanBakh, Tahoma, sans-serif; font-size: 16px; line-height: 2; padding: 1rem 1.5rem; color: #1d2433; } h2,h3,h4 { color: #0f1e36; scroll-margin-top: 100px; } table { width: 100%; border-collapse: collapse; } th,td { border: 1px solid #e4ddd0; padding: 8px; } th { background: #0f1e36; color: white; } blockquote { border-right: 4px solid #b8955a; padding: 8px 16px; background: #f7f3ec; } img { max-width: 100%; height: auto; }`,
                        images_upload_handler: uploadImage,
                        automatic_uploads: true,
                        image_advtab: true,
                        image_caption: true,
                        table_default_attributes: { border: '1' },
                        table_default_styles: { width: '100%' },
                        block_formats: 'متن معمولی=p; تیتر ۱=h2; تیتر ۲=h3; تیتر ۳=h4; نقل‌قول=blockquote; کد=pre',
                        setup: (editor) => {
                            editor.on('init', () => editor.setContent(addTocIds(value || '')))
                        },
                    }}
                />
                {uploading && <div className='rte-uploading'>در حال آپلود تصویر…</div>}
                <div className='rte-footer'><span>ویرایشگر TinyMCE</span><span>تیترهای H2/H3/H4 فهرست مطالب را خودکار می‌سازند</span></div>
            </div>
            <aside className='rte-outline'>
                <div className='rte-outline-title'>فهرست مطالب (خودکار)</div>
                {headings.length === 0 ? <p className='rte-outline-empty'>برای ساخت فهرست مطالب، تیترهای H2 و H3 بنویسید.</p> : <ol>{headings.map((heading, index) => <li key={`${heading.id}-${index}`} className={`lvl-${heading.level}`}><button type='button' onClick={() => focusHeading(heading)}>{heading.text}</button></li>)}</ol>}
            </aside>
        </div>
    )
}
