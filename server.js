"use strict";

// import the needed node_modules.
const express = require("express");
const morgan = require("morgan");

let somethingFunny = false;

express()
  // Below are methods that are included in express(). We chain them for convenience.
  // --------------------------------------------------------------------------------

  // This will give us will log more info to the console. see https://www.npmjs.com/package/morgan
  .use(morgan("tiny"))

  // Any requests for static files will go into the public folder
  .use(express.static("public"))

  // Nothing to modify above this line
  // ---------------------------------
  // add new endpoints here 👇

  .get("/cat-message", (req, res) => {
    const message = { author: "cat", text: "Meow" };
    const randomTime = Math.floor(Math.random() * 3000);
    setTimeout(() => {
      res.status(200).json({ status: 200, message });
    }, randomTime);
  })

  .get("/monkey-message", (req, res) => {
    const messages = [
      "Don’t monkey around with me.",
      "If you pay peanuts, you get monkeys.",
      "I fling 💩 at you!",
      "🙊",
      "🙈",
      "🙉",
    ];
    const randomTime = Math.floor(Math.random() * 3000);

    const message = {
      author: "monkey",
      text: messages[Math.floor(Math.random() * messages.length)],
    };

    setTimeout(() => {
      res.status(200).json({ status: 200, message });
    }, randomTime);
  })

  .get("/parrot-message", (req, res) => {
    const text = req.query;
    console.log(req.query);
    console.log(res, req);
    const message = { author: "parrot", text };
    const randomTime = Math.floor(Math.random() * 3000);
    setTimeout(() => {
      res.status(200).json({ status: 200, message });
    }, randomTime);
  })

  .get("/bot-message", (req, res) => {
    const text = req.query;
    // console.log(text)
    const getBotMessage = (text) => {
      const jokes = ['the US election', `What happens to a frog's car when it breaks down?
      It gets toad away.`, `Q: Is Google male or female?
      A: Female, because it doesn't let you finish a sentence before making a suggestio`]
      const randomJoke = Math.round(Math.random() * jokes.length)
      const commonGoodbyes = ["goodbye"];
      const commonGreetings = ["hi", "hello", "howdy"];
      let botMsg = "";
      if (text.text == "something funny") {
        botMsg = "Do you want to hear a joke?";
        somethingFunny = true;
      } else if (somethingFunny == true && text.text == "YES") {
        botMsg = `${jokes[randomJoke]} - Want Another?`;
      } else if (somethingFunny == true && text.text == "NO") {
        botMsg = "Goodbye";
        somethingFunny = false
      } else if (commonGreetings.includes(text.text.toLowerCase())) {
        botMsg = "Hello!";
      } else if (commonGoodbyes.includes(text.text.toLowerCase())) {
        botMsg = "Goodbye";
      } else {
        botMsg = `${text.text}`;
      }
      return botMsg;
    };

    const message = { author: "bot", text: `Bzzt ${getBotMessage(text)}` };
    const randomTime = Math.floor(Math.random() * 3000);
    setTimeout(() => {
      res.status(200).json({ status: 200, message });
    }, randomTime);
  })

  // add new endpoints here ☝️
  // ---------------------------------
  // Nothing to modify below this line

  // this serves up the homepage
  .get("/", (req, res) => {
    res
      .status(200)
      .json({ status: 200, message: "This is the homepage... it's empty :(" });
  })

  // this is our catch all endpoint. If a user navigates to any endpoint that is not
  // defined above, they get to see our 404 page.
  .get("*", (req, res) => {
    res.status(404).json({
      status: 404,
      message: "This is obviously not the page you are looking for.",
    });
  })

  // Node spins up our server and sets it to listen on port 8000.
  .listen(8000, () => console.log(`Listening on port 8000`));
