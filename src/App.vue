<script setup>
import ThemeSwitcher from '@/components/UI/ThemeSwitcher.vue'
import Display from '@/components/Display.vue'
import Controls from '@/components/Controls.vue'
</script>

<template>
  <header>
    <h1>calc</h1>
    <div class="wrapper">
      <p>THEME</p>
      <theme-switcher @click="setTheme" />
    </div>
  </header>

  <main>
    <display :calc="calc" />
    <controls :buttons="buttons" :handle-btn="handleBtn" />
  </main>
  <footer>
    <div class="attribution">
      Challenge by
      <a
        href="https://www.frontendmentor.io/challenges/calculator-app-9lteq5N29"
        target="_blank"
        >Frontend Mentor</a
      >. Coded by
      <a href="https://github.com/Hornetos21" target="_blank"
        >Igor Shapovalov </a
      >.
    </div>
  </footer>
</template>

<script>
function divideByComma(str) {
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

function calculate(a, b, operator) {
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

function checkValueForDoublesZeroDot(value, btn) {
  if ((value === '0' && btn === '0') || (value.includes('.') && btn === '.'))
    return true
}

function zeroDot(value, dot) {
  if ((dot === '.' && !value) || (dot === '.' && value === '0')) {
    return true
  }
}

function deleteDigitFromEnd(digit) {
  let str = digit.slice(0, digit.length - 1)

  if (!str.length) str = '0'

  return str
}

function checkNumber(num, btn, btnType) {
  let digit = num
  if (num === '0' && btnType === 'digit') {
    digit = btn
  } else if (zeroDot(num, btn)) {
    digit = '0.'
  } else {
    digit += btn
  }
  return digit
}

export default {
  data() {
    return {
      buttons: [
        { text: '7', type: 'digit' },
        { text: '8', type: 'digit' },
        { text: '9', type: 'digit' },
        { text: 'DEL', type: 'delete' },
        { text: '4', type: 'digit' },
        { text: '5', type: 'digit' },
        { text: '6', type: 'digit' },
        { text: '+', type: 'operator' },
        { text: '1', type: 'digit' },
        { text: '2', type: 'digit' },
        { text: '3', type: 'digit' },
        { text: '-', type: 'operator' },
        { text: '.', type: 'dot' },
        { text: '0', type: 'digit' },
        { text: '/', type: 'operator' },
        { text: 'x', type: 'operator' },
        { text: 'RESET', type: 'reset' },
        { text: '=', type: 'equally' },
      ],
      calc: {
        digitA: '',
        digitB: '',
        operator: '',
        flagDigit: true,
        flagOperator: false,
        equally: false,
        result: '',
        display: '',
        history: '',
      },
      theme: {
        1: 'theme_1',
        2: 'theme_2',
        3: 'theme_3',
      },
    }
  },
  mounted() {
    const theme = localStorage.getItem('theme') || 1
    const toggleTheme = document.querySelector('#theme-toggle')
    toggleTheme.value = theme
    document.body.setAttribute('data-theme', `theme_${theme}`)
  },

  methods: {
    setTheme(e) {
      if (e.target.matches('#theme-toggle')) {
        const key = e.target.value
        document.body.setAttribute('data-theme', this.theme[key])
        localStorage.setItem('theme', key)
      }
    },
    handleBtn(e) {
      const btn = e.target.innerText
      const btnType = e.target.name

      //   Digits
      if (btnType === 'digit' || btnType === 'dot') {
        this.calc.flagDigit = true

        /*Change  digits*/

        if (this.calc.flagOperator) {
          //      ------------------------Number B
          if (checkValueForDoublesZeroDot(this.calc.digitB, btn)) return

          this.calc.digitB = checkNumber(this.calc.digitB, btn, btnType)
          this.calc.result = this.calc.digitB
          //    ---------------------------------
        } else if (this.calc.equally) {
          //    ------------------------------Rewrite A
          this.calc.digitA = ''
          if (zeroDot(this.calc.digitA, btn)) {
            this.calc.digitA = '0.'
          } else {
            this.calc.digitA = btn
          }

          this.calc.result = this.calc.digitA
          this.calc.equally = false
          this.calc.history = ''
          //    -------------------------------------
        } else {
          //    -------------------------------Number A
          if (checkValueForDoublesZeroDot(this.calc.digitA, btn)) return

          this.calc.digitA = checkNumber(this.calc.digitA, btn, btnType)
          this.calc.result = this.calc.digitA
          //    ----------------------------------------
        }
      }

      // Check operator
      if (btnType === 'operator') {
        this.calc.flagOperator = true
        this.calc.equally = false
        this.calc.flagDigit = false
        this.calc.digitB = ''

        if (btn === 'x') {
          this.calc.operator = '*'
        } else {
          this.calc.operator = btn
        }

        // previous res in A
        this.calc.digitA = this.calc.result
        // history
        this.calc.history = `${this.calc.digitA} ${this.calc.operator}`
      }

      // Equally
      if (btn === '=') {
        if (!this.calc.operator) return

        // Write Number A in Number B if not Number B
        if (this.calc.flagOperator && !this.calc.digitB) {
          this.calc.digitB = this.calc.digitA
        }

        this.calc.equally = true
        this.calc.flagDigit = false
        this.calc.flagOperator = false

        const res = calculate(
          this.calc.digitA,
          this.calc.digitB,
          this.calc.operator
        )

        this.calc.result = res.toString().includes('.')
          ? Number(res.toFixed(6)).toString()
          : res.toString()

        this.calc.history = `${this.calc.digitA} ${this.calc.operator} ${this.calc.digitB} =`

        this.calc.digitA = this.calc.result
      }

      //   Reset
      if (btn === 'RESET') {
        this.calc.digitA = ''
        this.calc.digitB = ''
        this.calc.operator = ''
        this.calc.flagDigit = true
        this.calc.flagOperator = false
        this.calc.equally = false
        this.calc.result = ''
        this.calc.display = ''
        this.calc.history = ''
      }

      //   Delete last digit
      if (btn === 'DEL') {
        if (!this.calc.result) return
        if (this.calc.equally) {
          this.calc.history = ''
          return
        }
        if (!this.calc.flagDigit) return
        if (!this.calc.flagOperator) {
          this.calc.digitA = deleteDigitFromEnd(this.calc.digitA)
          this.calc.result = this.calc.digitA
        } else {
          this.calc.digitB = deleteDigitFromEnd(this.calc.digitB)
          this.calc.result = this.calc.digitB
        }
      }

      // convert result with comma
      this.calc.display =
        this.calc.result === 'Division by zero'
          ? this.calc.result
          : divideByComma(this.calc.result)
    },
  },
}
</script>

<style scoped lang="scss">
header {
  display: flex;
  height: 48px;
  justify-content: space-between;
  line-height: 1.5;
  margin-bottom: 32px;
  color: var(--title);
}

h1 {
  margin-left: 8px;
  padding-top: clamp(4px, 1vw, 10px);
}

.wrapper {
  display: flex;
  gap: 30px;
  align-self: flex-end;
}

p {
  align-self: flex-end;
  font-size: 13px;
}
main {
  padding-bottom: 40px;
}
footer {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  text-align: center;
  padding: 10px;
  .attribution {
    color: var(--title);
    a {
      color: var(--key-equally-toggle);
      text-decoration: none;
      opacity: 1;
      transition: opacity 0.2s;
      &:hover {
        opacity: 0.6;
      }
    }
  }
}
</style>
