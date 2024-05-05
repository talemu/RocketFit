import { useLocation } from "react-router-dom";
import TrackProgressChart from "../components/TrackProgressComponents/TrackProgressChart";
import TrackProgressInputs from "../components/TrackProgressComponents/TrackProgressInputs";
import { ExerciseRecord } from "../services/exerciseRecordService";
import { useState } from "react";

const TrackProgressPage = () => {
  const location = useLocation();
  const authId = location.state;
  const [records, setRecords] = useState<ExerciseRecord[]>([]);

  const handleGraphRecords = (records: ExerciseRecord[]) => {
    setRecords(records);
  };

  return (
    <>
      <TrackProgressInputs
        authId={authId}
        sendDataToParent={handleGraphRecords}
      />
      <TrackProgressChart records={records} />
    </>
  );
};

export default TrackProgressPage;
