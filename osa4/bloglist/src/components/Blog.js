

const Blog = ( {blog, blogs} ) => {
    /* const addLike = (id) => {
      var liked = blogs.find(x => x.id === id)
      console.log(liked)
      blogsService
      .replace(liked.likes, 4)
      .then(() => blogsService
      .getAll()
      )
    } */
    return <div>Title: {blog.title} <br/> Author: {blog.author}<br/> URL: {blog.url} <br/> Likes: {blog.likes}<br/><br/></div>
  }

export default Blog