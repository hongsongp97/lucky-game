<template>
  <div>
    <header-content></header-content>
    <main-content></main-content>
    <!-- <footer-content></footer-content> -->
  </div>
</template>

<script>
  import HeaderContent from "./Header.vue";
  import MainContent from "./Content.vue";
  // import FooterContent from "./Footer.vue";
  
  export default {
    name: 'layout',
    components: {
      HeaderContent,
      MainContent,
      // FooterContent
    }
  }
</script>
