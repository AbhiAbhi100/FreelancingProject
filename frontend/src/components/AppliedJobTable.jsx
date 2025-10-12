import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Badge } from "./ui/badge";
import { useSelector } from "react-redux";

const AppliedJobTable = () => {
  const { allSubmittedProposals } = useSelector((store) => store.project);
  return (
    <div>
      <Table>
        <TableCaption>A list of your submitted proposals</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Project Title</TableHead>
            <TableHead>Client</TableHead>
            <TableHead className="text-right">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allSubmittedProposals.length <= 0 ? (
            <span>You haven't submitted any proposal yet.</span>
          ) : (
            allSubmittedProposals.map((proposal) => (
              <TableRow key={proposal._id}>
                <TableCell>{proposal?.createdAt?.split("T")[0]}</TableCell>
                <TableCell>{proposal.project?.title}</TableCell>
                <TableCell>{proposal.project?.client?.name}</TableCell>
                <TableCell className="text-right">
                  <Badge
                    className={`${
                      proposal?.status === "rejected"
                        ? "bg-red-400"
                        : proposal.status === "pending"
                        ? "bg-gray-400"
                        : "bg-green-400"
                    }`}
                  >
                    {proposal.status.toUpperCase()}
                  </Badge>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default AppliedJobTable;
