<template>
  <div ref="articleContent" class="article__content">
    <div ref="top" class="top">
      <div class="article__title__wrapper">
        <h2 ref="title" class="title">Le théâtre polonais</h2>
        <div class="auteur__wrapper">
          <div ref="line" class="line"></div>
          <h3 ref="auteur" class="auteur">Maxime Kurvers</h3>
        </div>
      </div>
    </div>

    <div ref="middle" class="middle">
      <p ref="resume" class="resume">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos cum vitae sunt, dolore
        voluptatibus consequuntur animi consequatur facilis cupiditate fugiat sed molestias
        perspiciatis iusto quidem debitis nulla atque eum. At unde sunt vero consectetur labore?
        Tempora suscipit vero id amet excepturi sit totam reprehenderit.!
      </p>
    </div>

    <div ref="bottom" class="bottom">
      <open-button ref="btn" link-article="article-text/slug" />
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import openButton from '../common/openButton.vue'

export default {
  components: { openButton },
  props: {
    indexArticle: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    ...mapGetters(['isMobile', 'isTablet', 'isTouch']),
    ...mapState(['reducedMotion']),
  },
  mounted() {
    this.reset()
  },
  methods: {
    animIn() {
      const duration1 = this.reducedMotion ? 1 : 3

      this.resetAnim()

      // this.$gsap.to(this.$refs.title, {
      //   x: 0,
      //   duration: 1.5,
      //   ease: this.reducedMotion ? '' : 'power1.out',
      // })

      this.$gsap.to(this.$refs.line, {
        scaleX: 1,
        duration: duration1,
        delay: 0.4,
        ease: this.reducedMotion ? '' : 'expo.out',
      })

      // this.$gsap.to(this.$refs.auteur, {
      //   x: 0,
      //   opacity: 1,
      //   duration: duration1,
      //   ease: this.reducedMotion ? '' : 'expo.out',
      // })

      this.$gsap.to(this.resumeSplitted.lines, {
        x: 0,
        // opacity: 1,
        duration: 1,
        stagger: 0.05,
        ease: this.reducedMotion ? '' : 'power1.out',
      })

      this.$refs.btn.animIn()
    },
    animOut() {
      this.resetAnim()

      // this.$gsap.to(this.$refs.title, {
      //   x: '50%',
      //   duration: 1.5,
      //   ease: 'power1.out',
      // })

      this.$gsap.to(this.$refs.line, {
        scaleX: 0,
      })

      // this.$gsap.to(this.$refs.auteur, {
      //   x: '-100%',
      // })

      this.$gsap.to(this.resumeSplitted.lines, {
        x: '20%',
      })

      this.$refs.btn.animOut()
    },

    resetAnim() {
      this.$gsap.killTweensOf([
        // this.titleSplitted2.chars,
        // this.titleSplitted.lines,
        this.$refs.line,
        // this.$refs.auteur,
        // this.auteurSplitted.chars,
        this.resumeSplitted.lines,
      ])
    },

    reset() {
      // this.titleSplitted = new this.$SplitText(this.$refs.title, {
      //   type: 'lines, chars',
      //   linesClass: 'lines',
      //   charsClass: 'chars1',
      // })

      // this.titleSplitted2 = new this.$SplitText(this.titleSplitted.chars, {
      //   type: 'chars',
      //   charsClass: 'chars2',
      // })

      // this.auteurSplitted = new this.$SplitText(this.$refs.auteur, {
      //   type: 'chars',
      //   charsClass: 'chars',
      // })
      this.resumeSplitted = new this.$SplitText(this.$refs.resume, {
        type: 'lines',
        linesClass: 'lines',
      })

      // this.$gsap.set(this.$refs.title, {
      //   x: '50%',
      // })

      this.$gsap.set(this.$refs.line, {
        scaleX: 0,
      })

      // this.$gsap.set(this.$refs.auteur, {
      //   x: '-100%',
      // })

      this.$gsap.set(this.resumeSplitted.lines, {
        x: '20%',
      })
    },
  },
}
</script>

<style lang="scss">
.article__content {
  $width-article: 40vw;

  z-index: 1;
  height: 100%;
  /* width: 100%; */
  width: $width-article;
  display: flex;
  flex-direction: column;
  /* position: relative; */

  background: #fbfaf5;
  /* border-right: 1px solid black; */

  .top {
    padding: $sizeProgress vw(16);
    margin-left: vw(40);
    display: flex;
    flex-direction: column;
    .article__title__wrapper {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      margin-top: vw(50);
    }
    .title {
      font-weight: 500;
      font-size: vw(65);
      text-transform: uppercase;
      .lines {
        line-height: 0;
        overflow: hidden;
      }
      .chars1 {
        line-height: 1.4;
        overflow: hidden;
      }
    }
    .auteur__wrapper {
      align-self: flex-end;
      margin-top: vw(12);
      margin-right: vw(120);
      width: calc(100% - #{vw(120)} - 10px);
      display: flex;
      align-items: center;
      .auteur {
        font-size: vw(18);
      }
      .line {
        flex-grow: 1;
        position: relative;
        display: block;
        height: 2px;
        margin-right: vw(15);

        background: #000;

        transform-origin: left center;
      }
    }
  }

  .middle {
    flex: 1;
    max-width: vw(400);
    padding-bottom: vw(30);
    padding-left: vw(50);

    display: flex;
    justify-content: center;
    align-items: center;

    font-size: vw(12);
    line-height: 1.5;
  }

  .bottom {
    margin-bottom: vw(50);
    width: calc(#{$width-article} - 30vw);
  }
}
</style>
