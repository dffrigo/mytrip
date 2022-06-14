# My Trip
> Database with a summary of wonderful locations that I once visited | Travel | Nice places

<img width="361" alt="MIT JavaScript EJS HTML CSS" src="https://user-images.githubusercontent.com/102762000/170799710-524148ec-5387-403a-8128-1ad481eda2df.png">

Dear guests! The Trip continuation project (please see the repo https://github.com/dffrigo/Trip). I present a summary of wonderful locations that I once visited. Enjoy! Now using PostgreSQL database...

![my personal Landmarks](https://user-images.githubusercontent.com/102762000/172967798-64ef66a8-5bfe-470c-a2b7-98a3a926d714.png)

## Installation

Windows based
- JavaScript (Vanilla)
- Node.js v16.14.0.
- HTML
- EJS
- CSS

Requirements:

Heroku account (or some similar to deploy)
```sh
npm init
npm i nodemon --save-dev
npm i express --save
npm i --save ejs
npm i dotenv

npm run dev //from root folder to running Nodemon server

EXPRESS START TEMPLATE:
const express = require("express");
const app = express();

app.get("/", function (req, res) {
  res.send("Hello World");
});

app.listen(3000);

```


## Usage

Create and view new touristic locations.


## Release History

* 0.0.1
    * First version