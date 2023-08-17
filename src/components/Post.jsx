import { Link } from "react-router-dom";

export default function Post({post}) {
  const images = `${import.meta.env.VITE_BACKEND_IMG}/images/`

  return (
    <div className="w-[385px] flex flex-col mt-0 mb-10 mx-[25px]" key={post._id}>
      {post.photo && (
        <img
        className="w-[385px] h-[280px] object-cover rounded-[7px]"
        src={images + post.photo}
        alt="Blog Image"/>
      )}
      <div className="flex flex-col items-center">
        <div className="">
          {post.categories.map((cat) => (
            <span className="font-normal text-[11px] text-[#be9656] leading-[19px] cursor-pointer mr-2.5 mt-[15px]" key={post._id}>
              <Link className="no-underline" to={`/posts?cat=${cat}`}>
                {cat.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase())}
              </Link>
            </span>
          ))}
        </div>
        <span className="text-2xl font-black cursor-pointer mt-[15px]">
          <Link to={`/post/${post._id}`} className="no-underline">
            {post.title}
          </Link>
        </span>
        <hr />
        <span className="italic text-[13px] font-normal text-[#999999] mt-[15px]">{new Date(post.createdAt).toDateString()}</span>
      </div>
      <p className="font-normal text-sm leading-6 text-[#444444] overflow-hidden text-ellipsis mt-[15px]">
        {post.desc}
      </p>
    </div>
  );
}