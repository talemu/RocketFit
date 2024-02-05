import React, { useEffect, useState } from "react";
import workoutTemplateService from "../services/workoutTemplateService";

const WorkoutsPage = () => {
  const [data, setData] = useState<string>("");

  useEffect(() => {
    const { request } = workoutTemplateService.getAll("");
    request
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return <div></div>;
};

export default WorkoutsPage;
