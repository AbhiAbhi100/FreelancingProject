import { setSingleClient } from "@/redux/clientSlice";
import { setAllProjects } from "@/redux/projectSlice";
import { CLIENT_API_END_POINT, PROJECT_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetCompanyById = (clientId) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchSingleClient = async () => {
      try {
        const res = await axios.get(`${CLIENT_API_END_POINT}/get/${clientId}`, {
          withCredentials: true,
        });
        console.log(res.data.client);
        if (res.data.success) {
          dispatch(setSingleClient(res.data.client));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchSingleClient();
  }, [clientId, dispatch]);
};

export default useGetCompanyById;
