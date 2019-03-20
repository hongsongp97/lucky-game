<template>
  <div class="header" :style="style">
    <div class="container h-100 d-flex align-items-center">
      <div class="left-wrapper d-flex mr-auto">
        <a href="http://akachain.io" target="_blank">
          <img src="../assets/logo.png" width="55" height="45" alt>
        </a>
      </div>

      <div class="center-wrapper d-flex align-items-end">
        <ul class="nav">
          <li class="nav-item">
            <router-link to="/dashboard" class="nav-link">Dashboard</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/participant" class="nav-link">Participant</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/lucky-guy" class="nav-link">Lucky Participants</router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      style:
        "background: linear-gradient(to right, rgba(255, 248, 220, 1), rgba(250, 250, 250, 1), rgba(210, 180, 140, 1))"
    };
  },
  created() {
    this.handleScroll();
    window.addEventListener("scroll", this.handleScroll);
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    handleScroll() {
      let offsetTop = window.pageYOffset;
      if (offsetTop <= 100) {
        this.style =
          "background: linear-gradient(to right, rgba(255, 248, 220, " +
          offsetTop / 100 +
          "), rgba(250, 250, 250, " +
          offsetTop / 100 +
          "), rgba(210, 180, 140, " +
          offsetTop / 100 +
          "))";
      } else {
        this.style =
          "background: linear-gradient(to right, rgba(255, 248, 220, 1), rgba(250, 250, 250, 1), rgba(210, 180, 140, 1))";
      }
    }
  }
};
</script>
