<template>
  <nav ref="nav" class="navigation">
    <div class="wrapper">
      <nuxt-link to="/" class="title">La scene est vide</nuxt-link>
      <button class="burger">
        <span class="line"></span>
        <span class="line"></span>
        <span class="line"></span>
      </button>
      <div ref="border" class="border"></div>
    </div>
  </nav>
</template>

<script>
export default {
  props: {
    theme: {
      type: String,
      default: 'light',
    },
  },

  mounted() {
    // this.reset()
  },
  methods: {
    /**
     * Reset
     */
    reset() {
      this.$gsap.set(this.$refs.nav, {
        y: '-100%',
      })
    },
    /**
     * Animations
     */

    // animIn() {
    //   this.resetAnim()
    //   this.$gsap.to(this.$refs.nav, {
    //     y: 0,
    //   })
    // },
    // animOut() {
    //   console.log('nav anim out')
    //   this.resetAnim()
    //   this.$gsap.to(this.$refs.nav, {
    //     y: '-100%',
    //   })
    // },

    // resetAnim() {
    //   this.$gsap.killTweensOf(this.$refs.nav)
    // },
  },
}
</script>

<style lang="scss">
.navigation {
  position: fixed;
  width: 100%;

  background: $white;
  color: black;

  .wrapper {
    width: calc(100% - #{2 * vw(15)});
    padding-top: vw(5);
    margin: 0 auto;
    position: relative;

    display: flex;
    justify-content: space-between;
    align-items: center;

    .title {
      font-family: 'Anybody';
      text-transform: uppercase;
      font-size: vw(50);
      line-height: 1;
    }

    .burger {
      padding: 0;
      width: vw(35);
      height: vw(20);
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      background: transparent;
      border: none;

      cursor: pointer;
      .line {
        display: block;
        width: 100%;
        height: 2px;
        background: #000;
        border-radius: vw(5);
      }
    }

    .border {
      position: absolute;
      bottom: 0;
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
      .burger {
        .line {
          background: $white;
        }
      }

      .border {
        background: $white;
      }
    }
  }
}
</style>
