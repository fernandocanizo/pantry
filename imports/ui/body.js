"use strict";


import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { Products } from '/imports/collections';
import { Pantry } from '/imports/collections';

import './body.html';
import './navbar.html';
import './footer.html';

Template.products.helpers({
	products: [
		{ "_id" : "PdTyLYLw3qTALvDPa", "name" : "aceite", "addedOn" : 1460495880090, "addedBy" : "admin" },
		{ "_id" : "Lt6ohxwfc345hucgj", "name" : "azúcar", "addedOn" : 1460495880095, "addedBy" : "admin" },
		{ "_id" : "nPqupCHFpqQfhSAgy", "name" : "orégano", "addedOn" : 1460495880098, "addedBy" : "admin" },
		{ "_id" : "m2zJNHMi9mrTKbzrJ", "name" : "pelpa", "addedOn" : 1460495880099, "addedBy" : "admin" },
		{ "_id" : "jrDgNHcTJ3Bx7cKNy", "name" : "rollos", "addedOn" : 1460495880100, "addedBy" : "admin" },
		{ "_id" : "R5p8BQvD8nH5Nzivw", "name" : "sal", "addedOn" : 1460495880102, "addedBy" : "admin" },
	]
});

Meteor.subscribe('products');
Meteor.subscribe('pantry');

Template.pantry.helpers({
	products: function () {
		return Pantry.find({isHere: true});
	}
});

Template.toBuy.helpers({
	products: function () {
		return Pantry.find({isHere: false});
	}
});

Template.products.helpers({
	products: function () {
		console.log(Products.find({}));
		return Products.find({});
	}
});
