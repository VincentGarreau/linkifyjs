/*jshint -W030 */
var
doc, testContainer,
jsdom = require('jsdom'),
linkifyElement = require('../../lib/linkify-element'),
htmlOptions = require('./html-options');

try {
	doc = document;
} catch (e) {
	doc = null;
}

describe('linkify-element', function () {

	/**
		Set up the JavaScript document and the element for it
		This code allows testing on Node.js and on Browser environments
	*/
	before(function (done) {

		function onDoc(doc) {
			testContainer = doc.createElement('div');
			testContainer.id = 'linkify-element-test-container';
			testContainer.innerHTML = htmlOptions.original;

			doc.body.appendChild(testContainer);
			done();
		}

		if (doc) { return onDoc(doc); }
		// no document element, use a virtual dom to test

		jsdom.env(
			'<html><head><title>Linkify Test</title></head><body></body></html>',
			function (errors, window) {
				if (errors) { throw errors; }
				doc = window.document;
				return onDoc(window.document);
			}
		);
	});

	it('Has a helper function', function () {
		(linkifyElement.helper).should.be.a('function');
	});

	it('Works with default options', function () {
		(testContainer).should.be.okay;
		testContainer.should.be.a('object');
		var result = linkifyElement(testContainer, null, doc);
		result.should.eql(testContainer); // should return the same element
		testContainer.innerHTML.should.eql(htmlOptions.linkified);
	});

	it('Works with overriden options', function () {
		(testContainer).should.be.okay;
		testContainer.should.be.a('object');
		var result = linkifyElement(testContainer, htmlOptions.altOptions, doc);
		result.should.eql(testContainer); // should return the same element
		testContainer.innerHTML.should.eql(htmlOptions.linkifiedAlt);
	});

});