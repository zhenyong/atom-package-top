// fetch
// store raw html
// parser
// store parsed output
import config from './lib/config'
import fetch from './lib/fetch'
import {
  saveRaw,
} from './lib/store'
import {
  justMap,
} from './lib/helper'


const getUrls = (sortType) => justMap(config.pageLimit, (v, i) => `https://atom.io/packages/list?direction=desc&page=${i + 1}&sort=${sortType}`)

const main = () => {
  config.sortTypes.forEach((sortType) => {
    getUrls(sortType).forEach(async(url, pageIndex) => {
      let content
      try {
        content = await fetch(url)
      } catch (e) {
        // TODO
        console.log(`fetch fail ${url}`)
      }
      if (content) {
        // TODO if exist
        saveRaw(sortType, pageIndex, content)
      }
    })
  })
}

main()
