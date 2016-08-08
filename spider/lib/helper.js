import fs from 'fs'

const NULL = null

export function justMap(length, fn) {
  return Array(length).fill(NULL).map(fn)
}

export function str2obj(str) {
  return JSON.parse(str)
}

export function obj2str(obj) {
  return JSON.stringify(obj, null, '\t')
}

export function file2obj(file) {
  return str2obj(fs.readFileSync(file).toString())
}

export function obj2file(file, obj) {
  // TODO ordered batches write
  fs.writeFileSync(file, obj2str(obj))
}

export default null
