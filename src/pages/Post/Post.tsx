import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useBlog } from '@/hooks/useBlog'
import { DeleteModal } from '@/components'
import { PostComponent } from './PostComponent'
import './Post.css'

export function Post() {
  const { postId } = useParams()
  const [isDeletingPost, setIsDeletingPost] = useState(false)
  const [post, setPost] = useState<Post | null>(null)

  const navigate = useNavigate()

  const { getPostById } = useBlog()

  useEffect(() => {
    if (!postId) return

    const postToShow = getPostById(Number(postId))

    if (!postToShow) return

    setPost(postToShow)
  }, [postId, getPostById])

  function handleClickDeletePost() {
    setIsDeletingPost(true)
  }

  function handleCloseDeleteModal() {
    setIsDeletingPost(false)
  }

  function handleDeletePost() {
    navigate('/', { replace: true })
  }

  if (!post) return null

  return (
    <>
      <PostComponent post={post} handleDeletePost={handleClickDeletePost} />
      <DeleteModal
        post={isDeletingPost ? post : null}
        onClose={handleCloseDeleteModal}
        onDelete={handleDeletePost}
      />
    </>
  )
}
