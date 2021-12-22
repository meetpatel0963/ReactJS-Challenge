import { useContext } from "react";
import { Context } from "../Context";
import { Pie } from "react-chartjs-2";

const PieChart = ({ data }) => {
  /* 
    data: An Array of two numbers 
    [no. of people vaccinated, no. of people not vaccinated]
  */
  
  // Load the value of colors (array of length 2) using useContext hook
  const value = useContext(Context);

  // Set the loaded value/colors in backgroundColor
  const options = {
    labels: ["Vaccinated", "Not Vaccinated"],
    datasets: [
      {
        label: "My First Dataset",
        data: data,
        backgroundColor: value,
        hoverOffset: 4
      }
    ],
    height: "50%"
  };
  
  return <Pie style={{ marginTop: "20px", cursor: "pointer" }} data={options} />;
};

export default PieChart;
