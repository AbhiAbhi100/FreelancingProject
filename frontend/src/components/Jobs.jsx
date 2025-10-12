import React, { useEffect, useState } from "react";
import Navbar from "./shared/Navbar";
import FilterCard from "./FilterCard";
import Job from "./Job";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

// const jobsArray = [1, 2, 3, 4, 5, 6, 7, 8];

const Jobs = () => {
  const { allProjects, searchedQuery } = useSelector((store) => store.project);
  const [filterProjects, setFilterProjects] = useState(allProjects);

  useEffect(() => {
    if (searchedQuery) {
      const filteredProjects = allProjects.filter((project) => {
        return (
          project.title.toLowerCase().includes(searchedQuery.toLowerCase()) ||
          project.description
            .toLowerCase()
            .includes(searchedQuery.toLowerCase()) ||
          project.location.toLowerCase().includes(searchedQuery.toLowerCase())
        );
      });
      setFilterProjects(filteredProjects);
    } else {
      setFilterProjects(allProjects);
    }
  }, [allProjects, searchedQuery]);

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto mt-5">
        <div className="flex gap-5">
          <div className="w-20%">
            <FilterCard />
          </div>
          {filterProjects.length <= 0 ? (
            <span>Project not found</span>
          ) : (
            <div className="flex-1 h-[88vh] overflow-y-auto pb-5">
              <div className="grid grid-cols-3 gap-4">
                {filterProjects.map((project) => (
                  <motion.div
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.3 }}
                    key={project?._id}
                  >
                    <Job project={project} />
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Jobs;
