var http = require('http');
var formidable = require('formidable');
var util = require('util');

var server = http.createServer(function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

    if (req.method.toLowerCase() == 'post') {
        processForm(req, res);
        return;
    }

    if(req.method.toLowerCase() == 'get')
    {
        var data = {
            data: {
                languages: [
                    'English',
                    'German',
                    'Spanish',
                    'French',
                    'Swahili',
                    'Other'
                ]
            }
        };

        var responseData = JSON.stringify(data);
        res.end(responseData); //This is how data gets back to app when a 'get' is called
        console.log("Get: ", responseData);
        return;
    }

    res.end();
});

function processForm(req, res) {
    var form = new formidable.IncomingForm();

    form.parse(req, function (err, fields) {

        fields.id = 'ABC123'; //returns an Id

        //Formats the JSON header
        res.writeHead(200, {
            'content-type': 'text/plain'
        });

        //strigifies the JSON fields/data
        var data = JSON.stringify({
            fields: fields
        });

        
        res.end(data);

        console.log('posted fields:\n');
        console.log(data);
    });
}

var port = 3100;
server.listen(port);
console.log("Server listening on port " + port);