import React, { useState } from "react";
import "./style/home.css";
import ReactDOM from "react-dom";
import "chart.js/auto";
import { Line } from "react-chartjs-2";

const data = [];

function HomePage({ user }) {
  const [bmiData, setBMIData] = useState({
    height: "",
    weight: "",
  });

  let [graphBmi, setGraphBmi] = useState([]);
  let [graphLabels, setGraphLabels] = useState([]);

  const [error, setError] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    if (bmiData.height == "" || bmiData.height <= 0) {
      setError("*Height needs to be at least 1!");
    } else if (bmiData.weight == "" || bmiData.weight <= 0) {
      setError("*Weight needs to be at least 1!");
    } else {
      setError("");

      var height = bmiData.height;
      var weight = bmiData.weight;
      var bmi = (weight / (height * height)) * 10000;
      var date = new Date();
      var month = date.toLocaleString('default', { month: 'long' });
      var thisMonth = date.getMonth() + 1
      var thisYear = date.getFullYear() % 100
      var today = date.getDate() + "/" + thisMonth + "/" + thisYear + " " + 
      date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
      var today1 = date.getDate() + "/" + thisMonth + "/" + thisYear

      // BMI result
      document.getElementById("result").innerHTML = "BMI: " + bmi.toFixed(1) + " kg/cm2";

      // BMI advisor
      if(bmi < 18.5){
        document.getElementById("advisor").innerHTML = "BMI anda underweight, Banyak lah konsumsi makanan-makanan yang berprotein dan jangan lupa untuk berolahraga.";
      }
      else if(bmi >= 18.5 && bmi <= 24.9){
        document.getElementById("advisor").innerHTML = "BMI anda normal, Jaga kondisi badan anda dengan mengkonsumsi makanan-makanan yang sehat dan sering berolahraga secara teratur.";
      }
      else if(bmi >= 25.0 && bmi <= 29.9){
        document.getElementById("advisor").innerHTML = "BMI anda overweight, Konsumsi lebih sedikit lemak jahat dan banyaklah makan lemak baik. Banyaklah berolahraga untuk mengurangi berat badan yang berlebihan.";
      }
      else{
        document.getElementById("advisor").innerHTML = "BMI anda obesity, Kurangi porsi makanan anda dan banyak lah lakukan olahraga dan juga makan-makanan yang bergizi.";
      }

      // BMI history
      var table = document.getElementById("history");
      var row = table.insertRow(-1);
      var dateCell = row.insertCell(0);
      var bmiCell = row.insertCell(1);
      var heightCell = row.insertCell(2);
      var weightCell = row.insertCell(3);
      dateCell.innerHTML = today;
      bmiCell.innerHTML = bmi.toFixed(1);
      heightCell.innerHTML = height;
      weightCell.innerHTML = weight;

      // BMI graph
      setGraphBmi((prevState) => [...prevState, bmi]);
      setGraphLabels((prevState) => [...prevState, today1]);
    }
  };

  return (
    <div className="container3">
      <div className="container4">
        <h2>Hi, {user.name}</h2>
        <div class="form-container4">
          <form onSubmit={submitHandler}>
            <div className="form-inner4">
              <h2>BMI Calculator</h2>
              <div class="form-group4">
                <label for="height">Height (cm)</label>
                <input
                  type="number"
                  name="height"
                  id="height"
                  onChange={(e) => setBMIData({ ...bmiData, height: e.target.value })}
                  value={bmiData.height}
                ></input>
              </div>
              <div class="form-group4">
                <label for="weight">Weight (kg)</label>
                <input
                  type="number"
                  name="weight"
                  id="weight"
                  onChange={(e) => setBMIData({ ...bmiData, weight: e.target.value })}
                  value={bmiData.weight}
                ></input>
              </div>
              {error != "" ? <p className="inputErr">{error}</p> : ""}
              <input type="submit" value="Calculate"></input>
              <h3 className="result" id="result">BMI :00.0 kg/cm2</h3>
              <h3 className="adTitle">Advisor:</h3>
              <p className="advisor" id="advisor"></p>
            </div>
          </form>
        </div>
      </div>

      <div class="container5">
          <div className="chart-container">
            <div className="grafik" id="graph">
              <h2>BMI Graph</h2>
              <Line
                data={{
                  labels: graphLabels,
                  datasets: [
                    {
                      data: graphBmi,
                      borderColor: "rgba(104, 55, 129, 0.3)",
                      backgroundColor: "rgba(43, 195, 137, 1)",
                      tension: 0.5,
                      fill: false,
                    },
                  ],
                }}
                options={{
                  plugins: {
                    legend: {
                      display: false
                    },
                  },
                  scales: {
                    x: {
                      grid: {
                        display: false,
                      }
                    },
                    y: {
                      suggestedMin: 0,
                      suggestedMax: 100,
                      grid: {
                        display: false,
                      }
                    },
                  },
                }}
              />{" "}
            </div>
          </div>
    
          <div className="table-container">
            <table className="tabel" id="history"> 
              <h2>BMI History</h2>
              <thead>
                <tr>
                  <th><span className="text">Date/Time</span></th>
                  <th><span className="text">BMI (kg/cm2)</span></th>
                  <th><span className="text">Height (cm)</span></th>
                  <th><span className="text">Weigth (kg)</span></th>
                </tr>
              </thead>
            </table>
          </div>
        </div>
      </div>
  );
}

export default HomePage;