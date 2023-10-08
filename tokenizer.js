// These classes implement a tokenizer. 
// The Tokenizer class returns a list of "tokens" in the file.
// "tokens" are any string of characters that matches the regex and
// and are represented by the Token class. The Token class stores
// the word that matched and the char start and end positions of the word
// in the input data.

class Token {
    constructor(iword, istart, iend) {
        this.word = iword
        this.start = istart
        this.end = iend
    }
}

class Tokenizer {
    constructor(input, regex) {
        this.input = input
        this.pattern = RegExp(regex, 'g')
    }

    lex() {
        const matches = this.input.matchAll(this.pattern)
        const tokens = []
        for (let match of matches) {
            tokens.push(new Token(match[0], match.index, match.index + match[0].length))
        }
        return tokens
    }
}

exports.Tokenizer = Tokenizer

