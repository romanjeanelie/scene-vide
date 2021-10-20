<template>
  <div class="cover">
    <div class="title">
      <h1>La scene est vide</h1>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss">
.cover {
  @extend %cover;

  display: flex;
  justify-content: center;
  align-items: center;

  font-family: 'Anybody';
  font-size: vw(100);
  text-transform: uppercase;

  background: $white;
}
</style>
