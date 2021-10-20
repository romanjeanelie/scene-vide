<template>
  <div class="generique">
    <h1>GENERIQUE</h1>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss">
.generique {
  z-index: -1;
  /* display: none; */
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  background: $red;
  color: $white;
}
</style>
