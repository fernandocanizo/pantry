"use strict";

import { Mongo } from 'meteor/mongo';


export let Products = new Mongo.Collection('products');
export let Pantry = new Mongo.Collection('pantry');
