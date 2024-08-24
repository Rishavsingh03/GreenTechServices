import React, { useState } from "react";
import axios from "axios";

const PredictPrices = () => {
  const [brand, setBrand] = useState("");
  const [type, setType] = useState("");
  const [yearOfPurchase, setYearOfPurchase] = useState("");
  const [damage, setDamage] = useState("");
  const [predictedPrice, setPredictedPrice] = useState(null);

  const handlePredict = async (e) => {
    e.preventDefault();

    const data = {
      Brand: brand,
      Type: type,
      "Year of Purchase": yearOfPurchase,
      "Damage/Missing Parts": damage,
    };

    try {
      const response = await axios.post(
        "https://greenbackend-3xf9.onrender.com/predict",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      let temp = response.data["Predicted Price (INR)"] / 10;
      if(type==='mouse' || type==='Mouse'){
        temp=temp/80;
      }
      if (type === "motherboard" || type === "Motherboard") {
        temp=temp/130;
      }
      if(type==='Lights' || type==='lights'){
        temp=temp/110;
      }
      if(temp==='Pendrive' || temp==='pendrive'){
        temp=temp/130;
      }
      if(damage==='not working'){
        if(temp>1000){
          temp=temp/2;
        }
        else{
          temp = temp - 40;
        }
        
      }
      if(damage==='physical damage'){
       if (temp > 1000) {
         temp = temp / 3;
       } else {
         temp = temp - 50;
       }
      }
      setPredictedPrice(temp);
    } catch (error) {
      console.error("There was an error predicting the price!", error);
    }
  };

  return (
    <div className="container">
      <h2>Predict E-Waste Price</h2>
      <form onSubmit={handlePredict}>
        <div className="form-group">
          <label>Brand</label>
          <input
            type="text"
            className="form-control"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Type</label>
          <input
            type="text"
            className="form-control"
            value={type}
            onChange={(e) => setType(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Year of Purchase</label>
          <input
            type="number"
            className="form-control"
            value={yearOfPurchase}
            onChange={(e) => setYearOfPurchase(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Damage</label>
          <input
            type="text"
            className="form-control"
            value={damage}
            onChange={(e) => setDamage(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Predict Price
        </button>
      </form>
      {predictedPrice && (
        <div className="mt-4">
          <h3>Predicted Price: {predictedPrice} INR</h3>
        </div>
      )}
    </div>
  );
};

export default PredictPrices;
