import { expect } from 'chai'
import { natsort } from '../lib/index.js'

describe('unicode: ', () => {

    it('basic latin', () => {
        expect([
            '\u0044',
            '\u0055',
            '\u0054',
            '\u0044',
            '\u0043',
        ].sort(natsort())).to.eql([
            '\u0043',
            '\u0044',
            '\u0044',
            '\u0054',
            '\u0055',
        ])
    })

    it('unicode string', () => {
        expect([
            '\u30c6\u30b9\u30c8',
            '\u30c6\u30b9\u30c8 10.txt',
            '\u30c6\u30b9\u30c8',
        ].sort(natsort())).to.eql([
            '\u30c6\u30b9\u30c8',
            '\u30c6\u30b9\u30c8',
            '\u30c6\u30b9\u30c8 10.txt',
        ])
    })

})