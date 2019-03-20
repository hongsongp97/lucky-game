<template>
  <div class="participant-page page">
    <div class="title text-center">PARTICIPANTS</div>
    <div class="line">
      <hr>
    </div>
    <!-- ####### -->
    <ul class="nav nav-tabs">
      <li class="nav-item">
        <a class="nav-link active" data-toggle="tab" href="#menu1">Imported on Blockchain</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" data-toggle="tab" href="#menu2">Google Form Response</a>
      </li>
    </ul>

    <div class="tab-content bg-white p-3">
      <div id="menu1" class="tab-pane fade-in active">
        <participant-table :withTop=true></participant-table>
      </div>
      <div id="menu2" class="tab-pane fade">
        <google-form-data :withTop=true></google-form-data>
      </div>
    </div>
  </div>
</template>

<script>
import GoogleFormData from "../components/google-form-data.vue";
import ParticipantTable from "../components/participant-table.vue";

export default {
  components: {
    GoogleFormData,
    ParticipantTable
  }
};
</script>

<style lang="scss" scoped>
.nav-tabs .nav-link.active {
  font-weight: 600;
}
.nav-link {
  color: black;
}
</style>
