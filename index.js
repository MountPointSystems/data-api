//
//
//Express: backend JS framework for NodeJS 
//__________--------->>>>>> to run:   node index.js or...npm run dev 
//
const express = require('express');
// Cross Origin Resource Sharing -- CORS 
const cors = require('cors'); 

//Axios: promised-based HTTP client for JavaScript. It has the ability to make HTTP requests 
//from the browser and handle the transformation of request and response data.
const axios = require('axios'); 

// instantiate the Express server
const { response } = require("express");

const app = express(); 
app.use(express.json()); 

// Cross Origin Resource Sharing -- CORS 
app.use(cors());

//create an array for data 
const datalist = []; 

//create a '/hello' endpoint, with get method, on the express server 
app.get ('/hello', (req, res) => {
    res.status(200).send('["Hello World. Don\'t forget to spin those chakras every morning!!!"]'); 
    return;
}); 

//create a '/data' endpoint, with get method, on the express server 
app.get ('/data', (req, res) => {
    res.status(200).send(datalist); 
    return;
}); 

//create a '/data' endpoint, with the POST command, on the express server 
app.post ('/data', (req, res) => {
    let data = req.body; 
    datalist.push(data); 
    res.status(201).send(data); 
    return;
}); 

//create the swanson end point 
app.get ('/swanson', (req, res) => { 
    axios.get('https://ron-swanson-quotes.herokuapp.com/v2/quotes')
    .then(response => {
        console.log(`>>>>> now in swanson`); 
        console.log(response.data);
        res.status(200).send(response.data);
    }, error => {
    console.log(error);
    });
    return; 
});

//create the jokes end point 
app.get ('/jokes', (req, res) => { 
    axios.get('https://official-joke-api.appspot.com/random_joke')
    .then(response => {
        console.log(response.data);
        res.status(200).send(response.data);
    }, error => {
    console.log(error);
    });
    return; 
});

  // create the swanson2 end point --- test version  
  // /swanson2 logs the result in console. does not display on browser though.
  // No errors, but I think it's returning a blank string. 
  // putting the res.status in nextRon results in a runtime error it doesn't 
  // know what res.status is... 
  // 
app.get ('/swanson2', (req, res) => { 
    nextRon()
//    res.status(200).send(response.data);
    return; 
    });
///////////////////////////////////
const getBreeds = async () => {
    try {
        console.log('..........getBreeds');
        return await axios.get('https://dog.ceo/api/breeds/list/all')
    } catch (error) {
      console.error(error)
    }
    }
// 
//
const countBreeds = async () => {
    const breeds = await getBreeds()
    console.log('..........countBreeds');
    if (breeds.data.message) {
      console.log(`Got ${Object.entries(breeds.data.message).length} breeds`)
    }
  }


  ///////////////////////////////////  
  const getRon = async () => {
    try {
        console.log('..........getRon: use axios.get to a herokuapp Swanson server');
        return await axios.get('https://ron-swanson-quotes.herokuapp.com/v2/quotes')   
    } catch (error) {
      console.error(error)
    }
    }
   
  const nextRon = async () => {
        console.log('..........nextRon: 1-invoking getRon');
        const Ron = await getRon()
        console.log('..........nextRon: 2-guess whos back');
        if (Ron.data) {
          console.log(`..........Start: ${Object.entries(Ron.data)}`  );
          console.log('..........nextRon: -3 exiting');
        }
      }

/////////////////////////////////////////

//axios.get('https://ron-swanson-quotes.herokuapp.com/v2/quotes')
//  .then(response => {
//    console.log(response.data);
//  }, error => {
//    console.log(error);
//  });

function axiosTest() {
    const promise = axios.get('https://ron-swanson-quotes.herokuapp.com/v2/quotes')

    // using .then, create a new promise which extracts the data
    const dataPromise = promise.then((response) => response.data)

    // return it
    return dataPromise
}

// this will call the function countBreeds, which call getBreeds. output looks like this...
//  ..........getBreeds
//  ..........countBreeds'
// this was created mainly for learning purposes.      
//countBreeds()

// same as countBreeds above, this is only for learning.
//console.log(`..........Now invoking nextRon`);
//nextRon()

// countBreeds and nextRon, in the locations immediatley above, will run when the program runs 
// not what I wanted. I wanted to call Swanson Quotes when a button is clicked 
// that what app.get ('/swanson') * 

//fire up the express server we just created 
app.listen({port: 8080}, () => {
    console.log('Server is now running on port 8080!');
    console.log('try hitting the enpoint below.');  
    console.log('/swanson'); 
    console.log('/swanson2')
    console.log('/jokes')
    console.log('/hello')
}); 
