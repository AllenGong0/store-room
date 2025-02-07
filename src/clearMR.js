// https://www.clearmr.org/certified-products/
const trs = document.querySelectorAll('.has-fixed-layout tbody tr')
const list = Array.from(trs).map(tr => {
    const tds = tr.querySelectorAll('td')
    let keyIdx = 0
    return Array.from(tds).reduce((pre, cur) => {
        const headKey = ["Mfr","Product/Model Number","Screen Size","Resolution","Frame Rate","ClearMRTM Tier"]
        const key = headKey[keyIdx++]
        if(key === 'ClearMRTM Tier'){
            return  {...pre, [key]: Number(cur.textContent) }
        }
        return {...pre, [key]: cur.textContent }
    }, {})
})

const largemr = list.filter( item => item['ClearMRTM Tier'] >= 13000)
console.log(largemr)
