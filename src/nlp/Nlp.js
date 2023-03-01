import React from 'react';
import axios from 'axios';
import {useEffect, useState} from "react";



function Nlp(props) {

        const baseURL = "https://jsonplaceholder.typicode.com/posts/1";
        const [post, setPost] = useState(null);
        useEffect(() => {
            axios.get(baseURL).then((response) => {
                setPost(response.data);
            });
        }, []);
        if (!post) return null;
        return (
            <div className="App">
                <div>
                    <h1>{post.title}</h1>
                    <p>{post.body}</p>
                </div>
            </div>
        );

    //JavaScript code
    function countWords(str) {
    //Edge case: an empty array
      if (str.length === 0) {
        return {};
      }
      var output = {};
      var strArr = str.split(" ")
    //A loop
      for (var i=0; i < strArr.length; i++) {
        var word = strArr[i];
        if (output[word] === undefined) {
          output[word] = 1;
        } else {
          output[word] += 1;
        }

      }
      return output;
    }
    /* TEST CODE */
    var output = countWords('ask a bunch get a bunch');
    console.log(output);
    // { ask: 1, a: 2, bunch: 2, get: 1 }


    return (
        <div>

        </div>
    );
}

export default Nlp;