const PostItem = ({ image, title, date, commentCount }) => (
  <article className="flex gap-4 my-4">
    <img src={image} alt="Blog Post" className="object-contain" />
    <div>
      <p className="text-[13px] text-white py-2">{title}</p>
      <p className="text-[10px] text-gray-200 py-2">
        {date} {commentCount}
      </p>
    </div>
  </article>
);
export default PostItem;
