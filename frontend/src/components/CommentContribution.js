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

  const data = data2.map(entry=>entry.comments);
  const extend = [0,Math.max(...data)];
  //const extend = [0,Math.max(...data)];

  console.log("data2 FLAG:")
  data2.map(d => {
    console.log(d.year);
    return d.year;
  })
  

  useEffect(() => {
    const svg = select(svgRef.current);

    if(!dimensions) return;

    const xScale = scaleBand()
                    .domain(data2.map(d=>d.year))
                    .range([0,dimensions.width*0.4]) // To Change
                    .padding(0.5);

    const xAxis = axisBottom(xScale)
                    .ticks(data2.length);

    // const colorScale = scaleLinear()
    //                 .domain([75,150])
    //                 .range(["#66c2a5","#66c2a5"])
    //                 .clamp(true);

    svg
      .select(".x-axis")
      .style("transform",`translateY(${dimensions.height}px)`) //to change
      .call(xAxis);

    const yScale = scaleLinear()
      .domain(extend)  // Todo
      .range([dimensions.height,0]);  // To Change

    const yAxis = axisLeft(yScale).ticks(9);
    //.precisionFixed(1);
    //.tickFormat(format("s"));

    svg
      .select(".y-axis")
      //.style("transform",`translateX(${dimensions.width*0.4}px)`)
      .call(yAxis);

    svg
      .selectAll(".bar")
      .data(data2)
      .join("rect")
      .attr("class","bar")
      .style("transform", "scale(1,-1)")
      //.attr("x",(value,index) => xScale(index))
      .attr("x",sequence => {
        return xScale(sequence.year);
      })
      .attr("y", -dimensions.height)
      // .attr("y",sequence => {
      //   return yScale(sequence.comments);
      // })
      .attr("width",xScale.bandwidth())
      // add action
      .transition()
      .attr("fill","#66c2a5")
      //.attr("height",value => dimensions.height - yScale(value));
      .attr("height",entry => dimensions.height - yScale(entry.comments));
  },[data2, extend,dimensions]);


  return (
    <div ref={wrapperRef} style={{marginbottom: "2rem"}}>
      <svg ref={svgRef}>
        <g className="x-axis" />
        <g className="y-axis" />
      </svg>
    </div>
  );
}