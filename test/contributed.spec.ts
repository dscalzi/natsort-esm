import { expect } from 'chai'
import { natsort } from '../lib/index.js'

describe('contributed tests: ', () => {

    it('contributed - Bob Zeiner (Chrome not stable sort)', () => {
        expect([
            'T78', 'U17', 'U10', 'U12', 'U14', '745', 'U7', '485',
            'S16', 'S2', 'S22', '1081', 'S25', '1055', '779', '776',
            '771', '44', '4', '87', '1091', '42', '480', '952',
            '951', '756', '1000', '824', '770', '666', '633', '619',
            '1', '991', '77H', 'PIER-7', '47', '29', '9', '77L', '433',
        ].sort(natsort())).to.eql([
            '1', '4', '9', '29', '42', '44', '47', '77H', '77L', '87',
            '433', '480', '485', '619', '633', '666', '745', '756',
            '770', '771', '776', '779', '824', '951', '952', '991',
            '1000', '1055', '1081', '1091', 'PIER-7', 'S2', 'S16',
            'S22', 'S25', 'T78', 'U7', 'U10', 'U12', 'U14', 'U17',
        ])
    })

    it('contributed - Scott', () => {
        expect([
            'FSI stop, Position: 5',
            'Mail Group stop, Position: 5',
            'Mail Group stop, Position: 5',
            'FSI stop, Position: 6',
            'FSI stop, Position: 6',
            'Newsstand stop, Position: 4',
            'Newsstand stop, Position: 4',
            'FSI stop, Position: 5',
        ].sort(natsort())).to.eql([
            'FSI stop, Position: 5',
            'FSI stop, Position: 5',
            'FSI stop, Position: 6',
            'FSI stop, Position: 6',
            'Mail Group stop, Position: 5',
            'Mail Group stop, Position: 5',
            'Newsstand stop, Position: 4',
            'Newsstand stop, Position: 4',
        ])
    })

    it('undefined support - jarvinen pekka', () => {
        expect([
            2,
            10,
            1,
            'azd',
            undefined,
            'asd',
        ].sort(natsort())).to.eql([
            1,
            2,
            10,
            'asd',
            'azd',
            undefined,
        ])
    })

    it('invalid numeric string sorting - guilermo.dev', () => {
        expect([
            '-1',
            '-2',
            '4',
            '-3',
            '0',
            '-5',
        ].sort(natsort())).to.eql([
            '-5',
            '-3',
            '-2',
            '-1',
            '0',
            '4',
        ])
    })

    it('invalid sort order - Howie Schecter', () => {
        expect([
            '9',
            '11',
            '22',
            '99',
            'A',
            'aaaa',
            'bbbb',
            'Aaaa',
            'aAaa',
            'aa',
            'AA',
            'Aa',
            'aA',
            'BB',
            'bB',
            'aaA',
            'AaA',
            'aaa',
        ].sort(natsort())).to.eql([
            '9',
            '11',
            '22',
            '99',
            'A',
            'AA',
            'Aa',
            'AaA',
            'Aaaa',
            'BB',
            'aA',
            'aAaa',
            'aa',
            'aaA',
            'aaa',
            'aaaa',
            'bB',
            'bbbb',
        ])
    })

    it('alphanumeric - number first', () => {
        expect([
            '5D',
            '1A',
            '2D',
            '33A',
            '5E',
            '33K',
            '33D',
            '5S',
            '2C',
            '5C',
            '5F',
            '1D',
            '2M',
        ].sort(natsort())).to.eql([
            '1A',
            '1D',
            '2C',
            '2D',
            '2M',
            '5C',
            '5D',
            '5E',
            '5F',
            '5S',
            '33A',
            '33D',
            '33K',
        ])
    })

    it('sorting incorrect when there is a space - adrien-be', () => {
        expect([
            'img 99',
            'img199',
            'imga99',
            'imgz99',
        ].sort(natsort())).to.eql([
            'img 99',
            'img199',
            'imga99',
            'imgz99',
        ])
    })

    it('expanded test', () => {
        expect([
            'img199',
            'img 99',
            'imga99',
            'imgz 99',
            'imgb99',
            'imgz199',
        ].sort(natsort())).to.eql([
            'img 99',
            'img199',
            'imga99',
            'imgb99',
            'imgz 99',
            'imgz199',
        ])
    })

    it('any zeros that precede a number messes up the sorting - menixator', () => {
        expect([
            '1',
            '02',
            '3',
        ].sort(natsort())).to.eql([
            '1',
            '02',
            '3',
        ])
    })

    it('[\'1.100\', \'1.10\', \'1.1\', \'1.54\'] etc do not sort properly - rubenstolk', () => {
        expect([
            '1.100',
            '1.1',
            '1.10',
            '1.54',
        ].sort(natsort())).to.eql([
            '1.100',
            '1.1',
            '1.10',
            '1.54',
        ])
    })

    it('[\'v1.100\', \'v1.10\', \'v1.1\', \'v1.54\'] etc do not sort properly - rubenstolk (bypass float coercion)', () => {
        expect([
            'v1.100',
            'v1.1',
            'v1.10',
            'v1.1000',
            'v1.54',
        ].sort(natsort())).to.eql([
            'v1.1',
            'v1.10',
            'v1.54',
            'v1.100',
            'v1.1000',
        ])
    })

    it('large numbers make sorting very slow - Mottie', () => {
        expect([
            'MySnmp 1234567891234567891234567891234567891234567891234567891234567891234567891234567891234567891234567891234567891234567891234567891234567',
            'MySnmp 4234567891234567891234567891234567891234567891234567891234567891234567891234567891234567891234567891234567891234567891234567891234567',
            'MySnmp 2234567891234567891234567891234567891234567891234567891234567891234567891234567891234567891234567891234567891234567891234567891234567',
            'MySnmp 3234567891234567891234567891234567891234567891234567891234567891234567891234567891234567891234567891234567891234567891234567891234567',
        ].sort(natsort())).to.eql([
            'MySnmp 1234567891234567891234567891234567891234567891234567891234567891234567891234567891234567891234567891234567891234567891234567891234567',
            'MySnmp 2234567891234567891234567891234567891234567891234567891234567891234567891234567891234567891234567891234567891234567891234567891234567',
            'MySnmp 3234567891234567891234567891234567891234567891234567891234567891234567891234567891234567891234567891234567891234567891234567891234567',
            'MySnmp 4234567891234567891234567891234567891234567891234567891234567891234567891234567891234567891234567891234567891234567891234567891234567',
        ])
    })

    it('javascript error', () => {
        expect([
            'bar.1-2',
            'bar.1',
        ].sort(natsort())).to.eql([
            'bar.1',
            'bar.1-2',
        ])
    })

    it('[\'SomeString\', \'SomeString 1\'] bombing on \'undefined is not an object\' - dannycochran', () => {
        expect([
            'SomeString', 'SomeString 1',
        ].sort(natsort())).to.eql([
            'SomeString', 'SomeString 1',
        ])
    })

    it('sorting umlauts characters \xC4, \xD6, \xDC - diogoalves', () => {
        expect([
            'Udet',
            '\xDCbelacker',
            'Uell',
            '\xDClle',
            'Ueve',
            '\xDCxk\xFCll',
            'Uffenbach',
        ].sort(natsort())).to.eql([
            '\xDCbelacker',
            'Udet',
            'Uell',
            'Ueve',
            'Uffenbach',
            '\xDClle',
            '\xDCxk\xFCll',
        ])
    })

    it('[\'2.2 sec\',\'1.9 sec\',\'1.53 sec\'] - padded by spaces - harisb', () => {
        expect([
            '2.2 sec',
            '1.9 sec',
            '1.53 sec',
        ].sort(natsort())).to.eql([
            '1.53 sec',
            '1.9 sec',
            '2.2 sec',
        ])
    })

    it('[\'2.2sec\',\'1.9sec\',\'1.53sec\'] - no padding - harisb', () => {
        expect([
            '2.2sec',
            '1.9sec',
            '1.53sec',
        ].sort(natsort())).to.eql([
            '1.53sec',
            '1.9sec',
            '2.2sec',
        ])
    })

    it('version string first and string last - jpuffer', () => {
        expect([
            'version-3.27.3',
            'version-3.27.0',
            'version-3.26.0',
            'version-other',
            'version-3.28.0',
            'version-3.29.1',
        ].sort(natsort())).to.eql([
            'version-3.26.0',
            'version-3.27.0',
            'version-3.27.3',
            'version-3.28.0',
            'version-3.29.1',
            'version-other',
        ])
    })

    it('partial version numbers (missing patch or minor) - jpuffer', () => {
        expect([
            '3.27.3',
            '3.27',
            '3',
            'other',
            '3.28',
            '3.29.1',
        ].sort(natsort())).to.eql([
            '3',
            '3.27',
            '3.27.3',
            '3.28',
            '3.29.1',
            'other',
        ])
    })
})