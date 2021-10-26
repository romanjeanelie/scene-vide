<template>
  <div class="article-son__container">
    <navigation class="dark" />

    <div class="container">
      <section class="title__wrapper">
        <div class="title">
          <h1>VAINCRE LES PARENTS</h1>
          <h3 class="auteur">HENRI JULES-JULIEN</h3>
        </div>
      </section>

      <section class="left">
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
      <div class="right">
        <div class="img__wrapper">
          <img src="https://picsum.photos/1200/1400" alt="" />
        </div>
      </div>

      <main></main>
    </div>

    <share />

    <section class="bottom">
      <close class="dark" />
    </section>
  </div>
</template>

<script>
import close from '~/components/common/close.vue'
import navigation from '~/components/common/navigation.vue'
import Share from '~/components/common/share.vue'

import emitter from '~/utils/EventEmitter'

export default {
  components: { navigation, close, Share },
  mounted() {
    this.$nextTick(() => {
      emitter.emit('PAGE:MOUNTED')
    })
  },
}
</script>

<style lang="scss">
.article-son__container {
  background: #000;
  color: $white;

  .container {
    display: grid;
    grid-template-columns: 1fr auto auto 1fr;
    grid-template-rows: repeat(2, auto);
    gap: vw(100) 0;
  }
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

  .left {
    grid-column-start: 2;
    grid-column-end: span 2;
    grid-row-start: 2;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    .header {
      @extend %text-header;

      max-width: vw(500);
    }
    .signature {
      margin-top: vw(60);
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
  .right {
    grid-column-start: 3;
    grid-column-end: span 2;
    grid-row-start: 2;

    .img__wrapper {
      margin-left: auto;
      max-height: vw(600);
      overflow: hidden;
      display: flex;
      justify-content: center;
      align-items: center;

      img {
        width: 100%;
      }
    }
  }

  main {
  }
}
</style>
