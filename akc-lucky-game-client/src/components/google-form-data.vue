<template>
  <div>
    <br>
    <span v-if="userList.length > 0" class="text-success">
      There're participant responded to the
      <a
        href="https://docs.google.com/forms/d/e/1FAIpQLSfhSV4qKH7rRo8ON8u-9AUbYFaxlBRXWBpJU5qxqsUyfkBv2w/alreadyresponded?fbclid=IwAR3giABKPNvYVzCeGF5o-hJIGZVjEcXHa-4kMDz2iBVbNyrpRIGW1zkNcSk"
      >Google Form</a>:
    </span>

    <div
      class="text-success font-italic d-flex justify-content-between align-items-center"
      v-if="userList.length == 0"
    >
      <span>
        There aren no any loaded response.
        Do you want to load response from
        <a
          href="https://docs.google.com/forms/d/e/1FAIpQLSfhSV4qKH7rRo8ON8u-9AUbYFaxlBRXWBpJU5qxqsUyfkBv2w/alreadyresponded?fbclid=IwAR3giABKPNvYVzCeGF5o-hJIGZVjEcXHa-4kMDz2iBVbNyrpRIGW1zkNcSk"
        >Google Form</a>?
      </span>
      <button class="btn btn-primary" @click="loadData()">Load Responses</button>
    </div>
    <div
      class="text-info font-italic d-flex justify-content-between align-items-center"
      v-if="!isExported && userList.length > 0"
    >Do you want to export participants to Akachain?
      <sync-loader :loading="loading2" :color="'green'" :size="'8px'"></sync-loader>
      <button class="btn btn-primary" @click="exportData()">Export to Akachain</button>
    </div>
    <br>
    <div>
      <table class="table table-striped">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">DateTime</th>
            <th scope="col">Email</th>
            <th scope="col">Show email</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(user, index) in userList" :key="index">
            <td>{{user.name}}</td>
            <td>{{user.time}}</td>
            <td
              class="email"
            >{{ display[index] == true ? user.email : user.email.substring(0,2) + '•••••••@domain                              ' }}</td>
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
        <ring-loader :loading="loading1" :size="'50px'"></ring-loader>
      </div>
      <div class="text-info font-italic" v-if="userList.length == 0">Haven't load data yet.</div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import SyncLoader from "vue-spinner/src/SyncLoader.vue";
import RingLoader from "vue-spinner/src/RingLoader.vue";

import { HEADER, URL_GOOGLE_FORM_DATA, URL_EXPORT_DATA } from "../js/config";

export default {
  components: {
    SyncLoader,
    RingLoader
  },
  data() {
    return {
      userList: [],
      isExported: false,
      loading1: false,
      loading2: false,
      display: []
    };
  },
  methods: {
    async loadData() {
      this.loading1 = true;
      await axios.get(URL_GOOGLE_FORM_DATA, HEADER).then(res => {
        if (res.data.data != null) {
          this.userList = res.data.data;
          this.userList.map((ele, index) => {
            this.display[index] = false;
          });
          this.loading1 = false;
        }
      });
    },
    async exportData() {
      this.loading2 = true;
      await axios.get(URL_EXPORT_DATA, HEADER).then(res => {
        if (res.data.data != null) {
          // eslint-disable-next-line
          console.log("Exported to akachain");
          this.isExported = true;
          this.loading2 = false;
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
