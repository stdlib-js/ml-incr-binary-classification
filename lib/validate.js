/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var isNonNegativeNumber = require( '@stdlib/assert-is-nonnegative-number' ).isPrimitive;
var isPositiveNumber = require( '@stdlib/assert-is-positive-number' ).isPrimitive;
var isNumber = require( '@stdlib/assert-is-number' ).isPrimitive;
var isBoolean = require( '@stdlib/assert-is-boolean' ).isPrimitive;
var isArrayLikeObject = require( '@stdlib/assert-is-array-like-object' );
var isObject = require( '@stdlib/assert-is-plain-object' );
var hasOwnProp = require( '@stdlib/assert-has-own-property' );
var contains = require( '@stdlib/assert-contains' );
var format = require( '@stdlib/error-tools-fmtprodmsg' );
var LEARNING_RATES = require( './learning_rates.json' );
var LOSS_FUNCTIONS = require( './loss_functions.json' );


// MAIN //

/**
* Validates function options.
*
* @private
* @param {Object} opts - destination object
* @param {Options} options - function options
* @param {PositiveNumber} [options.lambda] - regularization parameter
* @param {ArrayLikeObject} [options.learningRate] - learning rate function
* @param {string} [options.loss] - loss function
* @param {boolean} [options.intercept] - specifies whether an intercept should be included
* @returns {(Error|null)} null or an error object
*
* @example
* var opts = {};
* var options = {};
* var err = validate( opts, options );
* if ( err ) {
*     throw err;
* }
*/
function validate( opts, options ) {
	var name;
	if ( !isObject( options ) ) {
		return new TypeError( format( '0LQ2h', options ) );
	}
	if ( hasOwnProp( options, 'intercept' ) ) {
		opts.intercept = options.intercept;
		if ( !isBoolean( opts.intercept ) ) {
			return new TypeError( format( '0LQ30', 'intercept', opts.intercept ) );
		}
	}
	if ( hasOwnProp( options, 'lambda' ) ) {
		opts.lambda = options.lambda;
		if ( !isNonNegativeNumber( opts.lambda ) ) {
			return new TypeError( format( '0LQ4x', 'lambda', opts.lambda ) );
		}
	}
	if ( hasOwnProp( options, 'learningRate' ) ) {
		if ( !isArrayLikeObject( options.learningRate ) ) {
			return new TypeError( format( '0LQ4y', 'learningRate', options.learningRate ) );
		}
		name = options.learningRate[ 0 ];
		opts.learningRate[ 0 ] = name;
		if ( !contains( LEARNING_RATES, name ) ) {
			return new TypeError( format( '0LQ4z', 'learningRate', LEARNING_RATES.join( '", "' ), name ) );
		}
		if ( options.learningRate.length > 1 ) {
			if ( name === 'constant' || name === 'invscaling' ) {
				opts.learningRate[ 1 ] = options.learningRate[ 1 ];
				if ( !isPositiveNumber( opts.learningRate[ 1 ] ) ) {
					return new TypeError( format( 'invalid option. Second `%s` option must be a positive number. Option: `%s`.', 'learningRate', opts.learningRate[ 1 ] ) );
				}
			}
		}
		if ( options.learningRate.length > 2 ) {
			if ( name === 'invscaling' ) {
				opts.learningRate[ 2 ] = options.learningRate[ 2 ];
				if ( !isNumber( opts.learningRate[ 2 ] ) ) {
					return new TypeError( format( 'invalid option. Third `%s` option must be a number. Option: `%s`.', 'learningRate', opts.learningRate[ 2 ] ) );
				}
			}
		}
	}
	if ( hasOwnProp( options, 'loss' ) ) {
		opts.loss = options.loss;
		if ( !contains( LOSS_FUNCTIONS, opts.loss ) ) {
			return new TypeError( format( '0LQ3t', 'loss', LOSS_FUNCTIONS.join( '", "' ), opts.loss ) );
		}
	}
	return null;
}


// EXPORTS //

module.exports = validate;
