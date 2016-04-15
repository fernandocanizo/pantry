"use strict";


import { Meteor } from 'meteor/meteor';
import { Products } from '/imports/collections';
import { check } from 'meteor/check';


Meteor.methods({
	'products.insert'(product) {
		check(product, String);

		// ensure user is logged in
//		if(! Meteor.userId()) {
//			throw new Meteor.Error("Not authorized!");
//		}

		Products.insert({
			name: product[0].toUpperCase() + product.slice(1),
			addedOn: Date.now(),
			addedBy: '',
//			addedBy: Meteor.userId(),
		});
	},
	'products.remove'(productId) {
		check(productId, String);
		Products.remove(productId);
	},
});
