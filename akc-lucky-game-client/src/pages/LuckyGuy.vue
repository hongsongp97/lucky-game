<template>
  <div class="article-page page">
    <div class="title text-center">LUCKY PARTICIPANTS</div>
    <div class="line">
      <hr>
    </div>
    <!-- ####### -->
    <lucky-guy-table></lucky-guy-table>
  </div>
</template>

<script>
import LuckyGuyTable from "../components/lucky-guy-table.vue";

export default {
  components: {
    LuckyGuyTable
  }
};
</script>
