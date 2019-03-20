<template>
  <div class="content position-relative">
    <div class="particles w-100 h-100">
      <particles
        color="#F08080"
        :particleOpacity="0.8"
        linesColor="#F08080"
        :particlesNumber="80"
        shapeType="circle"
        :particleSize="5"
        :linesWidth="2"
        :lineLinked="true"
        :lineOpacity="0.4"
        :linesDistance="150"
        :moveSpeed="3"
        :hoverEffect="true"
        hoverMode="grab"
        :clickEffect="true"
        clickMode="push"
      ></particles>
    </div>
    <div class="page-wrapper">
      <router-view class="container"></router-view>
    </div>
  </div>
</template>

<script>
import particles from "../components/vue-particles.vue";

export default {
  components: {
    particles
  },
  created() {}
};
</script>
