export function sql(strings, ...values) {
  let text = '';
  const newValues = [];

  strings.forEach((string, index) => {
    text += string;
    if (index < values.length) {
      const value = values[index];
      if (value && value.text && value.values) {
        text += value.text;
        newValues.push(...value.values);
      } else {
        text += '?';
        newValues.push(value);
      }
    }
  });

  return {text, values: newValues};
}

export function rawsql(text) {
  return {text, values: []};
}
