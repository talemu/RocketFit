import styled from "styled-components";

const TableHead = styled.thead`
  border-bottom: 2px solid black;
  margin: 1em 0em;
`;

const TableHeader = styled.th`
  padding: 0em 2em;
  margin: 3em;
`;

const TableRecord = styled.tr``;

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
