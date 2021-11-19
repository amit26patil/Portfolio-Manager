//import your handler file or main file of Lambda
let testLambda = require('./index');

//Call your exports function with required params
//In AWS lambda these are event, content, and callback
//event and content are JSON object and callback is a function
// { "body": "{\"testName\": \"GoogleSearchTest\", \"parameters\": {\"searchText\" : \"Tavisca\"} }" }
// { "body": "{\"testName\": \"HotelSearchTest\", \"parameters\": {\"specs\" : \"./lib/test-packages/hotel-search/*.feature.js\"} }" }

testLambda.handler({ "body": "{}" }
    , {}, function (data, ss) { console.log(data); });