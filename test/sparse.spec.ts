import { expect } from 'chai'
import { natsort } from '../lib/index.js'

describe('sparse array sort: ', () => {

    it('simple sparse array', () => {
        const arr1 = [3, 2]
        const arr2 = [1, 2, 3]

        arr1[10] = 1

        arr1.sort(natsort())

        for (let i = 0; i < 3; i += 1) {
            expect(arr1[i]).to.eql(arr2[i])
        }
    })

})