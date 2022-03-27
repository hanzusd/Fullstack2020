import Blog from './Blog'

const AllBlogs = ( {blogs, setBlogs} ) => {
    return (
     <Blogs blogs = {blogs}/>
    )
}

const Blogs = ( {blogs} ) => {
var plokit = blogs.map(plog => <Blog key={plog.id} blog = {plog} blogs = {blogs}/>)
return (plokit)
}

export default AllBlogs