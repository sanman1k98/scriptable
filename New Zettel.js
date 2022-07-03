// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: blue; icon-glyph: sticky-note;
'use strict'

const writer = importModule("modules/writer")

// Path to directory to create new zettels.
const dir = "/Locations/iCloud/zk/"
const ext = ".md"

const now = new Date()
const id = createID(now)
console.log(id)

const zettelPath = dir + id + ext

const url = writer.editNewFileURL(zettelPath)
console.log(url)

Safari.open(url)

Script.complete()


function createID(date) {
  const df = new DateFormatter()
  df.dateFormat = "yyyyMMddHHmmss"
  return df.string(date)
}

// Pads `num` with zeros to target length of 2.
function pad(num) {
  return num.toString().padStart(2, 0)
}

function openNewFile(path) {
  let url = "ia-writer://new?path="
  url += path
  url = encodeURI(url)
  Safari.open(url)
}