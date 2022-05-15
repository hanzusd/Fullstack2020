import { useEffect } from 'react'
import Blog from './Blog'

const AllBlogs = ( {blogs, setBlogs} ) => {
    const sortBlogsbyLikes = () => {
        const sorted = [...blogs].sort((a, b) => {
            return b.likes-a.likes
        })
    setBlogs(sorted)
    }
    useEffect(() => {
        sortBlogsbyLikes()
    }, [])

    return (
     <Blogs blogs = {blogs} sortBlogsbyLikes={sortBlogsbyLikes}/>
    )
}

const Blogs = ( { blogs, sortBlogsbyLikes } ) => {
var plokit = blogs.map(plog => <Blog key={plog.id} blog = {plog} blogs = {blogs} sortBlogsbyLikes={sortBlogsbyLikes}/>)
return (plokit)
}

export default AllBlogs