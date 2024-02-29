import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useBlog } from '@/hooks/useBlog'
import { useAuth } from '@/hooks/useAuth'

import { ADMIN_USERNAME } from '@/constants/auth'
import { PAGE_SIZE } from '@/constants/blog'

import homeIMG from '@/assets/Illustrations/home.png'
import articleIMG from '@/assets/Illustrations/img-post1.png'
import deleteIcon from '@/assets/Icons/delete.png'
import logo from '@/assets/Logos/logo-l.png'

interface HomeComponentProps {
  setPostToDelete: (post: Post) => void
  openCreatePostModal: () => void
}

export function HomeComponent(props: HomeComponentProps) {
  const { setPostToDelete, openCreatePostModal } = props

  const navigate = useNavigate()

  const { posts, fetchPosts } = useBlog()
  const { user } = useAuth()

  const [numberOfPages, setNumberOfPages] = useState(1)
  const [currentPage, setCurrentPage] = useState(1)
  const [postsToShow, setPostsToShow] = useState<Post[]>([])
  const [pagesToShow, setPagesToShow] = useState<number[]>([])

  useEffect(() => {
    fetchPosts()
  }, [])

  useEffect(() => {
    setNumberOfPages(Math.ceil(posts.length / PAGE_SIZE))
  }, [posts])

  useEffect(() => {
    postPagings()

    paginationShow()
  }, [currentPage, posts])

  function postPagings() {
    const start = (currentPage - 1) * PAGE_SIZE
    const end = start + PAGE_SIZE
    setPostsToShow(posts.slice(start, end))
  }

  function paginationShow() {
    let startPage = currentPage - 1
    let endPage = currentPage + 1

    if (currentPage === 1) {
      startPage = currentPage
      endPage = currentPage + 2
    }

    if (currentPage === numberOfPages) {
      startPage = currentPage - 2
      endPage = currentPage
    }

    const pages = []
    for (let i = startPage; i <= endPage; i++) {
      if (i > 0 && i <= numberOfPages) {
        pages.push(i)
      }
    }
    setPagesToShow(pages)
  }

  function handlePostClick(event: React.MouseEvent<HTMLElement, MouseEvent>, post: Post) {
    event.preventDefault()
    event.stopPropagation()
    console.log('post', post)
    navigate(`/post/${post.id}`)
  }

  function handleClickDeleteButton(event: React.MouseEvent<HTMLElement, MouseEvent>, post: Post) {
    event.preventDefault()
    event.stopPropagation()
    setPostToDelete(post)
  }

  return (
    <div className='home'>
      <section className='home-head'>
        <div className='home-head__img'>
          <img src={homeIMG} />
        </div>
        <div className='home-head__text'>
          <img src={logo} />
          <h1>Front-end development blog</h1>
          <p>
            Stay up to date with the latest trends, best practices and the most innovative tools
            that bring the face of the web to life. It's time to enjoy and learn!
          </p>
        </div>
      </section>
      <section className='home-content'>
        {postsToShow.map((post) => (
          <article className='article-prev' key={post.id} onClick={(e) => handlePostClick(e, post)}>
            <div className='article-prev__text'>
              <h2>{post.title}</h2>
              <p className='small-text'>
                <span className='small-text--red'>14/01/2024 by</span> {post.author_username}
              </p>
              <p className='article-prev__extract'>{post.content.slice(0, 100) + '...'}</p>
            </div>
            <div className='article-prev__img'>
              <img src={articleIMG} />
            </div>
            {user!.username === ADMIN_USERNAME && (
              <button
                className='article-prev__delete-button'
                onClick={(e) => {
                  handleClickDeleteButton(e, post)
                }}
              >
                <img src={deleteIcon} />
              </button>
            )}
          </article>
        ))}
      </section>
      <section className='home-footer'>
        <button className='home-footer__create-button' onClick={openCreatePostModal}>
          CREATE NEW POST
        </button>

        <div className='home-footer__subgroup'>
          <div className='home-footer__pagination-controls'>
            <button
              className='no-style'
              disabled={currentPage === 1}
              onClick={() => {
                setCurrentPage(1)
              }}
            >
              ⟪
            </button>
            <button
              className='no-style'
              disabled={currentPage === 1}
              onClick={() => {
                setCurrentPage((prev) => prev - 1)
              }}
            >
              ⟨
            </button>
          </div>
          <div className='home-footer__pagination'>
            {pagesToShow.map((page) => (
              <button
                key={page}
                className={page === currentPage ? '' : 'button--inactive'}
                onClick={() => {
                  setCurrentPage(page)
                }}
              >
                {page}
              </button>
            ))}
          </div>
          <div className='home-footer__pagination-controls'>
            <button
              className='no-style'
              disabled={currentPage === numberOfPages}
              onClick={() => {
                setCurrentPage((prev) => prev + 1)
              }}
            >
              ⟩
            </button>
            <button
              className='no-style'
              disabled={currentPage === numberOfPages}
              onClick={() => {
                setCurrentPage(numberOfPages)
              }}
            >
              ⟫
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
