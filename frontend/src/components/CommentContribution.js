import React,{useRef,useEffect, useState} from 'react';
import { select, axisBottom, axisLeft ,scaleLinear, scaleBand } from 'd3';

// the useResizeObserver function and how to call it is from the following tutorial"
// https://www.youtube.com/watch?v=a4rstx9Pz2o&list=PLDZ4p-ENjbiPo4WH7KdHjh_EMI7Ic8b2B&index=8
// the tutorial "Using React (Hooks) with D3 – [06] Responsive Chart Components with ResizeObserver"
const useResizeObserver = (ref) => {
  const [dimensions, setDimensions] = useState(null);

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


export default function BarChart({ commentsDataProp }) {
  const svgRef = useRef();
  const wrapperRef = useRef();
  const dimensions = useResizeObserver(wrapperRef);

  

  useEffect(() => {
    const svg = select(svgRef.current);

    const { width } =
    dimensions || wrapperRef.current.getBoundingClientRect();

    const data = commentsDataProp.map(entry=>entry.comments);

    if(!dimensions) return;

    const xScale = scaleBand()
                    .domain(commentsDataProp.map(d=>d.year))
                    .range([0,dimensions.width*0.4]) 
                    .padding(0.5);

    const xAxis = axisBottom(xScale)
                    .ticks(commentsDataProp.length);

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
            "translate(" + (width*0.38) + " ," + (dimensions.height*1.2) + ")")
      .text("Date");
    
    svg
      .append("text")             
      .attr("transform",
            "translate(" + (-40) + " ," + (-dimensions.height*0.05) + ")")
      .text("# of Comments");
    
    svg
      .selectAll(".bar")
      .data(commentsDataProp)
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
      .attr("height",entry => dimensions.height - yScale(entry.comments));
  },[commentsDataProp ,dimensions]);


  return (
    <div ref={wrapperRef} style={{marginbottom: "2rem"}}>
      <svg ref={svgRef}>
        <g className="x-axis" />
        <g className="y-axis" />
      </svg>
    </div>
  );
}