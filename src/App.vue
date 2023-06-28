<script setup>
import ThemeSwitcher from '@/components/ThemeSwitcher.vue'
import Display from '@/components/Display.vue'
import Controls from '@/components/Controls.vue'
</script>

<template>
  <header>
    <h1>calc</h1>
    <div class="wrapper">
      <p>THEME</p>
      <theme-switcher :setTheme="setTheme" />
    </div>
  </header>

  <main>
    <display :calc="calc" />
    <controls :controls="controls" :handle-btn="handleBtn" />
  </main>
</template>

<script>
export default {
  data() {
    return {
      controls: [
        '7',
        '8',
        '9',
        'DEL',
        '4',
        '5',
        '6',
        '+',
        '1',
        '2',
        '3',
        '-',
        '.',
        '0',
        '/',
        'x',
        'RESET',
        '=',
      ],
      calc: {
        digitA: '',
        digitB: 0,
        operator: '',
        flagDisplay: false,
        flagOperator: false,
      },
      theme: {
        1: 'theme_1',
        2: 'theme_2',
        3: 'theme_3',
      },
    }
  },

  methods: {
    setTheme(e) {
      const key = e.target.value
      document.body.setAttribute('data-theme', this.theme[key])
    },
    handleBtn(e) {
      const btn = e.target.innerText

      //   Digits
      if (Number(btn) || Number(btn) === 0 || btn === '.') {
        if (btn === '.' && !this.calc.digitA) {
          return (this.calc.digitA = '0.')
        }

        if (this.calc.flagOperator) {
          if (!this.calc.digitB) {
            this.calc.digitB = ''
          }

          this.calc.digitB += btn
        } else {
          // Exception which a zero
          if (this.calc.digitA === '0' && btn === '0') return
          // Exception with a point
          if (this.calc.digitA.includes('.') && btn === '.') return

          if (!this.calc.digitA) {
            this.calc.digitA = ''
          }

          this.calc.digitA += btn
        }

        console.log('Digit: ', btn)
      }

      //   Operators
      switch (btn) {
        case '+':
          this.calc.operator = '+'
          this.calc.flagOperator = true
          console.log('Addition')
          break
        case '-':
          this.calc.operator = '-'
          this.calc.flagOperator = true

          console.log('Subtraction')
          break
        case 'x':
          this.calc.operator = 'x'
          this.calc.flagOperator = true

          console.log('Mul')
          break
        case '/':
          this.calc.operator = '/'
          this.calc.flagOperator = true

          console.log('Div')
          break
        case '=':
          this.calc.operator = '='
          this.calc.flagOperator = true

          console.log('Equally')
          break
      }

      //   Reset
      if (btn === 'RESET') {
        this.calc.digitA = ''
        this.calc.digitB = ''
        this.calc.operator = ''
        this.calc.flagDisplay = false
        this.calc.flagOperator = false
        console.log('Reset')
      }

      //   Del
      if (btn === 'DEL') {
        if (!this.calc.digitA) return

        this.calc.digitA = this.calc.digitA.slice(
          0,
          this.calc.digitA.length - 1
        )

        if (!this.calc.digitA.length) {
          console.log('Null')
          this.calc.digitA = ''
        }
        console.log('Delete last digit')
      }
    },
  },
}
</script>

<style scoped>
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
</style>
