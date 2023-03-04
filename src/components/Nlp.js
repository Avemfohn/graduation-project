import React from 'react';
import axios from 'axios';
import {useQuery} from "react-query";


function Nlp(props) {

    const fetchQuestions = async () => {
        return axios.get("http://localhost:4000/questions");

    }
  const {isLoading, error, data} = useQuery("questions", fetchQuestions);

//JavaScript code
function countWords(str) {
//Edge case: an empty array
  if (str.length === 0) {
    return {};
  } 
  const output = {};
  const perOut = {};
  const strArr = str.split("")
//A loop
  let count = 0;
  for (let i=0; i < strArr.length; i++) {
    let word = strArr[i];
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
    for (let j = 0; j < count; j++) {
        let word = strArr[j];
        if (!word.includes(" ")) {
            let percentage = (output[word]/count) * 100;
            perOut[word] = parseFloat(percentage.toFixed(2));
        }
    }
  return [output, perOut];
}

let output = countWords('ask a bunch get a bunch');
// { ask: 1, a: 2, bunch: 2, get: 1 }
    
  /*
  const [countWord, setCountWord] = useState(0);
  const [perWord, setPerWord] = useState(0);


  const setString = (e) => {
    setStr(e.target.value);
  }

  const baseURL = "https://jsonplaceholder.typicode.com/posts/1";
  const [post, setPost] = useState(null);

  /*useEffect(() => {
    fetch('http://localhost:8000/questions').then(res => {
      console.log("res", res);
      return res.json
    }).then(data => {
      console.log("data", data);
    })
  }, []);

  if (!post) return null; */

  // function countWords() {
  //
  //   const resultArray = [];
  //   //Edge case: an empty array
  //   if (str.length === 0) {
  //     return {};
  //   }
  //   const output = {};
  //   const perOut = {};
  //   const strArr = str.split("")
  //
  //   let count = 0;
  //   for (let i = 0; i < strArr.length; i++) {
  //     let word = strArr[i];
  //     if (!word.includes(" ")) {
  //       if (output[word] === undefined) {
  //         output[word] = 1;
  //         count++;
  //       } else {
  //         output[word] += 1;
  //         count += 1;
  //       }
  //     }
  //   }
  //   for (let j = 0; j < count; j++) {
  //     let word = strArr[j];
  //     if (!word.includes(" ")) {
  //       let percentage = (output[word] / count) * 100;
  //       perOut[word] = parseFloat(percentage.toFixed(2));
  //       let newObject = {
  //         word: word,
  //         count: output[word],
  //         percentage: perOut[word]
  //       };
  //
  //       let resultArrayControl = false;
  //       console.log(resultArray.length);
  //       if (resultArray.length === 0) {
  //         resultArray.push(newObject);
  //       } else {
  //         resultArray.forEach(element => {
  //           if (element.word === newObject.word) {
  //             resultArrayControl = true
  //           }
  //         });
  //         if (!resultArrayControl) {
  //           resultArray.push(newObject);
  //         }
  //       }
  //     }
  //   }
  //   resultArray.forEach(element => {
  //     setResultList(oldArray => [...oldArray, element]);
  //   });
  //
  //   exportData(resultArray)
  //   return [output, perOut];
  // }

  //Export components datas to json file
 /* const exportData = (resultArray) => {
    const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
      JSON.stringify(resultArray)
    )}`;
    const link = document.createElement("a");
    link.href = jsonString;
    link.download = "data.json";

    //link.click();
  }; */

  return (

    <div className="App">
      <div className='nlpContainer'>
        <ul>
            {
          data?.data.map((item) => {
            return <li key={item.id}>{item.text}</li>
          })
        }</ul>
      </div>
    </div>

  );

}

export default Nlp;