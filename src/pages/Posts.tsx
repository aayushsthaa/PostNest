import React, { useEffect, useState } from 'react'
interface posts{
    id: number,
    title: string,
    body: string
}
const Posts = () => {
    const [posts, setPosts] = useState<posts[]>([]);
    useEffect(() => {
        async function fetchPosts () {
            const response = await fetch('https://jsonplaceholder.typicode.com/posts');
            const data = await response.json();
            setPosts(data);
        }
        fetchPosts();
    }, [])
  return (
    <div>
        {posts.map((posts,i)=>{
            return(
                <div key={posts.id} className='p-4'>
                    <h1>{posts.title}</h1>
                    <p>{posts.body}</p>
                    <p>{i}</p>
                </div>
            )
        })}
    </div>
  )
}

export default Posts