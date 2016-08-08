// fetch
// store raw html
// parser
// store parsed output
import config from './lib/config'
import fetch from './lib/fetch'
import parse from './lib/parse'
import {
  readRaw,
  saveRaw,
  saveParsed,
} from './lib/store'
import {
  justMap,
} from './lib/helper'


const getUrls = (sortType) => //
  justMap(config.pageLimit, (v, i) => //
    `https://atom.io/packages/list?direction=desc&page=${i + 1}&sort=${sortType}`)

const download = async(url) => {
  let content = null
  try {
    content = await fetch(url)
  } catch (e) {
    // TODO
    console.log(`fetch fail ${url}`)
  }
  return content
}

const main = () => {
  config.sortTypes.forEach((sortType) => {
    getUrls(sortType).forEach((url, pageIndex) => {
      let content = readRaw(sortType, pageIndex)
      let parsedContent
      if (!content) {
        content = download(url)
        if (content) {
          saveRaw(sortType, pageIndex, content)
        }
      }
      // TODO parse error (like rules change)
      parsedContent = parse(content)
      saveParsed(sortType, pageIndex, parsedContent)
    })
  })
}

main()
