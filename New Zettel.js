// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: blue; icon-glyph: sticky-note;
'use strict'

// Path to directory to create new zettels.
const dir = "/Locations/iCloud/zk/"
const ext = ".md"

const now = new Date()
const id = createID(now)

console.log(id)

const zettelPath = dir + id + ext
openNewFile(zettelPath)

Script.complete()


function createID(date) {
  // Start with an empty string.
  let id = ""
  
  // We don't need to pad the year anytime soon.
  id = id.concat(date.getFullYear().toString())
  
  // The month is represented from 0-11.
  id = id.concat(pad(date.getMonth() + 1))
  
  // The date is represented from 1-31.
  id = id.concat(pad(date.getDate()))
  
  // The hour is represented from 0-23.
  id = id.concat(pad(date.getHours()))
  
  // The minute is represented from 0-59.
  id = id.concat(pad(date.getMinutes()))
  
  // The second is represented from 0-59.
  id = id.concat(pad(date.getSeconds()))
  
  return id
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