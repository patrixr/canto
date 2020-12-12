<template>
  <div class="title branded">Canto</div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';

  export default defineComponent({
    name: 'TitleBranded'
  }); 
</script>

<style lang="css" scoped>
  .title.branded {
    font-family: AmbarPearl;
    color: white;
    font-weight: bold;
    font-size: 1.5rem;
    text-align: center;
    margin: 1.5rem;
    margin-top: 2.5rem;
  }
</style>
