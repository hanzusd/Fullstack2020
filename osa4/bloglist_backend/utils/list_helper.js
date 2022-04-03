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
  
  module.exports = {
    dummy,
    totalLikes
  }