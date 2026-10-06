'use client'

import React, { useRef, useState } from 'react'
import { EditorContent, useEditor, useEditorState } from '@tiptap/react'
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
import BorderColor from '@mui/icons-material/BorderColor'
import Code from '@mui/icons-material/Code'
import DataObject from '@mui/icons-material/DataObject'
import FormatQuote from '@mui/icons-material/FormatQuote'
import FormatListBulleted from '@mui/icons-material/FormatListBulleted'
import FormatListNumbered from '@mui/icons-material/FormatListNumbered'
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
function Btn({ icon: Icon, label, active, disabled, onClick, children }) { return <button type='button' className={`rte-btn${active ? ' is-active' : ''}${children ? ' rte-btn--text' : ''}`} title={label} aria-label={label} aria-pressed={active ?? undefined} disabled={disabled} onMouseDown={e => e.preventDefault()} onClick={onClick}>{Icon ? <Icon fontSize='small' /> : children}</button> }
const Sep = () => <span className='rte-sep' aria-hidden />

export default function RichTextEditor({ value, onChange, onError }) {
    const fileRef = useRef(null)
    const [uploading, setUploading] = useState(false)
    const editor = useEditor({ extensions: EXTENSIONS, content: value || '', immediatelyRender: false, editorProps: { attributes: { class: 'rte-content article-body', dir: 'rtl', spellcheck: 'false' } }, onUpdate: ({ editor: e }) => onChange(e.isEmpty ? '' : e.getHTML()) })
    const s = useEditorState({ editor, selector: ({ editor: e }) => { if (!e) return null; const headings = []; e.state.doc.descendants((node, pos) => { if (node.type.name === 'heading') { headings.push({ level: node.attrs.level, text: node.textContent, pos }); return false } return true }); return { bold: e.isActive('bold'), italic: e.isActive('italic'), underline: e.isActive('underline'), strike: e.isActive('strike'), highlight: e.isActive('highlight'), code: e.isActive('code'), codeBlock: e.isActive('codeBlock'), quote: e.isActive('blockquote'), bullet: e.isActive('bulletList'), ordered: e.isActive('orderedList'), link: e.isActive('link'), inTable: e.isActive('table'), block: e.isActive('heading', { level: 2 }) ? '2' : e.isActive('heading', { level: 3 }) ? '3' : e.isActive('heading', { level: 4 }) ? '4' : 'p', align: ALIGNS.find(([a]) => e.isActive({ textAlign: a }))?.[0] || 'right', canUndo: e.can().undo(), canRedo: e.can().redo(), words: e.storage.characterCount.words(), chars: e.storage.characterCount.characters(), headings } } })
    if (!editor || !s) return <div className='rte rte--loading'>در حال آماده‌سازی ویرایشگر…</div>
    const chain = () => editor.chain().focus()
    const setBlock = v => (v === 'p' ? chain().setParagraph().run() : chain().toggleHeading({ level: Number(v) }).run())
    const setLink = () => { const prev = editor.getAttributes('link').href || ''; const input = window.prompt('آدرس لینک (برای حذف لینک خالی بگذارید):', prev); if (input === null) return; const url = input.trim(); if (!url) return chain().extendMarkRange('link').unsetLink().run(); const href = /^(https?:|mailto:|tel:|\/|#)/i.test(url) ? url : `https://${url}`; chain().extendMarkRange('link').setLink({ href }).run() }
    const pickImage = async e => { const file = e.target.files?.[0]; e.target.value = ''; if (!file) return; if (file.size > MAX_IMAGE) return onError?.('حجم تصویر نباید بیشتر از ۳ مگابایت باشد'); setUploading(true); try { const fd = new FormData(); fd.append('file', file); const r = await api('/api/admin/uploads', { method: 'POST', formData: fd }); const alt = window.prompt('متن جایگزین تصویر:', '') || ''; chain().setImage({ src: `${API_URL}${r.path}`, alt }).run() } catch (err) { onError?.(err.message) } finally { setUploading(false) } }
    const jumpTo = pos => { chain().setTextSelection(pos + 1).scrollIntoView().run(); const dom = editor.view.nodeDOM(pos); if (dom?.scrollIntoView) dom.scrollIntoView({ behavior: 'smooth', block: 'center' }) }
    return <div className='rte-wrap'><div className='rte'><div className='rte-toolbar' role='toolbar' aria-label='ابزار ویرایش'><Btn icon={Undo} label='برگشت' disabled={!s.canUndo} onClick={() => chain().undo().run()} /><Btn icon={Redo} label='انجام دوباره' disabled={!s.canRedo} onClick={() => chain().redo().run()} /><Sep /><select className='rte-select' value={s.block} onChange={e => setBlock(e.target.value)} aria-label='نوع متن'><option value='p'>متن معمولی</option><option value='2'>تیتر ۱ (H2)</option><option value='3'>تیتر ۲ (H3)</option><option value='4'>تیتر ۳ (H4)</option></select><Sep /><Btn icon={FormatBold} label='پررنگ' active={s.bold} onClick={() => chain().toggleBold().run()} /><Btn icon={FormatItalic} label='ایتالیک' active={s.italic} onClick={() => chain().toggleItalic().run()} /><Btn icon={FormatUnderlined} label='زیرخط' active={s.underline} onClick={() => chain().toggleUnderline().run()} /><Btn icon={StrikethroughS} label='خط‌خورده' active={s.strike} onClick={() => chain().toggleStrike().run()} /><Btn icon={BorderColor} label='هایلایت' active={s.highlight} onClick={() => chain().toggleHighlight().run()} /><Btn icon={Code} label='کد درون‌خطی' active={s.code} onClick={() => chain().toggleCode().run()} /><Sep />{ALIGNS.map(([a, Icon, label]) => <Btn key={a} icon={Icon} label={label} active={s.align === a} onClick={() => chain().setTextAlign(a).run()} />)}<Sep /><Btn icon={FormatListBulleted} label='فهرست نقطه‌ای' active={s.bullet} onClick={() => chain().toggleBulletList().run()} /><Btn icon={FormatListNumbered} label='فهرست شماره‌دار' active={s.ordered} onClick={() => chain().toggleOrderedList().run()} /><Btn icon={FormatQuote} label='نقل‌قول' active={s.quote} onClick={() => chain().toggleBlockquote().run()} /><Btn icon={DataObject} label='بلوک کد' active={s.codeBlock} onClick={() => chain().toggleCodeBlock().run()} /><Btn icon={HorizontalRule} label='خط جداکننده' onClick={() => chain().setHorizontalRule().run()} /><Sep /><Btn icon={InsertLink} label='لینک' active={s.link} onClick={setLink} />{s.link && <Btn icon={LinkOff} label='حذف لینک' onClick={() => chain().extendMarkRange('link').unsetLink().run()} />}<Btn icon={ImageIcon} label={uploading ? 'در حال آپلود…' : 'درج تصویر'} disabled={uploading} onClick={() => fileRef.current?.click()} /><Btn icon={TableChart} label='درج جدول ۳×۳' disabled={s.inTable} onClick={() => chain().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()} /><Sep /><Btn icon={FormatClear} label='پاک کردن قالب‌بندی' onClick={() => chain().unsetAllMarks().clearNodes().run()} /><input ref={fileRef} type='file' accept='image/png,image/jpeg,image/webp' hidden onChange={pickImage} /></div>{s.inTable && <div className='rte-toolbar rte-toolbar--table'><span className='rte-label'>جدول:</span><Btn label='ستون قبل' onClick={() => chain().addColumnBefore().run()}>+ ستون قبل</Btn><Btn label='ستون بعد' onClick={() => chain().addColumnAfter().run()}>+ ستون بعد</Btn><Btn label='حذف ستون' onClick={() => chain().deleteColumn().run()}>− ستون</Btn><Sep /><Btn label='ردیف بالا' onClick={() => chain().addRowBefore().run()}>+ ردیف بالا</Btn><Btn label='ردیف پایین' onClick={() => chain().addRowAfter().run()}>+ ردیف پایین</Btn><Btn label='حذف ردیف' onClick={() => chain().deleteRow().run()}>− ردیف</Btn><Sep /><Btn label='ردیف عنوان' onClick={() => chain().toggleHeaderRow().run()}>ردیف عنوان</Btn><Btn label='ادغام/جداکردن خانه‌ها' onClick={() => chain().mergeOrSplit().run()}>ادغام/جداکردن</Btn><Btn label='حذف جدول' onClick={() => chain().deleteTable().run()}><span className='text-danger'>حذف جدول</span></Btn></div>}<EditorContent editor={editor} /><div className='rte-footer'><span>{s.words.toLocaleString('fa-IR')} کلمه</span><span>{s.chars.toLocaleString('fa-IR')} کاراکتر</span><span>حدود {Math.max(1, Math.round(s.words / 200)).toLocaleString('fa-IR')} دقیقه مطالعه</span></div></div><aside className='rte-outline'><div className='rte-outline-title'>فهرست مطالب (خودکار)</div>{s.headings.length===0?<p className='rte-outline-empty'>تیترهای H2/H3/H4 خودکار به فهرست مطالب مقاله اضافه می‌شوند.</p>:<ol>{s.headings.map((h,i)=><li key={`${h.pos}-${i}`} className={`lvl-${h.level}`}><button type='button' onClick={() => jumpTo(h.pos)}>{h.text || <em>(تیتر خالی)</em>}</button></li>)}</ol>}</aside></div>
}
