<template>
  <div>
    <cover ref="cover" />
    <div ref="imgWrapper" class="img__wrapper">
      <img
        v-for="n in 10"
        ref="image"
        :key="n"
        :src="`https://picsum.photos/id/${n}37/850/1200`"
        alt=""
      />
    </div>
    <div ref="container" class="container">
      <div ref="wrapper" class="wrapper">
        <article v-for="n in 10" ref="article" :key="n" class="article">
          <div ref="titleWrapper" class="title__wrapper">
            <h2>TITRE {{ n }}</h2>
          </div>

          <div class="article__content">
            <p>Article {{ n }}</p>
          </div>
        </article>
      </div>
    </div>

    <generique />
  </div>
</template>

<script>
// import debounce from '~~/utils/debounce'
import debounce from 'lodash/debounce'
import Generique from '~/components/Home/Generique.vue'
import Cover from '~/components/Home/Cover.vue'

export default {
  components: { Generique, Cover },
  data() {
    return {
      pageWidth: 0,
      scrollValue: 0,
      toScroll: { value: 0 },
      isScrolled: false,
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
      indexArticleVisible: 0,
      lastArticle: null,

      // Image
      imageWapperPosition: 0,

      // Wrapper
      wrapperPosition: 0,
      wrapperWidthWithoutTitle: 0,
    }
  },
  mounted() {
    this.pageWidth = document.body.scrollWidth

    // Compute onResize
    this.computeBounds()

    this.getScrollSpeed()

    this.initPositionTitle()
    this.update()
    this.onScroll()
  },
  methods: {
    computeBounds() {
      // TITLE
      this.titleWidth = this.$refs.titleWrapper[0].getBoundingClientRect().width

      this.borderTitleDistance =
        this.pageWidth - this.titleWidth * (this.titlesOffsetLeft - 1)

      // Compute titles outside of the page
      this.nbTitlesOut = Math.floor(
        this.$refs.article.length - this.titlesOffsetLeft
      )

      this.ratioTitleVisible =
        (this.titleWidth * this.titlesOffsetLeft) / this.pageWidth

      // ARTICLE
      this.articleWidth = this.$refs.article[0].getBoundingClientRect().width

      // IMAGE
      this.imageWapperPosition = this.$refs.imgWrapper.getBoundingClientRect()

      // WRAPPER
      this.wrapperPosition = this.$refs.wrapper.getBoundingClientRect()

      this.wrapperWidthWithoutTitle =
        // Compute with one more title width
        this.borderTitleDistance -
        this.titleWidth -
        this.imageWapperPosition.width

      this.articleInWrapper = this.wrapperWidthWithoutTitle / this.articleWidth

      // offset last article
      const articles = this.$refs.article
      this.lastArticle = articles[articles.length - 1]
      const articleContent = this.lastArticle.querySelector('.article__content')
      const offset = document.createElement('div')

      offset.style.width = `${this.wrapperPosition.width}px`
      this.lastArticle.appendChild(offset)

      articleContent.style.boxShadow = ' 16px 1px 28px 2px rgba(0, 0, 0, 0.36)'
      console.log(articleContent)
    },
    getScrollSpeed() {
      window.addEventListener('wheel', (e) => {
        if (e.deltaY > 150) {
          console.log('fast')
          // this.debounceWait = 0
        }
      })
    },
    update() {
      this.$gsap.ticker.add(() => {
        this.$refs.wrapper.scroll(this.toScroll.value, 0)
        this.$refs.imgWrapper.scroll(this.toScroll.value, 0)

        this.computePositions()

        this.updatePositionTitle()
      })
    },
    onScroll() {
      this.scrollValue = 0

      window.addEventListener(
        'wheel',
        debounce(
          (e) => {
            // Scroll down
            if (Math.sign(e.deltaY) > 0) {
              if (this.indexArticleVisible === 0 && !this.isScrolled) {
                this.animInSlideIn()
                this.isScrolled = true
                return
              }

              if (this.indexArticleVisible === 9) {
                this.animOutSlideOut()
                return
              }
              this.indexArticleVisible++
            }

            // Scroll up
            if (Math.sign(e.deltaY) < 0) {
              if (this.indexArticleVisible === 0) return

              if (this.indexArticleVisible === 9) {
                this.animOutSlideIn()
                return
              }

              this.indexArticleVisible--
            }

            console.log('wheel', this.indexArticleVisible)
            this.$gsap.to(this.toScroll, {
              value: this.articleWidth * this.indexArticleVisible,
              duration: 1,
            })
          },
          this.debounceWait,
          { leading: true, trailing: false }
        )
      )
    },

    computePositions() {
      this.ratioArticleVisible =
        this.$refs.wrapper.scrollLeft / this.articleWidth

      this.ratioSecondArticleVisible =
        this.articleInWrapper - (1 - this.ratioArticleVisible)

      this.offsetTitle = this.ratioArticleVisible * this.titleWidth
    },
    initPositionTitle() {
      this.$refs.article.forEach((articleEl, i) => {
        // Position fix titles
        const rightPositionTitle =
          (this.$refs.titleWrapper.length - i - this.nbTitlesOut) *
          this.titleWidth

        if (i > this.ratioSecondArticleVisible + 1) {
          // Article outside RIGHT
          this.$refs.article[i].style.position = 'unset'
          this.$refs.titleWrapper[i].style.right = `${rightPositionTitle}px`
        }
      })
    },
    updatePositionTitle() {
      // Position titles onScroll
      this.$refs.article.forEach((articleEl, i) => {
        // Position fix titles
        const rightPositionTitle =
          (this.$refs.titleWrapper.length - i - this.nbTitlesOut) *
          this.titleWidth

        if (this.ratioArticleVisible > i) {
          // Article outside LEFT
          this.$refs.article[i].style.position = 'unset'
          this.$refs.titleWrapper[i].style.left = 0
        } else if (i > this.ratioSecondArticleVisible + 1) {
          // Article outside RIGHT
          this.$refs.article[i].style.position = 'unset'
          this.$refs.titleWrapper[i].style.right = `${rightPositionTitle}px`
          this.$refs.titleWrapper[
            i
          ].style.transform = `translateX(-${this.offsetTitle}px)`
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
     * Animations
     */
    // Anim In
    animInSlideIn() {
      this.$gsap.to(this.$refs.cover.$el, {
        x: '-100%',
        duration: 10,
      })
      this.$gsap.to(this.$refs.container, {
        x: 0,
        duration: 1,
      })
      this.$gsap.to(this.$refs.imgWrapper, {
        x: 0,
        duration: 1.2,
      })
    },

    animInSlideOut() {
      this.$gsap.to(this.$refs.container, {
        x: '97%',
        duration: 1,
      })
      this.$gsap.to(this.$refs.imgWrapper, {
        x: '300%',
        duration: 1,
      })
    },

    // Anim OUT
    animOutSlideOut() {
      this.$gsap.to(this.$refs.container, {
        x: '-130%',
        duration: 2,
      })
      this.$gsap.to(this.$refs.imgWrapper, {
        x: '-100%',
        duration: 2,
      })
    },
    animOutSlideIn() {
      this.$gsap.to(this.$refs.container, {
        x: 0,
        duration: 1,
        onComplete: () => {
          this.indexArticleVisible--
        },
      })
      this.$gsap.to(this.$refs.imgWrapper, {
        x: 0,
        duration: 1,
      })
    },
  },
}
</script>

<style lang="scss">
$image-width: 40vw;

.info {
  position: fixed;
  top: 0;
  left: 0;
  padding: 16px;
  font-size: 16px;
  z-index: 10;
  display: none;
}

.img__wrapper {
  position: fixed;
  left: 0;
  width: $image-width;
  height: 100vh;
  display: flex;
  overflow: hidden;

  img {
    flex-grow: 1;
    flex-shrink: 0;
    height: auto;
    width: $image-width;
  }

  // Init
  transform: translateX(300%);
}
.container {
  position: fixed;
  margin-left: $image-width;

  height: 100vh;
  width: calc(100vw - $image-width);
  overflow: hidden;
  box-shadow: -16px 0px 20px 2px rgba(0, 0, 0, 0.26);

  // Init
  transform: translateX(97%);
}
.wrapper {
  width: calc(100vw - $image-width);
  background: transparent;
  display: flex;

  width: 100%;
  height: 100%;
  overflow: hidden;
}

.article {
  position: relative;
}
.title__wrapper {
  z-index: 2;
  position: absolute;
  width: 3vw;
  height: 100%;
  background: $white;
  border-left: 1px solid black;
  h2 {
    font-size: 25px;
    transform: rotate(90deg) translate(0, -100%);
    width: 100vh;
    transform-origin: top left;
    margin-left: 16px;
    margin-top: 8px;
  }
}

.article__content {
  z-index: 3;
  height: 100%;
  width: 40vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fbfaf5;

  /* scroll-snap-align: start; */
}
</style>
