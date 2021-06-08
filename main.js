const express = require("express");
const puppeteer = require("puppeteer");
const request = require("request");

const app = express();

app.use("/_next", express.static(".next"));
// app.use("/", express.static("public"));

app.use("/:path(*)", async (req, res) => {
  try {
    /* 
    Browser <-> Express <-> NextJS
    */
    const { path } = req.params;
    const { mode } = req.query;
    const { host } = req.headers;

    const useRequest = mode === "request";

    const url = "http://localhost:3000/" + host.replace(":", "") + "/" + path;
    console.log(url, useRequest);

    if (useRequest) {
      request(url, function (error, response, body) {
        if (error) {
          console.log(error);
        } else {
          res.send(body);
        }
      });
      return;
    } else {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.goto(url);
      const data = await page.evaluate(
        () => document.querySelector("*").outerHTML
      );

      await browser.close();

      res.send(data);
    }
  } catch (err) {
    console.log(err);
  }
});

app.listen(4000, () => {
  console.log("App started on 4000!");
});
