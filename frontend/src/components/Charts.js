import React,{useState} from "react";
import BarChart from "./CommentContribution";
import StackedBarChart from "./CodeContribution";
import Comments from "../mockDataDir/mockCodeContri";

const data1 = [
  {
    year: 1980,
    "🥑": 10,
    "🍌": 20,
    "🍆": 30
  },
  {
    year: 1990,
    "🥑": 20,
    "🍌": 40,
    "🍆": 60
  },
  {
    year: 2000,
    "🥑": 30,
    "🍌": 45,
    "🍆": 80
  },
  {
    year: 2010,
    "🥑": 40,
    "🍌": 60,
    "🍆": 100
  },
  {
    year: 2020,
    "🥑": 50,
    "🍌": 80,
    "🍆": 120
  }
];

const allKeys = ["🥑", "🍌", "🍆"];

const colors = {
  "🥑": "green",
  "🍌": "orange",
  "🍆": "purple"
};

export default function Charts () {
    const [keys, setKeys] = useState(allKeys);
    const [data, setData] = useState([25,30,45,60,20,45,75]);

    return (
        <div>
          <BarChart data={data}/>
          <br/><br/><br/>
          <button onClick={()=>setData(data.map(value=>value+5))}>
              Incre 5
          </button>
          <button onClick={()=>setData(data.filter(value=>value<=35))}>
              Filter
          </button>

          <br/><br/><br/><br/><br/>
          
          <StackedBarChart data={data1} keys={keys} colors={colors} />
          
          <br/><br/>
          <div className="fields">
            {allKeys.map(key => (
              <div key={key} className="field">
                <input
                  id={key}
                  type="checkbox"
                  checked={keys.includes(key)}
                  onChange={e => {
                    if (e.target.checked) {
                      setKeys(Array.from(new Set([...keys, key])));
                    } else {
                      setKeys(keys.filter(_key => _key !== key));
                    }
                  }}
                />
                <label htmlFor={key} style={{ color: colors[key] }}>
                  {key}
                </label>
              </div>
            ))}
          </div>
        </div>
    );
}