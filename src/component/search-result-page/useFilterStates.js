import { useState } from 'react';

export default function useFilterStatus() {
  const [courseName, setCourseName] = useState("");
  const [level, setLevel] = useState(100);
  const [credit, setCredit] = useState(5);
  const [creditType, setCreditType] = useState("na");

  const getFilters = () => {
    return [courseName, level, credit, creditType];
  };

  const updateFilters = (newCourseName, newLevel, newCredit, newCreditType) => {
    setCourseName(newCourseName);
    setLevel(newLevel);
    setCredit(newCredit);
    setCreditType(newCreditType);
  };

  return [getFilters, updateFilters];
}
