// Copyright (c) 2022 The Stdlib Authors. License is Apache-2.0: http://www.apache.org/licenses/LICENSE-2.0
/// <reference types="./index.d.ts" />
import t from"https://cdn.jsdelivr.net/gh/stdlib-js/assert-is-positive-integer@esm/index.mjs";import e from"https://cdn.jsdelivr.net/gh/stdlib-js/assert-is-vector-like@esm/index.mjs";import i from"https://cdn.jsdelivr.net/gh/stdlib-js/assert-is-ndarray-like@esm/index.mjs";import s from"https://cdn.jsdelivr.net/gh/stdlib-js/utils-define-nonenumerable-read-only-property@esm/index.mjs";import n from"https://cdn.jsdelivr.net/gh/stdlib-js/string-format@esm/index.mjs";import r from"https://cdn.jsdelivr.net/gh/stdlib-js/utils-define-nonenumerable-read-only-accessor@esm/index.mjs";import a from"https://cdn.jsdelivr.net/gh/stdlib-js/blas-base-gdot@esm/index.mjs";import o from"https://cdn.jsdelivr.net/gh/stdlib-js/blas-base-gaxpy@esm/index.mjs";import l from"https://cdn.jsdelivr.net/gh/stdlib-js/blas-base-dcopy@esm/index.mjs";import d from"https://cdn.jsdelivr.net/gh/stdlib-js/blas-base-dscal@esm/index.mjs";import p from"https://cdn.jsdelivr.net/gh/stdlib-js/math-base-special-max@esm/index.mjs";import h from"https://cdn.jsdelivr.net/gh/stdlib-js/math-base-special-exp@esm/index.mjs";import m from"https://cdn.jsdelivr.net/gh/stdlib-js/math-base-special-pow@esm/index.mjs";import g from"https://cdn.jsdelivr.net/gh/stdlib-js/math-base-special-expit@esm/index.mjs";import c from"https://cdn.jsdelivr.net/gh/stdlib-js/array-float64@esm/index.mjs";import u from"https://cdn.jsdelivr.net/gh/stdlib-js/ndarray-ctor@esm/index.mjs";import f from"https://cdn.jsdelivr.net/gh/stdlib-js/ndarray-base-shape2strides@esm/index.mjs";import b from"https://cdn.jsdelivr.net/gh/stdlib-js/ndarray-base-numel@esm/index.mjs";import v from"https://cdn.jsdelivr.net/gh/stdlib-js/ndarray-base-vind2bind@esm/index.mjs";import j from"https://cdn.jsdelivr.net/gh/stdlib-js/assert-is-nonnegative-number@esm/index.mjs";import _ from"https://cdn.jsdelivr.net/gh/stdlib-js/assert-is-positive-number@esm/index.mjs";import y from"https://cdn.jsdelivr.net/gh/stdlib-js/assert-is-number@esm/index.mjs";import w from"https://cdn.jsdelivr.net/gh/stdlib-js/assert-is-boolean@esm/index.mjs";import R from"https://cdn.jsdelivr.net/gh/stdlib-js/assert-is-array-like-object@esm/index.mjs";import x from"https://cdn.jsdelivr.net/gh/stdlib-js/assert-is-plain-object@esm/index.mjs";import L from"https://cdn.jsdelivr.net/gh/stdlib-js/assert-has-own-property@esm/index.mjs";import E from"https://cdn.jsdelivr.net/gh/stdlib-js/assert-contains@esm/index.mjs";var T=s,F=r,H=n,M=a.ndarray,z=o.ndarray,N=l,O=d,V=p,P=h,S=m,k=g,q=c,A=u,B=f,C=b,D=v,G={basic:"_basicLearningRate",constant:"_constantLearningRate",invscaling:"_inverseScalingLearningRate",pegasos:"_pegasosLearningRate"},I={hinge:"_hingeLoss",log:"_logLoss",modifiedHuber:"_modifiedHuberLoss",perceptron:"_perceptronLoss",squaredHinge:"_squaredHingeLoss"};function J(t,e){var i;return this._N=t,this._opts=e,this._scaleFactor=1,this._t=0,this._learningRateMethod=G[e.learningRate[0]],this._lossMethod=I[e.loss],i=t,e.intercept&&(i+=1),this._weights=new q(i),this._coefficients=new A("float64",new q(i),[i],[1],0,"row-major"),this}T(J.prototype,"_add",(function(t,e){var i=e/this._scaleFactor,s=this._weights;return z(t.shape[0],i,t.data,t.strides[0],t.offset,s,1,0),this._opts.intercept&&(s[this._N]+=i),this})),T(J.prototype,"_basicLearningRate",(function(){return 10/(10+this._t)})),T(J.prototype,"_constantLearningRate",(function(){return this._opts.learningRate[1]})),T(J.prototype,"_dot",(function(t,e,i){var s=M(this._N,this._weights,1,0,t,e,i);return this._opts.intercept&&(s+=this._weights[this._N]),s*=this._scaleFactor})),T(J.prototype,"_hingeLoss",(function(t,e){var i;return i=this[this._learningRateMethod](),this._regularize(i),e*this._dot(t.data,t.strides[0],t.offset)<1&&this._add(t,e*i),this})),T(J.prototype,"_inverseScalingLearningRate",(function(){var t=this._opts.learningRate;return t[1]/S(this._t,t[2])})),T(J.prototype,"_logLoss",(function(t,e){var i,s,n;return s=this[this._learningRateMethod](),this._regularize(s),n=this._dot(t.data,t.strides[0],t.offset),i=e/(1+P(e*n)),this._add(t,s*i),this})),T(J.prototype,"_modifiedHuberLoss",(function(t,e){var i,s;return i=this[this._learningRateMethod](),this._regularize(i),(s=e*this._dot(t.data,t.strides[0],t.offset))<-1?this._add(t,4*i*e):this._add(t,i*(e-s*e)),this})),T(J.prototype,"_pegasosLearningRate",(function(){return 1/(this._opts.lambda*this._t)})),T(J.prototype,"_perceptronLoss",(function(t,e){var i;return i=this[this._learningRateMethod](),this._regularize(i),e*this._dot(t.data,t.strides[0],t.offset)<=0&&this._add(t,e*i),this})),T(J.prototype,"_regularize",(function(t){var e=this._opts.lambda;return e<=0||this._scale(V(1-t*e,1e-7)),this})),T(J.prototype,"_scale",(function(t){var e;if(t<=0)throw new RangeError(H("invalid argument. Attempting to scale a weight vector by a nonpositive value. This is likely due to too large a value of `eta*lambda`. Value: `%f`.",t));return(e=this._scaleFactor)<1e-11&&(O(this._N,e,this._weights,1),this._scaleFactor=1),this._scaleFactor*=t,this})),T(J.prototype,"_squaredHingeLoss",(function(t,e){var i,s;return i=this[this._learningRateMethod](),this._regularize(i),(s=e*this._dot(t.data,t.strides[0],t.offset))<1&&this._add(t,i*(e-s*e)),this})),F(J.prototype,"coefficients",(function(){var t=this._coefficients.data,e=this._weights;return N(e.length,e,1,t,1),O(this._N,this._scaleFactor,t,1),this._coefficients})),F(J.prototype,"nfeatures",(function(){return this._N})),T(J.prototype,"predict",(function(t,e){var i,s,n,r,a,o,l,d,p,h,m,g,c,u,f,b;for(s=t.data,r=t.shape,p=t.strides,m=t.offset,o=t.order,i=r.length-1,a=[],b=0;b<i;b++)a.push(r[b]);for(0===i?(g=1,n=new q(1),h=[0]):(g=C(a),n=new q(g),h=B(a,o)),u=new A("int8",n,a,h,0,o),c=this._N,d=p[i],b=0;b<g;b++)l=D(r,p,m,o,b*c,"throw"),f=this._dot(s,d,l),"label"===e?f=f>0?1:-1:"probability"===e&&(f=k(f)),0===i?u.iset(f):u.iset(b,f);return u})),T(J.prototype,"update",(function(t,e){return this._t+=1,this[this._lossMethod](t,e)}));var K=J,Q={basic:["basic"],constant:["constant",.02],invscaling:["invscaling",.02,.5],pegasos:["pegasos"]},U=j.isPrimitive,W=_.isPrimitive,X=y.isPrimitive,Y=w.isPrimitive,Z=R,$=x,tt=L,et=E,it=n,st=["basic","constant","invscaling","pegasos"],nt=["hinge","log","modifiedHuber","perceptron","squaredHinge"];var rt=function(t,e){var i;if(!$(e))return new TypeError(it("invalid argument. Options argument must be an object. Value: `%s`.",e));if(tt(e,"intercept")&&(t.intercept=e.intercept,!Y(t.intercept)))return new TypeError(it("invalid option. `%s` option must be a boolean. Option: `%s`.","intercept",t.intercept));if(tt(e,"lambda")&&(t.lambda=e.lambda,!U(t.lambda)))return new TypeError(it("invalid option. `%s` option must be a nonnegative number. Option: `%s`.","lambda",t.lambda));if(tt(e,"learningRate")){if(!Z(e.learningRate))return new TypeError(it("invalid option. `%s` option must be an array-like object. Option: `%s`.","learningRate",e.learningRate));if(i=e.learningRate[0],t.learningRate[0]=i,!et(st,i))return new TypeError(it('invalid option. First `%s` option must be one of the following: "%s". Option: `%s`.',"learningRate",st.join('", "'),i));if(e.learningRate.length>1&&("constant"===i||"invscaling"===i)&&(t.learningRate[1]=e.learningRate[1],!W(t.learningRate[1])))return new TypeError(it("invalid option. Second `%s` option must be a positive number. Option: `%f`.","learningRate",t.learningRate[1]));if(e.learningRate.length>2&&"invscaling"===i&&(t.learningRate[2]=e.learningRate[2],!X(t.learningRate[2])))return new TypeError(it("invalid option. Third `%s` option must be a number. Option: `%f`.","learningRate",t.learningRate[2]))}return tt(e,"loss")&&(t.loss=e.loss,!et(nt,t.loss))?new TypeError(it('invalid option. `%s` option must be one of the following: "%s". Option: `%s`.',"loss",nt.join('", "'),t.loss)):null},at=t.isPrimitive,ot=e,lt=i,dt=s,pt=n,ht=K,mt=Q,gt=rt;var ct=function(t,e){var i,s,n;if(!at(t))throw new TypeError(pt("invalid argument. First argument must be a positive integer. Value: `%s`.",t));if(s={intercept:!0,lambda:1e-4,learningRate:mt.basic.slice(),loss:"log"},arguments.length>1&&(n=gt(s,e)))throw n;return i=new ht(t,s),dt(r,"predict",a),r;function r(t,e){if(0===arguments.length)return i.coefficients;if(!ot(t))throw new TypeError(pt("invalid argument. First argument must be a one-dimensional ndarray. Value: `%s`.",t));if(-1!==e&&1!==e)throw new TypeError(pt("invalid argument. Second argument must be either +1 or -1. Value: `%s`.",e));if(t.shape[0]!==i.nfeatures)throw new TypeError(pt("invalid argument. First argument must be a one-dimensional ndarray of length `%u`. Actual length: `%u`.",i.nfeatures,t.shape[0]));return i.update(t,e),i.coefficients}function a(e,n){var r,a;if(!lt(e))throw new TypeError(pt("invalid argument. First argument must be an ndarray. Value: `%s`.",e));if((r=e.shape)[r.length-1]!==t)throw new TypeError(pt("invalid argument. First argument must be an ndarray whose last dimension is of size `%u`. Actual size: `%u`.",t,r[r.length-1]));if(a="label",arguments.length>1){if("probability"===n){if("log"!==s.loss&&"modifiedHuber"!==s.loss)throw new Error(pt("invalid argument. Second argument is incompatible with model loss function. Probability predictions are only supported when the loss function is either `log` or `modifiedHuber`. Model loss function: `%s`.",s.loss))}else if("label"!==n&&"linear"!==n)throw new TypeError(pt('invalid argument. Second argument must be a string value equal to either "label", "probability", or "linear". Value: `%s`.',n));a=n}return i.predict(e,a)}},ut=ct;export{ut as default};
//# sourceMappingURL=index.mjs.map
