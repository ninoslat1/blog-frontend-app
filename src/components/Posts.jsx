import Post from './Post'

export default function Posts({post}) {
  return (
    <div className="w-[70vw] flex flex-wrap m-5">
      {post.map((post) => (
        <Post post={post} key={post._id}/>
      ))}
    </div>
  );
}