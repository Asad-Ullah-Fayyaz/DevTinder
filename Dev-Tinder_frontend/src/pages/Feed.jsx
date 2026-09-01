import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import { BASE_URL } from "../utils/constants";
import UserCard from "../components/UserCard";
import { useEffect } from "react";

const Feed = () => {

  const feed = useSelector((store) => store.feed);

  const dispatch = useDispatch();

  const getFeed = async () => {

    try {
       
      if (feed?.length > 0) return;

      const userFeed = await axios.get(
        `${BASE_URL}/feed`,
        {
          withCredentials: true
        }
      );
        
        
      dispatch(addFeed(userFeed.data));

    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);
if(!feed) return
if(feed.length <= 0){
  return <h1 className="text-center">no more user left</h1>
}
return (
  <div className="flex justify-center mt-10">
    {feed?.length > 0 && (
   <UserCard user={feed[0]} />
)}
  </div>
);
};

export default Feed;