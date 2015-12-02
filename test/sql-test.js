/* eslint-env mocha */
import { sql, rawsql } from '..'
import { expect } from 'chai'

describe('sql', () => {
  it('should handle a string', () => {
    expect(sql`string`).to.deep.equal({
      text: 'string',
      values: []
    })
  })
  it('should handle a variable', () => {
    const value = 'value'
    expect(sql`a${value}b`).to.deep.equal({
      text: 'a?b',
      values: [value]
    })
  })
  it('should handle multiple variables', () => {
    const value1 = 'value1'
    const value2 = 'value2'
    expect(sql`a${value1}b${value2}c`).to.deep.equal({
      text: 'a?b?c',
      values: [value1, value2]
    })
  })
  it('should handle a nested query', () => {
    const value = 'value'
    expect(sql`a${sql`b${value}c`}d`).to.deep.equal({
      text: 'ab?cd',
      values: [value]
    })
  })
  it('should handle multiple nested queries', () => {
    const value1 = 'value1'
    const value2 = 'value2'
    expect(sql`a${sql`b${value1}c`}d${sql`e${value2}f`}g`).to.deep.equal({
      text: 'ab?cde?fg',
      values: [value1, value2]
    })
  })
})

describe('rawsql', () => {
  it('should handle a string', () => {
    expect(rawsql('string')).to.deep.equal({
      text: 'string',
      values: []
    })
  })
})
