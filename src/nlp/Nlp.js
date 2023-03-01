import React from 'react';
import axios from 'axios';
import {useEffect, useState} from "react";



function Nlp(props) {
        const [str, setStr] = useState("");
        const setString = (e) => {
            setStr(e.target.value);
        }
        const baseURL = "https://jsonplaceholder.typicode.com/posts/1";
        const [post, setPost] = useState(null);
        useEffect(() => {
            axios.get(baseURL).then((response) => {
                setPost(response.data);
            });
        }, []);
        if (!post) return null;

        function countWords() {
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

console.log(countWords());
        return (
            <div className="App">
                <h1>Word Count</h1>
            <p>Enter a sentence to count the words</p>
            <input value={str} onChange={setString} type="text" id="input" />
            <button onClick={countWords}>Count</button>

            </div>
        );

}

export default Nlp;