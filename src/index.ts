const DEFAULT_DELIMITER = ','
const NEW_LINE = '\n'
const START_DELIMITER_TEMPLATE = '//'
const END_DELIMITER_TEMPLATE = NEW_LINE
const OPEN_DELIMITER = '['
const CLOSE_DELIMITER = ']'

export const add = (numbers: string): number => {
  let numbersToMutate = numbers.slice()
  let delimiters = [NEW_LINE]

  if (numbers.startsWith(START_DELIMITER_TEMPLATE)) {
    delimiters = delimiters.concat(getCustomDelimiters(numbers))
    numbersToMutate = stripDelimiterTemplate(numbersToMutate)
  }

  delimiters.forEach(
    (d) => (numbersToMutate = numbersToMutate.replaceAll(d, DEFAULT_DELIMITER))
  )

  const parsedNumbers = numbersToMutate
    .split(DEFAULT_DELIMITER)
    .map((n) => Number(n))
    .filter((n) => n <= 1000)

  const negatives = parsedNumbers.filter((n) => n < 0)

  if (negatives.length)
    throw new Error(`negatives not allowed ${negatives.join(DEFAULT_DELIMITER)}`)

  const sum = parsedNumbers.reduce((acc, val) => acc + val)

  return sum
}

const getCustomDelimiters = (input: string): string[] => {
  const delimiters = input.slice(
    START_DELIMITER_TEMPLATE.length,
    input.indexOf(END_DELIMITER_TEMPLATE)
  )

  return delimiters
    .split(OPEN_DELIMITER)
    .join('')
    .split(CLOSE_DELIMITER)
    .filter(Boolean)
}

const stripDelimiterTemplate = (input: string): string => {
  return input.substring(input.indexOf(END_DELIMITER_TEMPLATE) + 1)
}
