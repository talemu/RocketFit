import React from "react";
import styled from "styled-components";

const TableHeader = styled.th`
  padding: 1em 2em;
`;

const TableRecord = styled.tr``;

const TableHead = styled.thead``;

const DayTableHeader = () => {
  return (
    <TableHead>
      <TableRecord>
        <TableHeader>Exercise</TableHeader>
        <TableHeader>Sets</TableHeader>
        <TableHeader>Reps</TableHeader>
        <TableHeader>Target Weight</TableHeader>
        <TableHeader>Weight(lbs)</TableHeader>
        <TableHeader>Rest</TableHeader>
      </TableRecord>
    </TableHead>
  );
};

export default DayTableHeader;
