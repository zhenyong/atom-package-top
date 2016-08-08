import moment from 'moment'
import mkdirp from 'mkdirp'
import fs from 'fs'
import path from 'path'
import config from './config'
import { obj2file } from './helper'


const strDate = moment().format('YYYYMMDD')
const dataDir = path.resolve(__dirname, '../../data')
const rawDir = path.join(dataDir, strDate, 'raw')
const parsedDir = path.join(dataDir, strDate, 'parsed')

mkdirp.sync(rawDir)
mkdirp.sync(parsedDir)
  // data/{date}/raw/{sortBy}
config.sortTypes.forEach(type => {
  mkdirp.sync(path.join(rawDir, type))
  mkdirp.sync(path.join(parsedDir, type))
})

const assembleRawFilePath = (sortType, pageIndex) => //
  path.join(path.join(rawDir, sortType), `${pageIndex + 1}.html`)

const assembleParsedFilePath = (sortType, pageIndex) => //
  path.join(path.join(parsedDir, sortType), `${pageIndex + 1}.json`)

export const saveRaw = (sortType, pageIndex, content) => //
  fs.writeFileSync(assembleRawFilePath(sortType, pageIndex), content)

export const existRaw = (sortType, pageIndex) => //
  fs.existsSync(assembleRawFilePath(sortType, pageIndex))

export const readRaw = (sortType, pageIndex) => {
  const filepath = assembleRawFilePath(sortType, pageIndex)
  return fs.existsSync(filepath) ? fs.readFileSync(filepath) : false
}

export const existParsed = (sortType, pageIndex) => //
  fs.existsSync(assembleParsedFilePath(sortType, pageIndex))

export const saveParsed = (sortType, pageIndex, obj) => //
  obj2file(assembleParsedFilePath(sortType, pageIndex), obj)
