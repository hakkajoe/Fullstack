const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    likesum = blogs.reduce((sum, blog) => {
        return sum + blog.likes
    }, 0)
    
    return likesum
}

const favoriteBlog = (blogs) => {
    if (blogs.length === 0) {
        return null
      }
    const mostLikedBlog = blogs.reduce((maxBlog, currentBlog) => {
    return currentBlog.likes > maxBlog.likes ? currentBlog : maxBlog
    }, blogs[0])

    return mostLikedBlog
}

const mostLikes = (blogs) => {
    if (blogs.length === 0) {
        return null
      }
    const likesByAuthor = {}   
    blogs.forEach((blog) => {
        if (!likesByAuthor[blog.author]) {
          likesByAuthor[blog.author] = 0
        }
        likesByAuthor[blog.author] += blog.likes
    })
    let mostLikedAuthor = null
    let mostLikes = 0
  
    for (const author in likesByAuthor) {
      if (likesByAuthor[author] > mostLikes) {
        mostLikedAuthor = author
        mostLikes = likesByAuthor[author]
      }
    }
    
    return {
        author: mostLikedAuthor,
        likes: mostLikes,
    }
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostLikes
}