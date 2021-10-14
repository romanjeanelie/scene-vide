<template>
  <div class="essai2">
    <div class="wrapper">
      <div class="intro blue"></div>

      <article class="article1">
        <div class="title1 title1">
          <h2>TITRE 1</h2>
        </div>

        <div class="article1__content">
          <p v-for="n in 70" :key="n">Aticle 1</p>
        </div>
      </article>

      <article class="article2">
        <div class="title2">
          <h2>TITRE 2</h2>
        </div>

        <div class="article2__content">
          <p v-for="n in 70" :key="n">Aticle 2</p>
        </div>
      </article>

      <div class="footer">
        <p>Footer</p>
      </div>
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
        // trigger: '.title1',
        trigger: '.article1__content',
        start: 'bottom bottom',
        // endTrigger: '.article1__content',
        end: 'bottom bottom',
        pin: true,
        // pinSpacing: false,
      })
      // keep at top
      this.$ScrollTrigger.create({
        trigger: '.title1',
        start: 'top top',
        endTrigger: 'html',
        end: 'bottom bottom',
        pin: true,
        pinSpacing: false,
      })
      // // Tomorrow header handling
      // keep at bottom
      this.$ScrollTrigger.create({
        trigger: '.title2',
        start: 'top bottom-=75',
        endTrigger: '.article2__content',
        end: 'bottom bottom-=75',
        pin: true,
        pinSpacing: false,
      })
      // keep at top
      this.$ScrollTrigger.create({
        trigger: '.title2',
        start: 'top top+=75',
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
.essai2 {
  h2 {
    font-size: 50px;
  }

  .intro {
    color: white;
    height: 75vh;
    width: 100%;
    text-align: center;
  }

  .title1 {
    position: absolute;
    /* bottom: 75px; */

    background: #f4f4f4;
    height: 75px;
    width: 100%;
    text-align: center;
    cursor: pointer;
  }

  .article1__content {
    height: 800px;
    text-align: center;
    overflow: hidden;
    border: 1px solid salmon;
  }

  .title2 {
    position: absolute;
    bottom: 0px;

    background: #cecece;
    height: 75px;
    width: 100%;
    text-align: center;
    cursor: pointer;
  }

  .article2__content {
    height: 800px;
    text-align: center;
  }

  .footer {
    left: 0;
    height: 100vh;
    width: 100%;
    background-color: black;
    color: white;
    text-align: center;
  }
}
</style>
