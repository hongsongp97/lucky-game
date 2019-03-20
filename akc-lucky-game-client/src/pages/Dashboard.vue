<template>
  <div class="dashboard-page page">
    <div class="title text-center">BLOCKCHAIN KNOWLEDGE SHARING</div>
    <div class="line">
      <hr>
    </div>
		<!-- ####### -->
		<br>
    <div class="sub-title text-center">FIND LUCKY PARTICIPANTS</div>
		<random-participant></random-participant>
    <!-- ####### -->
		<br>
    <div class="sub-title text-center">LUCKY PARTICIPANTS</div>
    <lucky-guy-table></lucky-guy-table>
    <!-- ####### -->
		<br>
    <div class="sub-title text-center">LIST OF PARTICIPANT</div>
    <participant-table></participant-table>
  </div>
</template>

<script>
import RandomParticipant from "../components/random-participant.vue";
import ParticipantTable from "../components/participant-table.vue";
import LuckyGuyTable from "../components/lucky-guy-table.vue";

export default {
  components: {
		RandomParticipant,
    ParticipantTable,
    LuckyGuyTable
  }
};
</script>
