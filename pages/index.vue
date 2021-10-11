<template>
  <div ref="articlesContainer" class="articles__container">
    <div v-for="n in 10" :key="n" ref="article" class="article">
      <div class="title">TITRE {{ n }}</div>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    this.scrollArticles()
  },

  methods: {
    scrollArticles() {
      const tl = this.$gsap.timeline()
      tl.to(this.$refs.article, {
        x: 0,
        duration: 2,
        stagger: 0.9,
        ease: 'power2.inOut',
      })
      this.$ScrollTrigger.create({
        animation: tl,
        trigger: this.$refs.articlesContainer,
        start: 'top top',
        end: 'bottom bottom',
        pin: true,
        scrub: true,
        anticipatePin: 1,
        ease: 'linear',
      })
    },
  },
}
</script>

<style lang="scss">
.articles__container {
  top: 0;
  left: 0;
  right: 0;
  height: 600vh;
  width: 100vw;
  margin-left: vw(500);
}

.article {
  position: absolute;
  top: 0;
  left: 0;
  width: 90vw;
  height: 100vh;
  display: flex;
  align-items: flex-start;
  border: 1px solid salmon;
  font-size: vw(20);
  border: 2px solid black;
  background: $white;
  .title {
    transform: rotate(90deg) translateX(50%);
  }

  @for $i from 1 through 10 {
    &:nth-child(#{$i}) {
      transform: translateX(calc(27% + #{$i * 120}px));
      /* background-color: lighten(salmon, $i * 2%); */
    }
  }
}
</style>
