import React, { useEffect } from "react";
import PredictPrice from "../../components/PredictPrices";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Predict = () => {
    const { user, role, loading, error } = useSelector((state) => state.auth);
    const navigate=useNavigate();
    useEffect(()=>{
        if(!role){
            toast.error("Please Login");
            navigate("/login");
        }
    },[role])
  return (
    <div>
      <PredictPrice />
    </div>
  );
};

export default Predict;
