import React,{useRef,useEffect, useState} from 'react';
import { select, axisBottom, axisLeft, scaleBand, scaleLinear ,stack, max } from 'd3';

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

export default function StackedBarChart({ contributionsDataProp,keys,colors }) {
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
      .range([0,width*0.4]) // To Change
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
            "translate(" + (width*0.38) + " ," + (height*1.13) + ")")
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
        .attr("x", (width *0.22))             
        .attr("y", -50 )
        .attr("text-anchor", "middle")  
        .style("font-size", "40px") 
        .style("text-decoration", "underline")  
        .text("Code Contribution");

  },[colors, contributionsDataProp,dimensions,keys]);


  return (
    <div ref={wrapperRef} style={{marginbottom: "2rem"}}>
      <svg className="charts"  ref={svgRef}>
        <g className="x-axis" />
        <g className="y-axis" />
      </svg>
    </div>
  );
}