var express = require("express");
var router = express.Router();
var axios = require("axios");
var fs = require("fs");
var jsdom = require("jsdom");
var request = require("request");
var moment = require("moment");

    router.get("/", function (req, res) {
        res.render("repricer");
    });

    router.post("/sendmpns", function (req, res) {
        console.log(__dirname);
        console.log(req.body.data);
        req.body.data.forEach(function (element) {
            var query = element.substring(2,element.length);
            var options = {
                url: "https://api.ebay.com/buy/browse/v1/item_summary/search?q=poster+" + query + "&filter=sellers:{starcitybooks}&limit=1", 
                headers: {
                    "Authorization": "Bearer " + req.body.token
                }
            }
            request(options, function (error, body, html) {
                console.log(html);
                console.log("__________");
                var responseString = JSON.parse(html);
                if (responseString.itemSummaries != null) {
                    fs.appendFile("../../../../../Desktop/repricer_export_" + moment().format("MMM-Do-YYYY") + ".txt",element + "\t" + responseString.itemSummaries[0].title + "\t" + responseString.itemSummaries[0].price.value + "\r\n", function (err) {
                        if (err) {
                            res.send(err);
                        }
                        else {
                            console.log("Saved!");
                        }
                    });
                }
            });
        });
            
    });


module.exports = router;