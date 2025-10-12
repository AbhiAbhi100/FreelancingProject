import { setClients } from "@/redux/clientSlice";
import { CLIENT_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetAllCompanies = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchClients = async () => {
      try {
        const res = await axios.get(`${CLIENT_API_END_POINT}/get`, {
          withCredentials: true,
        });
        console.log("called");
        if (res.data.success) {
          dispatch(setClients(res.data.clients));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchClients();
  }, []);
};

export default useGetAllCompanies;
