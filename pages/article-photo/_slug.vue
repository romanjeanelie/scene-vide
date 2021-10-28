<template>
  <div class="article-video__container">
    <navigation class="dark" title="VAINCRE LES PARENTS" author="HENRI JULES-JULIEN" />

    <section class="title__wrapper">
      <div class="title">
        <h1>VAINCRE LES PARENTS</h1>
        <h3 class="auteur">HENRI JULES-JULIEN</h3>
      </div>
    </section>

    <div class="container">
      <section class="top">
        <h3 class="header">
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
          invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et
          accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata
          sanctus est Lorem ipsum dolor sit amet
        </h3>
        <div class="signature">
          <div class="signature__wrapper">
            <p class="name">Maxime Kurvers</p>
            <p class="desc">auteur, metteur en scène</p>
          </div>
          <div class="border"></div>
        </div>
      </section>
    </div>

    <main>
      <slider :images="images" />
    </main>

    <share />

    <section class="bottom">
      <close class="dark" />
    </section>
  </div>
</template>

<script>
import close from '~/components/common/close.vue'
import navigation from '~/components/common/navigation.vue'
import Slider from '~/components/common/Photo/slider.vue'
import Share from '~/components/common/share.vue'

import emitter from '~/utils/EventEmitter'

export default {
  components: { navigation, close, Share, Slider },
  data() {
    return {
      images: [
        { url: 'https://picsum.photos/id/237/200/300' },
        { url: 'https://picsum.photos/id/337/200/300' },
        { url: 'https://picsum.photos/id/437/200/300' },
        { url: 'https://picsum.photos/id/537/200/300' },
        { url: 'https://picsum.photos/id/5637/200/300' },
        { url: 'https://picsum.photos/id/637/200/300' },
        { url: 'https://picsum.photos/id/737/200/300' },
        { url: 'https://picsum.photos/id/837/200/300' },
        { url: 'https://picsum.photos/id/937/200/300' },
      ],
    }
  },
  mounted() {
    this.$nextTick(() => {
      emitter.emit('PAGE:MOUNTED')
    })
  },
  methods: {},
}
</script>

<style lang="scss">
.article-video__container {
  background: #000;
  color: $white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .title__wrapper {
    grid-column-start: 2;
    grid-column-end: span 2;
    margin-top: vw(100);

    .title {
      display: flex;
      flex-direction: column;
      h1 {
        @extend %title;
      }
      .auteur {
        @extend %title-auteur;

        align-self: flex-end;
      }
    }
  }
  .container {
    width: vw(1200);
    margin-top: vw(100);

    .top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .header {
        @extend %text-header;

        max-width: vw(800);
      }
      .signature {
        position: relative;

        @extend %signature;

        .signature__wrapper {
          margin-left: vw(20);
        }

        .border {
          height: 100%;
          width: vw(2);
          background: $white;
          position: absolute;
          top: 0;
          left: 0;
        }
      }
    }
  }

  main {
    width: 99vw;
  }
}
</style>
