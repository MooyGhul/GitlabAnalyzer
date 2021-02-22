import React,{useState, useEffect,} from 'react';
import axios from 'axios';

function DataFetching() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/project/all')
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  });

  return (
    <div>
      <ul>
        {
          posts.map(post => (
            <li key={post.repoId}>{post.repoName}</li>
          ))
        }
      </ul>
    </div>
  )
}

export default DataFetching;