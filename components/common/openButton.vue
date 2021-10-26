<template>
  <NuxtLink ref="openBtn" :to="linkArticle" class="openBtn">
    <p :to="linkArticle" ref="openText">ouvrir</p>
  </NuxtLink>
</template>

<script>
export default {
  props: {
    linkArticle: {
      type: String,
      default: '',
    },
  },
  mounted() {
    this.reset()
  },
  methods: {
    reset() {
      console.log('RESET')
      this.$gsap.set(this.$refs.openBtn.$el, {
        scaleX: 0,
      })
      this.$gsap.set(this.$refs.openText, {
        opacity: 0,
      })

      this.tlIn = this.$gsap.timeline()
      this.tlOut = this.$gsap.timeline()
    },
    /**
     * Animations
     */

    animIn() {
      this.resetAnim()

      this.$gsap.to(this.$refs.openBtn.$el, {
        delay: 1,
        scaleX: 1,
      })

      this.$gsap.to(this.$refs.openText, {
        opacity: 1,
        delay: 1.5,
        duration: 0.5,
      })
    },
    animOut() {
      this.resetAnim()

      this.$gsap.to(this.$refs.openText, {
        opacity: 0,
      })
      this.$gsap.to(this.$refs.openBtn.$el, {
        scaleX: 0,
      })
    },

    resetAnim() {
      this.$gsap.killTweensOf([this.$refs.openBtn.$el, this.$refs.openText])
    },
  },
}
</script>

<style lang="scss">
.openBtn {
  display: block;
  background: $yellow;
  border-top-right-radius: vw(50);
  border-bottom-right-radius: vw(50);
  height: vw(40);

  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;

  transform-origin: center left;

  p {
    color: $white;
    font-family: 'Poppins';
    font-weight: 500;
    text-transform: uppercase;
    font-size: vw(12);
    line-height: 1.5;
  }
}
</style>
