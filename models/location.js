var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var locationSchema = new Schema( {
  // user_id: Schema.ObjectId,
  client_id: {type: String},
  client_type: {type: String},
  loc: [Number],
  accuracy: {type: Number},
  fix_time: {type: Date},
  created_at: {type: Date},
  updated_at: {type: Date}
}, {
  _id: false,
  versionKey: false
});
locationSchema.pre('save', function(next){
  now = new Date();
  this.updated_at = now;
  if ( !this.created_at ) {
    this.created_at = now;
  }
  next();
});
var Location = mongoose.model('location', locationSchema, 'locations');

module.exports = {
  Location: Location
}

