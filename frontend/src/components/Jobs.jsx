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
  const [locationFilter, setLocationFilter] = useState("");
  const [industryFilter, setIndustryFilter] = useState("");
  const [budgetFilter, setBudgetFilter] = useState("");

  useEffect(() => {
    let filteredProjects = allProjects;

    // Apply search query filter
    if (searchedQuery) {
      filteredProjects = filteredProjects.filter((project) => {
        return (
          project.title.toLowerCase().includes(searchedQuery.toLowerCase()) ||
          project.description
            .toLowerCase()
            .includes(searchedQuery.toLowerCase())
        );
      });
    }

    // Apply location filter
    if (locationFilter) {
      filteredProjects = filteredProjects.filter((project) => {
        return project.location
          .toLowerCase()
          .includes(locationFilter.toLowerCase());
      });
    }

    // Apply industry filter (projectType)
    if (industryFilter) {
      filteredProjects = filteredProjects.filter((project) => {
        return project.projectType
          .toLowerCase()
          .includes(industryFilter.toLowerCase());
      });
    }

    // Apply budget filter
    if (budgetFilter) {
      filteredProjects = filteredProjects.filter((project) => {
        const budget = project.budget;
        if (budgetFilter === "0-40k") {
          return budget >= 0 && budget <= 40000;
        } else if (budgetFilter === "42-1lakh") {
          return budget > 40000 && budget <= 100000;
        } else if (budgetFilter === "1lakh to 5lakh") {
          return budget > 100000 && budget <= 500000;
        }
        return true;
      });
    }

    setFilterProjects(filteredProjects);
  }, [
    allProjects,
    searchedQuery,
    locationFilter,
    industryFilter,
    budgetFilter,
  ]);

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto mt-5">
        <div className="flex gap-5">
          <div className="w-20%">
            <FilterCard
              setLocationFilter={setLocationFilter}
              setIndustryFilter={setIndustryFilter}
              setBudgetFilter={setBudgetFilter}
            />
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
