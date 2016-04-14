"use strict";


import { Meteor } from 'meteor/meteor';
import { Products } from '/imports/collections';
import { Pantry } from '/imports/collections';


Meteor.startup(() => {
	// fill in some starting products if DB happens to be empty
	if(0 === Products.find({}).count()) {
		let products = [
			"aceite",
			"azúcar",
			"orégano",
			"pelpa",
			"rollos",
			"sal",
			];

		products.forEach((product) => {
			Products.insert({
				name: product,
				addedOn: Date.now(),
				addedBy: 'admin',
			});
		});
	}

	// start with a clean pantry
	Pantry.remove({});
});

Meteor.publish('products', function () {
	return Products.find({}, {sort: {name: 1}});
});

Meteor.publish('pantry', function () {
	return Pantry.find({}, {sort: {name: 1}});
});
