<template>
  <nav ref="nav" class="navigation">
    <div class="wrapper">
      <nuxt-link to="/" class="title">La scene est vide</nuxt-link>

      <p class="article-title">{{ title }} - {{ author }}</p>

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
    title: {
      type: String,
      default: 'TITRE',
    },
    author: {
      type: String,
      default: 'AUTEUR',
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
  },
}
</script>

<style lang="scss">
.navigation {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1;

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
