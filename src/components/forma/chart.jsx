import "./PlayerForm.css";
import React from "react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis
} from "recharts";

export default function Chart({ data}) {
  const chartData = data.map(item => ({ ...item, fullMark:100 })); // добавляем fullMark в каждый элемент массива data

  return (
    <RadarChart
      className="chart"
      outerRadius={150}
      width={600}
      height={340}
      data={chartData} // передаем измененный массив
    >
      <PolarGrid />
      <PolarAngleAxis dataKey="subject" />
      <PolarRadiusAxis domain={[0, 100]} /> {/* задаем диапазон значений для оси */}
      <Radar
        name="Mike"
        dataKey="A"
        stroke="#8884d8"
        fill="#8884d8"
        fillOpacity={0.6}
      />
    </RadarChart>
  );
}
