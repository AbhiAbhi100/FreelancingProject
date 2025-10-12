import React, { useEffect } from "react";
import Navbar from "../shared/Navbar";
import ApplicantsTable from "./ApplicantsTable";
import axios from "axios";
import { PROPOSAL_API_END_POINT } from "@/utils/constant";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAllFreelancers } from "@/redux/proposalSlice";

const Applicants = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const { freelancers } = useSelector((store) => store.proposal);

  useEffect(() => {
    const fetchAllProposals = async () => {
      try {
        const res = await axios.get(
          `${PROPOSAL_API_END_POINT}/${params.id}/proposals`,
          { withCredentials: true }
        );
        dispatch(setAllFreelancers(res.data.project));
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllProposals();
  }, []);
  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto">
        <h1 className="font-bold text-xl my-5">
          Proposals ({freelancers?.proposals?.length || 0})
        </h1>
        <ApplicantsTable />
      </div>
    </div>
  );
};

export default Applicants;
