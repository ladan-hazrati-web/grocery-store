import img1Article from "../../assets/images/footer/blog-11-75x65.jpg";
import img2Article from "../../assets/images/footer/blog-12-75x65.jpg";
import PostItem from "./PostItem";
const RecentPosts = () => (
  <div className="px-0 lg:px-5 ">
    <h4 className="text-[15px] ">Recent Posts</h4>
    <PostItem
      image={img1Article}
      title="A companion for extra sleeping"
      date="July 23, 2016"
      commentCount="1 Comment"
    />
    <hr className="border-gray-500" />
    <PostItem
      image={img2Article}
      title="Outdoor seating collection inspiration"
      date="July 23, 2016"
      commentCount="1 Comment"
    />
  </div>
);
export default RecentPosts;
