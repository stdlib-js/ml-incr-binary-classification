<!--

@license Apache-2.0

Copyright (c) 2018 The Stdlib Authors.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

-->


<details>
  <summary>
    About stdlib...
  </summary>
  <p>We believe in a future in which the web is a preferred environment for numerical computation. To help realize this future, we've built stdlib. stdlib is a standard library, with an emphasis on numerical and scientific computation, written in JavaScript (and C) for execution in browsers and in Node.js.</p>
  <p>The library is fully decomposable, being architected in such a way that you can swap out and mix and match APIs and functionality to cater to your exact preferences and use cases.</p>
  <p>When you use stdlib, you can be absolutely certain that you are using the most thorough, rigorous, well-written, studied, documented, tested, measured, and high-quality code out there.</p>
  <p>To join us in bringing numerical computing to the web, get started by checking us out on <a href="https://github.com/stdlib-js/stdlib">GitHub</a>, and please consider <a href="https://opencollective.com/stdlib">financially supporting stdlib</a>. We greatly appreciate your continued support!</p>
</details>

# incrBinaryClassification

[![NPM version][npm-image]][npm-url] [![Build Status][test-image]][test-url] [![Coverage Status][coverage-image]][coverage-url] <!-- [![dependencies][dependencies-image]][dependencies-url] -->

> Incrementally perform binary classification using [stochastic gradient descent][stochastic-gradient-descent] (SGD).

<section class="installation">

## Installation

```bash
npm install @stdlib/ml-incr-binary-classification
```

Alternatively,

-   To load the package in a website via a `script` tag without installation and bundlers, use the [ES Module][es-module] available on the [`esm`][esm-url] branch (see [README][esm-readme]).
-   If you are using Deno, visit the [`deno`][deno-url] branch (see [README][deno-readme] for usage intructions).
-   For use in Observable, or in browser/node environments, use the [Universal Module Definition (UMD)][umd] build available on the [`umd`][umd-url] branch (see [README][umd-readme]).

The [branches.md][branches-url] file summarizes the available branches and displays a diagram illustrating their relationships.

To view installation and usage instructions specific to each branch build, be sure to explicitly navigate to the respective README files on each branch, as linked to above.

</section>

<section class="usage">

## Usage

```javascript
var incrBinaryClassification = require( '@stdlib/ml-incr-binary-classification' );
```

#### incrBinaryClassification( N\[, options] )

Returns an accumulator `function` which incrementally performs binary classification using [stochastic gradient descent][stochastic-gradient-descent].

```javascript
// Create an accumulator for performing binary classification on 3-dimensional data:
var accumulator = incrBinaryClassification( 3 );
```

The function accepts the following `options`:

-   **intercept**: `boolean` indicating whether to include an intercept. If `true`, an element equal to one is implicitly added to each provided feature vector (note, however, that the model does not perform regularization of the intercept term). If `false`, the model assumes that feature vectors are already centered. Default: `true`.

-   **lambda**: regularization parameter. The regularization parameter determines the amount of shrinkage inflicted on the model coefficients. Higher values reduce the variance of the model coefficient estimates at the expense of introducing bias. Default: `1.0e-4`.

-   **learningRate**: an array-like object containing the learning rate function and associated parameters. The learning rate function decides how fast or slow the model coefficients will be updated toward the optimal coefficients. Must be one of the following:

    -   `['constant', ...]`: constant learning rate function. To set the learning rate, provide a second array element. By default, when the learn rate function is 'constant', the learning rate is set to `0.02`.
    -   `['basic']`: basic learning rate function according to the formula `10/(10+t)` where `t` is the current iteration.
    -   `['invscaling', ...]`: inverse scaling learning rate function according to the formula `eta0/pow(t, power_t)` where `eta0` is the initial learning rate and `power_t` is the exponent controlling how quickly the learning rate decreases. To set the initial learning rate, provide a second array element. By default, the initial learning rate is `0.02`. To set the exponent, provide a third array element. By default, the exponent is `0.5`.
    -   `['pegasos']`: [Pegasos][@shalevshwartz:2011a] learning rate function according to the formula `1/(lambda*t)` where `t` is the current iteration and `lambda` is the regularization parameter.

    Default: `['basic']`.

-   **loss**: loss function. Must be one of the following:

    -   `hinge`: hinge loss function. Corresponds to a soft-margin linear Support Vector Machine (SVM), which can handle non-linearly separable data.
    -   `log`: logistic loss function. Corresponds to Logistic Regression.
    -   `modifiedHuber`: Huber loss function [variant][@zhang:2004a] for classification. 
    -   `perceptron`: hinge loss function without a margin. Corresponds to the original perceptron by Rosenblatt (1957).
    -   `squaredHinge`: squared hinge loss function SVM (L2-SVM).

    Default: `'log'`.

By default, the model contains an intercept term. To omit the intercept, set the `intercept` option to `false`:

```javascript
var array = require( '@stdlib/ndarray-array' );

// Create a model with the intercept term:
var acc = incrBinaryClassification( 2, {
    'intercept': true
});
var coefs = acc( array( [ 1.4, 0.5 ] ), 1 );
// returns <ndarray>

var dim = coefs.length;
// returns 3

// Create a model without the intercept term:
acc = incrBinaryClassification( 2, {
    'intercept': false
});
coefs = acc( array( [ 1.4, 0.5 ] ), -1 );
// returns <ndarray>

dim = coefs.length;
// returns 2
```

#### accumulator( x, y )

If provided a feature vector `x` and response value `y` (either `+1` or `-1`), the accumulator function updates a binary classification model; otherwise, the accumulator function returns the current binary classification model coefficients.

```javascript
var array = require( '@stdlib/ndarray-array' );

// Create an accumulator:
var acc = incrBinaryClassification( 2 );

// Provide data to the accumulator...
var x = array( [ 1.0, 0.0 ] );

var coefs = acc( x, -1 );
// returns <ndarray>

x.set( 0, 0.0 );
x.set( 1, 1.0 );

coefs = acc( x, 1 );
// returns <ndarray>

x.set( 0, 0.5 );
x.set( 1, 1.0 );

coefs = acc( x, 1 );
// returns <ndarray>

coefs = acc();
// returns <ndarray>
```

#### accumulator.predict( X\[, type] )

Computes predicted response values for one or more observation vectors `X`.

```javascript
var array = require( '@stdlib/ndarray-array' );

// Create a model with the intercept term:
var acc = incrBinaryClassification( 2 );

// ...

var label = acc.predict( array( [ 0.5, 2.0 ] ) );
// returns <ndarray>
```

Provided an [`ndarray`][@stdlib/ndarray/ctor] having shape `(..., N)`, where `N` is the number of features, the returned [`ndarray`][@stdlib/ndarray/ctor] has shape `(...)` (i.e., the number of dimensions is reduced by one) and data type `float64`. For example, if provided a one-dimensional [`ndarray`][@stdlib/ndarray/ctor], the method returns a zero-dimensional [`ndarray`][@stdlib/ndarray/ctor] whose only element is the predicted response value.

By default, the method returns the predict label (`type='label'`). In order to return a prediction probability of a `+1` response value given either the logistic (`log`) or modified Huber (`modifiedHuber`) loss functions, set the second argument to `'probability'`.

```javascript
var array = require( '@stdlib/ndarray-array' );

// Create a model with the intercept term:
var acc = incrBinaryClassification( 2, {
    'loss': 'log'
});

// ...

var phat = acc.predict( array( [ 0.5, 2.0 ] ), 'probability' );
// returns <ndarray>
```

In order to return the linear predictor (i.e., the signed distance to the hyperplane, which is computed as the dot product between the model coefficients and the provided feature vector `x`, plus the intercept), set the second argument to `'linear'`.

```javascript
var array = require( '@stdlib/ndarray-array' );

// Create a model with the intercept term:
var acc = incrBinaryClassification( 2, {
    'loss': 'log'
});

// ...

var lp = acc.predict( array( [ 0.5, 2.0 ] ), 'linear' );
// returns <ndarray>
```

Given a feature vector `x = [x_0, x_1, ...]` and model coefficients `c = [c_0, c_1, ...]`, the linear predictor is equal to `(x_0*c_0) + (x_1*c_1) + ... + c_intercept`.

</section>

<!-- /.usage -->

<section class="notes">

## Notes

-   The underlying binary classification model performs [L2 regularization][tikhonov-regularization] of model coefficients, shrinking them toward zero by penalizing their squared [euclidean norm][euclidean-norm].
-   [Stochastic gradient descent][stochastic-gradient-descent] is sensitive to the scaling of the features. One is advised to either scale each feature to `[0,1]` or `[-1,1]` or to transform each feature into z-scores with zero mean and unit variance. One should keep in mind that the same scaling has to be applied to training data in order to obtain accurate predictions.
-   In general, the more data provided to an accumulator, the more reliable the model predictions.

</section>

<!-- /.notes -->

<section class="examples">

## Examples

<!-- eslint no-undef: "error" -->

```javascript
var normal = require( '@stdlib/random-base-normal' );
var binomial = require( '@stdlib/random-base-binomial' );
var array = require( '@stdlib/ndarray-array' );
var exp = require( '@stdlib/math-base-special-exp' );
var incrBinaryClassification = require( '@stdlib/ml-incr-binary-classification' );

// Create a new accumulator:
var acc = incrBinaryClassification( 2, {
    'intercept': true,
    'lambda': 1.0e-3,
    'loss': 'log'
});

// Incrementally update the classification model...
var phat;
var x;
var i;
for ( i = 0; i < 10000; i++ ) {
    x = array( [ normal( 0.0, 1.0 ), normal( 0.0, 1.0 ) ] );
    phat = 1.0 / ( 1.0+exp( -( ( 3.0*x.get(0) ) - ( 2.0*x.get(1) ) + 1.0 ) ) );
    acc( x, ( binomial( 1, phat ) ) ? 1.0 : -1.0 );
}

// Retrieve model coefficients:
var coefs = acc();
console.log( 'Feature coefficients: %d, %d', coefs.get( 0 ), coefs.get( 1 ) );
console.log( 'Intercept: %d', coefs.get( 2 ) );

// Predict new observations...
x = array( [ [ 0.9, 0.1 ], [ 0.1, 0.9 ], [ 0.9, 0.9 ] ] );

var out = acc.predict( x );
console.log( 'x = [%d, %d]; label = %d', x.get( 0, 0 ), x.get( 0, 1 ), out.get( 0 ) );
console.log( 'x = [%d, %d]; label = %d', x.get( 1, 0 ), x.get( 1, 1 ), out.get( 1 ) );
console.log( 'x = [%d, %d]; label = %d', x.get( 2, 0 ), x.get( 2, 1 ), out.get( 2 ) );

out = acc.predict( x, 'probability' );
console.log( 'x = [%d, %d]; P(y=1|x) = %d', x.get( 0, 0 ), x.get( 0, 1 ), out.get( 0 ) );
console.log( 'x = [%d, %d]; P(y=1|x) = %d', x.get( 1, 0 ), x.get( 1, 1 ), out.get( 1 ) );
console.log( 'x = [%d, %d]; P(y=1|x) = %d', x.get( 2, 0 ), x.get( 2, 1 ), out.get( 2 ) );

out = acc.predict( x, 'linear' );
console.log( 'x = [%d, %d]; lp = %d', x.get( 0, 0 ), x.get( 0, 1 ), out.get( 0 ) );
console.log( 'x = [%d, %d]; lp = %d', x.get( 1, 0 ), x.get( 1, 1 ), out.get( 1 ) );
console.log( 'x = [%d, %d]; lp = %d', x.get( 2, 0 ), x.get( 2, 1 ), out.get( 2 ) );
```

</section>

<!-- /.examples -->

<section class="references">

## References

-   Rosenblatt, Frank. 1957. "The Perceptron–a perceiving and recognizing automaton." 85-460-1. Buffalo, NY, USA: Cornell Aeronautical Laboratory.
-   Zhang, Tong. 2004. "Solving Large Scale Linear Prediction Problems Using Stochastic Gradient Descent Algorithms." In _Proceedings of the Twenty-First International Conference on Machine Learning_, 116. New York, NY, USA: Association for Computing Machinery. doi:[10.1145/1015330.1015332][@zhang:2004a].
-   Shalev-Shwartz, Shai, Yoram Singer, Nathan Srebro, and Andrew Cotter. 2011. "Pegasos: primal estimated sub-gradient solver for SVM." _Mathematical Programming_ 127 (1): 3–30. doi:[10.1007/s10107-010-0420-4][@shalevshwartz:2011a].

</section>

<!-- /.references -->

<!-- Section for related `stdlib` packages. Do not manually edit this section, as it is automatically populated. -->

<section class="related">

* * *

## See Also

-   <span class="package-name">[`@stdlib/ml-incr/sgd-regression`][@stdlib/ml/incr/sgd-regression]</span><span class="delimiter">: </span><span class="description">online regression via stochastic gradient descent (SGD).</span>

</section>

<!-- /.related -->

<!-- Section for all links. Make sure to keep an empty line after the `section` element and another before the `/section` close. -->


<section class="main-repo" >

* * *

## Notice

This package is part of [stdlib][stdlib], a standard library for JavaScript and Node.js, with an emphasis on numerical and scientific computing. The library provides a collection of robust, high performance libraries for mathematics, statistics, streams, utilities, and more.

For more information on the project, filing bug reports and feature requests, and guidance on how to develop [stdlib][stdlib], see the main project [repository][stdlib].

#### Community

[![Chat][chat-image]][chat-url]

---

## License

See [LICENSE][stdlib-license].


## Copyright

Copyright &copy; 2016-2025. The Stdlib [Authors][stdlib-authors].

</section>

<!-- /.stdlib -->

<!-- Section for all links. Make sure to keep an empty line after the `section` element and another before the `/section` close. -->

<section class="links">

[npm-image]: http://img.shields.io/npm/v/@stdlib/ml-incr-binary-classification.svg
[npm-url]: https://npmjs.org/package/@stdlib/ml-incr-binary-classification

[test-image]: https://github.com/stdlib-js/ml-incr-binary-classification/actions/workflows/test.yml/badge.svg?branch=main
[test-url]: https://github.com/stdlib-js/ml-incr-binary-classification/actions/workflows/test.yml?query=branch:main

[coverage-image]: https://img.shields.io/codecov/c/github/stdlib-js/ml-incr-binary-classification/main.svg
[coverage-url]: https://codecov.io/github/stdlib-js/ml-incr-binary-classification?branch=main

<!--

[dependencies-image]: https://img.shields.io/david/stdlib-js/ml-incr-binary-classification.svg
[dependencies-url]: https://david-dm.org/stdlib-js/ml-incr-binary-classification/main

-->

[chat-image]: https://img.shields.io/gitter/room/stdlib-js/stdlib.svg
[chat-url]: https://app.gitter.im/#/room/#stdlib-js_stdlib:gitter.im

[stdlib]: https://github.com/stdlib-js/stdlib

[stdlib-authors]: https://github.com/stdlib-js/stdlib/graphs/contributors

[umd]: https://github.com/umdjs/umd
[es-module]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules

[deno-url]: https://github.com/stdlib-js/ml-incr-binary-classification/tree/deno
[deno-readme]: https://github.com/stdlib-js/ml-incr-binary-classification/blob/deno/README.md
[umd-url]: https://github.com/stdlib-js/ml-incr-binary-classification/tree/umd
[umd-readme]: https://github.com/stdlib-js/ml-incr-binary-classification/blob/umd/README.md
[esm-url]: https://github.com/stdlib-js/ml-incr-binary-classification/tree/esm
[esm-readme]: https://github.com/stdlib-js/ml-incr-binary-classification/blob/esm/README.md
[branches-url]: https://github.com/stdlib-js/ml-incr-binary-classification/blob/main/branches.md

[stdlib-license]: https://raw.githubusercontent.com/stdlib-js/ml-incr-binary-classification/main/LICENSE

[@stdlib/ndarray/ctor]: https://github.com/stdlib-js/ndarray-ctor

[euclidean-norm]: https://en.wikipedia.org/wiki/Norm_%28mathematics%29#Euclidean_norm

[tikhonov-regularization]: https://en.wikipedia.org/wiki/Tikhonov_regularization

[stochastic-gradient-descent]: https://en.wikipedia.org/wiki/Stochastic_gradient_descent

[@zhang:2004a]: https://doi.org/10.1145/1015330.1015332

[@shalevshwartz:2011a]: https://doi.org/10.1007/s10107-010-0420-4

<!-- <related-links> -->

[@stdlib/ml/incr/sgd-regression]: https://github.com/stdlib-js/ml-incr-sgd-regression

<!-- </related-links> -->

</section>

<!-- /.links -->
