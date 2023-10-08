describe('textsearcher test suite', () => {

    const assert = require('assert')
    const ts = require('../textsearcher.js')
    
    describe ('searches on short text', () => {
        var tsearch;

        before(() => {  
            tsearch = new ts.TextSearcher('files/short_excerpt.txt')
        })

        it('basic search - no context', function() {
            const expected = [
                "sketch"
            ]
            for (let i = 0; i < 1000; ++i) {
                const matches = tsearch.search('sketch', 0)
                assert.deepEqual(matches, expected)
            }
        }).timeout(1000)

        it('multiple hits - no context', function() {
            const expected = [
                "naturalists",
                "naturalists"
            ]
            for (let i = 0; i < 1000; ++i) {
                const matches = tsearch.search("naturalists", 0)
                assert.deepEqual(matches, expected)
            }
        }).timeout(1000)

        it('multiple hits - 3 context', function() {
            const expected = [
                "great majority of naturalists believed that species",
                "authors.  Some few naturalists, on the other"
            ]
            for (let i = 0; i < 1000; ++i) {
                const matches = tsearch.search("naturalists", 3)
                assert.deepEqual(matches, expected)
            }
        }).timeout(1000)

        it('multiple hits - 6 context', function() {
            const expected = [
                "Until recently the great majority of naturalists believed that species were immutable productions",
                "maintained by many authors.  Some few naturalists, on the other hand, have believed"
            ]
            for (let i = 0; i < 1000; ++i) {
                const matches = tsearch.search("naturalists", 6)
                assert.deepEqual(matches, expected)
            }
        }).timeout(1000)

        it('case insensitive - lower', function() {
            const expected = [
                "on the Origin of Species.  Until recently the great",
                "of naturalists believed that species were immutable productions, and",
                "hand, have believed that species undergo modification, and that"
            ]
            for (let i = 0; i < 1000; ++i) {
                const matches = tsearch.search("species", 4)
                assert.deepEqual(matches, expected)
            }
        }).timeout(1000)
    
        it('case insensitive - upper', function() {
            const expected = [
                "on the Origin of Species.  Until recently the great",
                "of naturalists believed that species were immutable productions, and",
                "hand, have believed that species undergo modification, and that"
            ]
            for (let i = 0; i < 1000; ++i) {
                const matches = tsearch.search("SPECIES", 4)
                assert.deepEqual(matches, expected)
            }
        }).timeout(1000)
    
        it('case insensitive - mixed', function() {
            const expected = [
                "on the Origin of Species.  Until recently the great",
                "of naturalists believed that species were immutable productions, and",
                "hand, have believed that species undergo modification, and that"
            ]
            for (let i = 0; i < 1000; ++i) {
                const matches = tsearch.search("SpEcIeS", 4)
                assert.deepEqual(matches, expected)
            }
        }).timeout(1000)
    
        it('near beginning', function() {
            const expected = [
                "I will here give a brief sketch"
            ]
            for (let i = 0; i < 1000; ++i) {
                const matches = tsearch.search("here", 4)
                assert.deepEqual(matches, expected)
            }
        }).timeout(1000)
    
        it('near end', function() {
            const expected = [
                "and that the existing forms of life",
                "generation of pre existing forms."
            ]
            for (let i = 0; i < 1000; ++i) {
                const matches = tsearch.search("existing", 3)
                assert.deepEqual(matches, expected)
            }
        }).timeout(1000)
    
        it('overlapping', function() {
            const expected = [
                "of naturalists believed that species were immutable",
                "hand, have believed that species undergo modification",
                "undergo modification, and that the existing forms"
            ]
            for (let i = 0; i < 1000; ++i) {
                const matches = tsearch.search("that", 3)
                assert.deepEqual(matches, expected)
            }
        }).timeout(1000)
    
    })

    describe ('searches on long text', () => {
        var tsearch;

        before(() => {  
            tsearch = new ts.TextSearcher('files/long_excerpt.txt')
        })

        it('apostrophe', function() {
            const expected = [
                "not indeed to the animal's or plant's own good",
                "habitually speak of an animal's organisation as\r\nsomething plastic"
            ]
            for (let i = 0; i < 1000; ++i) {
                const matches = tsearch.search("animal's", 4)
                assert.deepEqual(matches, expected)
            }
        }).timeout(1000)

        it('numeric', function() {
            const expected = [
                "enlarged in 1844 into a",
                "sketch of 1844--honoured me"
            ]
            for (let i = 0; i < 1000; ++i) {
                const matches = tsearch.search("1844", 2)
                assert.deepEqual(matches, expected)
            }
        }).timeout(1000)

        it('mixed ', function() {
            const expected = [
                "date first edition [xxxxx10x.xxx] please check"
            ]
            for (let i = 0; i < 1000; ++i) {
                const matches = tsearch.search("xxxxx10x", 3)
                assert.deepEqual(matches, expected)
            }
        }).timeout(1000)

        it('no hits', function() {
            const expected = [
            ]
            for (let i = 0; i < 1000; ++i) {
                const matches = tsearch.search("slejrlskejrlkajlsklejrlksjekl", 3)
                assert.deepEqual(matches, expected)
            }
        }).timeout(1000)
    })
})

