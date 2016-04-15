"use strict";


import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { Products } from '/imports/collections';
import { Pantry } from '/imports/collections';

import './body.html';
import './navbar.html';
import './footer.html';


Meteor.subscribe('products');
Meteor.subscribe('pantry');

////////////////////////////////////////////////////////////////////////////////
// pantry
////////////////////////////////////////////////////////////////////////////////
Template.pantry.helpers({
	products: function () {
		return Pantry.find({isHere: true});
	}
});

Template.pantry.onRendered(function () {
	let templateInstance = this;
	templateInstance.$('#pantry').droppable({
		drop: (evt, ui) => {
			let query = { _id: ui.draggable.data('id') };
			let changes = { $set: { isHere: true }};
			Products.update(query, changes);
		}
	});
});

////////////////////////////////////////////////////////////////////////////////
// toBuy
////////////////////////////////////////////////////////////////////////////////
Template.toBuy.helpers({
	products: function () {
		return Pantry.find({isHere: false});
	}
});

////////////////////////////////////////////////////////////////////////////////
// products
////////////////////////////////////////////////////////////////////////////////
Template.products.helpers({
	products: function () {
		return Products.find({});
	}
});

Template.products.events({
	'submit #addProduct': function (event) {
		event.preventDefault();
		let product = event.target.inputProduct.value.trim();
		Meteor.call('products.insert', product);
		// reset input box
		event.target.inputProduct.value = "";
	}
});

////////////////////////////////////////////////////////////////////////////////
// productListItem
////////////////////////////////////////////////////////////////////////////////
Template.productListItem.onRendered(function () {
	let templateInstance = this;
	// make all products draggable
	templateInstance.$(".js-draggable").draggable();
});
