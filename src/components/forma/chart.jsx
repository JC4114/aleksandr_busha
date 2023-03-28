import "./PlayerForm.css";
import React from "react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis
} from "recharts";

const data = [
  {
    subject: 'Passing',
    A: '',
    fullMark: 100
  },
  {
    subject: 'Speed',
    A: '',
    fullMark: 100
  },
  {
    subject: 'Endurance',
    A: '',
    fullMark: 100
  },
  {
    subject: 'Shooting Accuracy',
    A: '',
    fullMark: 100
  },
  {
    subject: 'Dribbling Skills',
    A: '',
    fullMark: 100
  },
  {
    subject: 'Physical Strength',
    A: '',
    fullMark: 100
  },
  {
    subject: 'Heading Ability',
    A: '',
    fullMark: 100
  },
  {
    subject: 'Defence',
    A: '',
    fullMark: 100
  },
  {
    subject: 'Reaction Time',
    A: '',
    fullMark: 100
  },
  {
    subject: 'Teamwork',
    A: '',
    fullMark: 100
  },
];

export default function Chart() {
  return (
    <RadarChart
    className="chart"
      cx={300}
      cy={250}
      outerRadius={150}
      width={500}
      height={500}
      data={data}
    >
      <PolarGrid />
      <PolarAngleAxis dataKey="subject" />
      <PolarRadiusAxis />
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
