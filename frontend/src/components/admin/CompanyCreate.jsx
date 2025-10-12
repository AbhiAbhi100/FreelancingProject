import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { CLIENT_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { setSingleClient } from "@/redux/clientSlice";

const CompanyCreate = () => {
  const navigate = useNavigate();
  const [clientName, setClientName] = useState();
  const dispatch = useDispatch();
  const registerNewClient = async () => {
    try {
      const res = await axios.post(
        `${CLIENT_API_END_POINT}/register`,
        { clientName },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (res?.data?.success) {
        dispatch(setSingleClient(res.data.client));
        toast.success(res.data.message);
        const clientId = res?.data?.client?._id;
        navigate(`/admin/clients/${clientId}`);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto">
        <div className="my-10">
          <h1 className="font-bold text-2xl">Your Client Name</h1>
          <p className="text-gray-500">
            What would you like to name your client profile? You can change this
            later.
          </p>
        </div>

        <Label>Client Name</Label>
        <Input
          type="text"
          className="my-2"
          placeholder="Tech Corp, Design Studio etc."
          onChange={(e) => setClientName(e.target.value)}
        />
        <div className="flex items-center gap-2 my-10">
          <Button variant="outline" onClick={() => navigate("/admin/clients")}>
            Cancel
          </Button>
          <Button onClick={registerNewClient}>Continue</Button>
        </div>
      </div>
    </div>
  );
};

export default CompanyCreate;
