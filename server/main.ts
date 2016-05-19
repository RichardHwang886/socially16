import {loadParties} from './load-parties';
import './parties';
import './users';
import '../collections/methods';
import {Meteor} from 'meteor/meteor';

Meteor.startup(loadParties);
