var express = require("express");
var app = express();
const request = require("request");
app.use(express.static("public"));

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.set("view engine", "ejs");
app.set("views", "./views");

var admin = require("firebase-admin");

// Fetch the service account key JSON file contents
var serviceAccount = require("./data-admin-867b5-firebase-adminsdk-979a5-56de82e34f.json");

// Initialize the app with a service account, granting admin privileges
var admin0 = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://data-admin-867b5.firebaseio.com"
},'admin0');

// As an admin, the app has access to read and write all data, regardless of Security Rules
var database = admin0.database();

var serviceAccount1 = require("./data-1-82099-firebase-adminsdk-iosm3-a654527a04.json");

var admin1 = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount1),
  databaseURL: "https://data-1-82099.firebaseio.com"
},'admin1');

// As an admin, the app has access to read and write all data, regardless of Security Rules
var database1 = admin1.database();

var serviceAccount2 = require("./data-2-6a867-firebase-adminsdk-8ava4-7d620f3c54.json");

var admin2 = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount2),
  databaseURL: "https://data-2-6a867.firebaseio.com"
},'admin2');

// As an admin, the app has access to read and write all data, regardless of Security Rules
var database2 = admin2.database();

app.listen(3000);

app.get("/:id", function(req, res) {
    var id = req.params['id'].split("*")[0];
    var key = req.params['id'].split("*")[1];
    database2.ref('/user/' + key).once('value').then(function(a) {
        if (parseInt(a.val().CoinTotal) > parseInt(a.val().CoinUsed)) {
            database.ref('/answer/' + id).once('value').then(function(b) {
                if (b.val() != "" && b.val() != null && b.val() != "null" && b.val() != undefined && b.val() != "undefined" ) {		    
                    res.send(b.val());
                } else {
                    database.ref('/answernull/'+id).set(1);
                    res.send("null");
                }
            });
        }else {
            res.send("null");
        }
    });
});

app.get("/true/:id", function(req, res) {
    var id = req.params['id'];
	if(id != "" && id != "undefined" && id != "null" && id != undefined && id != null){
		database.ref('/answer/' + id.split("*")[0]).set(id.split("*")[1]);
    		database.ref('/answernull/' + id.split("*")[0]).remove();

		database1.ref('/answer/' + id.split("*")[0]).set(id.split("*")[1]);

		database2.ref('/answer/' + id.split("*")[0]).set(id.split("*")[1]);

    		res.send('Done');
	}
	else{
		res.send('Fail');
	}
    
});

app.get("/false/:id", function(req, res) {
    var id = req.params['id'];
     database.ref('/answer/' + id.split("*")[0]).once('value').then(function(a) {
         if (a.val().trim().toLowerCase().includes(id.split("*")[1].trim().toLowerCase()) || id.split("*")[1].trim().toLowerCase().includes(a.val().trim().toLowerCase())) {
             database.ref('/answer/' + id.split("*")[0]).remove();
         }
     });
    res.send('Done');
});

app.get("/svg/:id", function(req, res) {
    var key = req.params['id'];
    database.ref('/SolveSVG/' + key).once('value').then(function(a) {
	res.send(a.val());
    });    
});

app.get("/svgaddfunds/:id", function(req, res) {
    var key = req.params['id'].split("*")[0];
    var coin = req.params['id'].split("*")[1];
    database.ref('/SolveSVG/' + key).once('value').then(function(a) {
	if(parseInt(a.val().CoinPending) == 0){
		database.ref('/SolveSVG/' + key + '/CoinPending').set(coin);
		database.ref('/SolveSVG/' + key + '/CoinTotal').set(parseInt(a.val().CoinTotal) + parseInt(coin));
		res.send("done");
	}
	else{
		res.send("fail");
	}
    });    
});

app.get("/setanswercap/:id", function(req, res) {
    var key = req.params['id'].split("*")[0];
    var answer = req.params['id'].split("*")[1];
    database1.ref('/CaptchaImgFreeBitcoin/' + key).set(answer);    
});
app.get("/getanswercap/:id", function(req, res) {
    var key = req.params['id'];
    database1.ref('/CaptchaImgFreeBitcoin/' + key).once('value').then(function(a) {    
        res.send(a.val());
    });   
});

app.post("/solveimagecaptchafreebitcoin", function(req, res) {
    var img = req.body.img.replace(/ /g, "+");
    var key = req.body.key;
    if(key=="7uedkq96q6ttdxxbc7pczkdbrjj3zrgs"){
        key="2fdfda4324a5b46250af7a65c2e85953";
    }
    else if(key=="7seueeyy2w7i62ivcpv8bqez6bmjovi9"){
        key="dcfaa2bb79113eb501d40738cf8685fc";
    }
    else if(key=="j85sc0mr8b5kjxz7h3bd346ubdzmmhdz"){
        key="db788c49c735aeaa2a4a26e258e06005";
    }
    else if(key=="uyglx1phd3c821r8d1lmr5rcbz9lo6mq"){
        key="db788c49c735aeaa2a4a26e258e06005";
    }
    else if(key=="wgouealdl8auq432wj5nvufjn4s13ej3"){
        key="d8b037bbdc9776e0ffc146ce51c8b899";
    }
    else if(key=="m2uqkt6hh5hine80wjst0ciq9qthzcng"){
        key="d8b037bbdc9776e0ffc146ce51c8b899";
    }
    else if(key=="wulotx1i0gw5t9jt21tao3en4ppf01pl"){
        key="d8b037bbdc9776e0ffc146ce51c8b899";
    }
    else if(key=="fv0oisjbez7pggctx5uxmpdb3z6a4z3h"){
        key="d8b037bbdc9776e0ffc146ce51c8b899";
    }
    else if(key=="3fk3vbv4zwmgdccn2x9iiwmpftvuryy9"){
        key="d8b037bbdc9776e0ffc146ce51c8b899";
    }

    request.post({
        headers: {'content-type' : 'application/x-www-form-urlencoded'},
        url: 'https://supercaptchas.com/in.php',
        body:    "method=base64&key="+key+"&type=0&body="+img
    }, function(error, response, body) {
        res.send(body);        
    });
});

app.post("/solveimagecaptcha1", function(req, res) {
    var img = req.body.img.replace(/ /g, "+");
    var key = req.body.key;
    if(key=="7uedkq96q6ttdxxbc7pczkdbrjj3zrgs"){
        key="2fdfda4324a5b46250af7a65c2e85953";
    }
    else if(key=="7seueeyy2w7i62ivcpv8bqez6bmjovi9"){
        key="dcfaa2bb79113eb501d40738cf8685fc";
    }
    else if(key=="j85sc0mr8b5kjxz7h3bd346ubdzmmhdz"){
        key="db788c49c735aeaa2a4a26e258e06005";
    }
    else if(key=="uyglx1phd3c821r8d1lmr5rcbz9lo6mq"){
        key="db788c49c735aeaa2a4a26e258e06005";
    }
    else if(key=="wgouealdl8auq432wj5nvufjn4s13ej3"){
        key="d8b037bbdc9776e0ffc146ce51c8b899";
    }
    else if(key=="m2uqkt6hh5hine80wjst0ciq9qthzcng"){
        key="d8b037bbdc9776e0ffc146ce51c8b899";
    }
    else if(key=="wulotx1i0gw5t9jt21tao3en4ppf01pl"){
        key="d8b037bbdc9776e0ffc146ce51c8b899";
    }
    else if(key=="fv0oisjbez7pggctx5uxmpdb3z6a4z3h"){
        key="d8b037bbdc9776e0ffc146ce51c8b899";
    }
    else if(key=="3fk3vbv4zwmgdccn2x9iiwmpftvuryy9"){
        key="d8b037bbdc9776e0ffc146ce51c8b899";
    }

    request.post({
        headers: {'content-type' : 'application/x-www-form-urlencoded'},
        url: 'https://supercaptchas.com/in.php',
        body:    "method=base64&key="+key+"&type=1&body="+img
    }, function(error, response, body) {
        res.send(body);        
    });
});

app.post("/solveimagecaptcha2", function(req, res) {
    var id=req.body.id;
    var typeCap=req.body.type;
    var key = req.body.key;
    if(key=="7uedkq96q6ttdxxbc7pczkdbrjj3zrgs"){
        key="2fdfda4324a5b46250af7a65c2e85953";
    }
    else if(key=="7seueeyy2w7i62ivcpv8bqez6bmjovi9"){
        key="dcfaa2bb79113eb501d40738cf8685fc";
    }
    else if(key=="j85sc0mr8b5kjxz7h3bd346ubdzmmhdz"){
        key="db788c49c735aeaa2a4a26e258e06005";
    }
    else if(key=="uyglx1phd3c821r8d1lmr5rcbz9lo6mq"){
        key="db788c49c735aeaa2a4a26e258e06005";
    }
    else if(key=="wgouealdl8auq432wj5nvufjn4s13ej3"){
        key="d8b037bbdc9776e0ffc146ce51c8b899";
    }
    else if(key=="m2uqkt6hh5hine80wjst0ciq9qthzcng"){
        key="d8b037bbdc9776e0ffc146ce51c8b899";
    }
    else if(key=="wulotx1i0gw5t9jt21tao3en4ppf01pl"){
        key="d8b037bbdc9776e0ffc146ce51c8b899";
    }
    else if(key=="fv0oisjbez7pggctx5uxmpdb3z6a4z3h"){
        key="d8b037bbdc9776e0ffc146ce51c8b899";
    }
    else if(key=="3fk3vbv4zwmgdccn2x9iiwmpftvuryy9"){
        key="d8b037bbdc9776e0ffc146ce51c8b899";
    }
        request('http://supercaptchas.com/res.php?key='+key+'&action=get&id='+id, function(err, resa, body) {
            if(body!="CAPCHA_NOT_READY" && body!="ERROR" ){
                if(typeCap.includes("alphabet")){
                    res.send(body.replace( /[^a-z]/g, '' ).toString());
                }
                else if(typeCap.includes("number")){
                    res.send(body.replace( /[^0-9]/g, '' ).toString());
                }
                else{
                    res.send(body);
                }  
            }
            else{
                res.send(body);
            }

        });
});

app.post("/solveimagecaptchacreatetask", function(req, res) {
	var img = req.body.img.replace(/ /g, "+");
    var key = req.body.key;
    database.ref('/SolveImage/' + key).once('value').then(function(a) {
        if (parseInt(a.val().CoinTotal) > parseInt(a.val().CoinUsed)) {
            var json_send = {
                "task": {
                    "phrase": true,
                    "case": true,
                    "numeric": 0,
                    "math": true,
                    "minLength": 0,
                    "maxLength": 0,
                    "type": "ImageToTextTask",
                    "comment": "",
                    "body": img
                },
                "softId": 0,
                "languagePool": "rn",
                "clientKey": "6b327e078429c53aa6f333dfb176bd4a"
            };
            request.post({
                headers: {
                    'content-type': 'application/json'
                },
                url: 'https://api.captcha.guru/createTask',
                body: JSON.stringify(json_send)
            }, function(error, response, body) {
		if (JSON.parse(body).errorId == 0) {
			database.ref('/SolveImage/' + key + '/CoinUsed').set(parseInt(a.val().CoinUsed) + 1);
			res.send(JSON.parse(body).taskId.toString());
		}
		else{
			res.send("reload");
		}    
		
            });
        }
    });  
});

app.post("/solveimagecaptchagettaskresult", function(req, res) {
    var id=req.body.img.split("*")[0];
    var typeCap=req.body.img.split("*")[1];
    var json_check_result = {
        "taskId": id,
        "clientKey": "6b327e078429c53aa6f333dfb176bd4a"
    };
    request.post({
        headers: {
            'content-type': 'application/json'
        },
        url: 'https://api.captcha.guru/getTaskResult',
        body: JSON.stringify(json_check_result)
    }, function(error, response, body) {
        if (JSON.parse(body).errorId == 0 && JSON.parse(body).status == 'ready') {
            if(typeCap.includes("alphabet")){
                res.send(JSON.parse(body).solution.text.toString()+"*"+JSON.parse(body).solution.text.replace( /[^a-z]/g, '' ).toString());
            }
            else if(typeCap.includes("number")){
                res.send(JSON.parse(body).solution.text.toString()+"*"+JSON.parse(body).solution.text.replace( /[^0-9]/g, '' ).toString());
            }
            else{
                res.send(JSON.parse(body).solution.text.toString());
            }  
        }
        else{
            res.send("reload");
        }
    });
});

app.post("/solvevisualcaptcha", function(req, res) {
    var codeImage = GetImage(req.body.solutiontext);
    var imgindex = req.body.imgindex;
    var imgtext = req.body.imgtext.replace(/ /g, "+");
    if (imgtext.substr(0, 1000) == codeImage) {
        res.send(imgindex);
    } else {
        res.send("false");
    }
});

app.post("/solveanswersvg2", function(req, res) {
	var answer = req.body.answer.replace(" ","");
    var listAnswerAll = req.body.listanswer.split("*");
    var listAnswer=[];
    var listChart=[];
    var answerNow="";
    for (var i = 0; i < listAnswerAll.length; i++) {
        listAnswer=listAnswerAll[i].split(",");
	listChart=[];
        for (var j = 0; j < listAnswer.length; j++) {
            listChart.push(GetM(listAnswer[j])+'|'+all_character[listAnswer[j].replace(/[0-9]|\.| |-/g, '')]);
        }
        listChart.sort(function(a, b){return a.split("|")[0]-b.split("|")[0]});
        answerNow="";
        for (var k = 0; k < listChart.length; k++) {
            answerNow=answerNow+listChart[k].split("|")[1];
        }
        
        if (answerNow.toLowerCase().replace("-","").includes(answer) || answer.includes(answerNow.toLowerCase().replace("-",""))) {
            res.send(i.toString());
            break;
        }
    }
    res.send("null");
});

var all_character = {
    "\x4D\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x5A\x4D\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x5A\x4D\x4C\x4C\x51\x4C\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x5A\x4D\x4C\x4C\x51\x4C\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x5A\x4D\x4C\x4C\x51\x4C\x4C\x4C\x51\x4C\x4C\x51\x5A\x4D\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x5A": '0',
    "\x4D\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x5A\x4D\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x5A": '1',
    "\x4D\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x5A\x4D\x4C\x4C\x51\x4C\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x4C\x51\x4C\x4C\x4C\x51\x4C\x4C\x51\x5A": '2',
    "\x4D\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x5A\x4D\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x4C\x4C\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x5A": '3',
    "\x4D\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x5A\x4D\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x5A\x4D\x4C\x4C\x51\x4C\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x4C\x51\x4C\x4C\x4C\x51\x4C\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x5A\x4D\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x5A": '4',
    "\x4D\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x5A\x4D\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x4C\x4C\x4C\x51\x4C\x4C\x4C\x51\x4C\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x5A": '5',
    "\x4D\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x5A\x4D\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x5A\x4D\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x5A\x4D\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x5A": '6',
    "\x4D\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x5A\x4D\x4C\x4C\x4C\x51\x4C\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x4C\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x4C\x51\x4C\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x4C\x51\x5A": '7',
    "\x4D\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x5A\x4D\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x5A\x4D\x4C\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x5A\x4D\x4C\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x4C\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x4C\x4C\x51\x4C\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x5A\x4D\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x5A\x4D\x4C\x4C\x51\x4C\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x5A": '8',
    "\x4D\x4C\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x5A\x4D\x4C\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x5A\x4D\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x4C\x51\x5A\x4D\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x5A": '9',
    "\x4D\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x5A\x4D\x4C\x4C\x51\x4C\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x5A\x4D\x4C\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x4C\x51\x4C\x4C\x51\x5A\x4D\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x5A": 'a',
    "\x4D\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x5A\x4D\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x5A\x4D\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x4C\x51\x5A\x4D\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x4C\x51\x5A": 'b',
    "\x4D\x4C\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x5A\x4D\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x5A": 'c',
    "\x4D\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x5A\x4D\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x5A\x4D\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x5A\x4D\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x5A": 'd',
    "\x4D\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x5A\x4D\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x5A\x4D\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x4C\x51\x5A\x4D\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x5A\x4D\x4C\x4C\x51\x4C\x4C\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x5A": 'e',
    "\x4D\x4C\x4C\x51\x4C\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x4C\x51\x4C\x4C\x51\x5A\x4D\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x4C\x51\x4C\x4C\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x5A": 'f',
    "\x4D\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x5A\x4D\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x5A\x4D\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x4C\x51\x4C\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x4C\x51\x4C\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x4C\x51\x4C\x4C\x4C\x51\x5A\x4D\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x5A": 'g',
    "\x4D\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x5A\x4D\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x4C\x51\x4C\x4C\x51\x5A": 'h',
    "\x4D\x4C\x4C\x51\x4C\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x5A\x4D\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x5A\x4D\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x5A\x4D\x4C\x4C\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x5A": 'i',
    "\x4D\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x5A\x4D\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x5A\x4D\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x4C\x51\x4C\x4C\x4C\x4C\x51\x4C\x4C\x51\x5A\x4D\x4C\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x5A": 'j',
    "\x4D\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x5A\x4D\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x5A": 'k',
    "\x4D\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x5A\x4D\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x5A": 'l',
    "\x4D\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x5A\x4D\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x4C\x51\x4C\x4C\x51\x5A\x4D\x4C\x4C\x4C\x5A": 'm',
    "\x4D\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x5A\x4D\x4C\x4C\x51\x4C\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x5A": 'n',
    "\x4D\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x5A\x4D\x4C\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x5A\x4D\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x4C\x51\x4C\x4C\x51\x5A\x4D\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x5A": 'o',
    "\x4D\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x5A\x4D\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x4C\x51\x4C\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x5A\x4D\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x4C\x4C\x4C\x51\x4C\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x5A\x4D\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x4C\x51\x4C\x4C\x4C\x51\x4C\x4C\x4C\x51\x4C\x4C\x51\x5A": 'p',
    "\x4D\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x5A\x4D\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x5A\x4D\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x5A\x4D\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x5A": 'q',
    "\x4D\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x5A\x4D\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x5A\x4D\x4C\x4C\x4C\x5A": 'r',
    "\x4D\x4C\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x5A\x4D\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x4C\x4C\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x4C\x51\x4C\x4C\x51\x5A": 's',
    "\x4D\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x5A\x4D\x4C\x4C\x51\x4C\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x4C\x51\x4C\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x5A": 't',
    "\x4D\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x5A\x4D\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x4C\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x5A": 'u',
    "\x4D\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x5A\x4D\x4C\x4C\x51\x4C\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x4C\x51\x4C\x4C\x4C\x51\x5A": 'v',
    "\x4D\x4C\x4C\x51\x4C\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x4C\x51\x5A\x4D\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x4C\x51\x4C\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x5A": 'w',
    "\x4D\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x5A\x4D\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x4C\x51\x5A": 'x',
    "\x4D\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x4C\x51\x4C\x4C\x51\x5A\x4D\x4C\x4C\x51\x4C\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x4C\x51\x4C\x4C\x51\x5A": 'y',
    "\x4D\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x5A\x4D\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x4C\x51\x4C\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x5A": 'z',
    "\x4D\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x5A\x4D\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x5A\x4D\x4C\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x4C\x51\x4C\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x5A\x4D\x4C\x4C\x51\x4C\x4C\x4C\x51\x5A": 'A',
    "\x4D\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x5A\x4D\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x5A\x4D\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x5A\x4D\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x5A\x4D\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x5A\x4D\x4C\x4C\x4C\x51\x4C\x4C\x4C\x4C\x4C\x51\x4C\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x5A": 'B',
    "\x4D\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x5A\x4D\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x5A": 'C',
    "\x4D\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x5A\x4D\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x5A\x4D\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x5A\x4D\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x5A": 'D',
    "\x4D\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x5A\x4D\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x5A": 'E',
    "\x4D\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x5A\x4D\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x5A": 'F',
    "\x4D\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x5A\x4D\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x4C\x51\x4C\x4C\x5A": 'G',
    "\x4D\x4C\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x5A\x4D\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x5A": 'H',
    "\x49": 'I',
    "\x4D\x4C\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x5A\x4D\x4C\x4C\x4C\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x5A": 'J',
    "\x4D\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x4C\x4C\x4C\x51\x5A\x4D\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x5A": 'K',
    "\x4D\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x5A\x4D\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x5A": 'L',
    "\x4D\x4C\x4C\x51\x4C\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x5A\x4D\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x5A": 'M',
    "\x4D\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x5A\x4D\x4C\x4C\x51\x4C\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x5A": 'N',
    "\x4D\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x5A\x4D\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x5A\x4D\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x5A\x4D\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x5A": 'O',
    "\x4D\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x5A\x4D\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x5A\x4D\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x5A\x4D\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x4C\x51\x5A": 'P',
    "\x4D\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x4C\x51\x4C\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x5A\x4D\x4C\x4C\x51\x4C\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x5A\x4D\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x5A\x4D\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x4C\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x5A": 'Q',
    "\x4D\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x5A\x4D\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x5A\x4D\x4C\x4C\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x5A\x4D\x4C\x4C\x51\x4C\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x5A": 'R',
    "\x4D\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x5A\x4D\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x4C\x51\x4C\x4C\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x4C\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x5A": 'S',
    "\x4D\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x5A\x4D\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x5A": 'T',
    "\x4D\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x5A\x4D\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x5A": 'U',
    "\x4D\x4C\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x5A\x4D\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x5A": 'V',
    "\x4D\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x4C\x51\x4C\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x4C\x51\x5A\x4D\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x4C\x51\x4C\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x5A": 'W',
    "\x4D\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x5A\x4D\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x5A": 'X',
    "\x4D\x4C\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x5A\x4D\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x5A": 'Y',
    "\x4D\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x4C\x51\x4C\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x5A\x4D\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x4C\x51\x5A": 'Z',
    "\x4D\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x5A\x4D\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x5A\x4D\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x5A\x4D\x4C\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x5A": '-',
    "\x4D\x4C\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x4C\x4C\x51\x5A\x4D\x4C\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x5A": ',',
    "\x4D\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x4C\x51\x5A\x4D\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x4C\x51\x4C\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x4C\x51\x4C\x4C\x4C\x51\x5A": '+',
    "\x4D\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x5A\x4D\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x5A\x4D\x4C\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x4C\x51\x4C\x4C\x4C\x4C\x4C\x4C\x51\x4C\x4C\x4C\x51\x4C\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x5A\x4D\x4C\x4C\x4C\x5A": '?',
    "\x4D\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x5A\x4D\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x4C\x51\x5A": '(',
    "\x4D\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x5A\x4D\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x5A": ')',
    "\x4D\x4C\x4C\x4C\x51\x4C\x4C\x4C\x51\x4C\x4C\x51\x5A\x4D\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x5A\x4D\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x5A\x4D\x4C\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x4C\x51\x4C\x4C\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x5A": ':',
    "\x4D\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x4C\x51\x5A\x4D\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x5A": '\'',
    "\x4D\x4C\x4C\x51\x4C\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x5A\x4D\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x5A\x4D\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x4C\x51\x4C\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x5A": '=',
    "\x4D\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x5A\x4D\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x4C\x51\x4C\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x4C\x4C\x51\x5A": '.',
    "MLLQLLQLLQLLQLLQLLQZMLLQLLQLLQLLQLLQLLQLLQLLQZMLLQLLQLLQLLQLLQLLQLLQLLQLLQLLQLLQLLQLLQLLQLLQLLQLLQLLQZMLLLQLLQLLQLLLLQLLQLLLLLQLLQLLQLLQLLLQLLQLLLLQLLLQLLQLLQLLLQLLQLLQLLLLQLLQLLQLLQLLQLLQLLZMLLQLLQLLLLQLLLQLLQZMLLLLQLLQLLLQLLQZ":'&'
};

app.post("/solveanswersvg", function(req, res) {
	var answer = req.body.answer.replace(" ","");;
    var listAnswerAll = req.body.listanswer.split("*");
    var listAnswer=[];
    var listChart=[];
    var firstChart="";
    var answerNow="";
    for (var i = 0; i < listAnswerAll.length; i++) {
        listAnswer=listAnswerAll[i].split(",");
	listChart=[];
        for (var j = 0; j < listAnswer.length; j++) {
            listChart.push(GetM(listAnswer[j])+'|'+GetCap(listAnswer[j]));
        }
        listChart.sort(function(a, b){return a.split("|")[0]-b.split("|")[0]});
        firstChart=GetChart50AnswerSky(listChart[0].split("|")[1]);
        if(listAnswer.length==4){
            if(firstChart=="A"){
                answerNow="auto";
            }
            else if(firstChart=="F"){
                answerNow="film";
            }
            else if(firstChart=="N"){
                answerNow="none";
            }
            else if(firstChart=="P"){
                answerNow="pest";
            }
        }
        else if(listAnswer.length==5){
            answerNow="music";
        }
        else if(listAnswer.length==6){
            if(firstChart=="C"){
                answerNow="comedy";
            }
            else if(firstChart=="G"){
                answerNow="gaming";
            }
            else if(firstChart=="H"){
                answerNow="howto";
            }
            else if(firstChart=="S"){
                answerNow="sports";
            }
            else if(firstChart=="B"){
                answerNow="sBeauty";
            }
        }
        else if(listAnswer.length==9){
            answerNow="education";
        }
        else if(listAnswer.length==10){
            if(firstChart=="N"){
                answerNow="nonprofits";
            }
            else if(firstChart=="T"){
                answerNow="technology";
            }
        }
        else if(listAnswer.length==12){
            answerNow="people & blogs";
        }
        else if(listAnswer.length==13){
            if(firstChart=="E"){
                answerNow="entertainment";
            }
            else if(firstChart=="N"){
                answerNow="news & politics";
            }
            else if(firstChart=="T"){
                answerNow="travel & events";
            }
        }
        else if(listAnswer.length==19){
            answerNow="family entertainment";
        }
        if (answerNow.includes(answer) || answer.includes(answerNow)) {
	    res.send(i.toString());
            break;
        }
    }
    res.send("null");
});

//-------------------------------------------------------answer sky--------------------------------------

function GetChart50AnswerSky(key){
    switch(key.substr(0, 50)) {
        default:
            return GetChart16AnswerSky(key);
    }
}
function GetChart16AnswerSky(key){
    switch(key.substr(0, 16)) {
        case "4848484848484847":
            return "S";
            break;
        case "4848484848484843":
            return "T";
            break;
        default:
            return GetChart10AnswerSky(key);
    }
}
function GetChart10AnswerSky(key){
    switch(key.substr(0, 10)) {
        case "3940393939":
            return "A";
            break;
        case "4039393939":
            return "A";
            break;
        case "3939404039":
            return "A";
            break;
        case "3939394346":
            return "B";
            break;
        case "3939394246":
            return "B";
            break;
        case "4848484746":
            return "C";
            break;
        case "2525252727":
            return "E";
            break;
        case "2525252728":
            return "E";
            break;
        case "3636363636":
            return "F";
            break;
        case "3333332930":
            return "G";
            break;
        case "3333332929":
            return "G";
            break;
        case "3838383835":
            return "H";
            break;
        case "3333333540":
            return "M";
            break;
        case "4132323539":
            return "N";
            break;
        case "4132323538":
            return "N";
            break;
        case "2929293337":
            return "P";
            break;
        case "2929293336":
            return "P";
            break;
        case "3029293336":
            return "P";
            break;
        case "2930293337":
            return "P";
            break;
        case "":
            return "S";
            break;
        case "":
            return "T";
            break;
        default:
            return GetChart2AnswerSky(key);
    }
}

function GetChart2AnswerSky(key){
    switch(key.substr(0, 2)) {
        case "39":
            return "A";
            break;
        case "40":
            return "A";
            break;
        case "29":
            return "P";
            break;
        case "30":
            return "P";
            break;
        default:
            return '*';
    }
}

function GetImage(nameImage) {
    switch (nameImage) {
        case "Tag":
            return "/VBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr9AAAABHNCSVQICAgIfAhk/QAAAAlwSFlzAAAK/QAACv0B/f0NWgAAABZ0RVh0Q3JlYXRpb24gVGltZQAxMi8xMC8zMST9/TIAAAAcdEVYdFNvZnR3YXJlAEFkb2JlIEZpcmV3b3JrcyBDUzVx/f02AAAEcklEQVRY/f1fSFtXHP/9c3P9ck00Mf1NRDv9/f0hbR82/U4o/Vn9UAz9/f0O9v39/Q/9/Ukp/f1CQVn9MhBBGP39DAf9/f39/Ur9MSj9U/39OVInGP39DU1ubv39/R40Uv0nVP09/Qf9/XP9/f39/f39XGJmPE8T/f39fwH9/X39/So0TXtFVVX9/QIAPERk/f03Uv39bf1Z/TT9LPpb/f39Kf0B/f39cjL9TP0AaP39/f0sKP0CKYBt/VhbW/1lWX/9/f1DIv39AkgXA/0n/f39HggE/f39Uo79/f39/f0zHv0r/f39/Tchcv39e3Fx/Wl1c3Nz/Ww2/XhmAP00HWVlZVRZWf1wOP1FV1dXH/0X/V39Njg5OVn9/QT9Hg1d4f1qM/39CwsL/f39/f1iAHYU/f39bf1g/f1wOP0BEU0TeP39Q/00N3dv/f1l/Wka/R49/f39/f1+/f39/f1ueyYAIgIRYXp6/Uz9dV9+fHh4/T79/W39IA/9/VBVFX79H/39/f0+/f39/f39/QsFEQJmXkhEMBAI/f1S/T4pZf39aR/z/f39Af39CyH9FEJ8K/0IJv39/f0Bcv39DwB0XdEjR15UVXVQSgn9/QMp/QAA/SgK/f39If39EP0P/S/9TH5aFEBNTf1L/WFASgn9/Qv9/Q0i/fH9dD8AABBC/f1y/f0g/f1ECFH9SCT9Bf1aEP39/X9kMhk2DSL9/f0v/f39dR39YBBC/W4i/f39/X0D/YEA/R8//f14PAf9EHM6/f39/f0Q/SwR/U79Uv0B/f0v/WVZ/WVZ/QIA";
            break;
        case "Foot":
            return "/VBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr9AAAABHNCSVQICAgIfAhk/QAAAAlwSFlzAAALEgAACxIB/f1+/QAAABx0RVh0U29mdHdhcmUAQWRvYmUgRmlyZXdvcmtzIENTNXH9/TYAAAAWdEVYdENyZWF0aW9uIFRpbWUAMTIvMTAvMzEk/f0yAAAD/UlEQVRY/Vf9SyRHGJ/9/Wr9cRpndP39/RYlEAcP/UH9HP1k/UNmT0M+ZmD9RAT9/f39Lf0sCAn9JP0QCYb9f/0S/U0I/TH9/REkbv0dEev9/f39EEj9OP39/f39eX/9/f1WVf0wDP1/Nv0z/RD9JWZZVhf9VBj9D/39/f1rA/39/f39/Sj9dyz9/f39aP0g/f0B/f1CACL9/WYY/Tf9/Wj9/f39YRj9Uv39/T79SlD2/Rz5G/39Xksm/f32/f39/Vf9/f39/f1O/WIx/f11/QwMDg79Oj4+/SAe/Uf9/f39F/1FO/39/Sv9/TL9TKT9/T/9Hf39/S79/V39/f39/f33/f0eT05O/WdnZ/39/Wn9/X0n/f39Yv1/Kv39/f39/Vr9RP0MCSH9/f14/VQqFf39/V/9UmkI/f0rKyte/VD9RAj9Mv1ACP39Ev16/WB3d1f9B/0ZKBb9fxb9/Qf9/RwODw/9CCE+Pyn9/RAC/TH9Yf0gCP39fkJXVwv9cf39eDz9/f39/SsLCwv9af39CCEc/TAg/f1p/f39XgBw/W8t/f39SkUC/f39E/Z/FkJETMRp/VAQ/VJIKf05R29vb00XQP0MCSEn/f39LP39/Uc6Ojr9/Q39AP0c/XMwkEr9/XQBWipD/f07Kv0qMGP9Uv39EHJ+fv1rXU39KP1I/f0g/TAM/WKU/f0eBAH9/f1SYmZm/f39Xjv9/f1y/Qr9Sg4A/TD9/f39Uv1SKnP9/R0AJ/0O/f39/VNPT0/9OXAQBP39/Xke/f39Dlv9fUsA/f39/f39A/39/f39";
            break;
        case "Truck":
            return "/VBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr9AAAABHNCSVQICAgIfAhk/QAAAAlwSFlzAAALEgAACxIB/f1+/QAAABx0RVh0U29mdHdhcmUAQWRvYmUgRmlyZXdvcmtzIENTNXH9/TYAAAAWdEVYdENyZWF0aW9uIFRpbWUAMTIvMTAvMzEk/f0yAAAD/UlEQVRY/f1PSCtXFL87M/0zTv1JHP1FYkT9IP0LCTwql/0jSv39/S79Gyn9/W4i/WX9Wv1Q/Un9C3lKF3gqXf0gdP1FHyX9Fiz9/f39dv39fRVCEzH9/T9d/f10RlP9Al14/S79cv05/f39c/39ECklbvRb/X4H/X8AMAD9EHL9dm39aP39/f1paU39/S79/RD9If39Pz8//f0DcF1L/f07/f1Z/TD9abX9AUBKCSEEGGP9LP0lAG9GBhgdHX39Xv39Ugr9MCIDMP39eR79/f1fVP0AEv39/TgOLP1CLBZD/WMQQv39fVxcXP1xHP39AP1tF3VdX/00LU0I/f39/WIN8v0swm39/f39MQAAUIl/Ff11/U8ZYxNKYkIIYv0Ycv1c/VIK/TRBKQX9NP0R/a53B/39/XtICP1IJv0wTf39/f1pSCb9D25SfP0s/T8E/f1kPhZCIB79dwAU/f04PUFj/UP9/f1xBSD9fP15/X39cWD9Nkz9BCFE/S5GRkb9/Wr9fgD9/Xf9Jwr9/SX9CAP9/f1O/VL9Kf39LP39Zv1fckkpfwb9L/0AIQT9/f1F/f0VBVz9fVcIcU8VSFBmRf39/Sf9AP08/f1NFAj9/QD9WCz9V1n9ClUbOP1S/XMe/f3MKwpY/UUvZx79/Rj9QAT9/f39AQ1AGQr9/T48w/15MAz9/f39/VP9/f39/f39mv39Mf39/f1nIQX9/f39/X/9/f39N/1NI/1I/Vwu/S4W/f1sb28/Lf35fD79Qwj9eh8oaQcGBoP9/W01f3Jy/f39/Sz9djn9KP3f";
            break;
        case "Printer":
            return "/VBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr9AAAABHNCSVQICAgIfAhk/QAAAAlwSFlzAAALEgAACxIB/f1+/QAAABx0RVh0U29mdHdhcmUAQWRvYmUgRmlyZXdvcmtzIENTNXH9/TYAAAAWdEVYdENyZWF0aW9uIFRpbWUAMTIvMTAvMzEk/f0yAAAEA0lEQVRY/f1X/U8jRxT9/f39/Q97/S1bRApSRFAa/RD9/RBR/f39/f0R/Un9FP39/QcIKUr9/V8AdBEF/XQp/R39Bv10Sf39Ch1S/TMY/f1dSQH9/f0G/Tsk/TT9nnn9N/19/f0sKf39nhUd/f0f/f39Yf39/WEMMf1ARFBKQUr9KP39/f1o/V79/X8s/f39QBH9PG/9/X1kMhlkMhn9/f39/f39eVP9/f39/f0d/f39BHz9Ry79Qz79Rz79Ry79/f39/f39/f0//f1Mev39/f1kBiJh/f39/Tz9Qzr9/W39AP12/Q0i/VJK/QP9/f39MklE/QD9/f39fFQ6Bv39ZVlwHAf9bf1zDvYxOzv9QkR/Li0tVf39/f1x/Sf9/b55/cEi/Rj9YRgwW2VRFP00VzMzMy/9/SL9IP1t/Sj9SiNHR0dPTwD9/V79ckzEUgr9MTB2E1BN/f0JKP1iAkQE/TD9Of1p/Qj9EEIISCljIk9OQP0Y/QH9MDr9/f0w/VH9ST9TSv19/f0KET0o/Rj9PgL9/W8x/V5Y/QX9OTz9Qyr9/bAs/Sv9UkoIIf1sNnF9ff1G/f1m/f0gCF5fXV39dB/9/Sn9Zv0r/f0XGkj9ICJIKRH9If39XQ79MAQR/f16/f0fGWP9Wv39/RdWVwRy/Rz9b13FbfAsK7keRP0zZf1s/VoJ/QD9Vgv9RgP9Vv3L/f39Lghk/f39VCr9/XEceP0H/XFgWVb9/TT9XQKhUir9/SZ//W5fSv1F/Vb9/R0E/f39H/39/Xn9PA/9bXf9/SD9/f39Sil9AG9q";
            break;
        case "Magnifying Glass":
            return "/VBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr9AAAABHNCSVQICAgIfAhk/QAAAAlwSFlzAAALEgAACxIB/f1+/QAAABx0RVh0U29mdHdhcmUAQWRvYmUgRmlyZXdvcmtzIENTNXH9/TYAAAAWdEVYdENyZWF0aW9uIFRpbWUAMTIvMTAvMzEk/f0yAAAFFUlEQVRY/f39X2hTVxwH/f39/f17/f39/f1VNP1AU/39XQEy/UfEbUz9/RtK/UodY3P9/f3+/f0e/f1A/UNBHwX9/Q39bP39/f39Zv39T/Qq/XP9e/17/Tl7/f0aNv1YPP39/f39/f1zfv1zCf0cb3MIbzU6AP39DSH9/VAo/RRF/WNBEP0RQoQQcP39Of0z/SZc/V4oFFL9/f39Nv39cCUgHA7U/Sj9/Sn9/SQJ/RD9AP04DmzGbfP9bf39/f39/Qhg5k1JWf0v/f0KRVH9/f1AKf0o/f1zXMVt6Fb9/VQqME0T/WV9/f39/XP9BUh1bf0t/f39LwcCAf39fij9Akop/X79/f39af1uLS4uKg8fPv39/WT9Niz9/VL9/Qr9MP39/f39av1YMwNtbW39QCAw/WkaNE39LP0I/UJOMv1MHzx4/V8AaQD9AP0A/f39/Xf9Uv39YRj9af0o/UooFv0o/Ur9Pnv9/W79DP0CMWP9H/0o/QkG/f39/Whvb/1GR0d//Ub9/f39G3W6P/39fTUyMr/9ERT9Rf39/f0HDxL9AC8dzv39KGNs/f12QRBw/f39X/39/WD9/Uv9Gy0tLf0ODw/9IggCVFVFIBAAY2xPR0dH/f13VgV0dnZ+/f0qZFn9KP1IJBL9d/0eJv0v/Qgh/f39/f0m/Uj9C/0A/f0HVVX9/f39UVP9/f39Hm/9M/0Q/f1uEkKNFllC/f39/W4y/SAIAij9PHlzX1P9/f39Xkl6cTBc/UU2/f39/f39/Wb9d1z9BSEE/SgiHA5rTQH9/Sj9/Tj9/f1m";
            break;
        case "T-Shirt":
            return "/VBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr9AAAABHNCSVQICAgIfAhk/QAAAAlwSFlzAAALEgAACxIB/f1+/QAAABx0RVh0U29mdHdhcmUAQWRvYmUgRmlyZXdvcmtzIENTNXH9/TYAAAAWdEVYdENyZWF0aW9uIFRpbWUAMTIvMTAvMzEk/f0yAAAEZElEQVRY/f1PSBxXHP9v/Xz9cXb9/W79QnD9ev0IUv1TNCn9Bf1zcwn9U/0a/UsL/f1Q/UVKCTb9eij9BiT9EGgg/SYs/f02/SUIRf1CKAZ0Wf11ff39Hv03/Wb9/SJ4/Q9+DAzZ/f39/f39e0P9/Tj9/bT9awAAFAAIIS39/W39AP0RQmxw/TcaaSz9/SH9/QAo/WoNNQBw/XdH/f1xHP39bDZb/f1yMv39/f39/f39TP39/f1rNv39Sv15/c79eP0AVBIpZf0O/Tt3bv0x/f1hGC79FP39If1jAP39Sv39Uv1U/f1nMhn9/S0hBP11HVJKBEH9MAwr/f1/XC79FxoN/RX9/f39S/39Bf1Ysiz9Uin9/QlCCP04Rv1WA/1Y/VY//f39LgNALv39XP39GP0yLFBKIf1AEAT9/f0H/Rz9/Uf9/X9e/VR+aQj9OE79YRj9Uv39d/1t8iz9/WEYAP0o/VD9cP39/f39Pf39/QgAGGP9/W39/f39/W0Y/f10/XP9Wv39JP39/TAM/Vb9/TL9hP39/TD9/R4bG/1bWVn9NE39/f1p/f39JgD9/UP9NI4gCP0DAP00Yf02/f39/RhL/U3Eaf0wDAP9UnR0dEZh/fdv/Qj9HXj9DHd3d3lfX191eXn9/f39/TP2Yf02GGMJ/f39MAwD/TE4/QP9df15HjzD/Ulx/TT9/Too/WD9If1KJXA3bv1Yef39/f39/WD9/UADAEL9/f39/WMhRP39/f3u/S79/Tp0XT9gGkJIAv39/Qb9df1O/Q/9XP1JPf1pGij9/f39Lxf9";
            break;
        case "Camera":
            return "/VBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr9AAAABHNCSVQICAgIfAhk/QAAAAlwSFlzAAALEgAACxIB/f1+/QAAABx0RVh0U29mdHdhcmUAQWRvYmUgRmlyZXdvcmtzIENTNXH9/TYAAAAWdEVYdENyZWF0aW9uIFRpbWUAMTIvMTAvMzEk/f0yAAAE/UlEQVRY/f1XT2gUVxj9/TdvJv39RLJoSv39ao00/X/9/Qn9FFpiDkr9A/39EkFBCh79AwT9Uz14KET9/f0c/W1EIin9/XgK/WgSev2S/SFI/RF2/f17w/39/f0N/RSDH3z9Pv39/X39/f1+/Us8/f1WGv39/f0A/R8AMAAg/VQt/f1paf12XvQuQggIIf08D0L9DSn9JfZ/e+BB/f02JRL9p0/9/WH9/f395P1wXRf9SP12/f39Agga/TwP/RD9/Rf9/R8zDAP9Zf0PYP1hGGD9/RACIQQ4/QD9PH/9/QH9HP39/U1G/f08eP0HKf0Q/W39/RUAYv0sYRg9/f1F/f39Zmn9NE0Y/QFd/QEAQgj9SiUU/UU4/f1S/QQhBP39/QYMP/39CyH9P2tra3H9/QLyWhhj/TduGH39/Un9hQv9/f0oTMT9/f01V3f9/Wn9/f0X/f39Wl79eP1UcBVIXf39SCb9Gx0dHRtBEEtLSw39XC79OE79/f0BQCb9/Xn9/REOHjw4fv39T/39/Wg0Gv39Xkr9/f39B0f9Hv1+dXX9/f39B/39av39GB0d/Tly/S1QYVpT/f39Qf1TADNn/Xv9Pv39aRoYY/00Df39/f1SYnJy/f39/f39/Vz9Sf11RCIR/f39/f16/f39Ixr9IhL9/TAMXP1+ff0Q/UP9/QVJ/VcA/R79YHZSSggh/ThO/f15Zzj9/TQN/VL9Pf39UUr9/f1P/f39/Sr9Sv08/U8K/X/9AP0CCiF8Ygkh/f39Cf39/f39WP39/V79/f39eP39Jf39/f1mZ2f9";
            break;
        case "Clock":
            return "/VBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr9AAAABHNCSVQICAgIfAhk/QAAAAlwSFlzAAALEgAACxIB/f1+/QAAABx0RVh0U29mdHdhcmUAQWRvYmUgRmlyZXdvcmtzIENTNXH9/TYAAAAWdEVYdENyZWF0aW9uIFRpbWUAMTIvMTAvMzEk/f0yAAAIFElEQVRY/f1XfUxTWRY//f39ff1S/f1A/Rgw/WJ2WBcqdf0lLf0hwv39YjRGGgj9blbI/WH9CDJhd/1EZ/39CRlcd3b9EAn9Ef1Z/WhnJxj9/Wz9bv1lrP1VBGn9PrN//SMdWhz9/VP9/f39/f17/Tn9BBH9/SkK/f0QMv0xLi5O8mwtIf0IEf1S/f39/S/9/Rr9/f39/f1hGAAA/f39JEn9/Xz9Bl5h/Sb9Yf0Qcf1S/f39/Rz9BSBLQkJCEf1x/SsU/f1Y/f391Er9/f39cQcAQE5O/XF4eBhY/QVEBEn9/WL9/T9/HgAA/f39LwNA/QwwHA79MxgMJ/39YP39yP1H/SMg/f1e/f0SBP0zURT9/Xn9Af39/QL9/f39/Q9GR0cnbnr9Nj4+/f0hQzn9/f32bP39Lf1xbTb9/Vhqamot/XEfCf0ACv39/f1CIQgEAhAMBv39/f39/Xj9YiIK/V79/Wo0/W9FUf39/f0DQRD9ZVn9JAkC/QD9/f1a/V79/f19FRH9AP1i/f0v/f39d/1f/f04AHgJIV79/f39/f0x/Ur9Av39EAL9UAj9/f1gamoKKP39/f39DkQBMP39P/39fH/9aDT9Vv39/f05/f39Uk9lZf1AZ2f9/f2lSv1y/Sj9Wv39fgIA/UAg/Ts7O/0J/f0XBwYG/U5n/VMn/d49UzMMA/0k/f39NP18PlD9VP39b/1eFv0D928nJ079AEEQQBAEUCr9/f39MP13/f39/UD9bGlpqf39KzL9Cv1CPiL9Uv39If39Ulr9/f39/f39/Q9nnHn9/f39";
            break;
        case "Graph":
            return "/VBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr9AAAABHNCSVQICAgIfAhk/QAAAAlwSFlzAAALEgAACxIB/f1+/QAAABx0RVh0U29mdHdhcmUAQWRvYmUgRmlyZXdvcmtzIENTNXH9/TYAAAAWdEVYdENyZWF0aW9uIFRpbWUAMTIvMTAvMzEk/f0yAAAE/UlEQVRY/VdfaBRHHP/9/V09d/39/TxzQhpy/f0E/T9QCiL9/UgMBP39/UEj/f39UAj9e/0iRff9/QRK/VIffCgtGkhLUf1jJQj9CBZaFUwhBf15UHIhf/39/f0Hb/07TDT9/f0H/f0O/f39Z2d+/f0S/RpraWxN/f0PAAIArVv9ZP0NAChFUTT9/f1Yev39/f0uACD9TP39ff0UAEgp/f39c28S/f0YAP1y/Xb9df0ucv1c/X8lDv1n/f1t/f0L7v39/f1k/f0D/QP9/f1oAP1kDQD9HFJK/XY9LRb9/f1vZ/1Ba/0L/f39RCL9Y2ZmZv0GQAhRd/1UKv39/WLl/RBCIP0i/f0fb2hoOAv9AP1j/f1q/Xr9/cf9dl0X/Xgc/WQS/Xgc/Xn9/V0zRgD9/aRGPSv9/f39/VgsBv11YVkW/VL9WmP9/f1//TH9QlQNUQ/9ZDL9O3c2bRv9ZUEIAf0Y/f39H/05c/1rM04AQBRFFf0o/Wpe/Xn9AGP9/f0SWv1f/VL9/f39d18G/Tj9/Ur9DGMMUv39/VMP/W39Nv39/f0d/Rs1AP39U/39GB8XQv39EEVRTil1/TH9Mjs7/WL9bGpqGhRC/SwLWmscOXLu/f0+ABNENP1cJTQdRAT9Of39/SAIDgkhPv398iwA/VIK/f1P/f1d/f39/WE5/VQq/f39/W39YP39/f39QW9v/UQ0/f14Uf1ARBgfHz8o/TxoWRb9/Qf2QUQI/RD9cywsLHz9Sv39/T59/WP9f0ND/U79/TJp/f39Mf39/Vsk/RtY/Wp2Q/1Y/Sg5";
            break;
        case "Key":
            return "/VBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr9AAAABHNCSVQICAgIfAhk/QAAAAlwSFlzAAALEgAACxIB/f1+/QAAABx0RVh0U29mdHdhcmUAQWRvYmUgRmlyZXdvcmtzIENTNXH9/TYAAAAWdEVYdENyZWF0aW9uIFRpbWUAMTIvMTAvMzEk/f0yAAAD/UlEQVRY/VdPSCN3FP/9/f1MTP1sBg1k/f1//VMHKVpaDCgU/f1Q/WB7SU79PQj9/f0a/T39/f39Hv1SeioD/T39/f1eFGwL/f39/Vr9/f0xMUz9ZP39ev1k/XZ3/U79/WAY/dv9/f39/f1m/f0QeP0mNXMg/f1d/f39HCH9SSJS/QhCCP39/f39/f39/TZ7QGr9/QD9KEr9JEl3A/39BGMM/f16EP1xYP39P/1tf1Aq/f39Dv39/UgwGP0v/f1AIP1EIv1PTEz9Af39nv39/f1a/QX9NFH9Vj8sFAp3/Qb9/f39KP1v/Sz9FAr9/Uwm/f39/f1j/f1PNf39TCb9/f39Tv0wDFQqFVxeXv39/f03/QL9SCRy/f0VRUFHRwc4/b4D/QVjLP1CYRgo/f0wTf39/YLZfv0iBP1IJP39IxwOIxQKAQAcwf04ABBl/UH9JBBR/Vwq/TRN/f0C/f0SQE9P/f04Tv39KAj9/QgG/QAA9v0M/TEG/Xn9LP39ZVlIJBJv/QwwMDD9Rv1S/SzQJAn9/f39/RBCXAEAAFn9If0yNE39av3aOf39/f1eYP05/QhEBP05JElCIBD9JEn9/UT9/S1pGWB8fP39/f1uA/39Ul4g/RVA/T79/f0//QxARHoq/Tr9/Uv9/Q79df04Dv39ZHF2dv3WAQBgbm79eDz9N0I8/U1DWP39TCb9AxE9bAtAf3/9y/39PzL9bP39/f39Xv1sNv1nKv39/Tr9/R79Qv3FQv39/f39zv39VP0ga2twXRf9/Rj9/f0PZ2Zm/f23/Rb9/Vgn/Tsr";
            break;
        case "Robot":
            return "/VBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr9AAAABHNCSVQICAgIfAhk/QAAAAlwSFlzAAALEgAACxIB/f1+/QAAABx0RVh0U29mdHdhcmUAQWRvYmUgRmlyZXdvcmtzIENTNXH9/TYAAAAWdEVYdENyZWF0aW9uIFRpbWUAMTIvMTAvMzEk/f0yAAAFR0lEQVRY/f1WTUwbRxh9M2v9d/39/U0s/Rj9IzsWWP0c/RBVTSICSiE5VP1E/XpAbf04/f1TDlX9/f1HYf39/f1y/f1Dgf0HOEAgcf0f/U8E/SxqTEwXYv39nf0x/f0OdkX9T/39fG/9ef39ff39CCH9f/39av0QYgl2/f03Kf0JQv0e/RACQghw/X8pFAr9dv1qBf1K/SL9/f1FMv39/f0XQmB4eP1kPv0n/f1r/f0C/f39cv1zZ/0kSSD9IBgM/f0cOf0eHx8/Jf39YRhwOv39/f115P0QUBQF/f39/c/9VFX9/R5O/cr9/f39/f39/f39/f0o/f1s/f0s/VBVFRcuXBhpaWn9/Xr9/f39c/1C/U39/f39/f1wOBwNEWj9A/1EQv1cLv39dhBC/TkH/Rz9JP1zDv0wUCwW/Ur9/R0PUEpR/QD9/Qb9MEAp/SRJME0T/XNQkP39EQAASf1w/f39/f39/f39/RgA/f39Kf39/RcvXmj9/Wv9/f0zZ/0bGxv9/f1iSf00/TFWBgBN/Sr9/XI0Gv39/WVP/Tw5OAJu/f0rRVF+cv39VJdtbW1u/f0GQkj9/f39/TAM/V5oa2v9/VAo/RhjX/0eSv1jXxMODg79/f39/f18Pn/9/f1AVVUyDEop/RD9WP05/f0ySv0Svn39xw9//f39/V07dz79R/39/XJd/f1sYVD9/f14ChsbGx85/U4y/f0FO0MI/Ur9/XL9/WL9CP39Nf39/f1L/ev9SmX9eP1G/Sv9f/1+YXV1/f0kSW9GRkZa/f39If39/f1adf0a/URC";
            break;
        case "Scissors":
            return "/VBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr9AAAABHNCSVQICAgIfAhk/QAAAAlwSFlzAAALEgAACxIB/f1+/QAAABx0RVh0U29mdHdhcmUAQWRvYmUgRmlyZXdvcmtzIENTNXH9/TYAAAAWdEVYdENyZWF0aW9uIFRpbWUAMTIvMTAvMzEk/f0yAAAGA0lEQVRY/VdfaFT9Hf/9e/1z/R1n/WVGZv39/RP9MEw1Cf0Y/f1C/TwU/R9K/SGyLGpya2ZWB/0Hdx/9Pv1SLC19/UNZ/WD9/Vr9Wf39/f1hSDgwJf39/f1odv1Gcv09fTlhnRsTF/0H/dz9/f39c379/f39/SEhBP39Qwj9/TD9/Wn9NAwj/X10G/39aHT9I/39/W5hX1/w/Wlx8v39fQBM/f39/Wn9I0f9HP39aQv9ff12/TRNMv39VCpVeRf9VP39KKBp/f39Ymr9/f1utv1l/TQRBAF8/yT9/Uv9Xv3E/Ww8Hv39GAMRQVUj/f39QD79/Ur9dRj9AVVV/UQi/f1G/QNAPB79TFVV/TRNjkL9/XhTAP39/f39/Sj9/f00TTD9/TP9BkL9/WQq/Sz9G/0BXeH9KmL9PSh5/UhDa3R0dG5mZiYp/f39/RJe/Xr9/f39/Xr9Ph39LP1M/Wxy/V48Hg/9Yf39jRs3fgz9/W5NWw8QUSP9/U9J/f39E/1hIP1IXFtv/f1E/WEY/f1DURQQEf0ePTobZTwSAAD9/f1v/W39kCQJ/f39cw79WD79Tn/9Tj79Tn/9GP1zoWkaGGP9ZDL9cv18eT39SAAi/Vku/T8P/QD9LEP9dXD9/Tn9/Uwme1pl/f1kD/39Yv1x/f1RLv0/J/39/QQAAP1S/f39/f39Vgj9MGBZ/f0c/UkA/f04/Xg8fv1zDl3hKAr9IP39M2ce/Ur9/f39/VYAIv1VKv1POzs7XwJYOw/9/f02/UsAYP39Jf1YPjQOAP39/X9y/Sn9/Sgy/f1o";
            break;
        case "Tree":
            return "/VBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr9AAAABHNCSVQICAgIfAhk/QAAAAlwSFlzAAAK/QAACv0B/f0NWgAAABZ0RVh0Q3JlYXRpb24gVGltZQAxMi8xMC8zMST9/TIAAAAcdEVYdFNvZnR3YXJlAEFkb2JlIEZpcmV3b3JrcyBDUzVx/f02AAAEZUlEQVRY/f1XTWgrVRT9X05m/f10/TT9/QT9/bdpaQt1/RT9IP0J/f2uClIePHD9Qv39/SJu/f14Lv39/SsX/f39WBb9SP0D/Xb9bv3hL/39SWf9/T9u/f39JU1fUv39/XBy/T39/Tk3Z/1IKf1/Qv00CCH9Lv00Lf1p/Xt2dnYf/T/9Pxv9af0o/U9IKTP9fP17AA9r/f11WP26R2D9/f1lWR/9PkYpDTP9/Qv9t/39Vf0wPm5ra3ta/TT9cw79/f18/X8r/f18dxXk/VUtBRz5Ef1Gf/39YmYkEv39KP08D/1sFv0xWP39SCQCTf39OUc2/UU6/Wb9/f03Mv39Xy0r/f39/X4sFjP9/Th0XS8p/f39DnCh/To0TSv9/SwL/f39/f1PGWNfev39R/1Y/f39/f0I/f39/VQ4HH79/f0T/f39T0Ap/WEY/VL9EAIpZXlOVVVE/VEIIVL9/f1y/Rz9POP9/e9M/XVlUCj9/TH9df39Ov0Q/f1KKS/9Kv39/f39/WJwHAf9fF45PDxcMgxjD/1GBP39/f10HO79Ljj9/f39/f39GkFVVWj9Bv0wQClFOv1+/SH9/f39Z/39/Tv9/f39bRv9/TQV/QQpJSj9ME0T/W39Nf1WGv39/R/9/WF2bVBK/WRvFv0QcP0xNDT9d0MC/f0x8gD9Wv39IP39/f1hTf1VBEL9ECj9VVX9KgghUBQFBwcH/X19fcP9/Sr9af0xMDD9HwRB/f11DCEEFEX9iEQi/SYS/f39BP39/f01TVMWCgUIIf1tSClh/SZcxWVZ/f0l/f39";
            break;
        case "Lock":
            return "/VBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr9AAAABHNCSVQICAgIfAhk/QAAAAlwSFlzAAALEgAACxIB/f1+/QAAABx0RVh0U29mdHdhcmUAQWRvYmUgRmlyZXdvcmtzIENTNXH9/TYAAAAWdEVYdENyZWF0aW9uIFRpbWUAMTIvMTAvMzEk/f0yAAAE/UlEQVRY/f1XT0gjVxj9/f03b/1sNv1o/UpWN/39GiESU2/9/WX9/UH9Cl39aV0XallY/SL9Unr9/RP9/f1jD/1tbwplD0s9/f1bFf0gFBpdRf0YX/39ev39TmYS/WL9Dx4Z/f19/f39/f39CSMiXP1S/RQdAP39YV9kGf0R/Swe/TL9Whr9/Sr9T1VV/f0oSk79dRwH/f39bP39T0dHR/39CDT9K/1oNP1UCDH9OQf9HP39NntnBGBZFv39/Xb9Xv13dHT9/f0R/f39Xv11ff39/QP9SBr9/Sj9/f39fXv9EABe/XgRXV5e/VlaWnr9/f1X/VX9av39/f39/XYE/f1AT0/9/v0+/X39Nv39PP39/V8m/SdENP39MUJET/39/f0fPHj9Ov1OU29vL3V1df39/QX9/SMQ/WL9VP08ODhI/f39JSJ6RkQw/f0wET39/f1+bf0m/f395QhkMv39BwYGKP39/f39/f1W/f39/f39fSb9/WQySf14/UEFP7lz/f39f0II/VQqdVwoFP18VwL9XP39/f39Q03Q/WQ+Of0sb/1lZ2dn/TD9aP1W/Wr9Bl3P/f39/XQ6ff39/QT9ahX9bf39MaD9Kv0QCP1CGBoaQv1Q/UcIEf39Yv0bN279/f39NP1AF0Qi/Xv9UP39/Wv9EA79/f06AP1a/f39/RT9SgX9ZTX9/TEG/Rg4/f11HR0dHRBC/Xb9chn9cv1N/VL9Uyr9Gv0EFBgdHf14a2sL/WH9/f1A/XM2/VROVVX9Of0QAv39/f0c/QERdSYS/UcA/Tj9QCL9/f39";
            break;
        case "Car":
            return "/VBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr9AAAABHNCSVQICAgIfAhk/QAAAAlwSFlzAAALEgAACxIB/f1+/QAAABx0RVh0U29mdHdhcmUAQWRvYmUgRmlyZXdvcmtzIENTNXH9/TYAAAAWdEVYdENyZWF0aW9uIFRpbWUAMTIvMTAvMzEk/f0yAAAD/UlEQVRY/f39S2NXFP/9/f39/f1MEglV/RBFYhVU/S5k/RYdcP0PRFz9FFL9dv39Dap7/XT9Rf1SWv1iC/1x/UU3qEMs/f0ZGEP9/f0Y/f19/f03/Tgq/f1NLmQR/f39/Tn9c/39Ef05/f1I/f39Cf0EaAIA/QH9ELD9NP1OSv1jSv03/Tj9CP0A/dT9/W79Uf17CP1h/UgkMv0Y/VEU/SzQ/f0NDP0A/f39dV04/RMrFv1ndwH9DWUGEP39Bgz9eP39alj9NCj9AkppHQT9HP39/XVdVCoVSP39UCwW/f0rbkMO/WL9Af00/Rn9ETZNE/39Q1EUSP39/Qv9/fIsXF5e/bPz/f0H/f39/Rb9Yv1oOBx+/f39/f1p/TRNaP0GQv1a/f39OA4uLi5QKv1QLBYHT09PX/0GUG39/f1RSv1jSf0mRWX9Uv39Vf39MP39/Tf9C0cESBAE/f39/Sf9Zf39M/39/QNQHU79OUc4HP0y/f1QSv39RSn9LP1g/f0wDBj9AU39/Rj9Nf04/f39/W1UKhX9/WVUKhU2Df1x/XB+Vir9/VYd/f39C/39PBD9VQv9KAoYY/39Yv39OkEQQP0kKP0C/TBAKQVjDP1t9m0kEv0vAP0DGBwcHDo8PP39/VBV/Vr9aEUoFP0c0f0g/fY7/f1Xd0Ey/Tw7Ojr9ChhRWFdXV3v9DBj9/RhjUFUV/f1W/f39/VH9/f14/f39LP1KW1v9/f39/VkoFDRCSB39SP05/f39/f39/Vb9/f39ODo6Gjk/P/39/XT9/RH9SP1SBzA8PP39/f39";
            break;
        case "Airplane":
            return "/VBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr9AAAABHNCSVQICAgIfAhk/QAAAAlwSFlzAAALEgAACxIB/f1+/QAAABx0RVh0U29mdHdhcmUAQWRvYmUgRmlyZXdvcmtzIENTNXH9/TYAAAAWdEVYdENyZWF0aW9uIFRpbWUAMTIvMTAvMzEk/f0yAAAGKklEQVRY/VddaFT9Gf39/Xv9M/1zMhP9ISM6Q2D9Qhgn/Uxs/VlwKxVc/f0R/f1YdP39TFlD/V79/f39/WwQ/QBBKv39Lv39KCkpbCNaTCM1F/1Idln9WiFGCxth/Wky/TNnnP0XO2f9fP39/f0D/f39e/39/Tv9/Xv9/RB4/f2pOgAOAET9/QsZ/RFm/V0g/Vb9/f39/f0AAP39/TAM/TRCYRh/Wf39KEr9/f1CISsa/f39YjER/f1ENBoVQggIIRpLQSgU/TRNG1NVNf1//f01/Wv9af0C/f39af39/QBgWjX9YDA4/f0UCP39CP1C/Ub9/f39/R/9NP1n/TEQEf0I/SRB/Sr9XzKC/XT9cP39/WvuXQMARCL9HGNs/f39/f39Uydr/f39YFhR/Qv9/R/9dR39/f1zDv11/f39H/3REAJEBP0wWv39/W8sLCx0SP0ESf39OUcgEP39KP1lGf39/XVvbf0ueP03/Tn9DQAj/UoV/f39PyL9EQBobm5uVVV1WFH9/Wn9/XUd/f1A/TT9CRP9bv79DwBGFgEIIWIAekZGRj79dP1S/Uf9gUD9Bv05R/1S/f04KP39/TwP/TEw/f15Hkr9/fZt/f39W/0kIihN/WH9/Q39cE/9OjVuWVY3/f1lEf1NCGEB/X17/f397294/f39/UAgALkfAf39/f19/f1UKv1xHFQqFUj9BEVR/f06ZFlGPB4vHj9+fLL9I0T9/f39ASwB/TczM/39/f39if39WDVS/f39/Ub9cw5Z/SFJEq9fXzx//f1QJBL9IxE9/f1+O0Ad";
            break;
        case "Umbrella":
            return "/VBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr9AAAABHNCSVQICAgIfAhk/QAAAAlwSFlzAAALEgAACxIB/f1+/QAAABx0RVh0U29mdHdhcmUAQWRvYmUgRmlyZXdvcmtzIENTNXH9/TYAAAAWdEVYdENyZWF0aW9uIFRpbWUAMTIvMTAvMzEk/f0yAAAEOUlEQVRY/f1PSCtHHP/9O/07/Vn9/f1q/f0GQv1K/f39/f1F/f09/f0h/TP9iyMX/f39/f0nPkT9Fv1U/Vb9/f39RUv9PEQq/UEk/f1u/f39enhO/UT9/f39S3/9/f39/Xx+/RlmZhUi/VMaAwBFUf0qMv1pAP39/f1+SFxx/QoR/TVAXV0dAf39/UMSFAP9av1C/f39/f1H/f04/Tz9GAP9HEQEIQb9/f39bHb9/f0N/XV3/f17/QL9bT/9TzOS/f39/f11Hf1zAEA2/S15/f39/f39/f39P/39/WElBSoCOP0zaRj9F/1hFP0WF2dA/Vz9BP39/f1cLjf9bv1BAP39/S9M/Uz9/Qn9NCH9/f39KjCg/Sr9CEEQ/f19/XL9/f39/f08ZDL9Pzz9/f39/Xz9HP39Nf39/TBtWVa2bf1CIQghIP0AYwz9/UH9NCj9UgD9EP18Hv18Hv39I/39QAgB/f1wcXERVlV1R1H9/XQ6/VFc/QZAfX39/WVZ/f39YTYN8mAYBjj9UFUV/f39FP0WBAE0TQMRIf3Dcw45dVIt/f0q/f0AHP0KUFtb/f39PBJCQHYv/SL9XRf9HP1T/Wla/WL9Pv39af0A/X8X/f39/Xcswmn9Bf39/f0SQv39/UL9ayX9/f0UT/1S/QD9Fgf9/TopFxz9MPJw/RME/f1j/SD9YUAIAf00/f39PnlD/f39/XFVVU39GEL9/f39/f1m/Vl2cnJi/Xn9Jv1H/f39/f0VOz4+/ef9/SsdBAFS/f39PE9w/WFZVv0N/Ugk/UlHR0d6amr9IB79";
            break;
        case "House":
            return "/VBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr9AAAABHNCSVQICAgIfAhk/QAAAAlwSFlzAAALEgAACxIB/f1+/QAAABx0RVh0U29mdHdhcmUAQWRvYmUgRmlyZXdvcmtzIENTNXH9/TYAAAAWdEVYdENyZWF0aW9uIFRpbWUAMTIvMTAvMzEk/f0yAAAD/UlEQVRY/f1X/UsrVxT9/SQz/U4Y/f10Wxf9Jgj9MG79/f39/RKl/Wj9f/39LzAvWxVe/f0u/XQh/W1BU/1qAf0IBv39EwVrGv39/f39RTn9SSYTfVr9/f39/f39/Tn9XIwxeEv9/RQdAP0xeP0KQv39/f1YAf39s/39Qv0//f39R/39/V4S/f39GWP9BR5zHGf2/W32/Rj9MQZSv/0gPv39/f04If39EP39clv9/f39/VEhBBzBZVlQSv39/f39/SAIAij9/f39/RpKKTT9/Vhw/U0//W02/f39c/39c/39oP1zDvIg/f0hIP0M/SBA/f1M/T39/f39/f04FSH9OyEEMv0M/XP9dDoN8v39DgH9/S79/SEh/f1xdXX9/TEwBSMjI/1tVzj9/Qoh/W4ITv32/VQqFf0ASS79/f39/f1o/f1oNv1//Vr9r/39/VP9Q/39Mfb9HP39/SP9/f39/Tn9bf39/RljIf39Tyn9Tv39dv39/f07/VotPDw8/f39fv39/f0uVgP9/VU4/f07/TNK/XRiAv39f2/9/Rpa/ScLN/1KIf1OQwhBdf1p/f0G/Sb9/T0E/Wr9/f39/XMuLP1CKv39ZVk9J/1cIzX9Nkgp/W79/f39/f39agD9NABMTU39/Tn9OP39NSMSLyFAV/39ff39f39+fv0A/R5A/UcB/VgdAP39/Rdt/f1t/f39G2M8/Un9A/39aP39Iv39dHpg/f0+QHX9fzBuGyMQ/f01/X/9DVT9Cv39/WttWP0YAf39Sv0A/VL9/Un9Uf0cVP0xWv1G/f1qfXV1";
            break;
        case "Flag":
            return "/VBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr9AAAABHNCSVQICAgIfAhk/QAAAAlwSFlzAAALEgAACxIB/f1+/QAAABx0RVh0U29mdHdhcmUAQWRvYmUgRmlyZXdvcmtzIENTNXH9/TYAAAAWdEVYdENyZWF0aW9uIFRpbWUAMTIvMTAvMzEk/f0yAAADbklEQVRY/Vf9SyRHFP9V/T9se/39RkMY/Qz9TWhXTysk/f39/W1hD/39YwL9/UP9/f0ZHv39c/39YQ85/QT9CEoC/UQb/WH9bv39t/39/f39dP1R/f1oKP39fbf9e0UzIv1T/TE+/Wg0XgghXnCfMf0A/QP9/f39/RoQUf39EEV7aRz9FCAbXzA/P0/9Zf0wDHCLQ/39UmIEA/0V/f0r/RxIKX/9/f39/QJMKP0uZmdnYVkW/f12/f39Gv0AUkoo/SD9/f39/f0s/WBZ/TD9/f0qJ/39Af39/f39GxVYXV0l/XVh/TZ2d3d/Pzo6el79ZhQ5/VL9/Rx5/SNJEkgp/f39/f1p/UJKCQD9/TX9Av0VEf39/RsV/SwLMzMzcBwH/f39/Tj9c/39Z+H9Kv1p/bZtXF9f/RD9/f1w/QEg/QBjDET9LOb9Av0wYBgG/RAI/T5l/f39/f0Y/RD9/f0A/Wn9NE0Y/QHy/RX9/RdUSP1kOv39KBljERE1OP0K/XVC/WI2/Tz9CwD9Of0Iaf1iVFE3A/39/RhZ/f08/f0Y/VJq/SD9/W39EEL9/f05/f0S/TH9aXo7BXT9/UddSWln/WkW/TUo/RxZ/U39VwtQLv39UmAc/f39/QH9/f0TQBn9Lm1bc0r9/f0XFxf9Zf39/QD9KlP9UwH9LQz9Vv39/Wn9RV4A/f39av0i/XFy/Rj9/f09/Xkl/f0pV/39/X79/U05/f39/WR9ff1DEAT9/f1B/Xn9ACIA/f39/UH9Xjn9dFX9Vf39Lf39NzY2Pv39/f0dBP05/f0A/QD9";
            break;
        case "Balloons":
            return "/VBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr9AAAABHNCSVQICAgIfAhk/QAAAAlwSFlzAAALEgAACxIB/f1+/QAAABx0RVh0U29mdHdhcmUAQWRvYmUgRmlyZXdvcmtzIENTNXH9/TYAAAAWdEVYdENyZWF0aW9uIFRpbWUAMTIvMTAvMzEk/f0yAAAFMElEQVRY/VZfaFN3FP/9/f39/f39T/39/Ub9/f1FSw39Rf1GHmxh/U79ZWtWJ2z9/VX9Iv1BDUxx/UFhG/0M/Q5k/TllYv39/f2he/1G/f1FR1sI/QNjO/39Nf39Q/39Nv1p/W5sB/1D/f39/f39O/1fiAj9/f1uQf0y/X79/UcQ/S79eQz9LiL9/f39Df0Y/f39Vmv9/Sb9W/0GCAQCcUn9/f1l/RlRFCEIAhhjICIY/QFd4f39Z/39H3v9/f2/ChAK/f1VVVX9/Sz9FUX9/f0o/WD9/TRNGP39zx9D/TT9/f39/f1iNxH9TERBADP9Zf0yTf1MPv39Xhf9/W3yXv39TlVVKP0CWf39AP1l/TAMaP39/f1FaP0G/f39fnt7/QtX/V79J/0iZP1QODQ/Pz9UDv11BiL9SP39/QsEAv0BJEkC/QhgWRZkWf0s/f14PCD9/f39/T4ZHR19CwBMxP1peP39/WA4HEYu/XP9cAX9/WL9av0G/cf9/f1l/QNP/TIscP0hCAIEQf39/f39/QT9/S/9/Xr9EEUR/Sx/GA79/f39cn/9E1cASf0aAP39/Sz9/XlE/XNI/f39/ShC/TT9/Sj9/f39IPI9/f39/f39AP1bEf39KBL9/f39O3Iz/RgEQf39G/39RRD9/Uj9/XYD/W5FVVUtCP0A/Xn9/f39/f39/f1RLP15cT48Hg/9/XAt/StAdXX9/f39PXRubsNlWUgkEnf9Df05/Sj9EEVX/f0B/W/9/Wtp/XJu/WxSP3f9XP0T/QlS/f39CP39/Txs/SZsL/17/f39";
            break;
        case "Pants":
            return "/VBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr9AAAABHNCSVQICAgIfAhk/QAAAAlwSFlzAAALEgAACxIB/f1+/QAAABx0RVh0U29mdHdhcmUAQWRvYmUgRmlyZXdvcmtzIENTNXH9/TYAAAAWdEVYdENyZWF0aW9uIFRpbWUAMTIvMTAvMzEk/f0yAAAD/UlEQVRY/VdNT/1AGP39/f39/XYNVP39/f1uECgH/SRkA0ES/Xj9/f1e/Xj9/XtXOP0J/Rx6NP1h/SEx/QkX/f39Bf39Qjv9enH9HV39e/0naf1M/f39/U5L/Tj9bf1y/f0B/f0FQggA/TRH/f39VBQF/f39/f39/f0sB0dR/Sj9ThhjL/39/UlmAC4jIyNvLy4uXv39/VwuB0IIFP1f/Tj9TP04BmMMYRgi/f0D/R/9/f39/f11HRwCQAL9DSD9IlBKcXl5CfZfdP39Df39bf1SCv0w/Wla/QZu/Sb9/f0r/f15Nm39BRBF/W79JkzE/f1iHWQC/f39AP39/f17fQEcHR39GxwcRP1Q/f1p/Tz9/Vtb/TT9/f39fQH9/S/9Pv39/f1ObP1cLif9Fv0x/Tj9bf39/TocZGxsbP0n/VL9NCd6/Q/9/QH9/f39Rz0B/f04HED9PWMM/TF4/Xf9/WVR/VI3Uv39/f07/Txn/f1SCv39D1dXV/39/X9IKQVjTP39EP39/Vn9AP39/R/9/f39Uv1hCPJ+EEL9WP39IwxDcAhZLTj9c/0n/f39/f04/QIOEAQBVFX9Bv1W/f0rCP02AP0IW/39/RP9/SAC/RQEQQD9NP0B/f0gCP0U/Tr9/Wj9OwFI/UD9Xi/9/XP9Mz4MQ1Qq/f0AUCwW/f1h/f0X/f0Q/VAodBz9/QgY/WEQQv0F/f0wOztbA/1q/f39/S8W/f39bv0pBXr9/UMp/f39/Qkh/QkA/f39/Tj9bv1od3f9/Qn9Xv0nF0j9CP0efnz9EEVpUkr9Th4A";
            break;
        case "Music Note":
            return "/VBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr9AAAABHNCSVQICAgIfAhk/QAAAAlwSFlzAAALEgAACxIB/f1+/QAAABx0RVh0U29mdHdhcmUAQWRvYmUgRmlyZXdvcmtzIENTNXH9/TYAAAAWdEVYdENyZWF0aW9uIFRpbWUAMTIvMTAvMzEk/f0yAAAF/UlEQVRY/VdtaBT9Gv39/Tkz/f0v/Qz9IS9qYmJmdVn9TP39/RBqLv39D/1WS/1UShRR/f1E/Vr9/f0SS/0l/WL9L1f9cv39/f1r/S79+v39BVn9D/0EDP39/W4yOzt7/f39WP39dnIfODD9Of0//f053P0cEkL9/WlS/U4i/f39/f3J/f39Wv0Q/f0Q/Xw+/S79/XH9IkAl/f39/WX9c/15DRFBCAH9cTL9JG39ZDJJ/TpU/f1SBBobGzP9/Wj9LP0x/VL9/UL9AP1xHj56/WgZ/S4C/S39/VZfX+v9/f1pGv39/f39/f88d/1cUv00KP39/f39fv1b/f0A/f39Df39C13LR/0c/f39/f39/f39/f1wOP39ev12/f0tbv39/QFJ/SD9Mv0vX/1jU1P9yCj9fv39RkVRFFn9/f39EHT9VVUE/WZZ/QIRZf39/TsBJCz9Ujj9/f1f/WgqCf0Q/f1Y/WYgEP0s/f39/U4w/f0v/XA4ff2lPxFR/SUhESX9/Wj9UCh4OP0nJEkCYwz9/f39/f39/UT9cv1VVQ79/f39/Z07/f39/f0DAP39/f1jY2NX/f39/V/9ogB0XW/9/f0T/Sz9/ST9/f39/f0P/f39XwAYJv39YjRdL0Ftbf39/f39/XhMRVH9/TD9/RwVQv39/f1DIrv9/QEXSRgIBHRFUSY8Hv1GVVURDAb9/f3pXf12enD9Qv39/f0b/f39M/1O/XL9/f18Pn/9UCgk/f39/X/9Wf39ehP9/f1UVUVPT/39U/39ev39/T82bP0QP/04Diz9egcAGGP9";
            break;
        case "Woman":
            return "/VBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr9AAAABHNCSVQICAgIfAhk/QAAAAlwSFlzAAALEgAACxIB/f1+/QAAABx0RVh0U29mdHdhcmUAQWRvYmUgRmlyZXdvcmtzIENTNXH9/TYAAAAWdEVYdENyZWF0aW9uIFRpbWUAMTIvMTAvMzEk/f0yAAAD/UlEQVRY/Vf9a/1GFP/9/Vj9/f1g/f12YwdjCP04PQRi/WD9HP39/UJh/Sn9/f1LCHR7/SV7/X/9/f0fMAVAf2z9FmJqWhP9/VD9SP0ORv39/VUIS/1W/UkfDP1G/Tf9ef28JyL9/f0p/QH9/Tv9NU39CkAYQP39/T93/f0u/f39/S79SCRSZf39CSEQQv1z/UP9/S09Cv39/Tz9/f39fj8o/f1tG/39EP39/f12/V39CiB5Gg1gfX19Tv00/f1hRCIR/UIhaP39/f39Of39/XtYQAgxXygUXnIsM/39Of39KMP9/QIhMwVGOv0dQGP9/R/9/f1n/W4/HA4PNzc3fyL9VP39AjxaQP39UjAYLP39/UYXFhb9VVX9DP39Hx4e/f1oNP00Gv39DyFQKBwMBv1WVVULBv0IBAL9ZRn9cxj9/f39c1xcXDxr/Vr9egEY/Qlj/f0TmP0oChhj/f1eK/0kMgz9/QdN/v1G/f0HAf1G/f0HAgEEAgH9/X4w/f0Y/f3iKFBVFf1SVf39JxMH/f39/U79U/39/VhcXP1XURQyDFn9/Rj9/Sj9/f09VVVBCP1u/QD9VGpDURQkEv0hIf0fSiko/f0k/WYL/f39bz79D/39/UT9NFEA/TT9MpD9/f16Pf39zv1a/Z/9/f0xkEwm/f0YQDweTxv9/f0kCf0a/f0XQv1xHDYN/XEg/UD9/f0XCv1X/VL9/f39dF1PTwQg/UxuMgxdx/39/XEAN/39/f1t/f39fP39Zv39/WJDSin9/f39RAD9/f39JEn9/XL9Zv39Bf0z/WsF";
            break;
        case "Cloud":
            return "/VBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr9AAAABHNCSVQICAgIfAhk/QAAAAlwSFlzAAALEgAACxIB/f1+/QAAABx0RVh0U29mdHdhcmUAQWRvYmUgRmlyZXdvcmtzIENTNXH9/TYAAAAWdEVYdENyZWF0aW9uIFRpbWUAMTIvMTAvMzEk/f0yAAADcklEQVRY/f39SyRHFP/9/f39Z/1uZ/0F/SxGJf0oZP0RD/39f0IU/f1L/f0h/f1d/f1yMP39ZU9BJP1B/f39YP39/f39/f1L/R/9AP39/TP9/V1dOf1qev39dQj9Qw/9/f39T/0f/VRS/Rhd/X4HcAf9MQAQADD9OlJ2HP1gGP0c/Xz9MVZg/f39Um/9Uv1xHP0FQf1J/Wz9M/1URwD9/U39/f39/f0Q/f39pP39/QhRFP0WRf1c/Vb9bxX9WCz9c/39K/00XfZhWRY4/TAMA0n9IP1jXF5eIgxDRFH9NgzH/f39/f0M/f39/f0M/W5ZCP1fKBR+J/39/f08cv1cCv0YQ/0k/f0I/WYTYRj9/WhACP39/f39Gyn9Sf1AKXUg/Vz9Uj79/f39BwEc/Rn9PyX9WSEEPP17/Tn9Nv39/XEc/XI5EFEL/U5BGP0I/RA9PT3u/f39/b79JEka/Tj9/V5cXDw8Pz9PU0T9FXv9/f1lWT8R/Sf9QP1S/Q8ODh4REf39Tf1M/QMA/TxNB/1vQQ8MDP1KKf39YhEa/f1s/f1ofGEY/SsAD4lAb2/9/X8S/WP9NkzEEAJCCFj9BfIg/QAR/U39/RJxHCP9Iv1K/f1PT0/9/f0zF0AWAEEQ/V79Pzo6Olpr/UB/f/39Sin9/Uo5/Wk1/Xb9/f05R/1a/UQpBfb9b0T9/f39/f0DaAVg/X1p/XYaaiL9YRhg/f0r/S39IQD9/f39/XT9/Wr9/XY1YFv9Bf00W/0s/bNDOx39/RgDEf39WwBK/bB2/R39/f1NAP1z/f39/UwB";
            break;
        case "Sunglasses":
            return "/VBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr9AAAABHNCSVQICAgIfAhk/QAAAAlwSFlzAAALEgAACxIB/f1+/QAAABx0RVh0U29mdHdhcmUAQWRvYmUgRmlyZXdvcmtzIENTNXH9/TYAAAAWdEVYdENyZWF0aW9uIFRpbWUAMTIvMTAvMzEk/f0yAAADHUlEQVRY/f1NSCRHFP39/f39/S/9Y/0d/SX9ESEXcf0i/f1FCP16/ST9/TR6C0H9Xv39Xf0WWS/9/UJg/SL9/VsuQRcC/f0eFv39/f39/UQb/f39/WX9KR1P/Xj9/QdV/f39/Vf9XlU3CSFw/U39V/0+QB/9D/0HAP39DhH9df0nRP0zKf39N/0n/f15T2RsAP26/f08D/39dggAJP39/f39Mf1Y/XX9EEIICCH9Of39/f0b/f0J/f39/W5f/WL9/Q4x/QL9/Qpj/f1poP1p/Q39OUf9ZUj9dP39al0XAP39/WJtbf39/f39F/1G/SIiSQz9ef01f/00PWw2/fr9/WEY/XVd/f0wDDD9ClMBRkZGOnNzc/0cHx8/LP1KT/0w/f0A/f39Skv9/f15/f1mWWZI/Tz9C0v9FHEcI01TJEkC/f1nAGD9Df39CWkS/f0g/Qgh/RhLDfj9/f39a/39DP39/f39/f0PZ2dnXzv9A/11QUT9WVBTZ/02/SRBHP39/Q8KIf39/Q1xXf0LADVG/SRG/f16EAT9OwAh/f39/f39F/39Ff39df39/f0J8mBZFmzG/VhaWv1vbW39dxwH/f39/W1Y/QX9NHv9ZVxN/f39/f1S/QAg/f1DQ0Md/f0y/f39/Vz9BP39KP39/f39eV4m/f0uYBlHZv0w/Wx9ff39BwAA/f39/Ur9BEn9FP39/f0sK/39/f1F/Ur9XC5X/f39a1n9/RX9/Sv9/f39dSL9/U79IAhe/f0f/XF8Q1T9LEIi/XZ3d38n/ToRRSsrKz/9/f39O/1O/f0U";
            break;
        case "Clip":
            return "/VBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr9AAAABHNCSVQICAgIfAhk/QAAAAlwSFlzAAALEgAACxIB/f1+/QAAABx0RVh0U29mdHdhcmUAQWRvYmUgRmlyZXdvcmtzIENTNXH9/TYAAAAWdEVYdENyZWF0aW9uIFRpbWUAMTIvMTAvMzEk/f0yAAAGN0lEQVRY/VdvaFNZFv39/Xv9e/39/f1f/f0mMWpiU0nYFv1N/Rb9UkQgA/00H/39/RH9QB0//W4//f1gRlh3XRb9/bIU/Sn9Rf39/VD9aVEZOnT9/VStNQn9/f39JG/9/Xf9/XH9/f1tGf39/Xf9O/39Pf1z/SP9CB9SFB/9OwD9/RNC/f1r/Vb9af39Qv0YKP3y/R9J/f39/f32/Vr9Sf1i/RH9cSH9Uv03/VIJNP1//f39VVhZWf1i/Xgm/U5//WsA/WsX/Ub9af1lIyr9Chj9/f39/WRPT08yFv39d/0xZjIZWhT9CCEk/Ur9/TYLUf39NP1G/f39cJv9/f39DW96Nf39/Uf9PkQM/VL9fx86dGj9/Xb9/W5H/f0cqv2o/f39/Qsu/Qv9/f39/f39/TdmA/0nT/39/Xn9dv39Zv39/WT9/VcDOHb9OP39/f39/f1a/WX9NDx+/Xj9BP1wOAT9/f39KkD9Z/1S/f0URf0gCP39af1JS0v9JxcvXv39fP39Y/39JP1hNBr9Zv1gMGwIYv1UABw8eP17AP18Pl9DCP1jNQNJ/SL9WP39/f39/f39P/1UKmBZ/Vb9/UxxHP1p/Qr9I0f9/f39/T39/VAsFv1b/bH9Bv39/Utv/f1+/f39CRMLav39Lf1e/f0MQAhZ/XT9Uv1u/QsK/QJo/R79WCwVEP1w/Q/9/f0JAABRFP0TExP9/f39/Ub9/RL9O/0IEf39X/39UygUOv39/TNt/VAAURT9/V79Cv39EP39/f0p/f39Bv39QP1WP/9/P0T9UUcu/f1C/TD9";
            break;
        case "Leaf":
            return "/VBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr9AAAABHNCSVQICAgIfAhk/QAAAAlwSFlzAAALEgAACxIB/f1+/QAAABx0RVh0U29mdHdhcmUAQWRvYmUgRmlyZXdvcmtzIENTNXH9/TYAAAAWdEVYdENyZWF0aW9uIFRpbWUAMTIvMTAvMzEk/f0yAAAF/UlEQVRY/f1XW2gUVxj9/Rn9XXEdTf0s/f0NMRcpFv39/UkT/f0K/RT9RRD9/RcfGv39/Ur9QWgV/UsLLUj9/f1oLP1I/X1o/f39Fv1SaWgtGv39/U39eztn/f39Of1JTHRbWjxw/f39/f19/f1f/R8i/f39XP0zRQdA/RD9GP0s/f0Q/f39/VIh/f15Xv11/f0c/f12Ev1//WZa/VJVVf39/VRV/RVFUf0oCggh/f10/f08cJFIJP0A/T0B8v0p/Tso/T39hP1pUFUV/VJQSiFJ/f0IIf0uSv0SFi5cGP39/REB8mxN/Xb9/f39/f1vTf1AKf39/f39E0L9eR4YY/39/TAM/WL9agL9cP0+GAx+/f39C/1gEP1AAP39/TD9Cv39KFBVdVr9/RAo/UoQQiD9/f39IwL9bf39YP1SMBgM/UIh/UIhBAIBGP39yxcvfnD9lVoJHP1cbDYbKBQK/f08aP0GQv0caf39Mv0s/Uv9NP39cBj9Z/1GOBz9af39SkgFCCH9bf1X/TB4XV39/f39N/39ZP1S/UT9/Sv9/f0xU/0C/Uj9R/39LvJgWRZMxP39Ff39nVscGxsLeP0H/f39/bZu/XppdHT9HTp0/SX9Dv1XFQghMD4+Plb9Av1tfxgK/WD9JkL9/SRwAEgkEro6/XP9cv0M/RitW/1jdHR0JBL9OP1zSHJC/bUqAv1odCUhJCpjLv1Nev0u/f39/Rs2bP39MQb9GFb9WHH9/f39/f39/f03b7Qk/f1dFf14PP1WMBj9/f0sF0JA/XUu/Ur9UAj9/f0fYf1h";
            break;
        case "Man":
            return "/VBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr9AAAABHNCSVQICAgIfAhk/QAAAAlwSFlzAAALEgAACxIB/f1+/QAAABx0RVh0U29mdHdhcmUAQWRvYmUgRmlyZXdvcmtzIENTNXH9/TYAAAAWdEVYdENyZWF0aW9uIFRpbWUAMTIvMTAvMzEk/f0yAAADHklEQVRY/Vf9TyNHFP/9a/39L/0r/QNsCRRFNFRnCVz9/UMi/UhuKP39IlIKehoK/WhS/W/9/Uv9/QD9/XMRRRz9/Qj9MFL9ef39/f1L/VgL/WJ3/f08/f39fP17/X39WmJm/f1Wsv39/f39ff0VEf0CAGZ+G/1x/f39Sf39LH4KEP39/f1K/VfyAABKKSRJ/f39/QX9VP39Vv39/Qb9AWz9BgAM/UN4/f1nAP1Y/Qj9/f39/TAMEUUR/Sj9/f0UZmdn/Sv9VyH9Zv15/S48w/15cBwHGxsbH/39VUgDPHV0dP39bv39cV1XLi8vd/39/X8g/XcP/f0H/Vb9W0L9b339R/1a/f39Wv39aCxIKf39/f1//f39/Xl7e/04/U9ubm5O/QoQ/fZtHzn9A/11/f0+XP0d/f39/R5xHP39/f39/Q79fv11VkFm/f39/f0L/f0RBAF8xxAC/WX9/UBEKP39EEL9dV04/f1W/f39ZV8gYxsGQWAHQQD9/SD9QP1SGQEAeDRmZv39ezv9Sv1h/f0YCCH9/XYd/f0JOj09Pf0sS/39/QVjBzBl/f1q/f0Q/f16IwBmBjP9Vv19/f39/VQqBf39/f0I/f39clgq/UZQ/f39SP1k/f0C/WL9Nf39UEpBaw1mflQB/RRs/v1a/f0p/U39Dm4A/VBKKf39/f39/VgBZmZmOlJKRFF0a/39Yf39/f39/f0Sef39/QgODg5+WV9fX15aWv1td3f9/VJq/f00/f39/f1W/f1MCP39/f39C/0x/TX9/SRJ/UgpQUT9LAtaa0gpIf39";
            break;
        case "Chair":
            return "/VBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr9AAAABHNCSVQICAgIfAhk/QAAAAlwSFlzAAALEgAACxIB/f1+/QAAABx0RVh0U29mdHdhcmUAQWRvYmUgRmlyZXdvcmtzIENTNXH9/TYAAAAWdEVYdENyZWF0aW9uIFRpbWUAMTIvMTAvMzEk/f0yAAADAElEQVRY/Vc/T/1AGJ/9/f1s/f39RmNRVDYk/SxI/f0UQRUTRf39HVA3/UP9O/0zdWr9/QUQ/f0OUf1WDEVVBP19/f1A/XIi/XG0PP39/Xn9/f39/YX9UnhM/VU3/f12AP08Yv1tEVFjHAAo/f39Qv39/f39/f39AE1yXf39af0wDP0V/f0SUv1fAIUA/f0P/XFgWRYYY/0Qf/0cWf39/f39Sf18MwMEQQD9/f0uTP15eP1lSP0E/WX9/f0M/TlHEAT9/U8FEEL9NE39ef04APJg/Xb9/SZlWQYpJWz9XhwAYwz9YRRX/f08/WEYYP0tDkAX/V5ibWMXCv0nbv0t/Vb9cwP9df39ATz9A/39/VEZYv0DGnJhAP39/QBtHFhICnz9f/04/Rv9/Q79EGF5D2gCaP1aahdoEAQHURR9/X/9PP01/Tz9/TE2/UL9/Xr9Qf1lCP0gOTw8/f39/f1AGP198jZtxm39cF39/XT9/QD9/WEYJv1u/f39/f1nAP1e/RACUv39AFz9/XQcB/39QkP9/Vn9fv1WUyH9/f39/XsA/UT9cWdnJyL9/RxwHAf9/f1xHP39/f39/UMKEf39/Sr9/f39/f39/f22/f1e/Vx8cXNzAwD9O/39/TH9/f39V/39Tk5O/f1+cHx8/S39/RZCYDQa/XH9/f39/YoXOlUWIWP9GEhE/f0kCf00/Wg0AhH9/TRF/WVI/XRsDin9/f0B/f1J/R/9/SD9/RACQv39OF39RDQ7/R48Cf39dCL9/XQB/dM9/f1R/f06/f39ff39/Qz9/VheXh4C";
            break;
        case "Envelope":
            return "/VBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr9AAAABHNCSVQICAgIfAhk/QAAAAlwSFlzAAALEgAACxIB/f1+/QAAABx0RVh0U29mdHdhcmUAQWRvYmUgRmlyZXdvcmtzIENTNXH9/TYAAAAWdEVYdENyZWF0aW9uIFRpbWUAMTIvMTAvMzEk/f0yAAAEB0lEQVRY/f1PSGNHHP/9cCZb/SH9P/39/Q3FJSr9Ev39UP1D/f1gKP1kEf39Q/14/Ucr/UX9RVEDREUCQ3pY/RH9/f0PLkYmWkf9/Xn9ev1jamVY/f39/f0e/f39/f39/RtiGAYe/f1HVX8CeAIAIAMAIQQ2/f39Uv0j/f39EP0Z/QFd/Td1Xf1QVXUTAP1hGCD9/f10XjL9XP1lUEph/T39MAD9Dv0YOP1n/f3BGwcA/f39/RkhBFb9Ff0sP/39CP0YQ/1QAP39fC4DQG1t/SscDh/9Uv39fD5v/VgsIP08/QP9Yf1YLP39/at9/V1dXf0r/f0c/QD9KEr9/f0L/f2N/f39/ScnJ/1K/f0gEP04/RwNDQ1qW1v9fjQabVEU/RX9/QQAbv39Sv0k/f39/f12/Xv91/0kCf1SSP0EWf39/RD9/f18Wv39/f39/S39JP39dlcBN/39/RD9/f1vMv39WSgUSnP9S/1mJx87/f0G/f39TCZz/UwmX/16JQD9Lv05Dg4OXv39/f0DAwPSJDH9GHRdB/39/f39dkop/f39/U0kEv39/f0JJVYJ/SQyIf39/V0jIyNfDg8P/Tv9Tv1YLP0E/W8w/VAsFmH97yP9/f39BP39/f39bP1OB4NmdlFfX38d/f39/f39/f39Ov00/V4I/Rg0TUN1df0aDAb9/f39/f39/T9u/T79kiT9/XVdR3d3/f1LS0s//WIx/f39/VIUJf1v/WECKP39DQQC/f39/RcWFn5uaWn9/f39/VX9W0tQHv39/f39/Rj9/f1maf39/f39/f1M";
            break;
        case "Pencil":
            return "/VBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr9AAAABHNCSVQICAgIfAhk/QAAAAlwSFlzAAALEgAACxIB/f1+/QAAABx0RVh0U29mdHdhcmUAQWRvYmUgRmlyZXdvcmtzIENTNXH9/TYAAAAWdEVYdENyZWF0aW9uIFRpbWUAMTIvMTAvMzEk/f0yAAAD/UlEQVRY/VdPSCNXHP9v/f03/bFk/f39/f0haP39CDl7/UpZUFf9VQ8e/f1F/QZtZP0l/UT9/f0FZf39ChIWEf39RXZp/S1sXQr9/RUa/U0z/R79CXH9GjX9H/1h/f39fP03/f39IUII/WdJ/UoH/f39EEJq/TBj/VNC/SMh/f39/f0mAFRK/f0//f0A/f39NP1PQv0t/f39/V8fHR0tVRJQKv1//XIc4f1mVVX9VVX9/f0oFAoZWf0BYP1/F/39P/00LWr9JlRV/RAC/f39OD4+uP39/f39cxI1a0K5/f1t/dFIJG9ZFmz9Ll39czD9Mv1Q/WH9BWz9/RhjWUr9/f39/f1MJpJlJf39Oij9ME0T/Wn9Mf39/f0vair9OP1nWVb9Uv1NxCz9Xw0PD38yNTX9/f39Of0oCjRN/f39aG1t/S8uLv0of/1O/f39/f0zTTNrGAZn/UH9df39Cln9YRirdDr9Mv1Mfv39/Wd1d3fP/f0UCv1GAP39LBD9Mf0t/QL9FP39/RBSOqL9Sv39L/39/f1jY2P9AP39/W8tUB47/Rz9af0wDDIMIQT9/SJ8/Uf9WP39aT9sbGz9SAj9OAdu/QP9/WL9LAv9MRj9AUVRIP0yJEn9JEkQQv39/SH9/f39GyFk/f1uNAf9/f08/TT9/Yr9EGhsbP0vLCw8Df1C/V79Zv0JBHD9MHhw/TRNK/39/f1K/f39/QA+Qgj9X/1uVQn9/f15/f0S/VIKTeAoSv39Av1wOP39/f39Cg5U/UA5/TEGSil0XT8HD3Ye/UT9/Qn9/QRs/f0o";
            break;
        case "Cat":
            return "/VBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr9AAAABHNCSVQICAgIfAhk/QAAAAlwSFlzAAALEgAACxIB/f1+/QAAABx0RVh0U29mdHdhcmUAQWRvYmUgRmlyZXdvcmtzIENTNXH9/TYAAAAWdEVYdENyZWF0aW9uIFRpbWUAMTIvMTAvMzEk/f0yAAAD/UlEQVRY/Vf9SyNnGP/9/WR82f39MRH9ESX9Qv2uGF0k/QEP/QBQPP09FA/9B/0H/S79Q28tPRb9e0eiPSj9/W4rLR69ef39/Tb9/f39EBL9/f1lJ/39dTL9KX39/f39ff39/f39/QdRSv39FCNo/RByY/39uwD9/Wr9/TD9BQL9/Vj9/Q0A/Vr9Rv39bytAMv18W/39/f39aQv9/Thz/Yf9/Tci/Qj9/f11fRX97ZL9Ov39Af11/RhjX3YN/Rgi/Qj9EP1UKij9zyv9/f39/f39df1v/f39/f01IQRi/RgYYzAMA/1zaP0GKf1S/Qn971v9/RZgamoK/W32bUT9UVj9/VD9GAr9Qv39W2f9Vv39U0r9GP1p/f39/WIx/f39/f39X/0nAP1EIh39/VYPDw/9Wf0FXeFp/QT9/f39/f39Af39ChD9Rv0dHR39GGPUUhBCYBhG+VIKQggU/UX9/f0bA/39/VX9ND9i/f39LDYNSikM/Wj9XggB/TkuLi5iYWz9Bv39/XxEKV1i/f1TSmlTZf0QQkAI/Xr9Hv1uKP1EIv0x/f39bkopIv0IdF39/f39/RMpJf39/WQy/X79NwJwXTdNKV39Rv39NhtKafH9aU0ZUEpBSv39/f39/QL9/f39/f39KXL9/RAo/f39/UowNjb9/S0A/W39SQj9af39/Xsi/Wz9K/0E/Rz9/f3L/f39BSAe/Uc5/TAM/f39/TNEKQX9Of39Ov39/XcJIU/9ch/9NP39/f39/Ute/XVeKBQ+aP39JgD9XP39D/1IJCr9/f1tA2D9/f0A";
            break;
        case "World":
            return "/VBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr9AAAABHNCSVQICAgIfAhk/QAAAAlwSFlzAAALEgAACxIB/f1+/QAAABx0RVh0U29mdHdhcmUAQWRvYmUgRmlyZXdvcmtzIENTNXH9/TYAAAAWdEVYdENyZWF0aW9uIFRpbWUAMTIvMTAvMzEk/f0yAAAI/UlEQVRY/f1Xb2wT/Rn9PXf9/f15/SEJ/WlSL2kC/WT9/UQB/Sb9AwpoJGr9Cm1F/To0Jv39/f0hWP0J/Ur9/f0AGkr9Gf1C/f39/UP9B/1SJf0p/Uj9/f0o/SD9/RkwBjv9f/13/TD9/f1hbT/9/V79/f39Pv39/T1/XzIMA/39/QD9/f39AUVRAgz0MAz9Av39Lv39dR39/X8U/f0//TIZ/f0m/TD9FP39KP0c/XVzHP39/Wwh/TAgIv1f/TD9Bf1MJgNN/QY0TQv9Yv1F/XwtAEVFRW/9PP0L/f0G/f39cRz9Xm/9/f0+/XA4/TNn/VQS/f08/U4j/Ur9/f39dP0jFv1F/QT9e/1i/f1RKQj9OVEU/f0gQBAEcBz9/Xv9/f39V18dBTD9/f39XGFhYSX9MABgAUgm/SAiLRL9bE0m/TcZ/Xn9/f0HE/39YRZbVFU1IEn9J/0s/R0OB3b9/X1j9m0z/Sz9tWv9/f39/f0//f39/f0oQv1lFBQU/f1w/f39AA0NDf39/f39dXV1cVn9Hf0sf1xUVDL9/TwGVFVVFUV5XxAE/f39tm39NnP9OUr9Yf0wDEZHR/00Njb9/f39/f39/Xk7/f39eR4M/UD9dQD9/fpy/f0fNjc3/X52dv39Yf0C/f0AfP39/f39Mf3A/Shv/Tz9djr9sWP9Lv39/SRffP39GxcvXv1oaGho/f39/QH9KP1MJyQiNDY2/f1eb/39cP39/f39/f1uGR4e/f0kCf39QBRFRVX9/f39HnP9/f39Nln9/SRJEg4dOv39/f39/SYnJ38e";
            break;
        case "Light Bulb":
            return "/VBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr9AAAABHNCSVQICAgIfAhk/QAAAAlwSFlzAAALEgAACxIB/f1+/QAAABx0RVh0U29mdHdhcmUAQWRvYmUgRmlyZXdvcmtzIENTNXH9/TYAAAAWdEVYdENyZWF0aW9uIFRpbWUAMTIvMTAvMzEk/f0yAAAETElEQVRY/VdNSGNXFP39/f39fEz9TP39A/1+JBb9VFcVVwX9KC5k/VlUEQIVN0Zw/XFpQVRwI/39/REsXf0o/TMLF/1V/QX9C/39Uv39aRX9EUcl/f13/X39/f1NYwf9/f39A2/9/f07/f1z/T1ECP39FHr9/QH9dy0SQm79/Xz9NlVV/VJKH1NK/QIAIQT9EP1xn3P9F/39bFL9FxNdcv1SIUBFRWL9/XD9XFBVFf39/RACIQQ4/W0b/WX9/f39Li4uFv0oQGVl/a79Xi80Tf39/SL9X19f/fP9/f39ABkCAP39/XpsGEb9/f39/f39AQojYP02GGP9NA1u/Rv9/UwQQv0F/WwA/TT9PB4P/X4/DMD9av0g/f0B/RBg/f39cv1SCkIIXC79Uv0A/f39/VNKQ/1h/TAM/X4r/f0A/VJQ/f39HP0BYyxUW1v9dnx8/f1dNv0s1v39D3Rd/f3EXQgB/XH9/RH9UFUVHv0HXv0X/f39/f398iJQV1cX/WQyUBQFABD9/XcM8Dc3Nyv9/f0rLf1SCSH9/f39BQL9/f39/SlBXC4X/f39/f0C/f39/Xptbf39/f39/f39/f39/a39/f39dFoL/f1H/f39/f1dL/39KSkLAHj9U/05/f3b/RtsbGw8Av03Egr9fjk/P3/9KAoKIf0B/VP9/f1eAf39cw5K/UNVVW39GBhjUBT9dv39b/3Icw79cf04Dv39/f1lAf39/X/9OE79K0II/f1ka3t7e0oeUv39/f0HBwf9Uke6/W57cnL98gD9/f39/f39HHH9If0XXib9";
            break;
        case "Eye":
            return "/VBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr9AAAABHNCSVQICAgIfAhk/QAAAAlwSFlzAAALEgAACxIB/f1+/QAAABx0RVh0U29mdHdhcmUAQWRvYmUgRmlyZXdvcmtzIENTNXH9/TYAAAAWdEVYdENyZWF0aW9uIFRpbWUAMTIvMTAvMzEk/f0yAAAEe0lEQVRY/f1PTBRXHP/9/f39/TL9LAkH/f0E/VBEIhf9bf1D/Wn9ElL9ak/9BBgeWv1m/SL9/Tb9g/1TSz39Jv39PWH9/TEcGmF0/X39/f39/SYL/f39/f39TDL9/f39/f39/f17M0RK/f1cdF/9HwAcAABg/RD9/SD9cf0TQv3k/U9r/f39/VD9/f03/QFwXf39/WnUs/1MJkf9Vv0kQRz9/f04/RVF/f1BEP0TZv0A/Ww2/Wms/dr9Qf11ZDIZUEr9GCkl/ThGHP0I/RBCCAghZv0w/Q79YP0/A/39/f1N/f39MP02/TRh/SZ0Xf39aSn9/TIF/f0IQghw/f05R/39eP05H/19/f0G/Txv/TT9/W39cRxY/QX9MP1pWv1Aa/39CCD9QP39AP0c/VoN/f03/f39H/39/W/9UHUZdlj9/XZ9/XEcOP0D9mFZFhhjaf39fP39OnVqDQD9e/X9/W4yoGn9diz9chn9/Xb9HRX9PP1t/e79/XVdOP39Jv39Qkr9/SdP/U1OTv0G/W4z/f391z/9VCpd/f10HP16Hf1aDUEQYHNz/U0QBB9sbGw8/VX9fD5//XX9O/1l/f0b/QH9GFT9Qv0QTE5OnDlzZi39/WlCCCj9y/39D907N/39/Wv9Ugr9GEz9TD39JEn9EHJHSnn9/f0Y/SBz/RhlWf10Xf1W/Sv9A0gd/f37Qgj9Kv0ocf17/f16/RD9RAj9OjQ0/WcY/f39GAD9/WRgGAZUQ/39H/0s/VFbW9ht/f0tCv39/f0vLS1M/f0k/VL9Dn/9/f1zAP39GlEU";
            break;
        case "Computer":
            return "/VBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr9AAAABHNCSVQICAgIfAhk/QAAAAlwSFlzAAALEgAACxIB/f1+/QAAABx0RVh0U29mdHdhcmUAQWRvYmUgRmlyZXdvcmtzIENTNXH9/TYAAAAWdEVYdENyZWF0aW9uIFRpbWUAMTIvMTAvMzEk/f0yAAACXklEQVRY/f0/T/1AGJ/9/cb9Ev39/f0DIzAQ/UpMVP39B/39/XtV/f39Ev1Y/f39VAwpQz8A/Uj9/UD9/f39/f0Q/XVJ/QRjKv0gKjX9dP39d/39/f39fP14Sv39Af0AABQA/f39WFxcXGIIdv39/QD93P39GP09/XP9af12/f0L/XH9av0PRP39/WD9Sf39cw79OQD9/f39/f1LAEEQ/Rlj/Wr9/UT9VwBEBP0cLi4u/f39/f1d/QAWFhYQRRFOTk79PzFCW1tbB/0l/f0B/SD9/f39Xv0KYHt7/WD9/f39PAX9/Tw7/SY2/R8BBv39/QH9VEpB/f39Dv1G/f39Mv0lAP39/f39SiX9Wf39/QD9cT/9b/1/D/39UwAADP39/ST9MmRZ/Tz9H2wqIgj9EGEYThT9Iv09av1aEkVREv39WRRF/f0ZNzc3Rf0WIAj9/Xn9Yf19a/39/f39/f0B/Qg0Gv13/X79/f0e/Sr9GUQEVf39/f1m/Wq+dv0MVf39QET9/TlE/VBE/f39/QL9N0Ac/StXV1cw/f0YU/39ew9j/URFbDb9dn9//f04/f39/f04Tv1U/QhE/VFJ/f39/Vr9bv39bl5eXv39/f1XRv0KAEn9fD06OlobFiEwc2EoIv0m/YP9/Xb9/f1HZWT9/TD9TP0B/f39/XQ6/f39WRH9cf39/XD9/f39/f1F/f1o/f1l/Q9r/f39aSAi/f39NRH9/f0YYxr9/f39dnd3/QD9WAAMLx47/Tr9Tj8BfCn9/X9Gc/39Hv0X/W0nQP0x/TgAAAAASUVORP1C";
            break;
        case "Folder":
            return "/VBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr9AAAABHNCSVQICAgIfAhk/QAAAAlwSFlzAAALEgAACxIB/f1+/QAAABx0RVh0U29mdHdhcmUAQWRvYmUgRmlyZXdvcmtzIENTNXH9/TYAAAAWdEVYdENyZWF0aW9uIFRpbWUAMTIvMTAvMzEk/f0yAAADa0lEQVRY/f1PSCNXHP9ZcXT9NEFlSP1U/QkVQ2j9MP0HLx48FHf9/VD9U/0u/Sz9ZxH9Pf1U/R79/WL9/R6D/TT9WP1dUQJbdyf9b59e/f39/VASPXj9Bz9IMi/9/f39Tf39Gjdp/Ub9bwFuAQBYAP15Xv1SoP39EAJCSP1S/f39dv39/f39/XMA/V79f/39/f39ZVlg/f0A/f1QSkFK/f39/f39/V79AEn9AP1YLP39bDb9Lmz9Bv1vK2MA/RAI/f0gCApCCEgpMf0O/VpDSgkp/WEYPv0LUP1W/f39/f39PDj9A/1YSlwpBf05HP39/f39Z1EUQQgx/Tgy/Qz9/f8EQP1EcWdubv39/f04XP0F/RRaa/1q/RP9/f1K/f1lUkoo/QYCMP1bXFx8WP1W/TH9/QAIIVhYWP1EUa4L/RgK/f31/f39VldX/Tw7Oyv9/f0BMP0j/f39bv39/Rxx/V/9/Rz9AAAy/Sv9/VP9XP39Zg/9/f39bv1bNGcYY/39/TE2VP39/U0Ief39/f0A/QEo/f39EP0Z/TAM/f19/f39/f1Y/f05BzH9FCzCZVn9/f1S/f39aS/9NS/9IHhm/UsI/Xw+fxD9YWD9EhH9EBJf/X9u/XYN/XEwOjoK/XVRLv39/QT9OT8WQv1A/f39R/39/R/9Rv39HhP9/f39/f39f/0EMDU1dWD9/W1bbG5u/Qb9/QBm/f39Ri79e/0E/Xv9/f39EAL9UgRB/S8U/QNK/UsrelD9Wv0s/f39/T8B/f1ncQb9/d/9ERsbGzv9/f0TM/39ef39CyH9";
            break;
    }
}

app.post("/solvesvgcaptcha", function(req, res) {
    var listTextCap = req.body.listcap.split(",");
    var key = req.body.key;

    database.ref('/SolveSVG/' + key).once('value').then(function(a) {
        if (parseInt(a.val().CoinTotal) > parseInt(a.val().CoinUsed)) {
            var listCap = [],textCap = "",textSolve;
            var list1 = [],list2 = [];
            var Alpha="ABCDEFGHIJKLMNOPQRSTUVWXYZ";
            var index;
            for (var iTextCap = 0; iTextCap < listTextCap.length; iTextCap++) {
                listCap.push(GetM(listTextCap[iTextCap]) + '|' + GetZ(listTextCap[iTextCap]) + '|' + GetCap(listTextCap[iTextCap]).split("|")[0]);
            }
            for (var i = 0; i < listCap.length; i++) {
                if (parseInt(listCap[i].split("|")[1]) > 43) {
                    list2.push(listCap[i]);
                } else {
                    list1.push(listCap[i]);
                }
            }
            list1.sort(function(a, b){return a.split("|")[0]-b.split("|")[0]});
            list2.sort(function(a, b){return a.split("|")[0]-b.split("|")[0]});

            //is number
            if(list1.length == 11 && list2.length != 0){
                textCap="reload";
            }
            //Input only numbers
            else if(list1.length == 16 && list2.length == 15){
                textCap="";
                for (var iNumber = 0; iNumber < list2.length; iNumber++) {
                    textCap=textCap+GetChart56Alpha(list2[iNumber].split("|")[2]);
                }
                textCap=textCap.replace( /[^0-9]/g, '' );
            }
            //Input only alphabets
            else if(list1.length == 18 && list2.length == 15){
                textCap="";
                for (var iAlpha = 0; iAlpha < list2.length; iAlpha++) {
                    textCap=textCap+GetChart56Alpha(list2[iAlpha].split("|")[2]);
                }
                textCap=textCap.replace( /[0-9]/g, '' );
            }
            //Input only small letters
            else if(list1.length == 21 && list2.length == 10){
                textCap="";
                for (var iSmall = 0; iSmall < list2.length; iSmall++) {
                    textCap=textCap+GetChart56Alpha(list2[iSmall].split("|")[2]);
                }
                textCap=textCap.replace( /[^a-z]/g, '' );
            }
            //Enter *th number between
            else if( ( list1.length == 21 || list1.length == 22 ) && list2.length == 9){
                textCap="reload";
            }
            //Which letter comes before
            else if(list1.length == 22 && list2.length == 1){
                textCap="";
                for (var iLetterBefore = 0; iLetterBefore < list2.length; iLetterBefore++) {
                    textCap=textCap+GetChart56Alpha(list2[iLetterBefore].split("|")[2]);
                }
                index=Alpha.indexOf(textCap);
                textCap=Alpha.substr(index-1, 1);
            }
            //Enter the word in uppercase - Enter the word in lowercase - Input only capital letters
            else if(list1.length == 23 && list2.length == 10){
                if(list1[14].split("|")[2].substr(0, 10)=="1717171818"){
                    textCap="";
                    for (var iLowercase = 0; iLowercase < list2.length; iLowercase++) {
                        textCap=textCap+GetChart56Alpha(list2[iLowercase].split("|")[2]);
                    }
                    textCap=textCap.replace( /[^a-z]/g, '' );
                }
                else{
                    textCap="";
                    for (var iCapital = 0; iCapital < list2.length; iCapital++) {
                        textCap=textCap+GetChart56Alpha(list2[iCapital].split("|")[2]);
                    }
                    textCap=textCap.replace( /[^A-Z]/g, '' );
                }
            }
            //Enter the largest number in
            else if(list1.length == 23 && list2.length == 11){
                textCap="";
                for (var iLargest = 0; iLargest < list2.length; iLargest++) {
                    textCap=textCap+GetChart56Alpha(list2[iLargest].split("|")[2]);
                }
                var largest=textCap.split("*");
                largest.sort(function(a, b){return a-b});
                textCap=largest[largest.length-1];
            }
            //Enter the smallest number in
            else if(list1.length == 24 && list2.length == 11){
                textCap="";
                for (var iSmallest = 0; iSmallest < list2.length; iSmallest++) {
                    textCap=textCap+GetChart56Alpha(list2[iSmallest].split("|")[2]);
                }
                var smallest=textCap.split("*");
                smallest.sort(function(a, b){return a-b});
                textCap=smallest[0];
            }
            //What is a +(-) b
            else if(list1.length == 0 && list2.length > 8){
                textCap="";
                for (var iWhat = 6; iWhat < list2.length; iWhat++) {
                    textCap=textCap+GetChart50What(list2[iWhat].split("|")[2]);
                }
            }
            //what number comes after
            else if(list1.length == 20 && list2.length < 4){
                textCap="";
                for (var iNumberAfter = 0; iNumberAfter < list2.length; iNumberAfter++) {
                    textCap=textCap+GetChart56Alpha(list2[iNumberAfter].split("|")[2]);
                }
                textCap=parseInt(textCap)+1;
                textCap=textCap.toString();
            }
            //What number comes before - Which letter comes after
            else if(list1.length == 21 && list2.length < 4){
                textCap="";
                for (var iNumberBefore = 0; iNumberBefore < list2.length; iNumberBefore++) {
                    textCap=textCap+GetChart56Alpha(list2[iNumberBefore].split("|")[2]);
                }
                if(textCap.replace( /[0-9]/g, '' ) == ""){
                    textCap=parseInt(textCap)-1;
                    textCap=textCap.toString();
                }
                else{
                    index=Alpha.indexOf(textCap);
                    textCap=Alpha.substr(index+1, 1);
                }
            }
            //Enter the words in digits - Enter the word in reverse
            else if(list1.length == 21 && list2.length > 15){
                textCap="reload";
            }
            //Enter *nd number from list
            else if(list1.length == 22 && list2.length > 15){
                textCap="reload";
            }
            //normal
            else if(list1.length > 0 && list2.length < 3){
                for (var iAdd = 0; iAdd < list2.length; iAdd++) {
                    list1.push(list2[iAdd]);
                }
                list1.sort(function(a, b){return a.split("|")[0]-b.split("|")[0]});
                textCap="";
                for (var iNormal = 0; iNormal < list1.length; iNormal++) {
                    textCap=textCap+GetChart50(list1[iNormal].split("|")[2]);
                }
            }
            //
            else if(list1.length == 0 && list2.length == 0){
                textCap="reload";
            }

            textSolve = "";
            if(textCap != "reload"){
                database.ref('/SolveSVG/' + key + '/CoinUsed').set(parseInt(a.val().CoinUsed) + 1);
		var dateNow = new Date();
		var hoursNow = dateNow.getHours();
		if(hoursNow != a.val().TimeNow){
			database.ref('/SolveSVG/' + key + '/TimeNow').set(hoursNow);
			database.ref('/SolveSVG/' + key + '/CoinNow').set(parseInt(a.val().CoinUsed)-parseInt(a.val().CoinLast));
			database.ref('/SolveSVG/' + key + '/CoinLast').set(a.val().CoinUsed);
		}
		
            }

            if (textCap.lastIndexOf("-") > -1) {
                textSolve = parseInt(textCap.split("-")[0]) - parseInt(textCap.split("-")[1]);
                res.send(textSolve.toString());
            } else if (textCap.lastIndexOf("+") > -1) {
                textSolve = parseInt(textCap.split("+")[0]) + parseInt(textCap.split("+")[1]);
                res.send(textSolve.toString());
            } else {
                textSolve = textCap;
                res.send(textSolve);
            }
        } else {
            res.send("add cap");
        }
    });
});

function GetCap(text) {
    var text2="";
    var arrText=text.split(" ");
    for (var j = 0; j < arrText.length; j++) {
        if (j % 5 == 0){
        }
        else{
            text2=text2+arrText[j].split(".")[0];
        }

    }
    return text2.substr(0, 70);
}
function GetM(text) {
    return text.split(" ")[0].split(".")[0].split("M")[1];
}
function GetZ(text) {
    return text.split(" ")[text.split(" ").length-1].split(".")[0];
}

//---------------------------------------------------What Is-------------------------------------

function GetChart50What(key){
    switch(key.substr(0, 50)) {
        default:
            return GetChart40What(key);
    }
}
function GetChart40What(key){
    switch(key.substr(0, 40)) {
        case "5352525253535354565656575858585959595958":
            return "6";
            break;
        case "5352535253535354565656575858585959595958":
            return "6";
            break;
        case "5352535253535354565656575858585959595959":
            return "8";
            break;
        case "5352525253535354565656575858585959595959":
            return "8";
            break;
        default:
            return GetChart38What(key);
    }
}
function GetChart38What(key){
    switch(key.substr(0, 38)) {
        case "52535352535353545656565758585859595958":
            return "6";
            break;
        case "52525252535353545656565758585859595958":
            return "6";
            break;
        case "52535352535353545656565758585859585958":
            return "6";
            break;
        case "52535352535353545656565758585859595959":
            return "8";
            break;
        case "52525252535353545656565758585859595959":
            return "8";
            break;
        default:
            return GetChart36What(key);
    }
}
function GetChart36What(key){
    switch(key.substr(0, 36)) {
        case "535352525353535456565657585858595958":
            return "6";
            break;
        case "535352525353535456565657585858595959":
            return "8";
            break;
        default:
            return GetChart34What(key);
    }
}
function GetChart34What(key){
    switch(key.substr(0, 34)) {
        case "5252525253535354565656575858585958":
            return "6";
            break;
        case "5352525253535354565656575858585958":
            return "6";
            break;
        case "5352525253535354565656575858585959":
            return "8";
            break;
        default:
            return GetChart18What(key);
    }
}
function GetChart18What(key){
    switch(key.substr(0, 18)) {
        case "606060606060606060":
            return "+";
            break;
        case "606060606060606058":
            return "3";
            break;
        default:
            return GetChart16What(key);
    }
}
function GetChart16What(key){
    switch(key.substr(0, 16)) {
        case "6060606060606059":
            return "3";
            break;
        default:
            return GetChart12What(key);
    }
}
function GetChart12What(key){
    switch(key.substr(0, 12)) {
        case "525252525354":
            return "8";
            break;
        default:
            return GetChart10What(key);
    }
}
function GetChart10What(key){
    switch(key.substr(0, 10)) {
        case "5454545555":
            return "-";
            break;
        case "":
            return "+";
            break;
        case "5858585959":
            return "0";
            break;
        case "5858585958":
            return "0";
            break;
        case "4848484848":
            return "1";
            break;
        case "5959595961":
            return "2";
            break;
        case "5959596061":
            return "2";
            break;
        case "6060616060":
            return "3";
            break;
        case "6161606060":
            return "3";
            break;
        case "6060606160":
            return "3";
            break;
        case "6060616160":
            return "3";
            break;
        case "6061606060":
            return "3";
            break;
        case "6160606160":
            return "3";
            break;
        case "6160606060":
            return "3";
            break;
        case "6061616160":
            return "3";
            break;
        case "6161606160":
            return "3";
            break;
        case "6161616160":
            return "3";
            break;
        case "6061606160":
            return "3";
            break;
        case "6061616060":
            return "3";
            break;
        case "6160616160":
            return "3";
            break;
        case "6160616060":
            return "3";
            break;
        case "5555555555":
            return "4";
            break;
        case "6160606159":
            return "5";
            break;
        case "6161616159":
            return "5";
            break;
        case "6061616159":
            return "5";
            break;
        case "6160616159":
            return "5";
            break;
        case "6061606159":
            return "5";
            break;
        case "6060616159":
            return "5";
            break;
        case "6060606159":
            return "5";
            break;
        case "6161606159":
            return "5";
            break;
        case "5252535253":
            return "6";
            break;
        case "5352525253":
            return "6";
            break;
        case "5252525253":
            return "6";
            break;
        case "5253535253":
            return "6";
            break;
        case "5253525253":
            return "6";
            break;
        case "5151515151":
            return "7";
            break;
        case "5353535253":
            return "8";
            break;
        case "5352535253":
            return "8";
            break;
        case "5253525354":
            return "8";
            break;
        case "5252535354":
            return "8";
            break;
        case "5353525353":
            return "8";
            break;
        case "5352525353":
            return "8";
            break;
        case "5252535353":
            return "8";
            break;
        case "5252525353":
            return "8";
            break;
        case "5352525354":
            return "8";
            break;
        case "5353525253":
            return "8";
            break;
        case "5353525354":
            return "8";
            break;
        case "5253535353":
            return "8";
            break;
        case "5352535354":
            return "8";
            break;
        case "5253535354":
            return "8";
            break;
        case "5253525353":
            return "8";
            break;
        case "5352535353":
            return "8";
            break;
        case "5252525354":
            return "8";
            break;
        case "4646464626":
            return "9";
            break;
        case "4646464627":
            return "9";
            break;
        case "4646464620":
            return "9";
            break;
        default:
            return '*';
    }
}

//---------------------------------------------------Alpha-------------------------------------

function GetChart56Alpha(key){
    switch(key.substr(0, 56)) {
        case "78787777787878798181818283838384848484848383838281818179":
            return "6";
            break;
        case "78787777787878798181818283838384848484848383838281818179":
            return "8";
            break;
        default:
            return GetChart54Alpha(key);
    }
}
function GetChart54Alpha(key){
    switch(key.substr(0, 54)) {
        case "777777777878787981818182838383848484848383838382818181":
            return "6";
            break;
        case "777777777878787981818182838383848484848383838382818180":
            return "8";
            break;
        default:
            return GetChart50Alpha(key);
    }
}
function GetChart50Alpha(key){
    switch(key.substr(0, 50)) {
        case "77777777787878798181818283838384848484838383838281":
            return "6";
            break;
        case "78777777787878798181818283838384848484838383838281":
            return "6";
            break;
        case "78787777787878798181818283838384848484848383838280":
            return "8";
            break;
        case "78777777787878798181818283838384848484838383838280":
            return "8";
            break;
        case "78787777787878798181818283838384848484848383838281":
            return "8";
            break;
        default:
            return GetChart40Alpha(key);
    }
}
function GetChart40Alpha(key){
    switch(key.substr(0, 40)) {
        case "7877777778787879818181828383838484848483":
            return "6";
            break;
        case "7777777778787879818181828383838484848483":
            return "6";
            break;
        case "7777787778787879818181828383838484848483":
            return "6";
            break;
        case "7778777778787879818181828383838484848483":
            return "6";
            break;
        case "7877787778787879818181828383838484848483":
            return "6";
            break;
        case "7878777778787879818181828383838484838483":
            return "6";
            break;
        case "7877787778787879818181828383838484848484":
            return "8";
            break;
        case "7877777778787879818181828383838484848484":
            return "8";
            break;
        case "7777777778787879818181828383838484848484":
            return "8";
            break;
        case "7777787778787879818181828383838484848484":
            return "8";
            break;
        case "7778777778787879818181828383838484848484":
            return "8";
            break;
        default:
            return GetChart38Alpha(key);
    }
}
function GetChart38Alpha(key){
    switch(key.substr(0, 38)) {
        case "78777777787878798181818283838384848483":
            return "6";
            break;
        case "78787877787878798181818283838384848483":
            return "6";
            break;
        case "77777877787878798181818283838384848483":
            return "6";
            break;
        case "77787877787878798181818283838384848483":
            return "6";
            break;
        case "77787877787878798181818283838384848484":
            return "8";
            break;
        case "78777777787878798181818283838384848484":
            return "8";
            break;
        case "78787877787878798181818283838384848484":
            return "8";
            break;
        case "77777877787878798181818283838384848484":
            return "8";
            break;
        default:
            return GetChart36Alpha(key);
    }
}
function GetChart36Alpha(key){
    switch(key.substr(0, 36)) {
        case "787777777878787981818182838383848483":
            return "6";
            break;
        case "777777777878787981818182838383848484":
            return "6";
            break;
        case "777877777878787981818182838383848483":
            return "6";
            break;
        case "777778777878787981818182838383848483":
            return "6";
            break;
        case "787877777878787981818182838383848483":
            return "6";
            break;
        case "787777777878787981818182838383848484":
            return "8";
            break;
        case "777877777878787981818182838383848484":
            return "8";
            break;
        default:
            return GetChart34Alpha(key);
    }
}
function GetChart34Alpha(key){
    switch(key.substr(0, 34)) {
        case "7778787778787879818181828383838483":
            return "6";
            break;
        case "7877777778787879818181828383838483":
            return "6";
            break;
        case "7877787778787879818181828383838483":
            return "6";
            break;
        case "7777787778787879818181828383838483":
            return "6";
            break;
        case "7778777778787879818181828383838483":
            return "6";
            break;
        case "7878777778787879818181828383838483":
            return "6";
            break;
        case "7778787778787879818181828383838484":
            return "8";
            break;
        case "7877777778787879818181828383838484":
            return "8";
            break;
        case "7877787778787879818181828383838484":
            return "8";
            break;
        case "7777787778787879818181828383838484":
            return "8";
            break;
        case "7778777778787879818181828383838484":
            return "8";
            break;
        case "7878777778787879818181828383838484":
            return "8";
            break;
        default:
            return GetChart26Alpha(key);
    }
}
function GetChart26Alpha(key){
    switch(key.substr(0, 26)) {
        case "70707073767676767676767682":
            return "P";
            break;
        case "70707073767676767676767628":
            return "P";
            break;
        case "70707073767676767676767613":
            return "P";
            break;
        case "70707074767676767676767627":
            return "P";
            break;
        case "70707074767676767676767613":
            return "P";
            break;
        case "70707073767676767676767673":
            return "R";
            break;
        case "70707073767676767676767674":
            return "R";
            break;
        case "70707074767676767676767673":
            return "R";
            break;
        case "70707074767676767676767674":
            return "R";
            break;
        default:
            return GetChart24Alpha(key);
    }
}
function GetChart24Alpha(key){
    switch(key.substr(0, 24)) {

        case "777777777878787981818182":
            return "6";
            break;
        case "777777777878787981818185":
            return "a";
            break;
        case "777777777878787981818184":
            return "a";
            break;
        case "707070737676767676767676":
            return "P";
            break;
        default:
            return GetChart18Alpha(key);
    }
}
function GetChart18Alpha(key){
    switch(key.substr(0, 18)) {
        case "858585868585858583":
            return "3";
            break;
        case "858585858585858583":
            return "3";
            break;
        case "767676767676767677":
            return "7";
            break;
        case "767676767676767777":
            return "7";
            break;
        case "787878787878787777":
            return "m";
            break;
        case "787878787878787877":
            return "m";
            break;
        case "787878787878787878":
            return "q";
            break;
        case "787878787878787879":
            return "q";
            break;
        case "868686868686868583":
            return "u";
            break;
        case "868686868686868584":
            return "u";
            break;
        case "868686868686868582":
            return "x";
            break;
        case "767676767676767676":
            return "F";
            break;
        case "858585868585858582":
            return "S";
            break;
        case "858585858585858582":
            return "S";
            break;
        default:
            return GetChart16Alpha(key);
    }
}
function GetChart16Alpha(key){
    switch(key.substr(0, 16)) {
        case "8585858685858584":
            return "3";
            break;
        case "8585858585858584":
            return "3";
            break;
        case "7878787878787879":
            return "8";
            break;
        case "7778777778787879":
            return "8";
            break;
        case "7979797877777776":
            return "h";
            break;
        case "7878787878787877":
            return "m";
            break;
        case "7979797877777777":
            return "n";
            break;
        case "8686868377777777":
            return "z";
            break;
        case "8686868377777778":
            return "z";
            break;
        case "8585858585858585":
            return "S";
            break;
        case "8585858585858581":
            return "T";
            break;
        case "8585858585858582":
            return "T";
            break;
        case "8686868377777775":
            return "W";
            break;
        case "8686868377777776":
            return "W";
            break;
        case "8686868377767775":
            return "W";
            break;
        case "8686868377777675":
            return "W";
            break;
        default:
            return GetChart14Alpha(key);
    }
}
function GetChart14Alpha(key){
    switch(key.substr(0, 14)) {
        case "77777877787878":
            return "6";
            break;
        case "77787777787878":
            return "6";
            break;
        case "78777877787879":
            return "8";
            break;
        case "77777877787879":
            return "8";
            break;
        case "77787777787879":
            return "8";
            break;
        case "78777777787879":
            return "8";
            break;
        case "78777877787879":
            return "8";
            break;
        case "78787877787879":
            return "8";
            break;
        case "77787877787879":
            return "8";
            break;
        case "86868686105868":
            return "c";
            break;
        case "86868686105858":
            return "s";
            break;
        default:
            return GetChart12Alpha(key);
    }
}
function GetChart12Alpha(key){
    switch(key.substr(0, 12)) {
        case "777877777878":
            return "6";
            break;
        case "787778777878":
            return "6";
            break;
        case "777877777879":
            return "8";
            break;
        case "777878777879":
            return "8";
            break;
        case "777878777878":
            return "8";
            break;
        case "787878787978":
            return "8";
            break;
        case "787878777879":
            return "8";
            break;
        case "868686862388":
            return "c";
            break;
        case "868686862386":
            return "c";
            break;
        case "868686861278":
            return "c";
            break;
        case "868686861268":
            return "c";
            break;
        case "868686862678":
            return "c";
            break;
        case "868686861648":
            return "c";
            break;
        case "868686861088":
            return "c";
            break;
        case "868686861048":
            return "c";
            break;
        case "868686861058":
            return "c";
            break;
        case "868686862578":
            return "c";
            break;
        case "868686861828":
            return "c";
            break;
        case "868686861458":
            return "c";
            break;
        case "868686862138":
            return "c";
            break;
        case "868686862018":
            return "c";
            break;
        case "868686862758":
            return "c";
            break;
        case "868686862768":
            return "c";
            break;
        case "868686861958":
            return "c";
            break;
        case "787878787979":
            return "p";
            break;
        case "868686861988":
            return "s";
            break;
        case "868686868684":
            return "s";
            break;
        case "868686861298":
            return "s";
            break;
        case "868686861284":
            return "s";
            break;
        case "868686861248":
            return "s";
            break;
        case "868686861838":
            return "s";
            break;
        case "868686862648":
            return "s";
            break;
        case "868686861618":
            return "s";
            break;
        case "868686861058":
            return "s";
            break;
        case "868686862548":
            return "s";
            break;
        case "868686862378":
            return "s";
            break;
        case "868686861428":
            return "s";
            break;
        case "868686862178":
            return "s";
            break;
        case "868686861568":
            return "s";
            break;
        case "868686862738":
            return "s";
            break;
        case "868686861028":
            return "s";
            break;
        default:
            return GetChart10Alpha(key);
    }
}
function GetChart10Alpha(key){
    switch(key.substr(0, 10)) {
        case "8383838483":
            return "0";
            break;
        case "8383838484":
            return "0";
            break;
        case "7373737373":
            return "1";
            break;
        case "8484848486":
            return "2";
            break;
        case "8484848586":
            return "2";
            break;
        case "8586858685":
            return "3";
            break;
        case "8685858685":
            return "3";
            break;
        case "8686868685":
            return "3";
            break;
        case "8586868585":
            return "3";
            break;
        case "8686858685":
            return "3";
            break;
        case "8685868685":
            return "3";
            break;
        case "8586858585":
            return "3";
            break;
        case "8586868685":
            return "3";
            break;
        case "8585868685":
            return "3";
            break;
        case "8685858585":
            return "3";
            break;
        case "8585868585":
            return "3";
            break;
        case "8686868585":
            return "3";
            break;
        case "8685868585":
            return "3";
            break;
        case "8686858585":
            return "3";
            break;
        case "8080808080":
            return "4";
            break;
        case "8585868684":
            return "5";
            break;
        case "8686858684":
            return "5";
            break;
        case "8586868684":
            return "5";
            break;
        case "8685868684":
            return "5";
            break;
        case "8686868684":
            return "5";
            break;
        case "8585858684":
            return "5";
            break;
        case "8685858684":
            return "5";
            break;
        case "8586858684":
            return "5";
            break;
        case "7878787778":
            return "6";
            break;
        case "":
            return "7";
            break;
        case "7777777879":
            return "8";
            break;
        case "7778777878":
            return "8";
            break;
        case "7877787778"://**************************6
            return "8";
            break;
        case "7877777879":
            return "8";
            break;
        case "7777787879":
            return "8";
            break;
        case "7878777879":
            return "8";
            break;
        case "7778787879":
            return "8";
            break;
        case "7878777878":
            return "8";
            break;
        case "7778777879":
            return "8";
            break;
        case "7878777778"://************************** 6
            return "8";
            break;
        case "7877777878":
            return "8";
            break;
        case "7778787878":
            return "8";
            break;
        case "7777787878":
            return "8";
            break;
        case "7877777778"://************************** 6
            return "8";
            break;
        case "7777787778"://************************** 6
            return "8";
            break;
        case "7877787878":
            return "8";
            break;
        case "7777777778":
            return "8";
            break;
        case "7877787879":
            return "8";
            break;
        case "7171717115":
            return "9";
            break;
        case "7171717116":
            return "9";
            break;
        case "7171717118":
            return "9";
            break;
        case "7171717121":
            return "9";
            break;
        case "7171717123":
            return "9";
            break;
        case "7171717188":
            return "9";
            break;
        case "7171717113":
            return "9";
            break;
        case "7171717126":
            return "9";
            break;
        case "7171717120":
            return "9";
            break;
        case "7171717149":
            return "9";
            break;
        case "7171717110":
            return "9";
            break;
        case "7171717119":
            return "9";
            break;
        case "7171717112":
            return "9";
            break;
        case "7171717176":
            return "9";
            break;
        case "7171717127":
            return "9";
            break;
        case "7171717169":
            return "9";
            break;
        case "7171717122":
            return "9";
            break;
        case "7171717114":
            return "9";
            break;
        case "7171717150":
            return "9";
            break;
        case "7171717132":
            return "9";
            break;
        case "7171717151":
            return "9";
            break;
        case "":
            return "a";
            break;
        case "7676767679":
            return "b";
            break;
        case "7776767679":
            return "b";
            break;
        case "7777777679":
            return "b";
            break;
        case "7777767679":
            return "b";
            break;
        case "7677777679":
            return "b";
            break;
        case "7676777679":
            return "b";
            break;
        case "7776777679":
            return "b";
            break;
        case "7677767679":
            return "b";
            break;
        case "8686868671":
            return "c";
            break;
        case "8686868614"://********************************** s
            return "c";
            break;
        case "8686868633":
            return "c";
            break;
        case "8686868652":
            return "c";
            break;
        case "8686868613":
            return "c";
            break;
        case "8686868624":
            return "c";
            break;
        case "8686868616":
            return "c";
            break;
        case "8686868622":
            return "c";
            break;
        case "8686868650":
            return "c";
            break;
        case "8686868615":
            return "c";
            break;
        case "8686868689":
            return "c";
            break;
        case "8686868618"://********************************** s
            return "c";
            break;
        case "8686868677":
            return "c";
            break;
        case "8686868610"://****************************** s
            return "c";
            break;
        case "8686868678":
            return "c";
            break;
        case "8686868634":
            return "c";
            break;
        case "7676767677":
            return "d";
            break;
        case "7676767678":
            return "d";
            break;
        case "7676767778":
            return "d";
            break;
        case "7777777779":
            return "e";
            break;
        case "7070707071":
            return "f";
            break;
        case "7878787880":
            return "g";
            break;
        case "":
            return "h";
            break;
        case "":
            return "i";
            break;
        case "":
            return "j";
            break;
        case "8080818286":
            return "k";
            break;
        case "8181808386":
            return "k";
            break;
        case "8180808286":
            return "k";
            break;
        case "8080808386":
            return "k";
            break;
        case "8080808286":
            return "k";
            break;
        case "8180818286":
            return "k";
            break;
        case "8081808386":
            return "k";
            break;
        case "8081808286":
            return "k";
            break;
        case "8181808286":
            return "k";
            break;
        case "8180808388":
            return "k";
            break;
        case "8180808386":
            return "k";
            break;
        case "":
            return "l";
            break;
        case "":
            return "m";
            break;
        case "":
            return "n";
            break;
        case "":
            return "o";
            break;
        case "":
            return "p";
            break;
        case "":
            return "q";
            break;
        case "7878787777":
            return "r";
            break;
        case "8686868621":
            return "s";
            break;
        case "8686868668":
            return "s";
            break;
        case "8686868620":
            return "s";
            break;
        case "8686868647":
            return "s";
            break;
        case "8686868649":
            return "s";
            break;
        case "8686868627":
            return "s";
            break;
        case "8686868630":
            return "s";
            break;
        case "8686868675":
            return "s";
            break;
        case "8686868617":
            return "s";
            break;
        case "8686868674":
            return "s";
            break;
        case "8686868619":
            return "s";
            break;
        case "8686868623"://****************************** c
            return "s";
            break;
        case "8686868612"://****************************** c
            return "s";
            break;
        case "8686868631":
            return "s";
            break;
        case "8686868626":
            return "s";
            break;
        case "":
            return "t";
            break;
        case "":
            return "u";
            break;
        case "8686867874":
            return "v";
            break;
        case "8686868583":
            return "w";
            break;
        case "8686868582":
            return "w";
            break;
        case "":
            return "x";
            break;
        case "9292928985":
            return "y";
            break;
        case "":
            return "z";
            break;
        case "7878787979":
            return "A";
            break;
        case "7878797979":
            return "A";
            break;
        case "7978787978":
            return "A";
            break;
        case "7978797979":
            return "A";
            break;
        case "7879787978":
            return "A";
            break;
        case "7879797878":
            return "A";
            break;
        case "7979797878":
            return "A";
            break;
        case "7979787878":
            return "A";
            break;
        case "7978797878":
            return "A";
            break;
        case "7879797979":
            return "A";
            break;
        case "7879797978":
            return "A";
            break;
        case "7979797979":
            return "A";
            break;
        case "7879787979":
            return "A";
            break;
        case "7978797978":
            return "A";
            break;
        case "7878788184":
            return "B";
            break;
        case "8585858584":
            return "C";
            break;
        case "7171717170":
            return "D";
            break;
        case "6767676969":
            return "E";
            break;
        case "":
            return "F";
            break;
        case "7373737071":
            return "G";
            break;
        case "7373737070":
            return "G";
            break;
        case "7777777712":
            return "H";
            break;
        case "7777777718":
            return "H";
            break;
        case "7777777721":
            return "H";
            break;
        case "7777777748":
            return "H";
            break;
        case "7777777723":
            return "H";
            break;
        case "7777777726":
            return "H";
            break;
        case "7777777775":
            return "H";
            break;
        case "7777777715":
            return "H";
            break;
        case "7777777710":
            return "H";
            break;
        case "":
            return "I";
            break;
        case "":
            return "J";
            break;
        case "6868687175":
            return "K";
            break;
        case "6868687275":
            return "K";
            break;
        case "6767676868":
            return "L";
            break;
        case "7373737579":
            return "M";
            break;
        case "8072737578":
            return "N";
            break;
        case "8073737578":
            return "N";
            break;
        case "8073727578":
            return "N";
            break;
        case "8072727578":
            return "N";
            break;
        case "":
            return "O";
            break;
        case "7170707376":
            return "P";
            break;
        case "7071717476":
            return "P";
            break;
        case "7071717376":
            return "P";
            break;
        case "7171717476":
            return "P";
            break;
        case "7171707376":
            return "P";
            break;
        case "7071707376":
            return "P";
            break;
        case "7171717376":
            return "P";
            break;
        case "7070717376":
            return "P";
            break;
        case "7070717476":
            return "P";
            break;
        case "7170707476":
            return "P";
            break;
        case "7071707476":
            return "P";
            break;
        case "7170717376":
            return "P";
            break;
        case "7070707476":
            return "P";
            break;
        case "7171717171":
            return "Q";
            break;
        case "7070707476":
            return "R";
            break;
        case "":
            return "S";
            break;
        case "":
            return "T";
            break;
        case "8181828485":
            return "U";
            break;
        case "8181818485":
            return "U";
            break;
        case "8182818485":
            return "U";
            break;
        case "8281818485":
            return "U";
            break;
        case "8182828485":
            return "U";
            break;
        case "8281828485":
            return "U";
            break;
        case "8282818485":
            return "U";
            break;
        case "8585818043":
            return "V";
            break;
        case "8585808023":
            return "V";
            break;
        case "8585808020":
            return "V";
            break;
        case "8585808012":
            return "V";
            break;
        case "8585818015":
            return "V";
            break;
        case "8585808097":
            return "V";
            break;
        case "8585808143":
            return "V";
            break;
        case "8585808170":
            return "V";
            break;
        case "8585808015":
            return "V";
            break;
        case "8585808112":
            return "V";
            break;
        case "8585808025":
            return "V";
            break;
        case "8585808117":
            return "V";
            break;
        case "8585808070":
            return "V";
            break;
        case "8585808197":
            return "V";
            break;
        case "8585818113":
            return "V";
            break;
        case "8686858377":
            return "W";
            break;
        case "8586868377":
            return "W";
            break;
        case "8585868376":
            return "W";
            break;
        case "8585858377":
            return "W";
            break;
        case "8685858377":
            return "W";
            break;
        case "8685858376":
            return "W";
            break;
        case "8585868377":
            return "W";
            break;
        case "8685868376":
            return "W";
            break;
        case "8586868376":
            return "W";
            break;
        case "8586858376":
            return "W";
            break;
        case "8586858377":
            return "W";
            break;
        case "8585858376":
            return "W";
            break;
        case "8686868377":
            return "W";
            break;
        case "8685868377":
            return "W";
            break;
        case "7878788386":
            return "X";
            break;
        case "8585858524":
            return "Y";
            break;
        case "8585858510":
            return "Y";
            break;
        case "8585858516":
            return "Y";
            break;
        case "8585858521":
            return "Y";
            break;
        case "8585858518":
            return "Y";
            break;
        case "8585858518":
            return "Y";
            break;
        case "8585858578":
            return "Y";
            break;
        case "8585858551":
            return "Y";
            break;
        case "8585858515":
            return "Y";
            break;
        case "8484858378":
            return "Z";
            break;
        case "8585848377":
            return "Z";
            break;
        case "8584848378":
            return "Z";
            break;
        case "8584858378":
            return "Z";
            break;
        case "8485848378":
            return "Z";
            break;
        case "8585858378":
            return "Z";
            break;
        case "8485848377":
            return "Z";
            break;
        case "8584858377":
            return "Z";
            break;
        case "8585848378":
            return "Z";
            break;
        case "8485858378":
            return "Z";
            break;
        case "8484848377":
            return "Z";
            break;
        case "8484848378":
            return "Z";
            break;
        case "8484858377":
            return "Z";
            break;
        default:
            return GetChart8Alpha(key);
    }
}
function GetChart8Alpha(key){
    switch(key.substr(0, 8)) {
        case "71717171":
            return "9";
            break;
        case "77777777":
            return "H";
            break;
        case "71717174":
            return "P";
            break;
        case "71717173":
            return "P";
            break;
        case "85858081":
            return "V";
            break;
        case "85858080":
            return "V";
            break;
        case "85858180":
            return "V";
            break;
        case "85858181":
            return "V";
            break;
        case "85858585":
            return "Y";
            break;
        default:
            return GetChart6Alpha(key);
    }
}
function GetChart6Alpha(key){
    switch(key.substr(0, 6)) {
        case "787879":
            return "A";
            break;
        case "797879":
            return "A";
            break;
        case "787978":
            return "A";
            break;
        case "787979":
            return "A";
            break;
        case "797979":
            return "A";
            break;
        case "797978":
            return "A";
            break;
        case "797878":
            return "A";
            break;
        case "717070":
            return "P";
            break;
        case "707070":
            return "P";
            break;
        case "707171":
            return "P";
            break;
        case "717170":
            return "P";
            break;
        case "707170":
            return "P";
            break;
        case "707071":
            return "P";
            break;
        case "717071":
            return "P";
            break;
        case "848484":
            return "Z";
            break;
        case "848485":
            return "Z";
            break;
        case "858584":
            return "Z";
            break;
        case "858484":
            return "Z";
            break;
        case "858485":
            return "Z";
            break;
        case "848584":
            return "Z";
            break;
        case "858585":
            return "Z";
            break;
        case "848585":
            return "Z";
            break;
        default:
            return '*';
    }
}

//---------------------------------------------------Normal-------------------------------------

function GetChart50(key){
    switch(key.substr(0, 50)) {
        case "29292929303030313333333536363637373737373636363534":
            return "6";
            break;
        case "29292929303030313333333536363637373737373636363533":
            return "8";
            break;
        case "29292929303030313333333536363638373737373636363533":
            return "8";
            break;
        case "29292929303030313333333536373637373737373636363533":
            return "8";
            break;
        case "29292929303030313333333536363737373737373636363533":
            return "8";
            break;
        default:
            return GetChart26(key);
    }
}
function GetChart26(key){
    switch(key.substr(0, 26)) {
        case "29292929303030313333333536":
            return "8";
            break;
        case "29292929303030313333333537":
            return "8";
            break;
        default:
            return GetChart18(key);
    }
}
function GetChart18(key){
    switch(key.substr(0, 18)) {
        case "404040403939393937":
            return "3";
            break;
        case "282828283030303133":
            return "a";
            break;
        case "282828283030303134":
            return "a";
            break;
        case "282828283030303132":
            return "e";
            break;
        case "141414161617171716":
            return "l";
            break;
        case "141414161617171715":
            return "E";
            break;
        case "404040403939393935":
            return "S";
            break;
        default:
            return GetChart16(key);
    }
}
function GetChart16(key){
    switch(key.substr(0, 16)) {
        case "3131313333323232":
            return "-";
            break;
        case "3131313232323332":
            return "-";
            break;
        case "3131313232323232":
            return "-";
            break;
        case "3131313333333332":
            return "-";
            break;
        case "3131313232323233":
            return "-";
            break;
        case "3131313232333232":
            return "-";
            break;
        case "3131313232333332":
            return "-";
            break;
        case "313131333333232":
            return "-";
            break;
        case "3131313232323333":
            return "-";
            break;
        case "3131313333333232":
            return "-";
            break;
        case "3131313333323333":
            return "-";
            break;
        case "3939393939393939":
            return "+";
            break;
        case "3636363737373737":
            return "0";
            break;
        case "3637363737373737":
            return "0";
            break;
        case "3636373737373737":
            return "0";
            break;
        case "3736363737373737":
            return "0";
            break;
        case "2323232322222221":
            return "1";
            break;
        case "2323232322222220":
            return "1";
            break;
        case "3738373840404139":
            return "2";
            break;
        case "3737373840404039":
            return "2";
            break;
        case "3737373840404139":
            return "2";
            break;
        case "3737373840414139":
            return "2";
            break;
        case "3738373840404039":
            return "2";
            break;
        case "3737373840414039":
            return "2";
            break;
        case "3737373841404039":
            return "2";
            break;
        case "3737383840404039":
            return "2";
            break;
        case "3837373840404039":
            return "2";
            break;
        case "3738383840404039":
            return "2";
            break;
        case "3737383841404039":
            return "2";
            break;
        case "3738373841414039":
            return "2";
            break;
        case "3737373841414039":
            return "2";
            break;
        case "3737383840414039":
            return "2";
            break;
        case "3737373841404139":
            return "2";
            break;
        case "3737383840404139":
            return "2";
            break;
        case "3838373840404139":
            return "2";
            break;
        case "4040404039394039":
            return "3";
            break;
        case "4040404039404039":
            return "3";
            break;
        case "4040404040393939":
            return "3";
            break;
        case "4040404040403939":
            return "3";
            break;
        case "4040404039403939":
            return "3";
            break;
        case "4040404040404039":
            return "3";
            break;
        case "4040404039404038":
            return "3";
            break;
        case "4040404040394039":
            return "3";
            break;
        case "4040404040404038":
            return "3";
            break;
        case "4040404039394038":
            return "3";
            break;
        case "4040404040393938":
            return "3";
            break;
        case "3332323232323230":
            return "4";
            break;
        case "3232323232323230":
            return "4";
            break;
        case "3232323232323230":
            return "4";
            break;
        case "3233323232323230":
            return "4";
            break;
        case "3232333232323230":
            return "4";
            break;
        case "3332333232323230":
            return "4";
            break;
        case "3233333232323230":
            return "4";
            break;
        case "3333333232323230":
            return "4";
            break;
        case "3333323232323230":
            return "4";
            break;
        case "4040404038383837":
            return "5";
            break;
        case "2929292830303031":
            return "6";
            break;
        case "2727272727262627":
            return "7";
            break;
        case "2727272726262727":
            return "7";
            break;
        case "2727272726272627":
            return "7";
            break;
        case "2727272727272727":
            return "7";
            break;
        case "2727272727272627":
            return "7";
            break;
        case "2727272726272727":
            return "7";
            break;
        case "2727272727262727":
            return "7";
            break;
        case "2727272726262627":
            return "7";
            break;
        case "1919191952212121":
            return "9";
            break;
        case "1919191910421212":
            return "9";
            break;
        case "1919191911621212":
            return "9";
            break;
        case "1919191911121212":
            return "9";
            break;
        case "1919191942212121":
            return "9";
            break;
        case "1919191922212121":
            return "9";
            break;
        case "1919191956212121":
            return "9";
            break;
        case "1919191930212121":
            return "9";
            break;
        case "1919191914212121":
            return "9";
            break;
        case "1919191998212121":
            return "9";
            break;
        case "1919191911921212":
            return "9";
            break;
        case "1919191977212121":
            return "9";
            break;
        case "1919191935212121":
            return "9";
            break;
        case "1919191912021212":
            return "9";
            break;
        case "2828282930303031":
            return "a";
            break;
        case "2928292830303031":
            return "a";
            break;
        case "2828292930303031":
            return "a";
            break;
        case "2829282930303031":
            return "a";
            break;
        case "2829282830303031":
            return "a";
            break;
        case "2828292830303031":
            return "a";
            break;
        case "2928282830303031":
            return "a";
            break;
        case "2829292830303031":
            return "a";
            break;
        case "2928282930303031":
            return "a";
            break;
        case "2727272730303032":
            return "b";
            break;
        case "2727272731313032":
            return "b";
            break;
        case "2727272731303031":
            return "b";
            break;
        case "2727272731303032":
            return "b";
            break;
        case "2727272730313032":
            return "b";
            break;
        case "2727272730313132":
            return "b";
            break;
        case "2727272731303132":
            return "b";
            break;
        case "2727272730313031":
            return "b";
            break;
        case "2727272731313031":
            return "b";
            break;
        case "2727272731313132":
            return "b";
            break;
        case "2727272730303132":
            return "b";
            break;
        case "2727272730303131":
            return "b";
            break;
        case "4141414158404040":
            return "c";
            break;
        case "4141414110140404":
            return "c";
            break;
        case "4141414137404040":
            return "c";
            break;
        case "4141414116404040":
            return "c";
            break;
        case "4141414112240404":
            return "c";
            break;
        case "4141414179404040":
            return "c";
            break;
        case "4141414180404040":
            return "c";
            break;
        case "4141414110040404":
            return "c";
            break;
        case "2727272729292930":
            return "d";
            break;
        case "1818181819192424":
            return "f";
            break;
        case "2929292932323233":
            return "g";
            break;
        case "3030302928282827":
            return "h";
            break;
        case "3030312928282827":
            return "h";
            break;
        case "3130302928282827":
            return "h";
            break;
        case "3031302928282827":
            return "h";
            break;
        case "4747474747474745":
            return "j";
            break;
        case "4647474747474745":
            return "j";
            break;
        case "4746474747474745":
            return "j";
            break;
        case "4646474747474745":
            return "j";
            break;
        case "4747464747474745":
            return "j";
            break;
        case "3333333640404041":
            return "k";
            break;
        case "1414141516161616":
            return "l";
            break;
        case "1414141616161616":
            return "l";
            break;
        case "1414141616171716":
            return "l";
            break;
        case "1414141616161717":
            return "l";
            break;
        case "3030303029292929":
            return "m";
            break;
        case "3030302929292929":
            return "m";
            break;
        case "3030302928292928":
            return "n";
            break;
        case "3030302928282828":
            return "n";
            break;
        case "3030312929282828":
            return "n";
            break;
        case "3030302929292828":
            return "n";
            break;
        case "3030302928292828":
            return "n";
            break;
        case "3030302928282928":
            return "n";
            break;
        case "3030302929292928":
            return "n";
            break;
        case "3130302929282828":
            return "n";
            break;
        case "3030302929282828":
            return "n";
            break;
        case "3030302929282928":
            return "n";
            break;
        case "3130312929292828":
            return "n";
            break;
        case "3031302928282828":
            return "n";
            break;
        case "":
            return "o";
            break;
        case "2929292930313032":
            return "p";
            break;
        case "3030292930313132":
            return "p";
            break;
        case "2929292930303132":
            return "p";
            break;
        case "2929292930303032":
            return "p";
            break;
        case "2929292931303132":
            return "p";
            break;
        case "2929292931303032":
            return "p";
            break;
        case "2929292931313032":
            return "p";
            break;
        case "2929302931303032":
            return "p";
            break;
        case "2930292931313032":
            return "p";
            break;
        case "3029292930313132":
            return "p";
            break;
        case "2929292930313132":
            return "p";
            break;
        case "3029302931313032":
            return "p";
            break;
        case "3029292930313032":
            return "p";
            break;
        case "2929292929292929":
            return "q";
            break;
        case "2929292828282828":
            return "r";
            break;
        case "4141414111839383":
            return "s";
            break;
        case "4141414175393938":
            return "s";
            break;
        case "4141414175383939":
            return "s";
            break;
        case "4141414111738393":
            return "s";
            break;
        case "4141414154393839":
            return "s";
            break;
        case "4141414133393838":
            return "s";
            break;
        case "4141414154383938":
            return "s";
            break;
        case "4141414196393938":
            return "s";
            break;
        case "4141414112383939":
            return "s";
            break;
        case "4141414196383938":
            return "s";
            break;
        case "4141414175393839":
            return "s";
            break;
        case "4141414154383939":
            return "s";
            break;
        case "4141414111839393":
            return "s";
            break;
        case "4141414175383839":
            return "s";
            break;
        case "4141414175383938":
            return "s";
            break;
        case "4141414154393939":
            return "s";
            break;
        case "4141414112393839":
            return "s";
            break;
        case "4141414133393939":
            return "s";
            break;
        case "4141414154393938":
            return "s";
            break;
        case "4141414196383838":
            return "s";
            break;
        case "4141414196393838":
            return "s";
            break;
        case "4141414133393839":
            return "s";
            break;
        case "4141414112393938":
            return "s";
            break;
        case "4141414175393939":
            return "s";
            break;
        case "4141414154383838":
            return "s";
            break;
        case "4141414196393939":
            return "s";
            break;
        case "4141414154383839":
            return "s";
            break;
        case "4141414112383938":
            return "s";
            break;
        case "4141414133393938":
            return "s";
            break;
        case "4141414175383838":
            return "s";
            break;
        case "4141414154393838":
            return "s";
            break;
        case "4040404040404037":
            return "t";
            break;
        case "4040404040404036":
            return "t";
            break;
        case "4141414140414140":
            return "u";
            break;
        case "4141414141414040":
            return "u";
            break;
        case "4141414141404140":
            return "u";
            break;
        case "4141414141404040":
            return "u";
            break;
        case "4141414140414040":
            return "u";
            break;
        case "4141414140404140":
            return "u";
            break;
        case "4141414140404040":
            return "u";
            break;
        case "4141414141414140":
            return "u";
            break;
        case "4140402924242425":
            return "v";
            break;
        case "4140412924242425":
            return "v";
            break;
        case "4041402924242425":
            return "v";
            break;
        case "4041412924242425":
            return "v";
            break;
        case "4040412924242425":
            return "v";
            break;
        case "4141402924242425":
            return "v";
            break;
        case "4040402924242425":
            return "v";
            break;
        case "4141412924242425":
            return "v";
            break;
        case "4041413936363131":
            return "w";
            break;
        case "4140403936363031":
            return "w";
            break;
        case "4140403936363131":
            return "w";
            break;
        case "4140403936363130":
            return "w";
            break;
        case "4140413936363131":
            return "w";
            break;
        case "4040403936363131":
            return "w";
            break;
        case "4041403936363031":
            return "w";
            break;
        case "4041403936363131":
            return "w";
            break;
        case "4141403936363131":
            return "w";
            break;
        case "4040413936363131":
            return "w";
            break;
        case "4040403936363130":
            return "w";
            break;
        case "4141413936363131":
            return "w";
            break;
        case "4040403936363031":
            return "w";
            break;
        case "4040403936363030":
            return "w";
            break;
        case "4140413936363130":
            return "w";
            break;
        case "4041403936363130":
            return "w";
            break;
        case "4140413936363031":
            return "w";
            break;
        case "4041403936363030":
            return "w";
            break;
        case "4040413936363031":
            return "w";
            break;
        case "4141414140404039":
            return "x";
            break;
        case "4141414141414139":
            return "x";
            break;
        case "4141414141404139":
            return "x";
            break;
        case "4141414141414039":
            return "x";
            break;
        case "4141414141404039":
            return "x";
            break;
        case "4141414140404139":
            return "x";
            break;
        case "4141414140414039":
            return "x";
            break;
        case "4141414140414139":
            return "x";
            break;
        case "4949494539393932":
            return "y";
            break;
        case "4949494539393933":
            return "y";
            break;
        case "4141413628282829":
            return "z";
            break;
        case "4141413628282929":
            return "z";
            break;
        case "4141413628292829":
            return "z";
            break;
        case "4141413629282829":
            return "z";
            break;
        case "4141413629292829":
            return "z";
            break;
        case "3030303030303030":
            return "A";
            break;
        case "2929293337383737":
            return "B";
            break;
        case "2929293338383837":
            return "B";
            break;
        case "2929293338373837":
            return "B";
            break;
        case "2929293438383837":
            return "B";
            break;
        case "2929293337373837":
            return "B";
            break;
        case "2929293338383737":
            return "B";
            break;
        case "2929293337383837":
            return "B";
            break;
        case "2929293438383737":
            return "B";
            break;
        case "2929293438373737":
            return "B";
            break;
        case "4039393937373736":
            return "C";
            break;
        case "3939403937373736":
            return "C";
            break;
        case "3939393937373736":
            return "C";
            break;
        case "4040393937373736":
            return "C";
            break;
        case "3940403937373736":
            return "C";
            break;
        case "3939393938373736":
            return "C";
            break;
        case "4039403937373736":
            return "C";
            break;
        case "4039393938373836":
            return "C";
            break;
        case "3940393937373736":
            return "C";
            break;
        case "3939403937383736":
            return "C";
            break;
        case "3939393937383736":
            return "C";
            break;
        case "3940393938373736":
            return "C";
            break;
        case "3940393937383736":
            return "C";
            break;
        case "2020202019191923":
            return "D";
            break;
        case "2020201919191923":
            return "D";
            break;
        case "1414141617171717":
            return "E";
            break;
        case "1414141617161717":
            return "E";
            break;
        case "1414141617171617":
            return "E";
            break;
        case "2626262727262626":
            return "F";
            break;
        case "2626262727272726":
            return "F";
            break;
        case "2626262626262726":
            return "F";
            break;
        case "2626262626262727":
            return "F";
            break;
        case "2626262626272726":
            return "F";
            break;
        case "2626262727272626":
            return "F";
            break;
        case "2626262626272727":
            return "F";
            break;
        case "2626262727262627":
            return "F";
            break;
        case "2626262626262627":
            return "F";
            break;
        case "2626262727262726":
            return "F";
            break;
        case "2626262727272727":
            return "F";
            break;
        case "2626262626272626":
            return "F";
            break;
        case "2626262626262626":
            return "F";
            break;
        case "2626262727272627":
            return "F";
            break;
        case "2626262626272627":
            return "F";
            break;
        case "2626262727262727":
            return "F";
            break;
        case "2323231919191919":
            return "G";
            break;
        case "2828282897282828":
            return "H";
            break;
        case "2828282834282828":
            return "H";
            break;
        case "2828282855282828":
            return "H";
            break;
        case "2828282876282828":
            return "H";
            break;
        case "2828282811828282":
            return "H";
            break;
        case "2828282813282828":
            return "H";
            break;
        case "1414141717171717":
            return "I";
            break;
        case "1414141717161717":
            return "I";
            break;
        case "1414141717171617":
            return "I";
            break;
        case "4040404058404040":
            return "J";
            break;
        case "4040404012240404":
            return "J";
            break;
        case "4040404010040404":
            return "J";
            break;
        case "4040404037404040":
            return "J";
            break;
        case "4040404016404040":
            return "J";
            break;
        case "4040404079404040":
            return "J";
            break;
        case "1515152025262521":
            return "K";
            break;
        case "1515152025252521":
            return "K";
            break;
        case "1515152026252521":
            return "K";
            break;
        case "1515152026262521":
            return "K";
            break;
        case "1515152025252621":
            return "K";
            break;
        case "1414141616161622":
            return "L";
            break;
        case "1414141516161622":
            return "L";
            break;
        case "1414141616161623":
            return "L";
            break;
        case "1414141516161623":
            return "L";
            break;
        case "2323232531313535":
            return "M";
            break;
        case "2322232531313535":
            return "M";
            break;
        case "2323222531313535":
            return "M";
            break;
        case "2322222531313535":
            return "M";
            break;
        case "2223232531313535":
            return "M";
            break;
        case "2223222531313535":
            return "M";
            break;
        case "2222232531313535":
            return "M";
            break;
        case "2222222531313535":
            return "M";
            break;
        case "3222222529292935":
            return "N";
            break;
        case "2121212019191919":
            return "O";
            break;
        case "1919192327272727":
            return "P";
            break;
        case "1919191920191920":
            return "Q";
            break;
        case "1919191919201920":
            return "Q";
            break;
        case "1919191919191920":
            return "Q";
            break;
        case "1919191919192020":
            return "Q";
            break;
        case "1919191919202020":
            return "Q";
            break;
        case "1919191920201920":
            return "Q";
            break;
        case "1919192326262626":
            return "R";
            break;
        case "1919192326262627":
            return "R";
            break;
        case "3939393940403934":
            return "T";
            break;
        case "3939393939393934":
            return "T";
            break;
        case "3939393940394034":
            return "T";
            break;
        case "3939393940393934":
            return "T";
            break;
        case "3939393939403934":
            return "T";
            break;
        case "3939393939404034":
            return "T";
            break;
        case "3939393939394034":
            return "T";
            break;
        case "3939393940404034":
            return "T";
            break;
        case "3434343839393940":
            return "U";
            break;
        case "4040333369141414":
            return "V";
            break;
        case "4040333311114141":
            return "V";
            break;
        case "4040333347141414":
            return "V";
            break;
        case "4040333351414141":
            return "V";
            break;
        case "4040333326141414":
            return "V";
            break;
        case "4040333390141414":
            return "V";
            break;
        case "4040333348141414":
            return "V";
            break;
        case "4040403627272725":
            return "W";
            break;
        case "3030303640404041":
            return "X";
            break;
        case "3939393917393939":
            return "Y";
            break;
        case "3939393959393939":
            return "Y";
            break;
        case "3939393959404039":
            return "Y";
            break;
        case "3939393912339394":
            return "Y";
            break;
        case "3939393938404039":
            return "Y";
            break;
        case "3939393938393940":
            return "Y";
            break;
        case "3939393938403939":
            return "Y";
            break;
        case "3939393959403939":
            return "Y";
            break;
        case "3939393912339403":
            return "Y";
            break;
        case "3939393980393940":
            return "Y";
            break;
        case "3939393959394040":
            return "Y";
            break;
        case "3939393938394039":
            return "Y";
            break;
        case "3939393910239393":
            return "Y";
            break;
        case "3939393938393939":
            return "Y";
            break;
        case "3939393981403939":
            return "Y";
            break;
        case "3939393938403940":
            return "Y";
            break;
        case "3939393959403940":
            return "Y";
            break;
        case "3939393912339404":
            return "Y";
            break;
        case "3939393980394039":
            return "Y";
            break;
        case "3939393917393940":
            return "Y";
            break;
        case "3939393910240393":
            return "Y";
            break;
        case "3939393980393939":
            return "Y";
            break;
        case "3939393910240394":
            return "Y";
            break;
        case "3939393938404040":
            return "Y";
            break;
        case "3939393917394040":
            return "Y";
            break;
        case "3939393910239394":
            return "Y";
            break;
        case "3939393959394039":
            return "Y";
            break;
        case "3939393912339393":
            return "Y";
            break;
        case "3939383629292923":
            return "Z";
            break;
        case "3839383629292923":
            return "Z";
            break;
        case "3938383629292923":
            return "Z";
            break;
        case "3938393629292923":
            return "Z";
            break;
        case "3838383629292923":
            return "Z";
            break;
        case "3838393629292923":
            return "Z";
            break;
        case "3839393629292923":
            return "Z";
            break;
        case "3939393629292923":
            return "Z";
            break;
        default:
            return GetChart10(key);
    }
}
function GetChart10(key){
    switch(key.substr(0, 10)) {
        case "3131313333":
            return "-";
            break;
        case "3131313232":
            return "-";
            break;
        case "3737363737":
            return "0";
            break;
        case "3736363737":
            return "0";
            break;
        case "3636373737":
            return "0";
            break;
        case "3637363737":
            return "0";
            break;
        case "3636363737":
            return "0";
            break;
        case "3637373737":
            return "0";
            break;
        case "4040404039":
            return "3";
            break;
        case "4040404040":
            return "3";
            break;
        case "2929292930":
            return "3";
            break;
        case "2727272730":
            return "b";
            break;
        case "2727272731":
            return "b";
            break;
        case "4041413936":
            return "w";
            break;
        case "4041403936":
            return "w";
            break;
        case "4141403936":
            return "w";
            break;
        case "4040413936":
            return "w";
            break;
        case "4141413936":
            return "w";
            break;
        case "4040403936":
            return "w";
            break;
        case "4140413936":
            return "w";
            break;
        case "4140403936":
            return "w";
            break;
        case "4141413628":
            return "z";
            break;
        case "4141413629":
            return "z";
            break;
        case "2929293338":
            return "B";
            break;
        case "2929293337":
            return "B";
            break;
        case "2929293438":
            return "B";
            break;
        case "2929293437":
            return "B";
            break;
        case "4039393938":
            return "C";
            break;
        case "4039393937":
            return "C";
            break;
        case "3939403937":
            return "C";
            break;
        case "3939393937":
            return "C";
            break;
        case "4040393937":
            return "C";
            break;
        case "3940403937":
            return "C";
            break;
        case "3939393938":
            return "C";
            break;
        case "4039403937":
            return "C";
            break;
        case "3940393937":
            return "C";
            break;
        case "3940393938":
            return "C";
            break;
        case "1414141717":
            return "I";
            break;
        case "1515152025":
            return "K";
            break;
        case "1515152026":
            return "K";
            break;
        case "1919191919":
            return "Q";
            break;
        case "1919191920":
            return "Q";
            break;
        default:
            return GetChart8(key);
    }
}
function GetChart8(key){
    switch(key.substr(0, 8)) {
        case "38373738":
            return "2";
            break;
        case "37383738":
            return "2";
            break;
        case "37373738":
            return "2";
            break;
        case "37373838":
            return "2";
            break;
        case "37383838":
            return "2";
            break;
        case "38383738":
            return "2";
            break;
        case "30313029":
            return "n";
            break;
        case "31303129":
            return "n";
            break;
        case "31303029":
            return "n";
            break;
        case "30303129":
            return "n";
            break;
        case "30303029":
            return "n";
            break;
        case "29292929":
            return "p";
            break;
        case "29293029":
            return "p";
            break;
        case "29302929":
            return "p";
            break;
        case "30292929":
            return "p";
            break;
        case "30293029":
            return "p";
            break;
        case "30302929":
            return "p";
            break;
        case "41414141":
            return "s";
            break;
        case "40404040":
            return "J";
            break;
        case "39393939":
            return "Y";
            break;
        default:
            return '*';
    }
}

//---------------------------------------------------Digits-------------------------------------

function GetChart50Digits(key){
    switch(key.substr(0, 50)) {
        default:
            return GetChart24Digits(key);
    }
}
function GetChart24Digits(key){
    switch(key.substr(0, 24)) {
        case "777777777777777777777778":
            return "r";
            break;
        default:
            return GetChart16Digits(key);
    }
}
function GetChart16Digits(key){
    switch(key.substr(0, 16)) {
        case "7777777777777778":
            return "a";
            break;
        case "7777777677777778":
            return "o";
            break;
        case "8383838383838381":
            return "t";
            break;
        case "8383838383838383":
            return "u";
            break;
        case "8383838383838382":
            return "x";
            break;
        default:
            return GetChart14Digits(key);
    }
}
function GetChart14Digits(key){
    switch(key.substr(0, 14)) {
        case "77777777777776":
            return "r";
            break;
        default:
            return GetChart12Digits(key);
    }
}
function GetChart12Digits(key){
    switch(key.substr(0, 12)) {
        case "777777777776":
            return "r";
            break;
        default:
            return GetChart10Digits(key);
    }
}
function GetChart10Digits(key){
    switch(key.substr(0, 10)) {
        case "":
            return "a";
            break;
        case "":
            return "b";
            break;
        case "":
            return "c";
            break;
        case "7676767677":
            return "d";
            break;
        case "7676767678":
            return "e";
            break;
        case "7676777678":
            return "e";
            break;
        case "7777767678":
            return "e";
            break;
        case "7677767778":
            return "e";
            break;
        case "7776767778":
            return "e";
            break;
        case "7677767678":
            return "e";
            break;
        case "7676767778":
            return "e";
            break;
        case "7677777778":
            return "e";
            break;
        case "7677777678":
            return "e";
            break;
        case "7776767678":
            return "e";
            break;
        case "7776777678":
            return "e";
            break;
        case "7171717172":
            return "f";
            break;
        case "7777777779":
            return "g";
            break;
        case "7878787776":
            return "h";
            break;
        case "7475757575":
            return "i";
            break;
        case "7575747575":
            return "i";
            break;
        case "7575757575":
            return "i";
            break;
        case "7474747575":
            return "i";
            break;
        case "7574757575":
            return "i";
            break;
        case "":
            return "j";
            break;
        case "":
            return "k";
            break;
        case "":
            return "l";
            break;
        case "":
            return "m";
            break;
        case "7878787777":
            return "n";
            break;
        case "7776777777":
            return "o";
            break;
        case "7676767777":
            return "o";
            break;
        case "7677777777":
            return "o";
            break;
        case "7676777777":
            return "o";
            break;
        case "7776767677":
            return "o";
            break;
        case "7677767677":
            return "o";
            break;
        case "":
            return "p";
            break;
        case "":
            return "q";
            break;
        case "7777777676":
            return "r";
            break;
        case "7777777677":
            return "r";
            break;
        case "7777777777":
            return "r";
            break;
        case "8383838348":
            return "s";
            break;
        case "8383838316":
            return "s";
            break;
        case "8383838368":
            return "s";
            break;
        case "":
            return "t";
            break;
        case "8383838383":
            return "u";
            break;
        case "8383837774":
            return "v";
            break;
        case "8383838281":
            return "w";
            break;
        case "8383838280":
            return "w";
            break;
        case "":
            return "x";
            break;
        case "8888888682":
            return "y";
            break;
        case "":
            return "z";
            break;
        default:
            return GetChart8Digits(key);
    }
}
function GetChart8Digits(key){
    switch(key.substr(0, 8)) {
        case "83838383":
            return "s";
            break;
        default:
            return '*';
    }
}

//---------------------------------------------------Index Number-------------------------------------

function GetChart50IndexNumber(key){
    switch(key.substr(0, 50)) {
        default:
            return GetChart10IndexNumber(key);
    }
}
function GetChart10IndexNumber(key){
    switch(key.substr(0, 10)) {
        case "2424242423":
            return "1";
            break;
        case "3131313233":
            return "2";
            break;
        case "3131323233":
            return "2";
            break;
        case "3231313233":
            return "2";
            break;
        case "3333333332":
            return "3";
            break;
        case "3333333333":
            return "3";
            break;
        case "2929292929":
            return "4";
            break;
        case "":
            return "5";
            break;
        default:
            return '*';
    }
}

//-------------------------------------------------------Number--------------------------------------------

function GetChart56Number(key){
    switch(key.substr(0, 56)) {
        case "77777777787777787979798081818181818181818181818079797979":
            return "6";
            break;
        case "77777777777877787979798081818181818181818181818079797979":
            return "6";
            break;
        case "77777777777778787979798081818181818181818181818079797979":
            return "6";
            break;
        case "77777777777777787979798081818181818181818181818079797979":
            return "6";
            break;
        case "77777777787777787979798081818181818181818181818079797978":
            return "8";
            break;
        case "77777777777877787979798081818181818181818181818079797978":
            return "8";
            break;
        case "77777777777778787979798081818181818181818181818079797978":
            return "8";
            break;
        case "77777777777777787979798081818181818181818181818079797978":
            return "8";
            break;
        default:
            return GetChart50Number(key);
    }
}
function GetChart50Number(key){
    switch(key.substr(0, 50)) {
        default:
            return GetChart16Number(key);
    }
}
function GetChart16Number(key){
    switch(key.substr(0, 16)) {
        case "8383838382828281":
            return "5";
            break;
        default:
            return GetChart14Number(key);
    }
}
function GetChart14Number(key){
    switch(key.substr(0, 14)) {
        case "77777777777877":
            return "6";
            break;
        case "77777777777878":
            return "8";
            break;
        default:
            return GetChart12Number(key);
    }
}
function GetChart12Number(key){
    switch(key.substr(0, 12)) {
        case "777777777878":
            return "8";
            break;
        default:
            return GetChart10Number(key);
    }
}
function GetChart10Number(key){
    switch(key.substr(0, 10)) {
        case "":
            return ",";
            break;
        case "8181818181":
            return "0";
            break;
        case "7474747473":
            return "1";
            break;
        case "8181828283":
            return "2";
            break;
        case "8181818283":
            return "2";
            break;
        case "8182818283":
            return "2";
            break;
        case "8182828283":
            return "2";
            break;
        case "8383838382":
            return "3";
            break;
        case "8383838383":
            return "3";
            break;
        case "7979797979":
            return "4";
            break;
        case "7979797879":
            return "4";
            break;
        case "":
            return "5";
            break;
        case "":
            return "6";
            break;
        case "7676767676":
            return "7";
            break;
        case "7777777778":
            return "8";
            break;
        case "":
            return "9";
            break;
        default:
            return GetChart8Number(key);
    }
}
function GetChart8Number(key){
    switch(key.substr(0, 8)) {
        case "87878787":
            return ",";
            break;
        case "72727272":
            return "9";
            break;
        default:
            return '*';
    }
}

app.get("/coinfree/:id", function(req, res) {
    var day = req.params['id'].split("*")[0];
    var id = req.params['id'].split("*")[1];
    database2.ref('/CoinFree/' + day +'/'+id).once('value').then(function(a) {
        if(a.val()==null){
            database2.ref('/CoinFree/' + day +'/'+id).set(1);
        }
        else{
            database2.ref('/CoinFree/' + day +'/'+id).set(parseInt(a.val()) + 1);
        }
    });    	  
});
app.get("/golikeStart/:id", function(req, res) {
    var id = req.params['id'].split("*")[0];
    var type = req.params['id'].split("*")[1];
    var link = req.params['id'].split("*")[2];
    database2.ref('/Golike/' + id +'/Type').set(type);
    database2.ref('/Golike/' + id +'/Link').set(link);
    database2.ref('/Golike/' + id +'/StatusJob').set("PROCESS");
	res.send("done");    	  
});

app.get("/golikeUpdateStatusJob/:id", function(req, res) {
    var id = req.params['id'].split("*")[0];
    var statusJob = req.params['id'].split("*")[1];
    database2.ref('/Golike/' + id +'/StatusJob').set(statusJob);	  
});

app.get("/golikeUpdateStatusFb/:id", function(req, res) {
    var id = req.params['id'].split("*")[0];
    var statusFb = req.params['id'].split("*")[1];
    database2.ref('/Golike/' + id +'/StatusFb').set(statusFb);	  
});

app.get("/golikeUpdateJobFinish/:id", function(req, res) {
    var id = req.params['id'].split("*")[0];
    var jobFinish = req.params['id'].split("*")[1];
    database2.ref('/Golike/' + id +'/JobFinish').set(jobFinish);	  
});

app.get("/golikeGetInfo/:id", function(req, res) {
    var id = req.params['id'];
    database2.ref('/Golike/' + id).once('value').then(function(a) {
        res.send(a.val());  
    });   	  
});