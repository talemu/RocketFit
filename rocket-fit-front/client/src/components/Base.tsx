import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Base = () => {
  const Navigate = useNavigate();
  useEffect(() => {
    Navigate("/login");
  }, []);
  return null;
};

export default Base;
