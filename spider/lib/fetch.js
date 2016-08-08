/**
 * - fetch url by HTTP GET
 * - resolve at once when hit cache
 * - one by one with queue
 * - fetch next in first one's callback
 *
 */

import got from 'got'
import Cache from './cache'
import config from './config'
import Logger from './log'

const cache = new Cache(config.date)

let pending = false
const queue = [] // [{url,resolve,reject}, ...]

const doFetch = () => {
  if (pending || queue.length === 0) {
    return
  }
  const {
    url,
    resolve,
    reject,
  } = queue.shift()

  if (cache.get(url)) {
    Logger.info(`hit cache ${url}`)
    resolve(cache.get(url))
    doFetch()
  } else {
    pending = true
    Logger.info(`start download ${url}`)
    got(url) //
      .then(response => {
        Logger.info(`download success ${url}`)
        pending = false
          // TODO resolve in write callback?
        cache.write(url, response.body)
        resolve(response.body)
        doFetch()
      })
      .catch((error) => {
        Logger.info(`download fail ${url}`)
        pending = false
        reject(error)
        doFetch()
      })
  }
}

const fetch = (url) => new Promise((resolve, reject) => {
  const content = cache.get(url)
  if (content) {
    Logger.info(`hit cache ${url}`)
    resolve(content)
  } else {
    queue.push({
      url,
      resolve,
      reject,
    })
    doFetch()
  }
})

export default fetch
