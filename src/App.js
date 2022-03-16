import logo from './logo.svg';
import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

function App() {

  const [airports, setAirports] = useState([])
  const [d, setD] = useState('')

  const getData = async () => {
      const res = await axios.get(`https://opentdb.com/api.php?amount=10&difficulty=${d}`);
      const  data  = await res.data.results;
      setAirports(data)

    // console.log(res.data.features[0].attributes)
    
  }

  // useEffect(() => {
  //   getData()
  // }, [])

  const handleSubmit =(e) => {
    e.preventDefault()
    getData()
    // const target = e.target;
    // console.log(target)
  }
  const handleChange =(e) => {
    setD(e.target.value)
    console.log(d)
  }
  const entities = {
    '&#039;': "'",
    '&quot;': '"',
    // add more if needed
  };
  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <select onChange={handleChange}>
          <option value=''>ANY</option>
          <option value='easy'>Easy</option>
          <option value='medium'>Medium</option>
          <option value='hard'>Difficulty</option>
        </select>
        <input type='submit' value='Submit'/>
      </form>
      <table>
        <tbody>
        {airports.map((item, i) => {
            return (
            <tr>
              {/* <td>{[item.category]}</td> */}
              <td>{item.question.replace(/&#039;/g, "'").replace(/&quot;/g, '"')}</td>
              
              {/* {item.correct_answer === "True" || item.correct_answer === "False" ? <div>MC</div>:<div>Not</div>} */}
              
            </tr>
            )
            
          })}
        </tbody>
      </table>
    </div>
  );
}

export default App;
