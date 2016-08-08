import fs from 'fs'
import path from 'path'
import moment from 'moment'
import config from './config'
import {
  file2obj,
  obj2file,
} from './helper'

const cacheDir = config.cacheDir

if (!fs.existsSync(cacheDir)) {
  fs.mkdirSync(cacheDir)
}

export default class DailyCache {
  constructor(date) {
    this.filepath = path.join(cacheDir, moment(date).format('YYYYMMDD'))
    this._data = fs.existsSync(this.filepath) ?
      file2obj(this.filepath) : {}
  }

  set(key, value) {
    this._data[key] = value
  }

  write(key, value) {
    this.set(key, value)
    this.flush()
  }

  get(key = null) {
    return key ? this._data[key] : this._data
  }

  flush() {
    obj2file(this.filepath, this._data)
  }
}
