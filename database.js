/**
 * Created by suransh on 26/10/16.
 */

var Parse = require('parse/node');

Parse.initialize("qQtOBb8QuyE2oXVXrnF7U2FRql2uYVcA7wFxUwEu","kn0cHUBQfxj0Yk984JQwKBTJG7G3NjHNYDTcrTXf");
Parse.serverURL = 'https://parseapi.back4app.com/';

module.exports = {
  show: (type,cb) => {
      var Centres = Parse.Object.extend("Centers");
      var query = new Parse.Query(Centres);
      query.equalTo("type",type);
      query.find({
          success: function (results) {
              cb(results);
          }
      })
  }
}
;




