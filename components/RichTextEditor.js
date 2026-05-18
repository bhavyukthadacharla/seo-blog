'use client'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { useEffect } from 'react'

export default function RichTextEditor({ value, onChange }) {
  const editor = useEditor({
    extensions: [StarterKit],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
  })

  useEffect(() => {
    if (editor && value === '') {
      editor.commands.clearContent()
    }
  }, [value, editor])

  if (!editor) return null

  return (
    <div className="border rounded mb-3 bg-white text-black">
      <div className="flex gap-1 p-2 border-b bg-gray-50 flex-wrap">
        <button
          type="button"
          onMouseDown={(e) => { e.preventDefault(); editor.chain().focus().toggleBold().run() }}
          className={`px-2 py-1 rounded text-sm font-bold ${editor.isActive('bold') ? 'bg-gray-300' : 'hover:bg-gray-200'}`}
        >
          B
        </button>
        <button
          type="button"
          onMouseDown={(e) => { e.preventDefault(); editor.chain().focus().toggleItalic().run() }}
          className={`px-2 py-1 rounded text-sm italic ${editor.isActive('italic') ? 'bg-gray-300' : 'hover:bg-gray-200'}`}
        >
          I
        </button>
        <button
          type="button"
          onMouseDown={(e) => { e.preventDefault(); editor.chain().focus().toggleHeading({ level: 2 }).run() }}
          className={`px-2 py-1 rounded text-sm font-semibold ${editor.isActive('heading', { level: 2 }) ? 'bg-gray-300' : 'hover:bg-gray-200'}`}
        >
          H2
        </button>
        <button
          type="button"
          onMouseDown={(e) => { e.preventDefault(); editor.chain().focus().toggleHeading({ level: 3 }).run() }}
          className={`px-2 py-1 rounded text-sm font-semibold ${editor.isActive('heading', { level: 3 }) ? 'bg-gray-300' : 'hover:bg-gray-200'}`}
        >
          H3
        </button>
        <button
          type="button"
          onMouseDown={(e) => { e.preventDefault(); editor.chain().focus().toggleBulletList().run() }}
          className={`px-2 py-1 rounded text-sm ${editor.isActive('bulletList') ? 'bg-gray-300' : 'hover:bg-gray-200'}`}
        >
          • List
        </button>
        <button
          type="button"
          onMouseDown={(e) => { e.preventDefault(); editor.chain().focus().toggleOrderedList().run() }}
          className={`px-2 py-1 rounded text-sm ${editor.isActive('orderedList') ? 'bg-gray-300' : 'hover:bg-gray-200'}`}
        >
          1. List
        </button>
        <button
          type="button"
          onMouseDown={(e) => { e.preventDefault(); editor.chain().focus().toggleBlockquote().run() }}
          className={`px-2 py-1 rounded text-sm ${editor.isActive('blockquote') ? 'bg-gray-300' : 'hover:bg-gray-200'}`}
        >
          Quote
        </button>
      </div>
      <EditorContent
        editor={editor}
        className="p-3 min-h-40 prose max-w-none"
      />
    </div>
  )
}