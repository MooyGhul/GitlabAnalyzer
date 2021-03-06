import React,{useRef,useEffect, useState} from 'react';
import { select, axisBottom, axisLeft ,scaleLinear, scaleBand } from 'd3';

// the useResizeObserver function and how to call it is from the following tutorial"
// https://www.youtube.com/watch?v=a4rstx9Pz2o&list=PLDZ4p-ENjbiPo4WH7KdHjh_EMI7Ic8b2B&index=8
// the tutorial "Using React (Hooks) with D3 – [06] Responsive Chart Components with ResizeObserver"
// will replace with some existing library when have chance to look into it.
const useResizeObserver = (ref) => {
  const [dimensions, setDimensions] = useState(null);

  //called initially and on every data change 
  useEffect(() => {
    const observeTarget = ref.current;
    const resizeObserver  = new ResizeObserver(entries => {
      entries.forEach(entry => {
        setDimensions(entry.contentRect);
      });
    });
    resizeObserver.observe(observeTarget);
    return () => {
      resizeObserver.unobserve(observeTarget);
    };
  },[ref]);
  return dimensions;
};


export default function IssueBarChart({ issuesDataProp }) {
  const svgRef = useRef();
  const wrapperRef = useRef();
  const dimensions = useResizeObserver(wrapperRef);

  

  useEffect(() => {
    const svg = select(svgRef.current);

    const { width } =
    dimensions || wrapperRef.current.getBoundingClientRect();

    const data = issuesDataProp.map(entry=>entry.IssueWordCount);

    if(!dimensions) return;

    const xScale = scaleBand()
                    .domain(issuesDataProp.map(d=>d.year))
                    .range([0,dimensions.width]) 
                    .padding(0.5);

    const xAxis = axisBottom(xScale)
                    .ticks(issuesDataProp.length);

    svg
      .select(".x-axis")
      .style("transform",`translateY(${dimensions.height}px)`) 
      .call(xAxis);

    const yScale = scaleLinear()
      .domain([0,Math.max(...data)])
      .range([dimensions.height,0]);

    const yAxis = axisLeft(yScale).ticks(9);


    svg
      .select(".y-axis")
      .call(yAxis);

    svg
      .append("text")             
      .attr("transform",
            "translate(" + (width*0.9) + " ," + (dimensions.height*1.13) + ")")
      .text("Date");
    
    svg
      .append("text")             
      .attr("transform",
            "translate(" + (-40) + " ," + (-dimensions.height*0.05) + ")")
      .text("# of Comments");
    
    svg.append("text")
      .attr("x", (width *0.44))             
      .attr("y", -50 )
      .attr("text-anchor", "middle")  
      .style("font-size", "40px") 
      .style("text-decoration", "underline")  
      .text("Issue Contribution");

    svg
      .selectAll(".bar")
      .data(issuesDataProp)
      .join("rect")
      .attr("class","bar")
      .style("transform", "scale(1,-1)")
      .attr("x",sequence => {
        return xScale(sequence.year);
      })
      .attr("y", -dimensions.height)
      .attr("width",xScale.bandwidth())
      .transition()
      .attr("fill","#66c2a5")
      .attr("height",entry => dimensions.height - yScale(entry.IssueWordCount));
  },[issuesDataProp ,dimensions]);


  return (
    <div ref={wrapperRef} style={{marginBottom: "10rem"}}>
      <svg className="charts" ref={svgRef}>
        <g className="x-axis" />
        <g className="y-axis" />
      </svg>
    </div>
  );
} 