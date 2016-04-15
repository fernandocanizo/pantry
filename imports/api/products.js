"use strict";


import { Meteor } from 'meteor/meteor';
import { Products } from '/imports/collections';
import { Pantry } from '/imports/collections';
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

	'pantry.insert'(productId) {
		let product = Products.findOne(productId);
		product.isHere = false;
		Pantry.insert(product);
	},

	'pantry.toggleIsHere'(productId) {
		let product = Pantry.findOne(productId);
		product.isHere = ! product.isHere;
		Pantry.update(productId, product);
	},

	'pantry.remove'(productId) {
		Pantry.remove(productId);
	},
});
