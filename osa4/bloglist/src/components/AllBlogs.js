import Blog from './Blog'

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
  var plokit = blogs.map(plog => <Blog key={plog.id} blog = {plog} blogs = {blogs} sortBlogsbyLikes={sortBlogsbyLikes} setErrorMessage={setErrorMessage} setBlogs={setBlogs} user={user}/>)
  return (plokit)
}

export default AllBlogs