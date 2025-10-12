import React from "react";
import LatestJobCards from "./LatestJobCards";
import { useSelector } from "react-redux";

// const randomProjects = [1, 2, 3, 4, 5, 6, 7, 8];

const LatestJobs = () => {
  const { allProjects } = useSelector((store) => store.project);

  return (
    <div className="max-w-7xl mx-auto my-20">
      <h1 className="text-4xl font-bold">
        <span className="text-[#6A38C2]">Latest & Top </span> Project Openings
      </h1>
      <div className="grid grid-cols-3 gap-4 my-5">
        {allProjects.length <= 0 ? (
          <span>No Projects Available</span>
        ) : (
          allProjects
            ?.slice(0, 6)
            .map((project) => (
              <LatestJobCards key={project._id} project={project} />
            ))
        )}
      </div>
    </div>
  );
};

export default LatestJobs;
