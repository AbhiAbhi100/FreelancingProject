import React, { useEffect, useState } from "react";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";

const fitlerData = [
  {
    fitlerType: "Location",
    array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai"],
  },
  {
    fitlerType: "Industry",
    array: ["Photographer", "Bodyguard", "Anchor", "Model", "Makeup Artist"],
  },
  {
    fitlerType: "Budget",
    array: ["0-40k", "42-1lakh", "1lakh to 5lakh"],
  },
];

const FilterCard = ({
  setLocationFilter,
  setIndustryFilter,
  setBudgetFilter,
}) => {
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState("");
  const [selectedBudget, setSelectedBudget] = useState("");

  const changeHandler = (filterType, value) => {
    if (filterType === "Location") {
      setSelectedLocation(value === selectedLocation ? "" : value);
    } else if (filterType === "Industry") {
      setSelectedIndustry(value === selectedIndustry ? "" : value);
    } else if (filterType === "Budget") {
      setSelectedBudget(value === selectedBudget ? "" : value);
    }
  };

  useEffect(() => {
    setLocationFilter(selectedLocation);
  }, [selectedLocation, setLocationFilter]);

  useEffect(() => {
    setIndustryFilter(selectedIndustry);
  }, [selectedIndustry, setIndustryFilter]);

  useEffect(() => {
    setBudgetFilter(selectedBudget);
  }, [selectedBudget, setBudgetFilter]);

  return (
    <div className="w-full bg-white p-3 rounded-md">
      <h1 className="font-bold text-lg">Filter Projects</h1>
      <hr className="mt-3" />
      {fitlerData.map((data, index) => (
        <div key={index}>
          <h1 className="font-bold text-lg">{data.fitlerType}</h1>
          <RadioGroup
            value={
              data.fitlerType === "Location"
                ? selectedLocation
                : data.fitlerType === "Industry"
                ? selectedIndustry
                : selectedBudget
            }
            onValueChange={(value) => changeHandler(data.fitlerType, value)}
          >
            {data.array.map((item, idx) => {
              const itemId = `id${index}-${idx}`;
              return (
                <div key={itemId} className="flex items-center space-x-2 my-2">
                  <RadioGroupItem value={item} id={itemId} />
                  <Label htmlFor={itemId}>{item}</Label>
                </div>
              );
            })}
          </RadioGroup>
        </div>
      ))}
    </div>
  );
};

export default FilterCard;
