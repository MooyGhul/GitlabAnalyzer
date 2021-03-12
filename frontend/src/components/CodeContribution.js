import React,{useRef,useEffect, useState} from 'react';
import { select, axisBottom, axisLeft, scaleBand, scaleLinear ,stack, max } from 'd3';

// the useResizeObserver function and how to call it is from the following tutorial"
// https://www.youtube.com/watch?v=a4rstx9Pz2o&list=PLDZ4p-ENjbiPo4WH7KdHjh_EMI7Ic8b2B&index=8
// the tutorial "Using React (Hooks) with D3 – [06] Responsive Chart Components with ResizeObserver"
// will replace with some existing library when have chance to look into it.
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

export default function CodeContributionStackedBarChart({ contributionsDataProp,keys,colors }) {
  const svgRef = useRef();
  const wrapperRef = useRef();
  const dimensions = useResizeObserver(wrapperRef);

  useEffect(() => {
    const svg = select(svgRef.current);

    const { width, height } =
      dimensions || wrapperRef.current.getBoundingClientRect();


    const stackGenerator = stack().keys(keys);
    const layers = stackGenerator(contributionsDataProp);
    // key: all the data related to the key
    // for every key, there is sequences for every key in the data array
    // key0 : [0,12] [0,16]   => layer 0
    // key1 : [12,16] [16,19] => layer 1
    // second value of the sequence
    // extend can be yScale
    const extend = [0,max(layers,layer=> max(layer, sequence => sequence[1]))];
    //console.log(extend);

    const xScale = scaleBand()
      .domain(contributionsDataProp.map(d => d.year))
      .range([0,width]) // To Change
      .padding(0.5);

    const xAxis = axisBottom(xScale);
    svg
      .select(".x-axis")
      .attr("transform",`translate(0,${height})`)
      .call(xAxis);

    const yScale = scaleLinear()
      .domain(extend)
      .range([height,0]);

    const yAxis = axisLeft(yScale);
    svg
      .select(".y-axis")
      .call(yAxis);
    
    svg
      .append("text")             
      .attr("transform",
            "translate(" + (width*0.9) + " ," + (height*1.13) + ")")
      .text("Date");
    
    svg
      .append("text")             
      .attr("transform",
            "translate(" + (-40) + " ," + (-height*0.05) + ")")
      .text("# of Contributions");


    svg
      .selectAll(".layer")
      .data(layers)
      .join("g")
      .attr("class","layer")
      // go to group element to color
      .attr("fill", layer =>{
        return colors[layer.key];
      })
      // for every group element created, select all the existing rect
      // sync with the data
      .selectAll("rect").data(layer => layer)
      .join("rect")
      // render to see them:
      // receive the current sequence of the current layer
      .attr("x",sequence => {
        return xScale(sequence.data.year);
      })
      .attr("width",xScale.bandwidth())
      .attr("y", sequence => yScale(sequence[1]))
      .attr("height", sequence => yScale(sequence[0])-yScale(sequence[1]));

      svg.append("text")
        .attr("x", (width *0.44))             
        .attr("y", -50 )
        .attr("text-anchor", "middle")  
        .style("font-size", "40px") 
        .style("text-decoration", "underline")  
        .text("Code Contribution");

  },[colors, contributionsDataProp,dimensions,keys]);


  return (
    <div ref={wrapperRef} style={{marginBottom: "2rem"}}>
      <svg className="charts"  ref={svgRef}>
        <g className="x-axis" />
        <g className="y-axis" />
      </svg>
    </div>
  );
}