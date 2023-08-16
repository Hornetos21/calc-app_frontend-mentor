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
    <controls
      :buttons="buttons"
      @digit="digits"
      @operator="operators"
      @equally="equally"
      @delete="deleteDigit"
      @reset="resetCalc"
    />
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
import ThemeSwitcher from '@/components/UI/ThemeSwitcher.vue'
import Display from '@/components/Display.vue'
import Controls from '@/components/Controls.vue'
import { controls, themes } from '@/consts'
import {
  calculate,
  checkNumber,
  checkValueForDoublesZeroDot,
  deleteDigitFromEnd,
  divideByComma,
  zeroDot,
} from '@/helpers'

export default {
  components: {
    ThemeSwitcher,
    Display,
    Controls,
  },
  data() {
    return {
      buttons: controls,
      calc: {
        digitA: '',
        digitB: '',
        operator: '',
        flagOperator: false,
        equally: false,
        result: '',
        display: '',
        history: '',
      },
      theme: themes,
    }
  },
  mounted() {
    this.getTheme()
  },
  computed: {
    showHistory() {
      return `${this.calc.digitA} ${this.calc.operator} ${
        this.calc.digitB ? this.calc.digitB + ' =' : ''
      }`
    },
    convertWithComma() {
      return this.calc.result === 'Division by zero'
        ? this.calc.result
        : divideByComma(this.calc.result)
    },
  },
  watch: {
    'calc.result'() {
      this.calc.display = this.convertWithComma
    },
  },
  methods: {
    getTheme() {
      const theme = localStorage.getItem('theme') || 1
      const toggleTheme = document.querySelector('#theme-toggle')
      toggleTheme.value = theme
      document.body.setAttribute('data-theme', `theme_${theme}`)
    },
    setTheme(e) {
      if (e.target.matches('#theme-toggle')) {
        const key = e.target.value
        document.body.setAttribute('data-theme', this.theme[key])
        localStorage.setItem('theme', key)
      }
    },
    digits({ text: digit }) {
      if (this.calc.flagOperator) {
        // Number B
        if (checkValueForDoublesZeroDot(this.calc.digitB, digit)) return

        this.calc.digitB = checkNumber(this.calc.digitB, digit)
        this.calc.result = this.calc.digitB
      } else if (this.calc.equally) {
        //  Rewrite A
        this.calc.digitA = ''

        if (zeroDot(this.calc.digitA, digit)) {
          this.calc.digitA = '0.'
        } else {
          this.calc.digitA = digit
        }

        this.calc.result = this.calc.digitA
        this.calc.equally = false
        this.calc.history = ''
      } else {
        // Number A
        if (checkValueForDoublesZeroDot(this.calc.digitA, digit)) return

        this.calc.digitA = checkNumber(this.calc.digitA, digit)
        this.calc.result = this.calc.digitA
      }
    },
    operators({ text: sign }) {
      this.calc.flagOperator = true
      this.calc.equally = false
      this.calc.digitB = ''
      this.calc.operator = sign

      // history
      this.calc.history = this.showHistory
    },
    equally() {
      if (!this.calc.operator) return

      // Write Number A in Number B if not Number B
      if (this.calc.flagOperator && !this.calc.digitB) {
        this.calc.digitB = this.calc.digitA
      }

      this.calc.equally = true
      this.calc.flagOperator = false

      const res = calculate(
        this.calc.digitA,
        this.calc.digitB,
        this.calc.operator
      )

      this.calc.result = res.toString().includes('.')
        ? Number(res.toFixed(6)).toString()
        : res.toString()

      // history
      this.calc.history = this.showHistory

      this.calc.digitA = this.calc.result
    },
    deleteDigit() {
      if (!this.calc.result) return
      if (this.calc.equally) {
        this.calc.history = ''
        return
      }
      if (!this.calc.equally && !this.calc.flagOperator) {
        this.calc.digitA = deleteDigitFromEnd(this.calc.digitA)
        this.calc.result = this.calc.digitA
      } else {
        this.calc.digitB = deleteDigitFromEnd(this.calc.digitB)
        this.calc.result = this.calc.digitB
      }
    },
    resetCalc() {
      this.calc.digitA = ''
      this.calc.digitB = ''
      this.calc.operator = ''
      this.calc.flagOperator = false
      this.calc.equally = false
      this.calc.result = ''
      this.calc.display = ''
      this.calc.history = ''
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
