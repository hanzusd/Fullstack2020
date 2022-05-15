const dummy = (blogs) => {
    return (1)
  }

  const totalLikes = (blogs) => {
      const amount = blogs.length
      if(amount===0) {
          return (0)
      }
      if(amount===1) {
          return (blogs[0].likes)
      }
      if (amount > 1) {
        var allLikes = 0
          blogs.forEach(blog => {
              allLikes = allLikes + blog.likes
          });
          return (allLikes)
      }
  }

  const favouriteBlog = (blogs) => {
      var likedBlog = blogs[0]
      blogs.forEach(blog => {
          if (blog.likes > likedBlog.likes) {
              likedBlog = blog
          }
      });
      return(likedBlog)
  }

  const mostBlogs = (blogs) => {
    var blogsByAuthor = {}

    for (let i = 0; i < blogs.length; i++) {
        var currentAuthor = blogs[i].author
        if (blogsByAuthor.length===0) {
            var toBeAdded = {author: currentAuthor, blogs: 1}
            blogsByAuthor[currentAuthor] = toBeAdded
        } else {
            if(blogsByAuthor[currentAuthor]) {
                var change = blogsByAuthor[currentAuthor].blogs + 1
                blogsByAuthor[currentAuthor].blogs = change
            } else {
                var addingAuthor = {author: currentAuthor, blogs:1}
                blogsByAuthor[currentAuthor] = addingAuthor
            }
        } 
    }
    var authorMostBlogs = blogsByAuthor[blogs[0].author]
    for (const [name, val] of Object.entries(blogsByAuthor)) {
        if(val.blogs > authorMostBlogs.blogs) {
            authorMostBlogs = val
        }
    }
    return(authorMostBlogs)
}

const mostLikes = (blogs) => {
    var blogsByLikes = {}

    for (let i = 0; i < blogs.length; i++) {
        var currentAuthor = blogs[i].author
        if (blogsByLikes.length===0) {
            const toBeAdded = {author: currentAuthor, likes: blogs[i].likes}
            blogsByLikes[currentAuthor] = toBeAdded
        } else {
            if(blogsByLikes[currentAuthor]) {
                var change = blogsByLikes[currentAuthor].likes + blogs[i].likes
                blogsByLikes[currentAuthor].likes = change
            } else {
                var addingAuthor = {author: currentAuthor, likes: blogs[i].likes}
                blogsByLikes[currentAuthor] = addingAuthor
            }
        } 
    }
    var authorMostLikes = blogsByLikes[blogs[0].author]
    for (const [name, val] of Object.entries(blogsByLikes)) {
        if(val.likes > authorMostLikes.likes) {
            authorMostLikes = val
        }
    }
    return (authorMostLikes)
}
  
  module.exports = {
    dummy,
    totalLikes, 
    favouriteBlog,
    mostBlogs,
    mostLikes
  }