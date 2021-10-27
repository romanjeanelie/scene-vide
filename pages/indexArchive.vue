<template>
  <div class="home">
    <cover ref="cover" />
    <div ref="scrollProgress" class="scroll__progress"></div>
    <div ref="border" class="home__border" :style="borderStyle">
      <div class="border__wrapper">
        <h3 class="title">La scene est vide</h3>
        <h3 class="numero">numéro 1 - vide</h3>
      </div>
      <div class="line"></div>
    </div>
    <div ref="imgWrapper" class="home__img__wrapper">
      <div v-for="n in 10" ref="imgWithOverlay" :key="n" class="img-with-overlay">
        <div ref="overlay" class="overlay" :style="styleOverlay(n)"></div>
        <div class="img__container">
          <img
            ref="image"
            :src="`https://picsum.photos/id/${n}37/850/1200`"
            alt=""
            :style="styleImg(n)"
          />
        </div>
      </div>
    </div>

    <div ref="container" class="articles__container">
      <div ref="wrapper" class="articles__wrapper">
        <div ref="hideArticle" class="hide__article"></div>
        <article v-for="n in 10" ref="article" :key="n" class="article">
          <div ref="titleWrapper" class="title__wrapper">
            <div ref="titleBg" class="title__bg"></div>
            <div ref="titleBorder" class="title__border"></div>
            <h2 ref="title">Le théâtre polonais</h2>
          </div>

          <Article ref="articleContent" class="article__content" :index-article="n" />
        </article>
      </div>
    </div>

    <generique />
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

import debounce from 'lodash/debounce'
import Generique from '~/components/Home/Generique.vue'
import Cover from '~/components/Home/Cover.vue'
import Article from '~/components/Home/Article.vue'
import emitter from '~/utils/EventEmitter'

export default {
  components: { Generique, Cover, Article },
  data() {
    return {
      pageWidth: 0,
      toScroll: { value: 0 },
      scrollNormalized: { value: 0 },
      debounceWait: 80,

      // Title
      titleWidth: 0,
      borderTitleDistance: null,
      ratioTitleVisible: 0,
      titlesOffsetLeft: 5,
      offsetTitle: 0,
      nbTitlesOut: 0,

      // Article
      articleWidth: 0,
      articleInWrapper: 0,
      ratioArticleVisible: 0,
      ratioSecondArticleVisible: 0,
      indexArticleVisible: -1,
      lastArticle: null,

      // Image
      imageWapperBounds: 0,

      // Wrapper
      wrapperBounds: 0,
      wrapperWidthWithoutTitle: 0,
    }
  },
  computed: {
    ...mapGetters(['isMobile', 'isTablet', 'isTouch']),
    ...mapState(['reducedMotion']),
    borderStyle() {
      const style = {}

      style.color = ' #FBFAF5'
      return style
    },
  },
  mounted() {
    this.$nextTick(() => {
      emitter.emit('PAGE:MOUNTED')
    })
    this.pageWidth = document.body.scrollWidth

    this.reset()

    // Compute onResize
    this.computeBounds()

    this.initPositionTitle()
    this.initPositionHideArticle()

    this.onScroll()
  },

  methods: {
    computeBounds() {
      // TITLE
      this.titleWidth = this.$refs.titleWrapper[0].getBoundingClientRect().width

      this.borderTitleDistance = this.pageWidth - this.titleWidth * (this.titlesOffsetLeft - 1)

      // Compute titles outside of the page
      this.nbTitlesOut = Math.floor(this.$refs.article.length - this.titlesOffsetLeft)

      this.ratioTitleVisible = (this.titleWidth * this.titlesOffsetLeft) / this.pageWidth

      // ARTICLE
      this.articleWidth = this.$refs.article[0].getBoundingClientRect().width

      // IMAGE
      this.imageWapperBounds = this.$refs.imgWrapper.getBoundingClientRect()

      // WRAPPER
      this.wrapperBounds = this.$refs.wrapper.getBoundingClientRect()

      this.wrapperWidthWithoutTitle =
        // Compute with one more title width
        this.borderTitleDistance - this.titleWidth - this.imageWapperBounds.width

      this.articleInWrapper = this.wrapperWidthWithoutTitle / this.articleWidth

      // offset last article
      const articles = this.$refs.article
      this.lastArticle = articles[articles.length - 1]
      const articleContent = this.lastArticle.querySelector('.article__content')
      const offset = document.createElement('div')

      offset.style.width = `${this.wrapperBounds.width}px`
      this.lastArticle.appendChild(offset)

      articleContent.style.boxShadow = ' 16px 1px 28px 2px rgba(0, 0, 0, 0.36)'
    },

    update() {
      // Update scroll
      this.$refs.wrapper.scroll(this.toScroll.value, 0)
      this.$refs.imgWrapper.scroll(this.toScroll.value, 0)

      this.computePositions()

      this.updatePositionTitle()
    },
    onScroll() {
      emitter.on(
        'CONTROLS:DOWN',
        debounce(
          (distance) => {
            /**
             * Scroll Down
             **/
            if (Math.sign(distance) > 0) {
              if (this.indexArticleVisible === 10) return
              if (this.indexArticleVisible === -1) {
                this.startSlideIn()
              }

              if (this.indexArticleVisible === 9) {
                this.endSlideOut()
              }
              this.indexArticleVisible++

              // Anim ArticleContent
              if (this.indexArticleVisible >= 1) {
                this.$refs.articleContent[this.indexArticleVisible - 1].animOut()
              }
              if (this.indexArticleVisible < 10) {
                this.$refs.articleContent[this.indexArticleVisible].animIn()
                this.animTitleOut()
              }

              // Anim hideArticle
              if (this.indexArticleVisible === 9) {
                this.hideArticleAnimOut()
              }
            }

            /**
             * Scroll Up
             **/
            if (Math.sign(distance) < 0) {
              if (this.indexArticleVisible === -1) return

              if (this.indexArticleVisible === 0) {
                this.startSlideOut()
              }
              if (this.indexArticleVisible === 10) {
                this.endSlideIn()
              }

              this.indexArticleVisible--

              // Anim ArticleContent
              if (this.indexArticleVisible < 9) {
                this.$refs.articleContent[this.indexArticleVisible + 1].animOut()
                this.animTitleIn()
              }
              if (this.indexArticleVisible >= 0) {
                this.$refs.articleContent[this.indexArticleVisible].animIn()
              }

              // Anim hideArticle
              if (this.indexArticleVisible === 8) {
                this.hideArticleAnimIn()
              }
            }

            /**
             * Update
             **/

            // Update scroll
            this.$gsap.to(this.toScroll, {
              value: this.articleWidth * this.indexArticleVisible,
              duration: 1,
            })

            // Update progress scroll
            this.$refs.scrollProgress.style.transform = `scaleX(${
              (this.indexArticleVisible + 1) / this.$refs.article.length
            })`
          },
          this.debounceWait,
          { leading: true, trailing: false }
        )
      )
    },

    computePositions() {
      this.ratioArticleVisible = this.$refs.wrapper.scrollLeft / this.articleWidth

      this.ratioSecondArticleVisible = this.articleInWrapper - (1 - this.ratioArticleVisible)

      this.offsetTitle = this.ratioArticleVisible * this.titleWidth
    },
    initPositionTitle() {
      this.$refs.article.forEach((articleEl, i) => {
        // Position fix titles
        const rightPositionTitle =
          (this.$refs.titleWrapper.length - i - this.nbTitlesOut) * this.titleWidth

        if (i > this.ratioSecondArticleVisible + 1) {
          // Article outside RIGHT
          this.$refs.article[i].style.position = 'unset'
          this.$refs.titleWrapper[i].style.right = `${rightPositionTitle}px`
        }
      })
    },
    initPositionHideArticle() {
      const offset = this.borderTitleDistance - this.imageWapperBounds.width
      this.$refs.hideArticle.style.left = `${offset}px`
    },
    updatePositionTitle() {
      // Position titles onScroll
      this.$refs.article.forEach((articleEl, i) => {
        // Position fix titles
        const rightPositionTitle =
          (this.$refs.titleWrapper.length - i - this.nbTitlesOut) * this.titleWidth

        if (this.ratioArticleVisible > i) {
          // Article outside LEFT
          this.$refs.article[i].style.position = 'unset'
          this.$refs.titleWrapper[i].style.left = 0
        } else if (i > this.ratioSecondArticleVisible + 1) {
          // Article outside RIGHT
          this.$refs.article[i].style.position = 'unset'
          this.$refs.titleWrapper[i].style.right = `${rightPositionTitle}px`
          this.$refs.titleWrapper[i].style.transform = `translateX(-${this.offsetTitle}px)`
        } else {
          // Article inside
          this.$refs.article[i].style.position = 'relative'
          this.$refs.titleWrapper[i].style.transform = `translateX(0px)`
          this.$refs.titleWrapper[i].style.left = 'unset'
          this.$refs.titleWrapper[i].style.right = 'unset'
        }
      })
    },

    /**
     * Style
     */
    styleOverlay(n) {
      const style = {}

      if (n === this.indexArticleVisible + 1) {
        style.background = '#FFD500'
        // }
      } else {
        style.background = 'rgba(0,0,0,0.7)'
      }
      return style
    },
    styleImg(n) {
      const style = {}

      if (n === this.indexArticleVisible + 1) {
        style.transform = 'scale(1.1)'
      } else {
        style.transform = 'scale(1)'
      }
      return style
    },

    /**
     * Reset
     */
    reset() {
      this.titleSplitted = new this.$SplitText(this.$refs.title, {
        type: 'chars',
        charsClass: 'chars',
      })
    },
    /**
     * Animations
     */

    /**
     * Title
     */
    animTitleOut() {
      const index = this.indexArticleVisible
      const titleChars = this.$refs.title[index].querySelectorAll('.chars')

      this.resetAnimTitle(
        this.$refs.titleBg[index],
        this.$refs.title[index],
        titleChars,
        this.$refs.titleBorder[index]
      )

      // Background title
      this.$gsap.to(this.$refs.titleBg[index], {
        opacity: 0,
        duration: 1,
      })

      // Title
      this.$gsap.to(this.$refs.title[index], {
        y: '500%',
        opacity: this.reducedMotion ? 0 : 1,
        duration: 1,
      })

      if (!this.reducedMotion) {
        this.$gsap.to(titleChars, {
          opacity: 0,
          stagger: -0.02,
          duration: 0.5,
        })
      }

      // Border Title
      this.$gsap.to(this.$refs.titleBorder[index], {
        scaleY: 0,
        opacity: 0,
        duration: 1,
        ease: 'power1.out',
      })
    },
    animTitleIn() {
      const index = this.indexArticleVisible + 1
      const titleChars = this.$refs.title[index].querySelectorAll('.chars')

      this.resetAnimTitle(
        this.$refs.titleBg[index],
        this.$refs.title[index],
        titleChars,
        this.$refs.titleBorder[index]
      )

      // Background title
      this.$gsap.to(this.$refs.titleBg[index], {
        opacity: 1,
        duration: 1,
      })

      // Title
      this.$gsap.to(this.$refs.title[index], {
        y: 0,
        opacity: 1,
        duration: 1,
      })

      if (!this.reducedMotion) {
        this.$gsap.to(titleChars, {
          opacity: 1,
          stagger: -0.02,
          duration: 0.5,
        })
      }

      // Border Title
      this.$gsap.to(this.$refs.titleBorder[index], {
        scaleY: 1,
        opacity: 0.4,
        duration: 1,
      })
    },

    resetAnimTitle(titleBg, title, titleChars, titleBorder) {
      this.$gsap.killTweensOf([titleBg, title, titleChars, titleBorder])
    },

    /**
     * Slider
     */
    // Anim In
    startSlideIn() {
      const duration1 = this.reducedMotion ? 1 : 1.5
      const duration2 = this.reducedMotion ? 1 : 1.2

      this.resetAnimSlider()
      this.$gsap.to(this.$refs.cover.$el, {
        x: '-20%',
        // x: -100,
        duration: duration1,
      })
      this.$gsap.to(this.$refs.container, {
        x: 0,
        duration: 1,
      })
      this.$gsap.to(this.$refs.imgWrapper, {
        x: 0,
        duration: duration2,
      })
      this.$gsap.to(this.$refs.border, {
        x: 0,
        duration: duration2,
      })
    },

    startSlideOut() {
      this.resetAnimSlider()
      this.$gsap.to(this.$refs.cover.$el, {
        x: '0',
        duration: 1,
      })
      this.$gsap.to(this.$refs.container, {
        x: '97%',
        duration: 1,
      })
      this.$gsap.to(this.$refs.imgWrapper, {
        x: '300%',
        duration: 1,
      })
      this.$gsap.to(this.$refs.border, {
        x: '-100%',
        duration: 1,
      })
    },

    // Anim OUT
    endSlideOut() {
      this.resetAnimSlider()
      this.$gsap.set(this.$refs.cover.$el, {
        x: '-100%',
      })
      this.$gsap.to(this.$refs.container, {
        x: '-130%',
        duration: 2,
      })
      this.$gsap.to(this.$refs.imgWrapper, {
        x: '-100%',
        duration: 2,
      })
      this.$gsap.to(this.$refs.border, {
        x: '-100%',
        duration: 2,
      })
    },
    endSlideIn() {
      this.resetAnimSlider()
      this.$gsap.to(this.$refs.container, {
        x: 0,
        duration: 1,
      })
      this.$gsap.to(this.$refs.imgWrapper, {
        x: 0,
        duration: 1,
      })
      this.$gsap.to(this.$refs.border, {
        x: 0,
        duration: 1,
      })
    },

    resetAnimSlider() {
      this.$gsap.killTweensOf([
        this.$refs.cover.$el,
        this.$refs.container,
        this.$refs.imgWrapper,
        this.$refs.border,
      ])
    },
    /**
     * Hide Article
     */
    // Anim In
    hideArticleAnimIn() {
      this.resetAnimHideArticle()
      this.$gsap.to(this.$refs.hideArticle, {
        x: 0,
        duration: 1,
      })
    },

    hideArticleAnimOut() {
      const duration1 = this.reducedMotion ? 1 : 2

      this.resetAnimHideArticle()
      this.$gsap.to(this.$refs.hideArticle, {
        x: '60%',
        duration: duration1,
      })
    },

    resetAnimHideArticle() {
      this.$gsap.killTweensOf([this.$refs.hideArticle])
    },
  },
}
</script>

//
<style lang="scss">
// .home {
//   $image-width: 40vw;

//   /**
//   * Scroll Progress
//   */
//   .scroll__progress {
//     z-index: 3;
//     position: fixed;
//     top: 0;
//     left: 0;
//     height: $sizeProgress;
//     width: 100%;
//     background: lighten($yellow, 5%);
//     transform-origin: center left;
//     transform: scaleX(0);
//     transition: transform 1s, background 1s;
//   }

//   /**
//   * Border
//   */
//   .home__border {
//     z-index: 2;
//     position: fixed;
//     top: 0;
//     left: 0;
//     width: vw(45);
//     height: 100vh;
//     mix-blend-mode: difference;
//     display: flex;
//     transition: color 800ms;
//     transition-delay: 200ms;

//     // Init
//     transform: translateX(-100%);

//     .line {
//       height: 100%;
//       width: 1px;
//       background: $white;
//       position: absolute;
//       left: vw(40);
//     }
//     .border__wrapper {
//       width: vw(200);
//       position: absolute;
//       bottom: vw(10);
//       display: flex;
//       align-items: flex-end;
//       transform-origin: left bottom;
//       transform: rotate(-90deg) translate(0, 150%);
//       .title {
//         font-family: 'Anybody';
//         font-size: vw(36);
//         text-transform: uppercase;
//         line-height: 0.6;
//       }
//       .numero {
//         font-family: 'Eb-Garamond';
//         margin-left: vw(6);
//       }
//     }
//   }

//   /**
//   * Image
//   */
//   .home__img__wrapper {
//     z-index: 1;
//     position: fixed;
//     left: 0;
//     width: $image-width;
//     height: 100vh;
//     display: flex;
//     overflow: hidden;
//     .img-with-overlay {
//       flex-grow: 1;
//       flex-shrink: 0;
//       height: auto;
//       width: $image-width;
//       position: relative;
//     }
//     .overlay {
//       /* display: none; */
//       z-index: 4;
//       position: absolute;
//       top: 0;
//       left: 0;
//       width: 100%;
//       height: 100%;
//       opacity: 0.9;
//       /* mix-blend-mode: soft-light; */
//       mix-blend-mode: multiply;
//       transition: background 2s;
//       transition-delay: 200ms;
//     }
//     .img__container {
//       height: 100%;
//       width: $image-width;
//       overflow: hidden;

//       img {
//         height: 100%;
//         width: 100%;
//         transition: transform 1.5s ease-out;
//       }
//     }

//     // Init
//     transform: translateX(300%);
//   }

//   /**
//   * Article
//   */
//   .articles__container {
//     z-index: 1;
//     position: fixed;
//     margin-left: $image-width;

//     height: 100vh;
//     width: calc(100vw - $image-width);
//     overflow: hidden;
//     box-shadow: -16px 0px 15px 2px rgba(0, 0, 0, 0.2);

//     // Init
//     transform: translateX(97%);

//     .articles__wrapper {
//       width: calc(100vw - $image-width);
//       background: transparent;
//       display: flex;

//       width: 100%;
//       height: 100%;
//       overflow: hidden;
//     }

//     .hide__article {
//       z-index: 1;
//       position: fixed;
//       top: 0;
//       left: 0;
//       width: 100%;
//       height: 100%;
//       background: $white;
//     }

//     .article {
//       position: relative;

//       // Remove border first title
//       &:first-child {
//         .title__wrapper {
//           .title__border {
//             display: none;
//           }
//           border-left: none;
//         }
//       }
//     }

//     /**
//     * Title
//     */
//     .title__wrapper {
//       z-index: 1;
//       position: absolute;
//       width: 3vw;
//       height: 100%;

//       /* border-left: 1px solid black; */
//       .title__bg {
//         position: absolute;
//         top: 0;
//         left: 0;
//         height: 100%;
//         width: 100%;
//         background: $white;
//       }
//       .title__border {
//         height: 100%;
//         width: 2px;
//         background: #707070;
//         opacity: 0.4;
//         position: absolute;
//         top: 0;
//         left: 1px;
//         z-index: 2;
//         transform-origin: center bottom;
//       }
//       h2 {
//         width: 100vh;
//         margin-left: 16px;
//         margin-top: 8px;
//         transform-origin: top left;
//         transform: rotate(90deg) translate(0, -100%);

//         font-size: vw(16);
//         text-transform: uppercase;

//         overflow: hidden;
//       }
//     }
//   }
// }
//
</style>
