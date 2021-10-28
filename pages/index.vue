<template>
  <div class="home__container">
    <section ref="imageContainer" class="image__container">
      <div v-for="n in 10" :key="n" class="image__wrapper">
        <div ref="image" class="image">
          <img :src="`https://picsum.photos/id/${n}37/850/1200`" />
        </div>
      </div>
    </section>

    <section ref="articleContainer" class="articles__container">
      <div v-for="n in 10" :key="n" ref="articleWrapper" class="article__wrapper">
        <div ref="article" class="article" :data-index="n">
          <div ref="titleWrapper" class="title__wrapper">
            <div ref="titleBg" class="title__bg"></div>
            <div ref="titleBorder" class="title__border"></div>
            <h2 ref="title">Le théâtre polonais</h2>
          </div>

          <Article ref="articleContent" class="article__content" :index-article="n" />
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import debounce from 'lodash/debounce'
import emitter from '~/utils/EventEmitter'

import Article from '~/components/Home/Article.vue'
export default {
  components: { Article },

  data() {
    return {
      scroll: { value: 0, eased: 0 },

      // Title
      nbTitlesOut: null,
      titlesOffsetLeft: 5,
    }
  },
  mounted() {
    this.pageWidth = document.body.scrollWidth
    this.reset()

    // Compute onResize
    this.computeBounds()

    this.computePositions()
    this.initPositionTitle()

    this.onScroll()
  },

  methods: {
    update() {
      this.$refs.articleContainer.scrollTo(this.scroll.eased, 0)
      this.$refs.imageContainer.scrollTo(this.scroll.eased, 0)
      this.computePositions()

      this.updatePositionTitle()
    },
    onScroll() {
      const options = {
        root: this.$refs.articleContainer,
        rootMargin: '0px',
        threshold: 0.5,
      }

      const that = this
      const callback = function (entries, observer) {
        entries.forEach((entry) => {
          if (entry.intersectionRatio === 0) return
          const indexArticle = entry.target.dataset.index
          console.log(indexArticle)
          console.log(entry)

          if (entry.isIntersecting) {
            // Animate in
            that.$refs.articleContent[indexArticle - 1].animIn()
            that.animTitleOut(indexArticle - 1)
          } else {
            // Animate out
            that.$refs.articleContent[indexArticle - 1].animOut()
            that.animTitleIn(indexArticle - 1)
            console.log('animate out', indexArticle)
          }
        })
      }

      const observer = new IntersectionObserver(callback, options)

      this.$refs.article.forEach((article) => {
        observer.observe(article)
      })

      document.body.addEventListener('wheel', (e) => {
        this.scroll.value += e.deltaY * 0.5
        this.$gsap.to(this.scroll, {
          eased: this.scroll.value,
        })
      })
    },
    computeBounds() {
      // TITLE
      this.titleWidth = this.$refs.titleWrapper[0].getBoundingClientRect().width

      this.borderTitleDistance = this.pageWidth - this.titleWidth * (this.titlesOffsetLeft - 1)

      // Compute titles outside of the page
      this.nbTitlesOut = Math.floor(this.$refs.articleWrapper.length - this.titlesOffsetLeft)

      // ARTICLE
      this.articleWrapperBounds = this.$refs.articleWrapper[0].getBoundingClientRect()
      this.articleWrapperWidth = this.articleWrapperBounds.width

      // IMAGE
      this.imageContainerBounds = this.$refs.imageContainer.getBoundingClientRect()

      // WRAPPER
      this.wrapperWidthWithoutTitle =
        // Compute with one more title width
        this.borderTitleDistance - this.titleWidth - this.imageContainerBounds.width
      this.articleInWrapper = this.wrapperWidthWithoutTitle / this.articleWrapperWidth

      // offset last article
      const articles = this.$refs.articleWrapper
      const lastArticle = articles[articles.length - 1]
      const articleContent = lastArticle.querySelector('.article__content')

      lastArticle.style.width = '120%'
      articleContent.style.boxShadow = ' 16px 1px 28px 2px rgba(0, 0, 0, 0.36)'
    },

    computePositions() {
      this.ratioArticleVisible = this.$refs.articleContainer.scrollLeft / this.articleWrapperWidth

      this.ratioSecondArticleVisible = this.articleInWrapper - (1 - this.ratioArticleVisible)

      this.offsetTitle = this.ratioArticleVisible * this.titleWidth
    },

    initPositionTitle() {
      this.$refs.articleWrapper.forEach((articleEl, i) => {
        // Position fix titles
        const rightPositionTitle =
          (this.$refs.titleWrapper.length - i - this.nbTitlesOut) * this.titleWidth

        if (i > this.ratioSecondArticleVisible + 1) {
          // Article outside RIGHT
          this.$refs.titleWrapper[i].style.position = `fixed`
          this.$refs.titleWrapper[i].style.right = `${rightPositionTitle}px`
        }
      })
    },
    updatePositionTitle() {
      // Position titles onScroll
      this.$refs.articleWrapper.forEach((articleEl, i) => {
        // Position fix titles
        const rightPositionTitle =
          (this.$refs.titleWrapper.length - i - this.nbTitlesOut) * this.titleWidth

        // Article outside LEFT
        if (this.ratioArticleVisible > i) {
          this.$refs.titleWrapper[i].style.position = 'fixed'
          this.$refs.titleWrapper[i].style.left = `${this.articleWrapperBounds.x}px`
          this.$refs.titleWrapper[i].style.right = 'unset'

          this.$refs.articleContent[i].$el.style.position = 'fixed'
          this.$refs.articleContent[i].$el.style.left = `${this.articleWrapperBounds.x}px`
          // Article outside RIGHT
        } else if (i > this.ratioSecondArticleVisible + 1) {
          this.$refs.titleWrapper[i].style.position = `fixed`
          this.$refs.titleWrapper[i].style.right = `${rightPositionTitle}px`
          this.$refs.titleWrapper[i].style.left = 'unset'
          this.$refs.titleWrapper[i].style.transform = `translateX(-${this.offsetTitle}px)`

          // Article inside
        } else {
          this.$refs.titleWrapper[i].style.transform = `translateX(0px)`
          this.$refs.titleWrapper[i].style.position = `absolute`
          this.$refs.titleWrapper[i].style.left = '0'
          this.$refs.titleWrapper[i].style.right = 'unset'

          this.$refs.articleContent[i].$el.style.position = 'unset'
          this.$refs.articleContent[i].$el.style.left = 'unset'
        }
      })
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
    animTitleOut(index) {
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
    animTitleIn(index) {
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
  },
}
</script>

<style lang="scss">
$image-width: 40vw;
$article-width: 60vw;
$container-sticky-width: 50vw;
body {
  overflow: hidden;
}

.home__container {
  display: flex;

  // Images
  .image__container {
    width: $image-width;
    flex-shrink: 0;

    display: flex;
    justify-content: flex-start;
    overflow: hidden;

    .image__wrapper {
      flex-shrink: 0;
      width: $container-sticky-width;
      height: 100vh;
      .image {
        position: sticky;
        left: 0;

        display: flex;
        justify-content: center;
        align-items: center;

        width: 40vw;
        height: 100%;

        img {
          /* object-fit: cover; */
          height: 100%;
          width: 100%;
        }
      }
    }
  }

  // Articles
  .articles__container {
    width: $article-width;
    display: flex;
    /* display: none; */
    justify-content: flex-start;
    overflow: hidden;
    position: relative;

    box-shadow: -16px 0px 15px 2px rgba(0, 0, 0, 0.2);

    // Article content
    .article__wrapper {
      flex-shrink: 0;
      width: $container-sticky-width;
      height: 100vh;
      // Title
      .title__wrapper {
        z-index: 1;
        width: 3vw;
        height: 100%;

        .title__bg {
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          width: 100%;
          background: $white;
        }
        .title__border {
          height: 100%;
          width: 2px;
          background: #707070;
          opacity: 0.4;
          position: absolute;
          top: 0;
          left: 1px;
          z-index: 2;
          transform-origin: center bottom;
        }
        h2 {
          width: 100vh;
          margin-left: 16px;
          padding-left: 8px;
          transform-origin: top left;
          transform: rotate(90deg) translate(0, -100%);

          font-size: vw(16);
          text-transform: uppercase;

          overflow: hidden;
        }
      }

      // Article content
      .article {
        position: sticky;
        left: 0;
        /* width: 80%; */
        height: 100%;
        border-left: 1px solid black;

        /* background: salmon; */
      }
    }
  }
}
</style>
