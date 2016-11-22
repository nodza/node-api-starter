var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Country = require('./app/models/country');

// Configure app for body-parser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Set up port
var port = process.env.PORT || 3000;

// Connect to Mongo database
mongoose.connect('mongodb://localhost:27017/countries');

// Define API routes
var router = express.Router();

//  Prefix routes with 'api'
app.use('/api', router);

// Add middleware for validations
router.use(function(req, res, next) {
    console.log('There is a process going...');
    next();
});

router.get('/', function(req, res) {
    res.json({message: 'Hello, Api'});
});

// POST
router.route('/countries')
    .post(function(req, res) {
        var country = new Country();
        country.name = req.body.name;
        country.capital = req.body.capital;
        country.currency = req.body.currency;
        country.flag = req.body.flag;

        country.save(function(err) {
            if (err) {
                res.send(err);
            }
            res.json({message: 'Country saved successfully'});
        });
    })

    // GET ALL RECORDS
    .get(function(req, res) {
        Country.find(function(err, countries) {
             if (err) {
                res.send(err);
            }
            res.json(countries);
        });
    });

// GET ONE RECORD
router.route('/country/:country_id')
    .get(function(req, res) {
        Country.findById(req.params.country_id, function(err, country) {
            if (err) {
                res.send(err);
            }
            res.json(country);
        });
    });
    
// UPDATE
router.route('/country/:country_id')
    .put(function(req, res) {
        Country.findByIdAndUpdate(req.params.country_id, {
            name: req.body.name,
            capital: req.body.capital,
            currency: req.body.currency,
            image: req.body.image
        }, function(err, country) {
            if (err) {
                res.send(err);
            }
            res.json(country);
        });
    });

// DELETE
router.route('/country/:country_id')
    .delete(function(req, res) {
        Country.findByIdAndRemove(req.params.country_id, function(err, country) {
            if (err) {
                res.send(err);
            }
            res.json(country);
        });
    });


// Start the server
app.listen(port);
console.log("Server listening on port " + port);

