import createPostIMG from '@/assets/Illustrations/write-post.png'

interface CreatePostProps {
  handleCreatePost: (title: string, content: string) => Promise<void>
}

export const CreatePost = (props: CreatePostProps) => {
  const { handleCreatePost } = props

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const titleElement = event.currentTarget.elements.namedItem('title') as HTMLInputElement
    const contentElement = event.currentTarget.elements.namedItem('content') as HTMLInputElement

    if (titleElement && contentElement) {
      const title = titleElement.value
      const content = contentElement.value

      handleCreatePost(title, content)
    }
  }

  return (
    <form className='create-post' onSubmit={handleSubmit}>
      <div className='create-post__head'>
        <div className='create-post__head-text'>
          <h1>Create a new post</h1>
          <div className='form-group'>
            <label htmlFor='title'>Title</label>
            <input id='title' type='text' required />
          </div>
        </div>
        <div className='create-post__head-image'>
          <img src={createPostIMG} alt='Create Post' />
        </div>
      </div>
      <div className='form-group'>
        <label htmlFor='content'>Content</label>
        <textarea id='content' rows={10} required></textarea>
      </div>
      <button type='submit'>Create post</button>
    </form>
  )
}
