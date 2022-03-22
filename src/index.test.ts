import { add } from './index'

describe('string calculator', () => {
  it('empty string adds to zero', () => {
    expect(add('')).toBe(0)
  })

  it.each([
    ['1', 1],
    ['1,2', 3],
    ['1,2,3,4,5,6,7,8,9,10', 55]
  ])(
    'various number amounts are added together',
    (numbers: string, expected: number) => {
      expect(add(numbers)).toBe(expected)
    }
  )

  it('handle new lines as a delimiter', () => {
    expect(add('1\n2,3')).toBe(6)
  })

  it('support custom delimiters', () => {
    expect(add('//;\n1;2')).toBe(3)
  })

  it('negative numbers throw an exception', () => {
    expect(() => add('1,-2,-3')).toThrowError(
      new Error('negatives not allowed -2,-3')
    )
  })

  it('numbers greater than 1000 are ignored', () => {
    expect(add('2,1000')).toBe(1002)
    expect(add('2,1001')).toBe(2)
  })

  it('support [delimiter] in the delimiter template', () => {
    expect(add('//[***]\n1***2***3')).toBe(6)
  })

  it('support multiple delimiters in template with different char lengths', () => {
    expect(add('//[*][%]\n1*2%3')).toBe(6)
  })
})
