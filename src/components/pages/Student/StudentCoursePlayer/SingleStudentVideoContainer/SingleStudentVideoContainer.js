import React from "react";
import { useParams } from "react-router-dom";
import Loader from "../../../../../utils/Loader";
import Error from "../../../../../utils/Error";
import PlayerSingleVideo from "../PlayerSingleVideo";
import { useGetVideosQuery } from "../../../../../features/videos/videosApi";
import StudentNav from "../../StudentNav/StudentNav";
import SingleStudentVideoPlayer from "./SingleStudentVideoPlayer";

const SingleStudentVideoContainer = () => {
  const { id } = useParams();
  const { data: videos, isLoading, isError, error, refetch } = useGetVideosQuery();
  let content = null;
  if (isLoading) content = <Loader />;
  if (!isLoading && isError) content = <Error message={error?.error} />;
  if (!isLoading && !isError && videos?.length === 0)
    content = <Error message={"No assignment found!"} />;
  if (!isLoading && !isError && videos?.length > 0) {
    const m = videos?.slice();
    // (m.filter((v) => v?.id == id))
    content = m
      ?.filter((v) => v?._id != id)
      ?.map((video) => (content = <PlayerSingleVideo video={video} />));
  }
  return (
    <>
      <StudentNav />
      {videos?.length > 0 && (
        <section className="py-6 bg-primary">
          <div className="mx-auto max-w-7xl px-5 lg:px-0">
            <div className="grid grid-cols-3 gap-2 lg:gap-8">
              {/* single video player */}
              <SingleStudentVideoPlayer
                refetch={refetch}
                param={id}
                video={videos?.find((v) => v._id == id)}
              />
              {/* single video player */}
              <div className="col-span-full lg:col-auto max-h-[570px] overflow-y-auto bg-secondary p-4 rounded-md border border-slate-50/10 divide-y divide-slate-600/30">
                {/* single videos start */}
                {content}
              </div>
            </div>
          </div>
        </section>
      )}
      {videos?.length === 0 && <div>No video found!!</div>}
    </>
  );
};

export default SingleStudentVideoContainer;
