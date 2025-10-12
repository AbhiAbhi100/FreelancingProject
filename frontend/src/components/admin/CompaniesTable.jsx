import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Edit2, MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CompaniesTable = () => {
  const { clients, searchClientByText } = useSelector((store) => store.client);
  const [filterClient, setFilterClient] = useState(clients);
  const navigate = useNavigate();
  useEffect(() => {
    const filteredClient =
      clients.length >= 0 &&
      clients.filter((client) => {
        if (!searchClientByText) {
          return true;
        }
        return client?.name
          ?.toLowerCase()
          .includes(searchClientByText.toLowerCase());
      });
    setFilterClient(filteredClient);
  }, [clients, searchClientByText]);
  return (
    <div>
      <Table>
        <TableCaption>A list of your recent registered clients</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Logo</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filterClient?.map((client) => (
            <tr>
              <TableCell>
                <Avatar>
                  <AvatarImage src={client.logo} />
                </Avatar>
              </TableCell>
              <TableCell>{client.name}</TableCell>
              <TableCell>{client.createdAt.split("T")[0]}</TableCell>
              <TableCell className="text-right cursor-pointer">
                <Popover>
                  <PopoverTrigger>
                    <MoreHorizontal />
                  </PopoverTrigger>
                  <PopoverContent className="w-32">
                    <div
                      onClick={() => navigate(`/admin/clients/${client._id}`)}
                      className="flex items-center gap-2 w-fit cursor-pointer"
                    >
                      <Edit2 className="w-4" />
                      <span>Edit</span>
                    </div>
                  </PopoverContent>
                </Popover>
              </TableCell>
            </tr>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CompaniesTable;
