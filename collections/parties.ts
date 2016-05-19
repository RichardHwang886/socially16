import {Mongo} from 'meteor/mongo';
import {Meteor} from 'meteor/meteor';

export var Parties = new Mongo.Collection<Party>('parties');

Parties.allow({
  insert: function() {
    var user = Meteor.user();
    return !!user;
  },
  update: function() {
    var user = Meteor.user();
    return !!user;
  },
  remove: function() {
    var user = Meteor.user();
    return !!user;
  }
});
