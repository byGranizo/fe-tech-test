import { useState } from 'react'
import { toast } from 'sonner'
import { useBlog } from '@/hooks/useBlog'

import { DeleteModal } from '@/components'
import { HomeComponent } from './HomeComponent'
import { CreatePost } from './CreatePost'
import './Home.css'

export function Home() {
  const [isCreatingPost, setIsCreatingPost] = useState(false)

  const [postToDelete, setPostToDelete] = useState<Post | null>(null)

  const { addPost } = useBlog()

  function handleOpenCreatePostModal() {
    setIsCreatingPost(true)
  }

  function handleCloseDeleteModal() {
    setPostToDelete(null)
  }

  async function handleCreatePost(title: string, content: string) {
    const postData: PostToFetch = {
      title,
      content,
    }

    try {
      await addPost(postData)
      toast.success('Post created', { position: 'top-right' })
    } catch (error) {
      toast.error('Error while creating post', { position: 'top-right' })
    } finally {
      setIsCreatingPost(false)
    }
  }

  return (
    <>
      {isCreatingPost ? (
        <CreatePost handleCreatePost={handleCreatePost} />
      ) : (
        <HomeComponent
          openCreatePostModal={handleOpenCreatePostModal}
          setPostToDelete={setPostToDelete}
        />
      )}
      <DeleteModal post={postToDelete} onClose={handleCloseDeleteModal} />
    </>
  )
}
