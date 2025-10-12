import { setAllSubmittedProposals } from "@/redux/projectSlice";
import { PROPOSAL_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetAppliedJobs = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchSubmittedProposals = async () => {
      try {
        const res = await axios.get(`${PROPOSAL_API_END_POINT}/get`, {
          withCredentials: true,
        });
        console.log(res.data);
        if (res.data.success) {
          dispatch(setAllSubmittedProposals(res.data.proposals));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchSubmittedProposals();
  }, []);
};
export default useGetAppliedJobs;
