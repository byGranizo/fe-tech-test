import postIMG from '@/assets/Illustrations/img-post1.png'
import logo from '@/assets/Logos/logo-l.png'

import { useAuth } from '@/hooks/useAuth'
import { ADMIN_USERNAME } from '@/constants/auth'

interface PostComponentProps {
  post: Post
  handleDeletePost: () => void
}

export function PostComponent(props: PostComponentProps) {
  const { post, handleDeletePost } = props

  const { user } = useAuth()

  return (
    <div className='post'>
      <div className='post-head'>
        <div className='post-head__image'>
          <img src={postIMG} />
        </div>

        <div className='post-head__text'>
          <div className='post-head__text-site'>
            <img src={logo} />
            <h1>Front-end development blog</h1>
          </div>
          <div className='post-head__text-post'>
            <h2>{post.title}</h2>
            <p className='small-text'>
              <span className='small-text--red'>14/01/2024 by</span> Peter
            </p>
          </div>
        </div>
      </div>

      <div className='post-content'>
        <div className='post-content__extract-card'>
          <p>
            Today well dive into two powerful tools that have completely transformed the way we
            structure and present our projects: Flexbox and CSS Grid.
          </p>
        </div>
        <div className='post-content__text'>
          <p>{post.content}</p>
        </div>
      </div>

      <div className='post-footer'>
        {user!.username === ADMIN_USERNAME && (
          <button className='post-footer__delete-button' onClick={handleDeletePost}>
            Delete post
          </button>
        )}
      </div>
    </div>
  )
}
