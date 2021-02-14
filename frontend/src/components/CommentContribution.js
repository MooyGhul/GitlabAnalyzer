import React,{useRef,useEffect, useState} from 'react';
import { select, axisBottom, axisLeft, axisRight ,scaleLinear, scaleBand, format } from 'd3';


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


export default function BarChart({ data2 }) {
  const svgRef = useRef();
  const wrapperRef = useRef();
  const dimensions = useResizeObserver(wrapperRef);

  

  useEffect(() => {
    const svg = select(svgRef.current);

    const data = data2.map(entry=>entry.comments);

    if(!dimensions) return;

    const xScale = scaleBand()
                    .domain(data2.map(d=>d.year))
                    .range([0,dimensions.width*0.4]) 
                    .padding(0.5);

    const xAxis = axisBottom(xScale)
                    .ticks(data2.length);

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
      .selectAll(".bar")
      .data(data2)
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
  },[data2 ,dimensions]);


  return (
    <div ref={wrapperRef} style={{marginbottom: "2rem"}}>
      <svg ref={svgRef}>
        <g className="x-axis" />
        <g className="y-axis" />
      </svg>
    </div>
  );
}