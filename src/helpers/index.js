export function divideByComma(str) {
  const arr = str.split('')
  if (arr.includes('.')) {
    const comma = arr.findIndex((el) => el === '.')

    for (let i = comma - 3; i > 0; i -= 3) {
      arr.splice(i, 0, ',')
    }
  } else {
    for (let i = arr.length - 3; i > 0; i -= 3) {
      arr.splice(i, 0, ',')
    }
  }

  return arr.join('')
}

export function calculate(a, b, operator) {
  const A = Number(a)
  const B = Number(b)
  let res = 0

  switch (operator) {
    case '+':
      res = A + B
      break
    case '-':
      res = A - B
      break
    case '*':
      res = A * B
      break
    case '/':
      if (b === '0') {
        res = 'Division by zero'
      } else {
        res = A / B
      }
      break
  }
  return res
}

export function checkValueForDoublesZeroDot(value, btn) {
  if ((value === '0' && btn === '0') || (value.includes('.') && btn === '.'))
    return true
}

export function zeroDot(value, dot) {
  if ((dot === '.' && !value) || (dot === '.' && value === '0')) {
    return true
  }
}

export function deleteDigitFromEnd(digit) {
  let str = digit.slice(0, digit.length - 1)

  if (!str.length) str = '0'

  return str
}

export function checkNumber(num, btn) {
  let digit = num
  if (num === '0' && btn !== '.') {
    digit = btn
  } else if (zeroDot(num, btn)) {
    digit = '0.'
  } else {
    digit += btn
  }
  return digit
}
