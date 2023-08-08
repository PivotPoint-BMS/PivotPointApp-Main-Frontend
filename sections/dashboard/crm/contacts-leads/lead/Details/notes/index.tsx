import { useCallback, useRef, useState } from "react"
import clsx from "clsx"
// hooks
import useTranslate from "hooks/useTranslate"
import useSnackbar from "hooks/useSnackbar"
import { useAppSelector } from "store/hooks"
// apis
import {
  useCreateNoteMutation,
  useEditNoteMutation,
  useGetLeadNotesQuery,
} from "store/api/crm/contact-leads/leadApis"
// types
import { Note } from "types"
// rich text editor
import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import ListItem from "@tiptap/extension-list-item"
import TextStyle from "@tiptap/extension-text-style"
import Underline from "@tiptap/extension-underline"
import BulletList from "@tiptap/extension-bullet-list"
import Link from "@tiptap/extension-link"
import Image from "@tiptap/extension-image"
import Dropcursor from "@tiptap/extension-dropcursor"
import Placeholder from "@tiptap/extension-placeholder"
// components
import { Icon as Iconify } from "@iconify/react"
import { CardContent, IconButton, Button, LoadingIndicator } from "components"
import NoteCard from "./NoteCard"

export default function Notes({ leadId }: { leadId: string }) {
  const { t } = useTranslate()
  const { open } = useSnackbar()
  const inputRef = useRef<HTMLInputElement>(null)
  const { PageNumber, PageSize } = useAppSelector((state) => state.pagination)

  const [noteTitle, setNoteTitle] = useState("")
  const [noteToEdit, setNoteToEdit] = useState<Note | null>(null)

  // Queries
  const { data, isLoading, isSuccess } = useGetLeadNotesQuery({ id: leadId, PageNumber, PageSize })
  // Mutation
  const [createNote, { isLoading: isCreateLoading }] = useCreateNoteMutation()
  const [editNote, { isLoading: isEditLoading }] = useEditNoteMutation()

  const editor = useEditor({
    extensions: [
      Placeholder.configure({
        emptyEditorClass: "is-editor-empty",
        placeholder: t("Note description"),
      }),
      Underline.configure({
        HTMLAttributes: {
          class: "underline",
        },
      }),
      BulletList.configure({
        HTMLAttributes: {
          class: "list-disc",
        },
      }),
      TextStyle.configure({ [ListItem.name]: ListItem.config }),
      Link.configure({
        protocols: ["ftp", "mailto"],
      }),
      Image,
      Dropcursor,
      StarterKit.configure({
        bulletList: {
          keepMarks: true,
          keepAttributes: false,
        },
        orderedList: {
          keepMarks: true,
          keepAttributes: false,
        },
      }),
    ],
    content: "",
  })

  const setLink = useCallback(() => {
    if (typeof window !== "undefined") {
      const previousUrl = editor?.getAttributes("link").href
      const url = window.prompt("URL", previousUrl)

      // cancelled
      if (url === null) {
        return
      }

      // empty
      if (url === "") {
        editor?.chain().focus().extendMarkRange("link").unsetLink().run()

        return
      }

      // update link
      editor?.chain().focus().extendMarkRange("link").setLink({ href: url }).run()
    }
  }, [editor])

  const addImage = useCallback(() => {
    if (typeof window !== "undefined") {
      const url = window.prompt("URL")

      if (url) {
        editor?.chain().focus().setImage({ src: url }).run()
      }
    }
  }, [editor])

  return (
    <CardContent className='h-full'>
      <h1 className='mb-4 text-lg font-medium'>{t("Add new note")}</h1>
      <div className='mb-4 flex w-full flex-col overflow-hidden rounded-lg border'>
        <input
          className='mb-2 bg-transparent px-3 py-2 text-lg font-bold outline-none'
          placeholder={t("Note Title")}
          value={noteTitle}
          onChange={(e) => setNoteTitle(e.target.value)}
          ref={inputRef}
        />
        <EditorContent editor={editor} className='min-h-[100px] px-3 outline-none' />
        <div className='flex w-full justify-between border-t px-3 py-2'>
          <div className='flex items-center gap-1'>
            <IconButton
              className={clsx(
                "rounded-lg",
                editor?.isActive("orderedList") && "bg-gray-200 dark:bg-paper-dark-contrast"
              )}
              onClick={() => editor?.chain().focus().toggleOrderedList().run()}
              disabled={!editor?.can().chain().focus().toggleOrderedList().run()}
            >
              <Iconify icon='material-symbols:format-list-numbered' height={20} />
            </IconButton>
            <IconButton
              className={clsx(
                "rounded-lg",
                editor?.isActive("bulletList") && "bg-gray-200 dark:bg-paper-dark-contrast"
              )}
              onClick={() => editor?.chain().focus().toggleBulletList().run()}
              disabled={!editor?.can().chain().focus().toggleBulletList().run()}
            >
              <Iconify icon='material-symbols:format-list-bulleted' height={20} />
            </IconButton>
            <div className='h-full w-px bg-gray-200 dark:bg-paper-dark-contrast'></div>
            <IconButton
              className={clsx(
                "rounded-lg",
                editor?.isActive("bold") && "bg-gray-200 dark:bg-paper-dark-contrast"
              )}
              onClick={() => editor?.chain().focus().toggleBold().run()}
              disabled={!editor?.can().chain().focus().toggleBold().run()}
            >
              <Iconify icon='material-symbols:format-bold-rounded' height={20} />
            </IconButton>
            <IconButton
              className={clsx(
                "rounded-lg",
                editor?.isActive("italic") && "bg-gray-200 dark:bg-paper-dark-contrast"
              )}
              onClick={() => editor?.chain().focus().toggleItalic().run()}
              disabled={!editor?.can().chain().focus().toggleItalic().run()}
            >
              <Iconify icon='material-symbols:format-italic-rounded' height={20} />
            </IconButton>
            <IconButton
              className={clsx(
                "rounded-lg",
                editor?.isActive("underline") && "bg-gray-200 dark:bg-paper-dark-contrast"
              )}
              onClick={() => editor?.chain().focus().toggleUnderline().run()}
              disabled={!editor?.can().chain().focus().toggleUnderline().run()}
            >
              <Iconify icon='material-symbols:format-underlined-rounded' height={20} />
            </IconButton>
            <IconButton
              className={clsx(
                "rounded-lg",
                editor?.isActive("strike") && "bg-gray-200 dark:bg-paper-dark-contrast"
              )}
              onClick={() => editor?.chain().focus().toggleStrike().run()}
              disabled={!editor?.can().chain().focus().toggleStrike().run()}
            >
              <Iconify icon='material-symbols:strikethrough-s-rounded' height={20} />
            </IconButton>
            <IconButton onClick={setLink}>
              <Iconify icon='material-symbols:link-rounded' height={20} />
            </IconButton>
            <div className='h-full w-px bg-gray-200 dark:bg-paper-dark-contrast'></div>
            <IconButton
              onClick={addImage}
              disabled={!editor?.can().chain().focus().setImage({ src: "" }).run()}
            >
              <Iconify icon='material-symbols:image-outline-rounded' height={20} />
            </IconButton>
          </div>
          <Button
            onClick={() => {
              if (editor && noteTitle !== "" && editor.getHTML() !== "")
                if (noteToEdit)
                  editNote({
                    id: noteToEdit.id,
                    leadId,
                    data: { ...noteToEdit, note: editor.getHTML(), noteTitle },
                    PageNumber,
                    PageSize,
                  })
                    .then(() => {
                      open({ message: t("Note Updated."), type: "success" })
                      setNoteTitle("")
                      setNoteToEdit(null)
                      editor.commands.clearContent()
                    })
                    .catch(() =>
                      open({
                        message: t("A problem has occured, note not updated."),
                        type: "error",
                      })
                    )
                else
                  createNote({
                    id: leadId,
                    data: { note: editor.getHTML(), noteTitle },
                    PageNumber,
                    PageSize,
                  }).then(() => {
                    open({ message: t("Note Added."), type: "success" })
                    setNoteTitle("")
                    editor.commands.clearContent()
                  })
            }}
            loading={isCreateLoading || isEditLoading}
          >
            {noteToEdit ? t("Edit Note") : t("Add Note")}
          </Button>
        </div>
      </div>
      {isLoading && (
        <div className='flex h-56 w-full items-center justify-center'>
          <LoadingIndicator />
        </div>
      )}
      <div className='space-y-2'>
        {isSuccess &&
          data.data.length > 0 &&
          data.data.map((note, i) => (
            <NoteCard
              key={i}
              note={note}
              leadId={leadId}
              setNoteToEdit={(_noteToEdit) => {
                if (editor && inputRef.current) {
                  setNoteTitle(_noteToEdit.noteTitle)
                  editor.commands.setContent(_noteToEdit.note)
                  setNoteToEdit(_noteToEdit)
                  inputRef.current.focus()
                }
              }}
            />
          ))}
      </div>
    </CardContent>
  )
}
