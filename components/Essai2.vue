<template>
  <div class="wrapper">
    <div class="intro blue"></div>

    <div class="today-page">
      <div class="today-header green sticky-today">
        <h2>TITRE 1</h2>
      </div>

      <div class="today-content green">
        <p>Today content</p>
        <p>Today content</p>
        <p>Today content</p>
        <p>Today content</p>
        <p>Today content</p>
        <p>Today content</p>
        <p>Today content</p>
        <p>Today content</p>
        <p>Today content</p>
        <p>Today content</p>
        <p>Today content</p>
        <p>Today content</p>
        <p>Today content</p>
        <p>Today content</p>
        <p>Today content</p>
        <p>Today content</p>
        <p>Today content</p>
        <p>Today content</p>
        <p>Today content</p>
        <p>Today content</p>
        <p>Today content</p>
        <p>Today content</p>
        <p>Today content</p>
        <p>Today content</p>
        <p>Today content</p>
        <p>Today content</p>
        <p>Today content</p>
        <p>Today content</p>
        <p>Today content</p>
        <p>Today content</p>
        <p>Today content</p>
        <p>Today content</p>
        <p>Today content</p>
        <p>Today content</p>
        <p>Today content</p>
        <p>Today content</p>
        <p>Today content</p>
        <p>Today content</p>
        <p>Today content</p>
        <p>Today content</p>
        <p>Today content</p>
        <p>Today content</p>
        <p>Today content</p>
      </div>
    </div>

    <div class="tomorrow-page">
      <div class="tomorrow-header purple sticky-tomorrow">
        <h2>TITRE 2</h2>
      </div>

      <div class="tomorrow-content purple">
        <p>Tomorrow content</p>
        <p>Tomorrow content</p>
        <p>Tomorrow content</p>
        <p>Tomorrow content</p>
        <p>Tomorrow content</p>
        <p>Tomorrow content</p>
        <p>Tomorrow content</p>
        <p>Tomorrow content</p>
        <p>Tomorrow content</p>
        <p>Tomorrow content</p>
        <p>Tomorrow content</p>
        <p>Tomorrow content</p>
        <p>Tomorrow content</p>
        <p>Tomorrow content</p>
        <p>Tomorrow content</p>
        <p>Tomorrow content</p>
        <p>Tomorrow content</p>
        <p>Tomorrow content</p>
        <p>Tomorrow content</p>
        <p>Tomorrow content</p>
        <p>Tomorrow content</p>
        <p>Tomorrow content</p>
        <p>Tomorrow content</p>
        <p>Tomorrow content</p>
        <p>Tomorrow content</p>
        <p>Tomorrow content</p>
        <p>Tomorrow content</p>
        <p>Tomorrow content</p>
        <p>Tomorrow content</p>
        <p>Tomorrow content</p>
        <p>Tomorrow content</p>
        <p>Tomorrow content</p>
        <p>Tomorrow content</p>
        <p>Tomorrow content</p>
        <p>Tomorrow content</p>
        <p>Tomorrow content</p>
        <p>Tomorrow content</p>
        <p>Tomorrow content</p>
        <p>Tomorrow content</p>
        <p>Tomorrow content</p>
        <p>Tomorrow content</p>
        <p>Tomorrow content</p>
        <p>Tomorrow content</p>
      </div>
    </div>

    <div class="footer">
      <p>Footer</p>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    this.scrollAnim()
  },
  methods: {
    scrollAnim() {
      // // Today header handling
      // keep at bottom
      this.$ScrollTrigger.create({
        trigger: '.sticky-today',
        start: 'top bottom-=150',
        endTrigger: '.today-content',
        end: 'bottom bottom-=75',
        pin: true,
        pinSpacing: false,
      })
      // keep at top
      this.$ScrollTrigger.create({
        trigger: '.sticky-today',
        start: 'top top+=75',
        endTrigger: 'html',
        end: 'bottom bottom',
        pin: true,
        pinSpacing: false,
      })
      // // Tomorrow header handling
      // keep at bottom
      this.$ScrollTrigger.create({
        trigger: '.sticky-tomorrow',
        start: 'top bottom-=75',
        endTrigger: '.tomorrow-content',
        end: 'bottom bottom-=75',
        pin: true,
        pinSpacing: false,
      })
      // keep at top
      this.$ScrollTrigger.create({
        trigger: '.sticky-tomorrow',
        start: 'top top+=150',
        endTrigger: 'html',
        end: 'bottom bottom',
        pin: true,
        pinSpacing: false,
      })
    },
  },
}
</script>

<style lang="scss" scoped>
/* https://codepen.io/GreenSock/pen/9e7bf431223f98516c0431cfdefb6e3f */
h2 {
  font-size: 50px;
}

.intro {
  color: white;
  height: 75vh;
  width: 100%;
  text-align: center;
}

.today-header {
  background: #f4f4f4;
  height: 75px;
  width: 100%;
  text-align: center;
  cursor: pointer;
}

.today-content {
  height: 800px;
  text-align: center;
  overflow: hidden;
}

.tomorrow-header {
  background: #cecece;
  height: 75px;
  width: 100%;
  text-align: center;
  cursor: pointer;
}

.tomorrow-content {
  height: 800px;
  text-align: center;
}

.sticky-today {
  position: absolute;
  bottom: 75px;
}
.sticky-tomorrow {
  position: absolute;
  bottom: 0px;
}

.footer {
  left: 0;
  height: 800px;
  width: 100%;
  background-color: black;
  color: white;
  text-align: center;
}
</style>
