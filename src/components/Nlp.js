import React, { useState, useEffect } from "react";
import axios from "axios";
import { useQuery } from "react-query";
import {Bar} from 'react-chartjs-2'
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

function Nlp(props) {
 // const [resultList, setResultList] = useState([]);
  const [wordList, setWordList] = useState([]);
  const [wordCount, setWordCount] = useState([]);
  const [twoWordList, setTwoWordList] = useState([]);
  const [twoWordCount, setTwoWordCount] = useState([]);


  var state = {
    labels: wordList,
    datasets: [{
      label: "Word Frequency",
      backgroundColor: "blue",
      borderColor: "blue",
      borderWidth: "1",
      borderRadius: "2",
      data: wordCount
    }]
  }
  var twoWordState = {
    labels: twoWordList,
    datasets: [{
      label: "2 Word Frequency",
      backgroundColor: "red",
      borderColor: "red",
      borderWidth: "1",
      borderRadius: "2",
      data: twoWordCount
    }]
  }
  var wordCountState = [];
  var twoWordCountState = [];
  
  useEffect(() => {
    state = wordList;
    wordCountState = wordCount;
    twoWordState = twoWordList;
    twoWordCountState = twoWordCount;
    console.log("effect", state, wordCountState);

  }, [wordList]);

  const fetchQuestions = async () => {
    return axios.get("http://localhost:4000/questions");
  };
  const { isLoading, error, data } = useQuery("questions", fetchQuestions);
  if (isLoading) return <h2>Loading...</h2>;
  if (error) return <h2>Error...</h2>;

  function countWords(str, e) {
    if (wordList.length > 0) return;
    console.log("str",str);
    var resultArray = [];
    if (str.length === 0) {
      return {};
    }
    var output = {};
    var perOut = {};
    var strArr = str.split("");

    let count = 0;
    for (let i = 0; i < strArr.length; i++) {
      let word = strArr[i].toLocaleLowerCase('tr');
      if (!word.includes(" ")) {
        if (output[word] === undefined) {
          output[word] = 1;
          count++;
        } else {
          output[word] += 1;
          count += 1;
        }
      }
    }
    for (var j = 0; j < count; j++) {
      let word = strArr[j].toLocaleLowerCase('tr');;
      if (!word.includes(" ")) {
        let percentage = (output[word] / count) * 100;
        perOut[word] = parseFloat(percentage.toFixed(2));
        var newObject = {
          word: word,
          count: output[word],
          percentage: perOut[word],
        };

        let resultArrayControl = false;
        if (resultArray.length === 0) {
          resultArray.push(newObject);
        } else {
          resultArray.forEach((element) => {
            if (element.word === newObject.word) {
              resultArrayControl = true;
            }
          });
          if (!resultArrayControl) {
            resultArray.push(newObject);
          }
        }
      }
    }
    setWordList([]);
    resultArray.forEach(element => {
      //setResultList(oldArray => [...oldArray, element]);
      setWordList(oldArray => [...oldArray, element.word]);
      setWordCount(oldArray => [...oldArray, element.count]);
    });
    /*resultList.forEach(element => {
      setWordList(oldArray => [...oldArray, element.word]);
      setWordCount(oldArray => [...oldArray, element.count]);
    });*/
    return [resultArray];
  }
 //////////////////////////////////////////////////////////////

  function countTwoWords(str, e) {
    if (twoWordList.length > 0) return;
    console.log("str",str);
    var resultArray = [];
    if (str.length === 0) {
      return {};
    }
    var output = {};
    var perOut = {};
    var strArr = str.split("");

    let count = 0;
    for (let i = 0; i < strArr.length - 1; i++) {
      let word = strArr[i].toLocaleLowerCase('tr') + strArr[i + 1].toLocaleLowerCase('tr');
      if (!word.includes(" ")) {
        if (output[word] === undefined) {
          output[word] = 1;
          count++;
        } else {
          output[word] += 1;
          count += 1;
        }
      }
    }
    for (var j = 0; j < count; j++) {
      let word = strArr[j].toLocaleLowerCase('tr') + strArr[j + 1].toLocaleLowerCase('tr');
      if (!word.includes(" ")) {
        let percentage = (output[word] / count) * 100;
        perOut[word] = parseFloat(percentage.toFixed(2));
        var newObject = {
          word: word,
          count: output[word],
          percentage: perOut[word],
        };
        console.log("object", newObject)

        let resultArrayControl = false;
        if (resultArray.length === 0) {
          resultArray.push(newObject);
        } else {
          resultArray.forEach((element) => {
            if (element.word === newObject.word) {
              resultArrayControl = true;
            }
          });
          if (!resultArrayControl) {
            resultArray.push(newObject);
          }
        }
      }
    }
    resultArray.forEach(element => {
      //setResultList(oldArray => [...oldArray, element]);
      setTwoWordList(oldArray => [...oldArray, element.word]);
      setTwoWordCount(oldArray => [...oldArray, element.count]);
    });
    setWordList([]);
    /*resultList.forEach(element => {
      setTwoWordList(oldArray => [...oldArray, element.word]);
      setTwoWordCount(oldArray => [...oldArray, element.count]);
    });*/
    return [resultArray];
  }


  var isChartRendered = false;
  let chartContent = <p></p>;
  const createBarChart = (e) => {
    countWords(data.data[0].text, e);
    countTwoWords(data.data[0].text, e);

  }
  
  if (wordList.length > 0) {
    chartContent = <section>
      <Bar data = {state} />
      <Bar data = {twoWordState} />
    </section>
    
  }

  return (
    <div className="App">
      <div className="nlpContainer">
        <ul>
          {data?.data[0].text
          /*data?.data.map((item) => {
            return <li key={item.id}>{item.text}      
            
            </li>;
          })*/}
        </ul>
      </div>
      <button className="getBarChart" onClick={createBarChart}>
          Get Frequency
        </button>
      <div className="barChart">
        {chartContent}
      </div>
    </div>
  );
}

export default Nlp;
