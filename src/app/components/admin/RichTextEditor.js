'use client'

import React, { useEffect, useRef, useState } from 'react'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import TextAlign from '@tiptap/extension-text-align'
import Highlight from '@tiptap/extension-highlight'
import { TableKit } from '@tiptap/extension-table'
import { CharacterCount, Placeholder } from '@tiptap/extensions'
import FormatBold from '@mui/icons-material/FormatBold'
import FormatItalic from '@mui/icons-material/FormatItalic'
import FormatUnderlined from '@mui/icons-material/FormatUnderlined'
import StrikethroughS from '@mui/icons-material/StrikethroughS'
import FormatListBulleted from '@mui/icons-material/FormatListBulleted'
import FormatListNumbered from '@mui/icons-material/FormatListNumbered'
import FormatQuote from '@mui/icons-material/FormatQuote'
import Code from '@mui/icons-material/Code'
import DataObject from '@mui/icons-material/DataObject'
import HorizontalRule from '@mui/icons-material/HorizontalRule'
import InsertLink from '@mui/icons-material/InsertLink'
import LinkOff from '@mui/icons-material/LinkOff'
import ImageIcon from '@mui/icons-material/Image'
import TableChart from '@mui/icons-material/TableChart'
import FormatAlignRight from '@mui/icons-material/FormatAlignRight'
import FormatAlignCenter from '@mui/icons-material/FormatAlignCenter'
import FormatAlignLeft from '@mui/icons-material/FormatAlignLeft'
import FormatAlignJustify from '@mui/icons-material/FormatAlignJustify'
import Undo from '@mui/icons-material/Undo'
import Redo from '@mui/icons-material/Redo'
import FormatClear from '@mui/icons-material/FormatClear'
import BorderColor from '@mui/icons-material/BorderColor'
import { api, API_URL } from '@/app/utilities/api'
import '../../assets/styles/common/ArticleBody.scss'
import '../../assets/styles/components/admin/RichTextEditor.scss'

const MAX_IMAGE = 3 * 1024 * 1024
const ALIGNS = [['right', FormatAlignRight, 'راست‌چین'], ['center', FormatAlignCenter, 'وسط‌چین'], ['left', FormatAlignLeft, 'چپ‌چین'], ['justify', FormatAlignJustify, 'تراز دوطرفه']]
const EXTENSIONS = [
    StarterKit.configure({ heading: { levels: [2, 3, 4] }, link: { openOnClick: false, autolink: true, defaultProtocol: 'https' } }),
    Image.configure({ allowBase64: false }),
    TextAlign.configure({ types: ['heading', 'paragraph'], alignments: ['right', 'center', 'left', 'justify'], defaultAlignment: 'right' }),
    Highlight,
    TableKit.configure({ table: { resizable: false } }),
    Placeholder.configure({ placeholder: 'متن مقاله را اینجا بنویسید… برای ساخت فهرست مطالب از تیترهای H2 و H3 استفاده کنید.' }),
    CharacterCount,
]
const Btn = ({ icon: Icon, label, active, disabled, onClick, children }) => <button type='button' className={`rte-btn${active ? ' is-active' : ''}${children ? ' rte-btn--text' : ''}`} title={label} aria-label={label} aria-pressed={active ?? undefined} disabled={disabled} onMouseDown={(e) => e.preventDefault()} onClick={onClick}>{Icon ? <Icon fontSize='small' /> : children}</button>
const Sep = () => <span className='rte-sep' aria-hidden />

export default function RichTextEditor({ value, onChange, onError }) {
    const fileRef = useRef(null)
    const [uploading, setUploading] = useState(false)
    const [, refresh] = useState(0)
    const editor = useEditor({
        extensions: EXTENSIONS,
        content: value || '',
        immediatelyRender: false,
        editorProps: { attributes: { class: 'rte-content article-body', dir: 'rtl', spellcheck: 'false' } },
        onCreate: () => refresh((n) => n + 1),
        onTransaction: () => refresh((n) => n + 1),
        onUpdate: ({ editor: e }) => onChange(e.isEmpty ? '' : e.getHTML()),
    })

    useEffect(() => {
        if (editor && typeof value === 'string' && value !== editor.getHTML()) editor.commands.setContent(value, false)
    }, [editor, value])

    if (!editor) return <div className='rte rte--loading'>در حال آماده‌سازی ویرایشگر…</div>
    const chain = () => editor.chain().focus()
    const state = {
        bold: editor.isActive('bold'), italic: editor.isActive('italic'), underline: editor.isActive('underline'), strike: editor.isActive('strike'),
        highlight: editor.isActive('highlight'), code: editor.isActive('code'), codeBlock: editor.isActive('codeBlock'), quote: editor.isActive('blockquote'),
        bullet: editor.isActive('bulletList'), ordered: editor.isActive('orderedList'), link: editor.isActive('link'), inTable: editor.isActive('table'),
        block: editor.isActive('heading', { level: 2 }) ? '2' : editor.isActive('heading', { level: 3 }) ? '3' : editor.isActive('heading', { level: 4 }) ? '4' : 'p',
        align: ALIGNS.find(([a]) => editor.isActive({ textAlign: a }))?.[0] || 'right',
        canUndo: editor.can().undo(), canRedo: editor.can().redo(),
        words: editor.storage.characterCount.words(), chars: editor.storage.characterCount.characters(),
    }
    const headings = []
    editor.state.doc.descendants((node, pos) => { if (node.type.name === 'heading') headings.push({ level: node.attrs.level, text: node.textContent, pos }) })
    const setBlock = (v) => (v === 'p' ? chain().setParagraph().run() : chain().toggleHeading({ level: Number(v) }).run())
    const setLink = () => { const old = editor.getAttributes('link').href || ''; const input = window.prompt('آدرس لینک:', old); if (input === null) return; const url = input.trim(); if (!url) return chain().extendMarkRange('link').unsetLink().run(); chain().extendMarkRange('link').setLink({ href: /^(https?:|mailto:|tel:|\/|#)/i.test(url) ? url : `https://${url}` }).run() }
    const pickImage = async (e) => { const file = e.target.files?.[0]; e.target.value = ''; if (!file) return; if (file.size > MAX_IMAGE) return onError?.('حجم تصویر نباید بیشتر از ۳ مگابایت باشد'); setUploading(true); try { const fd = new FormData(); fd.append('file', file); const r = await api('/api/admin/uploads', { method: 'POST', formData: fd }); chain().setImage({ src: `${API_URL}${r.path}`, alt: window.prompt('متن جایگزین تصویر:', '') || '' }).run() } catch (err) { onError?.(err.message) } finally { setUploading(false) } }
    const jumpTo = (pos) => { const node = editor.view.nodeDOM(pos); node?.scrollIntoView({ behavior: 'smooth', block: 'center' }) }

    return <div className='rte-wrap'><div className='rte'><div className='rte-toolbar' role='toolbar' aria-label='ابزار ویرایش'><Btn icon={Undo} label='برگشت' disabled={!state.canUndo} onClick={() => chain().undo().run()} /><Btn icon={Redo} label='انجام دوباره' disabled={!state.canRedo} onClick={() => chain().redo().run()} /><Sep /><select className='rte-select' value={state.block} onChange={(e) => setBlock(e.target.value)}><option value='p'>متن معمولی</option><option value='2'>تیتر ۱ (H2)</option><option value='3'>تیتر ۲ (H3)</option><option value='4'>تیتر ۳ (H4)</option></select><Sep /><Btn icon={FormatBold} label='پررنگ' active={state.bold} onClick={() => chain().toggleBold().run()} /><Btn icon={FormatItalic} label='ایتالیک' active={state.italic} onClick={() => chain().toggleItalic().run()} /><Btn icon={FormatUnderlined} label='زیرخط' active={state.underline} onClick={() => chain().toggleUnderline().run()} /><Btn icon={StrikethroughS} label='خط‌خورده' active={state.strike} onClick={() => chain().toggleStrike().run()} /><Btn icon={BorderColor} label='هایلایت' active={state.highlight} onClick={() => chain().toggleHighlight().run()} /><Btn icon={Code} label='کد' active={state.code} onClick={() => chain().toggleCode().run()} /><Sep />{ALIGNS.map(([a, Icon, label]) => <Btn key={a} icon={Icon} label={label} active={state.align === a} onClick={() => chain().setTextAlign(a).run()} />)}<Sep /><Btn icon={FormatListBulleted} label='فهرست نقطه‌ای' active={state.bullet} onClick={() => chain().toggleBulletList().run()} /><Btn icon={FormatListNumbered} label='فهرست شماره‌دار' active={state.ordered} onClick={() => chain().toggleOrderedList().run()} /><Btn icon={FormatQuote} label='نقل‌قول' active={state.quote} onClick={() => chain().toggleBlockquote().run()} /><Btn icon={DataObject} label='بلوک کد' active={state.codeBlock} onClick={() => chain().toggleCodeBlock().run()} /><Btn icon={HorizontalRule} label='خط جداکننده' onClick={() => chain().setHorizontalRule().run()} /><Sep /><Btn icon={InsertLink} label='لینک' active={state.link} onClick={setLink} />{state.link && <Btn icon={LinkOff} label='حذف لینک' onClick={() => chain().extendMarkRange('link').unsetLink().run()} />}<Btn icon={ImageIcon} label='درج تصویر' disabled={uploading} onClick={() => fileRef.current?.click()} /><Btn icon={TableChart} label='درج جدول ۳×۳' disabled={state.inTable} onClick={() => chain().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()} /><Sep /><Btn icon={FormatClear} label='پاک کردن قالب‌بندی' onClick={() => chain().unsetAllMarks().clearNodes().run()} /><input ref={fileRef} type='file' accept='image/png,image/jpeg,image/webp' hidden onChange={pickImage} /></div>{state.inTable && <div className='rte-toolbar rte-toolbar--table'><Btn label='ستون قبل' onClick={() => chain().addColumnBefore().run()}>+ ستون قبل</Btn><Btn label='ستون بعد' onClick={() => chain().addColumnAfter().run()}>+ ستون بعد</Btn><Btn label='حذف ستون' onClick={() => chain().deleteColumn().run()}>− ستون</Btn><Sep /><Btn label='ردیف بالا' onClick={() => chain().addRowBefore().run()}>+ ردیف بالا</Btn><Btn label='ردیف پایین' onClick={() => chain().addRowAfter().run()}>+ ردیف پایین</Btn><Btn label='حذف ردیف' onClick={() => chain().deleteRow().run()}>− ردیف</Btn><Sep /><Btn label='ردیف عنوان' onClick={() => chain().toggleHeaderRow().run()}>ردیف عنوان</Btn><Btn label='ادغام/جداکردن' onClick={() => chain().mergeOrSplit().run()}>ادغام/جداکردن</Btn><Btn label='حذف جدول' onClick={() => chain().deleteTable().run()}><span className='text-danger'>حذف جدول</span></Btn></div>}<EditorContent editor={editor} /><div className='rte-footer'><span>{state.words.toLocaleString('fa-IR')} کلمه</span><span>{state.chars.toLocaleString('fa-IR')} کاراکتر</span><span>حدود {Math.max(1, Math.round(state.words / 200)).toLocaleString('fa-IR')} دقیقه مطالعه</span></div></div><aside className='rte-outline'><div className='rte-outline-title'>فهرست مطالب (خودکار)</div>{headings.length === 0 ? <p className='rte-outline-empty'>تیترهای H2/H3/H4 خودکار به فهرست مطالب اضافه می‌شوند.</p> : <ol>{headings.map((h, i) => <li key={`${h.pos}-${i}`} className={`lvl-${h.level}`}><button type='button' onClick={() => jumpTo(h.pos)}>{h.text || <em>(تیتر خالی)</em>}</button></li>)}</ol>}</aside></div>
}
