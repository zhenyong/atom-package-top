import moment from 'moment'
import mkdirp from 'mkdirp'
import fs from 'fs'
import path from 'path'
import config from './config'


const strDate = moment().format('YYYYMMDD')
const dataDir = path.resolve(__dirname, '../../data')
const rawDir = path.join(dataDir, strDate, 'raw')

mkdirp.sync(rawDir)
// data/{date}/raw/{sortBy}
config.sortTypes.forEach(type => {
  mkdirp.sync(path.join(rawDir, type))
})

export function saveRaw(sortType, pageIndex, content) {
  const pageNo = pageIndex + 1
  const sortTypeDir = path.join(rawDir, sortType)
  fs.writeFileSync(path.join(sortTypeDir, `${pageNo}.html`), content)
}

export function savePared() {}
