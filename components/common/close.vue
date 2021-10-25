<template>
  <div ref="close" class="close">
    <div class="wrapper">
      <div class="border"></div>
      <nuxt-link to="/">FERMER</nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    // this.reset()
  },
  methods: {
    /**
     * Reset
     */
    reset() {
      this.$gsap.set(this.$refs.close, {
        y: '-100%',
        display: 'none',
      })
    },
    /**
     * Animations
     */

    // animIn() {
    //   this.resetAnim()
    //   this.$gsap.set(this.$refs.close, {
    //     display: 'block',
    //   })
    //   this.$gsap.to(this.$refs.close, {
    //     y: 0,
    //   })
    // },
    // animOut() {
    //   console.log('close anim out')
    //   this.resetAnim()
    //   this.$gsap.to(this.$refs.close, {
    //     y: '-100%',
    //     onComplete: () => {
    //       this.$gsap.set(this.$refs.close, {
    //         display: 'none',
    //       })
    //     },
    //   })
    // },

    // resetAnim() {
    //   this.$gsap.killTweensOf(this.$refs.close)
    // },
  },
}
</script>

<style lang="scss">
.close {
  z-index: 5;
  margin-top: vw(100);
  width: 100%;

  background: $white;
  color: black;
  .wrapper {
    width: calc(100vw - #{2 * vw(15)});
    padding: vw(15) 0;
    margin: 0 auto;

    display: flex;
    justify-content: center;
    align-items: center;

    font-family: 'Poppins';
    font-size: vw(12);
    position: relative;

    .border {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 1px;
      background: black;
    }
  }

  &.dark {
    background: black;
    color: $white;

    .wrapper {
      .border {
        background: $white;
      }
    }
  }
}
</style>
