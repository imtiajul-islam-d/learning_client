import React, { useState } from "react";
import { useGetVideosQuery } from "../../../../features/videos/videosApi";
import Error from "../../../../utils/Error";
import Loader from "../../../../utils/Loader";
import AdminNav from "../Nav/AdminNav";
import SingleVideo from "./SingleVideo";
import AddVideoModal from "../../../../utils/AddVideoModal";

const AdminVideos = () => {
  // modal elements start
  const [opened, setOpened] = useState(false);

  const controlModal = () => {
    setOpened((prevState) => !prevState);
  };
  // modal elements end
  const { data: videos, isLoading, isError, error } = useGetVideosQuery();

  // decide what to render
  let content = null;
  if (isLoading) content = <Loader />;
  if (!isLoading && isError) content = <Error message={error?.error} />;
  if (!isLoading && !isError && videos?.length === 0)
    content = <Error message={"No videos found!"} />;
  if (!isLoading && !isError && videos?.length > 0) {
    content = videos?.map((video) => (
      <SingleVideo key={video?.id} video={video} />
    ));
  }

  return (
    <>
      <AdminNav />
      <section className="py-6 bg-primary">
        <div className="mx-auto max-w-full px-5 lg:px-20">
          <div className="px-3 py-20 bg-opacity-10">
            <div className="w-full flex">
              <button onClick={controlModal} className="btn ml-auto">
                Add Video
              </button>
            </div>
            <div className="overflow-x-auto mt-4">
              <table className="divide-y-1 text-base divide-gray-600 w-full">
                <thead>
                  <tr>
                    <th className="table-th">Video Title</th>
                    <th className="table-th">Description</th>
                    <th className="table-th">Action</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-600/50">
                  {content}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <AddVideoModal open={opened} control={controlModal} />
      </section>
    </>
  );
};

export default AdminVideos;
