<template>
  <div ref="articlesContainer" class="articles__container">
    <div v-for="n in 10" :key="n" ref="article" class="article">
      <div class="title">article {{ n }}</div>
    </div>
    <div class="ribbons">
      <div v-for="n in 10" :key="n" ref="ribbon" class="ribbon">
        <div class="title">TITRE {{ n }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      scroll: 0,
      scrollEased: { value: 0 },
    }
  },
  mounted() {
    this.getScroll()
    this.scrollArticlesCraft()
  },

  methods: {
    scrollArticles() {
      window.scrollTo(0, 0)

      const tl = this.$gsap.timeline()
      this.$refs.article.forEach((article, i) => {
        // const currentArticle = article
        const nextArticles = this.$refs.article.slice(i + 1)

        tl.to(article, {
          x: 300,
          duration: 2,
          delay: i,
          onComplete: () => {
            console.log('complete')
          },
        })

        if (nextArticles) {
          nextArticles.forEach((nextArticle, j) => {
            tl.to(
              nextArticle,
              {
                x: 800 * (j * 0.1 + 1),
                duration: 1,
                onStart: () => {
                  console.log('next articles', 10 - i)
                },
              },
              '<'
            )
          })
        }
      })

      this.$ScrollTrigger.create({
        invalidateOnRefresh: true,
        animation: tl,
        trigger: this.$refs.articlesContainer,
        start: 'top top',
        end: () => '+=' + this.$refs.articlesContainer.offsetWidth,
        pin: true,
        scrub: 1,
        ease: 'linear',
      })
    },
    getScroll() {
      // Reset scroll
      this.$refs.articlesContainer.scroll(0, 0)

      // Change vertical scroll to horizontal
      window.addEventListener('scroll', () => {
        this.$refs.articlesContainer.scroll(window.scrollY, 0)
      })

      this.$refs.articlesContainer.addEventListener('scroll', (e) => {
        // Compute ribbons translate
        const ribbon = {}
        ribbon.width = this.$refs.ribbon[0].getBoundingClientRect().width
        this.$refs.article.forEach((article, i) => {
          const articlePosition = {}
          articlePosition.x = article.getBoundingClientRect().x

          if (articlePosition.x > 1618) return
          const offset = 1650 - articlePosition.x + i * 80
          if (i === 2) {
            console.log(offset)
          }
          this.$refs.ribbon[i].style.transform = `translateX(${-offset}px)`
        })

        // Compute scroll
        this.scroll =
          Math.floor(
            (this.$refs.articlesContainer.scrollLeft /
              (this.$refs.articlesContainer.scrollWidth -
                this.$refs.articlesContainer.clientWidth)) *
              1000
          ) / 1000

        // Compute eased scroll
        this.$gsap.to(this.scrollEased, {
          value: this.scroll,
          duration: 0.6,
        })
      })
    },
    scrollArticlesCraft() {},
  },
}
</script>

<style lang="scss">
.articles__container {
  top: 0;
  left: 35vw;
  right: 0;
  height: 600vh;
  /* width: 100vw; */
  display: flex;
  overflow: auto;
  position: fixed;
}

.article {
  position: sticky;
  top: 0;
  left: 0;
  flex-shrink: 0;
  width: 35vw;
  height: 100vh;
  display: flex;
  align-items: flex-start;
  font-size: vw(14);
  padding: 32px;
  border: 2px solid black;
  background: $white;

  @for $i from 1 through 10 {
    &:nth-child(#{$i}) {
      /* transform: translateX(calc(77% + #{$i * 70}px)); */
      /* background-color: lighten(salmon, $i * 5%); */
    }
  }
}

.ribbons {
  width: 20vw;
  position: fixed;
  right: 0;
  height: 100vh;
  display: flex;
}
.ribbon {
  flex-shrink: 0;
  width: 4vw;
  height: 100%;
  display: flex;
  align-items: flex-start;
  font-size: vw(14);
  border: 2px solid black;
  background: $white;

  .title {
    transform: rotate(-90deg) translateX(-50%);
  }

  @for $i from 1 through 10 {
    &:nth-child(#{$i}) {
      /* transform: translateX(calc(-200% + #{$i * 70}px)); */
      /* background-color: lighten(blue, $i * 5%); */
    }
  }
}
</style>
