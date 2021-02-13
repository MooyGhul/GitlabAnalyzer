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


export default function BarChart({ data }) {
  const svgRef = useRef();
  const wrapperRef = useRef();
  const dimensions = useResizeObserver(wrapperRef);

  const extend = [0,Math.max(...data)];

  useEffect(() => {
    const svg = select(svgRef.current);

    if(!dimensions) return;

    const xScale = scaleBand()
                    .domain(data.map((value,index) => index))
                    .range([0,dimensions.width*0.4]) // To Change
                    .padding(0.5);

    const yScale = scaleLinear()
                    .domain(extend)  // Todo
                    .range([dimensions.height,0]);  // To Change

    const colorScale = scaleLinear()
                    .domain([75,150])
                    .range(["green","red"])
                    .clamp(true);

    const xAxis = axisBottom(xScale)
      .ticks(data.length);

    svg
      .select(".x-axis")
      .style("transform",`translateY(${dimensions.height}px)`) //to change
      .call(xAxis);

    const yAxis = axisRight(yScale).ticks(9);
    //.precisionFixed(1);
    //.tickFormat(format("s"));
    svg
      .select(".y-axis")
      .style("transform",`translateX(${dimensions.width*0.4}px)`)
      .call(yAxis);

    svg
      .selectAll(".bar")
      .data(data)
      .join("rect")
      .attr("class","bar")
      .style("transform", "scale(1,-1)")
      .attr("x",(value,index) => xScale(index))
      .attr("y", -dimensions.height)
      .attr("width",xScale.bandwidth())
      // add action
      .on("mouseenter",(event,value) => {
        const index = svg.selectAll(".bar").nodes().indexOf(event.target);
        svg
          .selectAll(".tooltip")
          .data([value])
          .join(enter => enter.append("text").attr("y",yScale(value)-4))
          .attr("class","tooltip")
          .text(value)
          .attr("x",xScale(index)+xScale.bandwidth()/2)
          
          .attr("text-anchor","middle")
          .transition()
          .attr("y",yScale(value)-8)
          .attr("opacity",1);
      })
      .on("mouseleave", () => svg.select(".tooltip").remove())
      .transition()
      .attr("fill",colorScale)
      .attr("height",value => dimensions.height - yScale(value));
  },[data, dimensions]);


  return (
    <div ref={wrapperRef} style={{marginbottom: "2rem"}}>
      <svg ref={svgRef}>
        <g className="x-axis" />
        <g className="y-axis" />
      </svg>
    </div>
  );
}