interface Post {
  id: number
  title: string
  content: string
  author_username: string
}

type PostToFetch = Omit<Post, 'id' | 'author_username'>

interface BlogStore {
  posts: Post[]
  loading: boolean
  fetchPosts: () => Promise<void>
  addPost: (postData: PostToFetch) => Promise<void>
  deletePost: (id: number) => Promise<void>
  getPostById: (id: number) => Post | undefined
  reset: () => void
}
