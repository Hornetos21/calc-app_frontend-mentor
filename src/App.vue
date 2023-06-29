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
</template>

<script>
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
        flagDisplay: false,
        flagOperator: false,
        equally: false,
        result: '',
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
        // Exception which a zero
        if (this.calc.digitA === '0' && btn === '0') return
        if (this.calc.digitA === '0' && btnType === 'digit')
          return (this.calc.digitA = btn)

        // Exception with point
        if (
          (btn === '.' && !this.calc.digitA) ||
          (btn === '.' && this.calc.digitA === '0')
        )
          this.calc.digitA = '0.'
        if (this.calc.digitA.includes('.') && btn === '.') return

        // Flag operator
        if (this.calc.flagOperator) {
          this.calc.digitB = this.calc.digitA
          this.calc.digitA = ''
          this.calc.digitA += btn
          this.calc.flagOperator = false
        } else if (!this.calc.equally) {
          this.calc.digitA += btn
        } else {
          this.calc.digitA = btn
          this.calc.equally = false
        }
      }
      // One digit operator and =
      if (this.calc.flagOperator && this.calc.digitA && btn === '=') {
        this.calc.digitB = this.calc.digitA
      }

      // Check operator
      if (btnType === 'operator') {
        if (btn === 'x') {
          this.calc.operator = '*'
        } else {
          this.calc.operator = btn
        }
        this.calc.flagOperator = true
      }

      //  Calculation

      switch (this.calc.operator) {
        case '+':
          this.calc.result = Number(this.calc.digitB) + Number(this.calc.digitA)
          break
        case '-':
          this.calc.result = Number(this.calc.digitB) - Number(this.calc.digitA)
          break
        case '*':
          this.calc.result = Number(this.calc.digitB) * Number(this.calc.digitA)
          break
        case '/':
          if (this.calc.digitA === '0') {
            this.calc.result = 'Division by ZERO'
          } else {
            this.calc.result =
              Number(this.calc.digitB) / Number(this.calc.digitA)

            this.calc.result % 2
              ? (this.calc.result = this.calc.result.toFixed(2))
              : this.calc.result
          }
          break
      }

      // Equally
      if (btn === '=') {
        if (!this.calc.digitA || !this.calc.digitB) return
        this.calc.equally = true

        this.calc.digitA = String(this.calc.result)
      }
      //   Reset
      if (btn === 'RESET') {
        this.calc.digitA = ''
        this.calc.digitB = ''
        this.calc.operator = ''
        this.calc.flagDisplay = false
        this.calc.flagOperator = false
        this.calc.result = ''
        this.calc.equally = false
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
