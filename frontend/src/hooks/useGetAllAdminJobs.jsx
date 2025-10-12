import { setAllClientProjects } from "@/redux/projectSlice";
import { PROJECT_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetAllAdminJobs = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchAllClientProjects = async () => {
      try {
        const res = await axios.get(
          `${PROJECT_API_END_POINT}/getclientprojects`,
          { withCredentials: true }
        );
        if (res.data.success) {
          dispatch(setAllClientProjects(res.data.projects));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllClientProjects();
  }, []);
};

export default useGetAllAdminJobs;
