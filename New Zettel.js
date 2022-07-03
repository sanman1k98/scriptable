// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: blue; icon-glyph: sticky-note;
'use strict'

const writer = importModule("modules/writer")

const dir = "/Locations/iCloud/zk/"
const ext = ".md"

const filename = createID(new Date())
const zettelPath = dir + filename + ext

const url = writer.editNewFileURL(zettelPath)

Safari.open(url)
Script.setShortcutOutput(url)
Script.complete()


function createID(date) {
  const df = new DateFormatter()
  df.dateFormat = "yyyyMMddHHmmss"
  return df.string(date)
}