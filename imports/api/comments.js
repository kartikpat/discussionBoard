import { Mongo } from 'meteor/mongo';

// Comments collection to contain all comments in discussion
export const Comments = new Mongo.Collection('comments');