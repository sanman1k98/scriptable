// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: blue; icon-glyph: list;
// Shows reminders that are due for today in a table.
let cal = await Calendar.defaultForReminders()
let reminders = await Reminder.allDueToday([cal])
reminders.sort((a, b) => {
  return a.dueDate > b.dueDate
})
let table = new UITable()
table.showSeparators = true
populateTable(table, reminders)
QuickLook.present(table)
// Read number of reminders left when running with Siri.
if (config.runsWithSiri) {
  let text = getHelperText(reminders)
  Speech.speak(text)
}

function populateTable(table, reminders) {
  table.removeAllRows()
  let text = getHelperText(reminders)
  // Add the text as headline.
  if (!config.runsWithSiri) {
    let row = new UITableRow()
    row.isHeader = true
    row.addText(text)
    table.addRow(row)
  }
  // Add reminders to the table.
  for (reminder of reminders) {
    let row = new UITableRow()
    row.height = 58
    let emojiCell = row.addText(getEmoji(reminder))
    let overdueText = getOverdueText(reminder)
    let titleCell = row.addText(reminder.title, overdueText)
    titleCell.subtitleColor = Color.red()
    emojiCell.widthWeight = 10
    titleCell.widthWeight = 80
    row.dismissOnSelect = false
    row.onSelect = (idx) => {
      let reminder = reminders[idx - 1]
      toggleCompleted(reminder)
      populateTable(table, reminders)
    }
    table.addRow(row)
  }
  table.reload()
}

function toggleCompleted(reminder) {
  reminder.isCompleted = !reminder.isCompleted
  reminder.save()  
}

function getHelperText(reminders) {
  let incomplete = reminders.filter(reminder => {
    return reminder.isCompleted == false
  })
  if (reminders.count == 0) {
    return "You have no reminders due today."
  } else if (incomplete.length == 0) {
    return "You have completed all reminders."
  } else {
    let count = incomplete.length
    let strReminders = count == 1 ? "reminder" : "reminders"
    return "You have " + count + " " + strReminders + " left for today."
  }
}

function getOverdueText(reminder) {
  if (reminder.isOverdue && !reminder.isCompleted) {
    return "⚠️ Overdue"
  } else {
    return null
  }
}

function getEmoji(reminder) {
  if (reminder.isCompleted) {
    return "✅"
  } else {
    return ""
  }
}