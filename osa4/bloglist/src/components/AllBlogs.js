import Blog from './Blog'
import blogsService from '../services/blogs'

const AllBlogs = ( { blogs, setBlogs, setErrorMessage, user } ) => {
  const sortBlogsbyLikes = (unsortedBlogs) => {
    const sorted = [...unsortedBlogs].sort((a, b) => {
      return b.likes-a.likes
    })
    setBlogs(sorted)
  }

  return (
    <Blogs blogs = {blogs} sortBlogsbyLikes={sortBlogsbyLikes} setErrorMessage={setErrorMessage} setBlogs={setBlogs} user={user}/>
  )
}

const Blogs = ( { blogs, setBlogs, sortBlogsbyLikes, setErrorMessage, user } ) => {
  const toggleShow = async (id) => {
    var toggled= blogs.find(x => x.id === id)
    toggled.show = !toggled.show

    await blogsService.replace(id, toggled)

    const updateBlogs = await blogsService.getAll()
    sortBlogsbyLikes(updateBlogs)
  }
  const addLike = async (id) => {
    var liked = blogs.find(x => x.id === id)
    liked.likes = liked.likes + 1

    await blogsService.replace(id, liked)

    const updateBlogs = await blogsService.getAll()
    sortBlogsbyLikes(updateBlogs)
  }

  var plokit = blogs.map(plog => <Blog key={plog.id} blog = {plog} blogs = {blogs}
    sortBlogsbyLikes={sortBlogsbyLikes} setErrorMessage={setErrorMessage} setBlogs={setBlogs}
    user={user} toggleShow={toggleShow} addLike={addLike}/>)
  return (plokit)
}

export default AllBlogs