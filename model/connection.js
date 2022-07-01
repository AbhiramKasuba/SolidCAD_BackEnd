const mongoose = require('mongoose');

if (process.argv[2] == 'live') {
    config = require('./production.json');
} else if (process.argv[2] == 'testing') {
    config = require('./testing.json');
} else {
    config = require('./development.json');
}

var db_url = config.mongodbUrl;


mongoose.connect(db_url, { dbName: 'SolidCustomers', useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.on('connected', function() {
    console.log("Mongoose is now Connected at: " + db_url);
});
mongoose.connection.on('error', (err) => {
    console.log("db error",err.message)
});

require('./solidcad.schema');
