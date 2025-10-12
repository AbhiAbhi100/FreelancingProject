import React, { useEffect } from "react";
import Navbar from "./shared/Navbar";
import Job from "./Job";
import { useDispatch, useSelector } from "react-redux";
import { setSearchedQuery } from "@/redux/projectSlice";
import useGetAllJobs from "@/hooks/useGetAllJobs";

// const randomProjects = [1, 2, 45];

const Browse = () => {
  useGetAllJobs();
  const { allProjects } = useSelector((store) => store.project);
  const dispatch = useDispatch();
  useEffect(() => {
    return () => {
      dispatch(setSearchedQuery(""));
    };
  }, []);
  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto my-10">
        <h1 className="font-bold text-xl my-10">
          Search Results ({allProjects.length})
        </h1>
        <div className="grid grid-cols-3 gap-4">
          {allProjects.map((project) => {
            return <Job key={project._id} project={project} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Browse;
