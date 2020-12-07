var express = require('express');
var router = express.Router();
const fetch = require("node-fetch");
const googleTrends = require('google-trends-api');
//const querystring = require('querystring');
router.get('/nytimes', async function func(req, res){
    console.log("inside")
    var section=req.query.section;
    console.log("section: ",section);
    var option = req.query.q;
    console.dir("q: ",option);
    var apiKey=req.query.apiKey;
    if(typeof option ==='undefined')
    {
        var response = await fetch(`https://api.nytimes.com/svc/topstories/v2/${section}.json?api-key=${apiKey}`)  
        var json = await response.json()
        //console.log(json)
        res.send(json)
    }
    else{
        var response = await fetch(`https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${option}&api-key=${apiKey}`)  
        var json = await response.json()
        //console.log(json)
        res.send(json)
    }
         
});

router.get('/guardian', async function func(req, res){
    console.log("inside")
    var apiKey=req.query.apiKey;
    var option=req.query.q;
    if(typeof option === 'undefined')
    {
        var response = await fetch(`https://content.guardianapis.com/search?api-key=${apiKey}&section=(sport|business|technology|politics)&show-blocks=all`)  
        var json = await response.json()
        //console.log(json)
        res.send(json)
    }
    else
    {
        var response = await fetch(`https://content.guardianapis.com/search?q=${option}&api-key=${apiKey}&show-blocks=all`)  
        var json = await response.json()
        //console.log(json)
        res.send(json)
    }
         
});

router.get('/guardianSection', async function func(req, res){
    console.log("inside guardian sectionwise api")
    var apiKey=req.query.apiKey;
    var section=req.query.section;
    var response = await fetch(`https://content.guardianapis.com/${section}?api-key=${apiKey}&show-blocks=all`)  
    var json = await response.json()
    //console.log(json)
    res.send(json)     
});
    

router.get('/google-trends', async function func(req, res){
    console.log("inside");
    var keyword=req.query.keyword;
    // if(typeof option === 'undefined')
    // {
    //     var response = await fetch(`https://content.guardianapis.com/search?api-key=${apiKey}&section=(sport|business|technology|politics)&show-blocks=all`)  
    //     var json = await response.json()
    //     //console.log(json)
    //     res.send(json)
    // }
    // else
    // {
    //     var response = await fetch(`https://content.guardianapis.com/search?q=${option}&api-key=${apiKey}&show-blocks=all`)  
    //     var json = await response.json()
    //     //console.log(json)
    //     res.send(json)
    // }
    var startDate = new Date('2019-06-01');
    if(typeof keyword == 'undefined')
    {
        googleTrends.interestOverTime({keyword: 'coronavirus', startTime: startDate, endTime: new Date(Date.now())}).then(function(results){
            console.log(results);
          })
          .catch(function(err){
            console.error(err);
          });
    }
    else{

        googleTrends.interestOverTime({keyword: keyword, startTime: startDate, endTime: new Date(Date.now())}).then(function(results){
            var resultsJson = JSON.parse(results);
            // var valueArr = resultsJson.default.timelineData;
            // var arr=[];
            // for(i=0;i<valueArr.length;i++)
            // {
            //     console.log(valueArr[i].value);
            //     arr.push(valueArr[i].value[0]);
            // }
            // console.log(arr);
            res.send(resultsJson);
          })
          .catch(function(err){
            console.error(err);
          });
    }
    
         
});

// router.get('/guardianHome', async function func(req, res){
//     console.log("inside")
//     var apiKey=req.query.apiKey;
    
//         //var response = await fetch(`https://content.guardianapis.com/search?api-key=${apiKey}&section=(sport|business|technology|politics)&show-blocks=all`)  
//         var response = await fetch(`https://content.guardianapis.com/search?api-key=${apiKey}&order-by=newest&show-fields=starRating,headline,thumbnail,short-url`)
//         var json = await response.json()
//         //console.log(json)
//         res.send(json)        
// });

router.get('/guardianHome', async function func(req, res){
    console.log("inside guardian home api")
    var apiKey=req.query.apiKey;
    console.log("api-key:"+apiKey);
    var response = await fetch(`https://content.guardianapis.com/search?api-key=${apiKey}&order-by=newest&show-fields=starRating,headline,thumbnail,short-url`)  
    var json = await response.json()
    //console.log(json)
    res.send(json)     
});

// router.get('/details', async function func(req, res){
//     console.log("inside guardian sectionwise api")
//     var apiKey=req.query.apiKey;
//     var id=req.query.id;
//     var response = await fetch(`https://content.guardianapis.com/${section}?api-key=${apiKey}&show-blocks=all`)  
//     var json = await response.json()
//     //console.log(json)
//     res.send(json)     
// });
module.exports = router;