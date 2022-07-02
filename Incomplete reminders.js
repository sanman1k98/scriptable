// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: pink; icon-glyph: keyboard;
let defaultList = await Calendar.defaultForReminders()
let inc = await Reminder.allIncomplete([defaultList])

inc.forEach(r => console.log(r.title))

async function createWidget() {
  const widget = new ListWidget()
  widget.addText("Reminders")
      .centerAlignText()
      
  inc.forEach(reminder => widget.addText(reminder.title).font)
  
  return widget
}

let w = await createWidget()
w.presentMedium()