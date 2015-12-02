'use strict'

function sql (strings) {
  var values = Array.prototype.slice.call(arguments, 1)
  var text = ''
  var newValues = []

  strings.forEach(function (string, index) {
    text += string
    if (index < values.length) {
      var value = values[index]
      if (value && value.text !== undefined && value.values !== undefined) {
        text += value.text
        newValues.push.apply(newValues, value.values)
      } else {
        text += '?'
        newValues.push(value)
      }
    }
  })

  return {
    text: text,
    values: newValues
  }
}

function rawsql (text) {
  return {
    text: text,
    values: []
  }
}

module.exports = {
  sql: sql,
  rawsql: rawsql
}
