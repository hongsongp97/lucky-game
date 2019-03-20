<template>
  <div>
    <br>
    <div v-if="withTop" class="top-table">
      <span class="text-success">There're the list of lucky participants. Congratulations!:</span>
      <br>
      <br>
      <div
        class="text-info font-italic d-flex justify-content-between align-items-center"
        v-if="userList.length == 0"
      >There're no any participant that was chosen.</div>
    </div>

    <div>
      <table class="table table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">ID</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Show email</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(user, index) in userList" :key="index">
            <td>{{ index + 1 }}</td>
            <td>{{ user.id }}</td>
            <td>{{ user.name }}</td>
            <td class="email">{{ display[index] == true ? user.email : (user.email.substring(0,2) + '•••••••@domain                              ') }}</td>
            <td>
              <svg
                @click="viewEmail(index)"
                id="i-eye"
                viewBox="0 0 32 32"
                width="32"
                height="32"
                fill="none"
                stroke="currentcolor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
              >
                <circle cx="17" cy="15" r="1"></circle>
                <circle cx="16" cy="16" r="6"></circle>
                <path d="M2 16 C2 16 7 6 16 6 25 6 30 16 30 16 30 16 25 26 16 26 7 26 2 16 2 16 Z"></path>
              </svg>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="d-flex justify-content-center">
        <bounce-loader :loading="loading" :size="'50px'"></bounce-loader>
      </div>
      <div
        class="text-info font-italic"
        v-if="userList.length == 0"
      >There aren't any chosen participant.</div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import io from "socket.io-client";
import BounceLoader from "vue-spinner/src/BounceLoader.vue";

import { HOST, HEADER, URL_ALL_LUCKY_USER } from "../js/config";

const socket = io(HOST);

export default {
  props: {
    withTop: Boolean
  },
  components: {
    BounceLoader
  },
  data() {
    return {
      userList: [],
      display: [],
      loading: false
    };
  },
  async created() {
    await this.loadData();
    this.userList.map((ele, index) => {
      this.display[index] = false;
    });
    socket.on("new-lucky-guy", () => {
      this.loadData();
    });
  },
  mounted() {},
  methods: {
    async loadData() {
      this.loading = true;
      await axios.get(URL_ALL_LUCKY_USER, HEADER).then(res => {
        if (res.data.msg == "OK") {
          this.userList = res.data.rows;
          this.loading = false;
        }
      });
    },
    async viewEmail(index) {
      this.display[index] = !this.display[index];
      let tempDisplay = [];
      this.display.map(ele => {
        tempDisplay.push(ele);
      });
      this.display = tempDisplay;
    }
  }
};
</script>
