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
      <NuxtLink ref="open" :to="`article-text/letheatrepolonais`" class="open">
        <svg xmlns="http://www.w3.org/2000/svg" width="185" height="48">
          <rect id="btnSVG" ref="btnSVG" width="185" height="48" rx="24" :style="btnStyle" />
        </svg>
        <p ref="openText">ouvrir</p>
      </NuxtLink>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    indexArticle: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    btnStyle() {
      const style = {}

      // if (this.indexArticle % 2 === 0) {
      //   style.fill = ' #CCAB00'
      // } else {
      //   style.fill = ' #C61900'
      // }
      style.fill = ' #CCAB00'
      return style
    },
  },
  mounted() {
    this.reset()
  },
  methods: {
    animIn() {
      this.resetAnim()

      this.$gsap.to(this.$refs.title, {
        x: 0,
        duration: 1.5,
        ease: 'power1.out',
      })

      // this.$gsap.to(this.titleSplitted2.chars, {
      //   rotateY: 0,
      //   stagger: 0.04,
      //   duration: 2.5,
      //   ease: 'power1.out',
      // })

      // this.$gsap.to(this.titleSplitted.lines, {
      //   x: 0,
      //   duration: 1.5,
      //   ease: 'power2.inOut',
      //   stagger: 0.1,
      // })

      this.$gsap.to(this.$refs.line, {
        scaleX: 1,
        duration: 3,
        delay: 0.4,
        ease: 'expo.out',
      })

      this.$gsap.to(this.$refs.auteur, {
        x: 0,
        opacity: 1,
        duration: 3,
        ease: 'expo.out',
      })

      // this.$gsap.to(this.auteurSplitted.chars, {
      //   opacity: 1,
      //   duration: 3,
      //   stagger: 0.05,
      // })

      this.$gsap.to(this.resumeSplitted.lines, {
        x: 0,
        // opacity: 1,

        duration: 1,
        stagger: 0.05,
        ease: 'power1.out',
      })

      const tlBtn = this.$gsap.timeline()

      tlBtn.to(this.$refs.btnSVG, {
        delay: 1,
        scale: 1,
      })
      tlBtn.to(
        this.$refs.btnSVG,
        {
          width: 185,
        },
        '-=0.3'
      )

      tlBtn.to(
        this.$refs.openText,
        {
          opacity: 1,
          duration: 0.5,
        },
        '-=0.2'
      )
    },
    animOut() {
      this.resetAnim()

      // this.$gsap.to(this.titleSplitted2.chars, {
      //   x: '110%',
      //   rotateY: 80,
      // })

      this.$gsap.to(this.$refs.title, {
        x: '50%',
        duration: 1.5,
        ease: 'power1.out',
      })

      this.$gsap.to(this.$refs.line, {
        scaleX: 0,
      })

      this.$gsap.to(this.$refs.auteur, {
        x: '-100%',
      })

      // this.$gsap.to(this.auteurSplitted.chars, {
      //   opacity: 0,
      // })

      this.$gsap.to(this.resumeSplitted.lines, {
        x: '20%',
        // opacity: 0,
      })

      const tlBtn = this.$gsap.timeline()
      tlBtn.to(this.$refs.openText, {
        opacity: 0,
      })
      tlBtn.to(
        this.$refs.btnSVG,
        {
          width: 48,
        },
        '-=0.5'
      )
      tlBtn.to(this.$refs.btnSVG, {
        scale: 0,
      })
    },

    resetAnim() {
      this.$gsap.killTweensOf([
        this.titleSplitted2.chars,
        this.titleSplitted.lines,
        this.$refs.line,
        this.$refs.auteur,
        this.auteurSplitted.chars,
        this.resumeSplitted.lines,
        this.$refs.btnSVG,
        this.$refs.openText,
      ])
    },

    reset() {
      this.titleSplitted = new this.$SplitText(this.$refs.title, {
        type: 'lines, chars',
        linesClass: 'lines',
        charsClass: 'chars1',
      })

      this.titleSplitted2 = new this.$SplitText(this.titleSplitted.chars, {
        type: 'chars',
        charsClass: 'chars2',
      })

      this.auteurSplitted = new this.$SplitText(this.$refs.auteur, {
        type: 'chars',
        charsClass: 'chars',
      })
      this.resumeSplitted = new this.$SplitText(this.$refs.resume, {
        type: 'lines',
        linesClass: 'lines',
      })

      this.$gsap.set(this.$refs.title, {
        x: '50%',
      })

      // this.$gsap.set(this.titleSplitted2.chars, {
      //   x: '110%',
      //   rotateY: 80,
      // })

      this.$gsap.set(this.$refs.line, {
        scaleX: 0,
      })

      this.$gsap.set(this.$refs.auteur, {
        x: '-100%',
      })

      // this.$gsap.set(this.auteurSplitted.chars, {
      //   opacity: 0,
      // })

      this.$gsap.set(this.resumeSplitted.lines, {
        x: '20%',
        // opacity: 0,
      })

      this.$gsap.set(this.$refs.btnSVG, {
        scale: 0,
        width: 48,
      })
      this.$gsap.set(this.$refs.openText, {
        opacity: 0,
      })
    },
  },
}
</script>

<style lang="scss">
.article__content {
  z-index: 1;
  height: 100%;
  width: 40vw;
  display: flex;
  flex-direction: column;

  padding: $sizeProgress vw(16);
  background: #fbfaf5;
  /* border-right: 1px solid black; */

  .top {
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
    display: flex;
    justify-content: center;
    align-items: center;
    padding-left: vw(30);
    font-size: vw(12);
    line-height: 1.5;
    max-width: vw(450);
  }

  .bottom {
    margin-bottom: vw(100);
    padding-left: vw(30);
    display: flex;
    justify-content: flex-start;
    margin-left: vw(15);
    .open {
      background: transparent;
      border: none;
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;

      cursor: pointer;
      svg {
        transform: scale(0.9);
      }
      p {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -42%);

        color: $white;
        font-family: 'Poppins';
        font-weight: 500;
        text-transform: uppercase;
        font-size: vw(12);
        line-height: 1.5;
      }
    }
  }
}
</style>
