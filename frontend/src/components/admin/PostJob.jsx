import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useSelector } from "react-redux";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import axios from "axios";
import { PROJECT_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

const companyArray = [];

const PostJob = () => {
  const [input, setInput] = useState({
    title: "",
    description: "",
    requirements: "",
    budget: "",
    location: "",
    projectType: "",
    experience: "",
    duration: 0,
    clientId: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { clients } = useSelector((store) => store.client);
  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const selectChangeHandler = (value) => {
    const selectedClient = clients.find(
      (client) => client.name.toLowerCase() === value
    );
    setInput({ ...input, clientId: selectedClient._id });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post(`${PROJECT_API_END_POINT}/post`, input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/projects");
      }
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center w-screen my-5">
        <form
          onSubmit={submitHandler}
          className="p-8 max-w-4xl border border-gray-200 shadow-lg rounded-md"
        >
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label>Title</Label>
              <Input
                type="text"
                name="title"
                value={input.title}
                onChange={changeEventHandler}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>
            <div>
              <Label>Description</Label>
              <Input
                type="text"
                name="description"
                value={input.description}
                onChange={changeEventHandler}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>
            <div>
              <Label>Requirements</Label>
              <Input
                type="text"
                name="requirements"
                value={input.requirements}
                onChange={changeEventHandler}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>
            <div>
              <Label>Budget</Label>
              <Input
                type="text"
                name="budget"
                value={input.budget}
                onChange={changeEventHandler}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>
            <div>
              <Label>Location</Label>
              <Input
                type="text"
                name="location"
                value={input.location}
                onChange={changeEventHandler}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>
            <div>
              <Label>Project Type</Label>
              <Input
                type="text"
                name="projectType"
                value={input.projectType}
                onChange={changeEventHandler}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>
            <div>
              <Label>Experience Level</Label>
              <Input
                type="text"
                name="experience"
                value={input.experience}
                onChange={changeEventHandler}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>
            <div>
              <Label>Duration (weeks)</Label>
              <Input
                type="number"
                name="duration"
                value={input.duration}
                onChange={changeEventHandler}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>
            {clients.length > 0 && (
              <Select onValueChange={selectChangeHandler}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a Client" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {clients.map((client) => {
                      return (
                        <SelectItem value={client?.name?.toLowerCase()}>
                          {client.name}
                        </SelectItem>
                      );
                    })}
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          </div>
          {loading ? (
            <Button className="w-full my-4">
              {" "}
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait{" "}
            </Button>
          ) : (
            <Button type="submit" className="w-full my-4">
              Post New Project
            </Button>
          )}
          {clients.length === 0 && (
            <p className="text-xs text-red-600 font-bold text-center my-3">
              *Please register a client first, before posting projects
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default PostJob;
