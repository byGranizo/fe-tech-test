import { toast } from 'sonner'
import { useBlog } from '@/hooks/useBlog'
import './DeleteModal.css'

interface DeleteModalProps {
  post: Post | null
  onClose: () => void
  onDelete?: () => void
}

export function DeleteModal(props: DeleteModalProps) {
  const { post, onClose, onDelete = () => {} } = props

  const { deletePost } = useBlog()

  async function handleDeletePost() {
    if (!post) return

    try {
      await deletePost(post.id)
      onDelete()
      toast.success('Post deleted', { position: 'top-right' })
    } catch (error) {
      toast.error('Error while deleting post', { position: 'top-right' })
    } finally {
      onClose()
    }
  }

  if (!post) return null

  return (
    <>
      <div className='modal-background' onClick={onClose} />
      <div className='modal-wrapper'>
        <div className='modal-container' role='dialog' aria-modal='true'>
          <div className='modal-header'>
            <h3>CONFIRM DELETION</h3>
          </div>
          <div className='modal-content'>
            <p className='modal-content__confirmation-text'>
              Are you sure you want to delete the following post?
            </p>
            <div className='modal-content__data'>
              <h2>FLEXBOX CSS & GRID</h2>
              <p className='small-text'>
                Posted on <span className='small-text--red'>14/01/2024</span>
              </p>
              <p className='small-text'>
                by <span className='small-text--red'>Pater (Collaborator)</span>
              </p>
            </div>
            <div className='modal-content__actions'>
              <button onClick={handleDeletePost}>Confirm delete</button>
              <button className='no-style' onClick={onClose}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
