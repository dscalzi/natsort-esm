export type NatsortOptions = {
    /**
     * Desc sorting.
     */
    desc?: boolean
    /**
     * Case-insensitive sorting.
     */
    insensitive?: boolean
    /**
     * Whether numeric tokenization should be applied only to whole numbers, not
     * attempting to resolve fractals. Useful to tokenize pure semver strings. For example,
     * the default behavior will tokenize '1.10.0' as ['1.1', '0'], causing '1.9.0' to be
     * greater. Tokenizing only whole numbers yields ['1', '10', '0'].
     */
    tokenizeWholeNumbersOnly?: boolean
}

export const natsort = <T>(options: NatsortOptions = {}): (a: T, b: T) => number => {

    // Regex
    const ore = /^0/
    const sre = /\s+/g
    const tre = /^\s+|\s+$/g
    // unicode
    // eslint-disable-next-line no-control-regex
    const ure = /[^\x00-\x80]/
    // hex
    const hre = /^0x[0-9a-f]+$/i
    // numeric
    const nre = /(0x[\da-fA-F]+|(^[+-]?\d+(?:\.\d*)?(?:[eE][+-]?\d+)?(?=\D|\s|$))|\d+)/g
    // datetime
    const dre = options.tokenizeWholeNumbersOnly
        ? /[\d]+/g
        : /(^([\w ]+,?[\w ]+)?[\w ]+,?[\w ]+\d+:\d+(:\d+)?[\w ]?|^\d{1,4}[/-]\d{1,4}[/-]\d{1,4}|^\w+, \w+ \d+, \d{4})/
    const toLowerCase = String.prototype.toLocaleLowerCase || String.prototype.toLowerCase

    const GREATER = options.desc ? -1 : 1
    const SMALLER = -GREATER

    const parse = (s: string, l: number): string | number =>
        (!s.match(ore) || l === 1)
        && parseFloat(s)
        || s.replace(sre, ' ').replace(tre, '')
        || 0

    const tokenize = (s: string): string[] =>
        s.replace(nre, '\0$1\0')
            .replace(/\0$/, '')
            .replace(/^\0/, '')
            .split('\0')

    const normalize = options.insensitive
        ? (s: T): string => toLowerCase.call(`${s}`).replace(tre, '')
        : (s: T): string => (`${s}`).replace(tre, '')

    return (a, b) => {
        // trim pre-post whitespace
        const aa = normalize(a)
        const bb = normalize(b)

        // return immediately if at least one of the values is empty.
        // empty string < any others
        if (!aa && !bb) {
            return 0
        }

        if (!aa && bb) {
            return SMALLER
        }

        if (aa && !bb) {
            return GREATER
        }

        // tokenize: split numeric strings and default strings
        const aArr = tokenize(aa)
        const bArr = tokenize(bb)

        // hex or date detection
        const aHex = aa.match(hre)
        const bHex = bb.match(hre)
        const av = (aHex && bHex) ? parseInt(aHex[0], 16) : aArr.length !== 1 ? Date.parse(aa) : null
        const bv = (aHex && bHex) ? parseInt(bHex[0], 16) : (av && bb.match(dre)) ? Date.parse(bb) : null

        // try and sort Hex codes or Dates
        if (av && bv) {
            if (av === bv) {
                return 0
            }

            if (av < bv) {
                return SMALLER
            }

            if (av > bv) {
                return GREATER
            }
        }

        const al = aArr.length
        const bl = bArr.length

        // handle numeric strings and default strings
        for (let i = 0, l = Math.max(al, bl); i < l; i++) {

            const af = parse(aArr[i] || '', al)
            const bf = parse(bArr[i] || '', bl)

            // handle numeric vs string comparison.
            // numeric < string
            if (isNaN(af as number) !== isNaN(bf as number)) {
                return isNaN(af as number) ? GREATER : SMALLER
            }

            // if unicode use locale comparison
            if (ure.test((af as string) + (bf as string)) && (af as string).localeCompare) {
                const comp = (af as string).localeCompare(bf as string)

                if (comp > 0) {
                    return GREATER
                }

                if (comp < 0) {
                    return SMALLER
                }

                if (i === l - 1) {
                    return 0
                }
            }

            if (af < bf) {
                return SMALLER
            }

            if (af > bf) {
                return GREATER
            }

            if (`${af}` < `${bf}`) {
                return SMALLER
            }

            if (`${af}` > `${bf}`) {
                return GREATER
            }
        }

        return 0
    }

}