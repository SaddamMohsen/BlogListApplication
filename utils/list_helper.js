const dummy = (blogs) => {
    const blogslen = blogs.length
 return blogslen
}

const totalLikes =(blogs)=>{
 
  return blogs[0].likes
}

module.exports = {
  dummy,totalLikes
}