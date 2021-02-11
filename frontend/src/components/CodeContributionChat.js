import React,{ useRef,useEffect,useState } from "react";
import { select, axisBottom, axisRight ,scaleLinear, scaleBand } from 'd3';
import {CommitDaily} from "../mockDataDir/mockCodeContri.js";
import './CodeContributionChat.css';

export default function Charts () {
  const data = Object.values(CommitDaily);

  console.log(data);

  const maxValueofYAxis = Math.ceil((Math.max(...data))*1.2);

  const svgRef = useRef();

  useEffect(() => {
    const svg = select(svgRef.current);

    const xScale = scaleBand()
                    .domain(data.map((value,index) => index))
                    .range([0,300])
                    .padding(0.2);

    const yScale = scaleLinear()
                    .domain([0,maxValueofYAxis])
                    //.domain([0,150])
                    .range([150,0]);

    const colorScale = scaleLinear()
                    .domain([75,150])
                    .range(["green","red"])
                    .clamp(true);

    const xAxis = axisBottom(xScale)
      .ticks(data.length);

    svg
      .select(".x-axis")
      .style("transform","translateY(150px)")
      .call(xAxis);

    const yAxis = axisRight(yScale);
    
    svg
      .select(".y-axis")
      .style("transform","translateX(300px)")
      .call(yAxis);

    svg
      .selectAll(".bar")
      .data(data)
      .join("rect")
      .attr("class","bar")
      .style("transform", "scale(1,-1)")
      .attr("x",(value,index) => xScale(index))
      .attr("y", -150)
      .attr("width",xScale.bandwidth())
      .transition()
      .attr("fill",colorScale)
      .attr("height",value => 150 - yScale(value));
  },[data]);

  return (
    <div>
      <svg ref={svgRef}>
        <g className="x-axis" />
        <g className="y-axis" />
      </svg>
      <br />
      <br />
      <br />
      <button >Commits</button>
      <button >MR</button>
      <button >Both</button>
    </div>
    
  );
}