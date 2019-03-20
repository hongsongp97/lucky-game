<template>
  <div>
    <br>
    <div class="d-flex justify-content-center">
      <div class="box-wrapper row">
        <div class="col box d-flex justify-content-center align-items-center">
          <div class="number">
            <animated-number
              :value="number[0]"
              :formatValue="formatToSingle"
              :round="0"
              :duration="500"
            ></animated-number>
          </div>
        </div>
        <div class="col box d-flex justify-content-center align-items-center">
          <div class="number">
            <animated-number
              :value="number[1]"
              :formatValue="formatToSingle"
              :round="0"
              :duration="700"
            ></animated-number>
          </div>
        </div>
        <div class="col box d-flex justify-content-center align-items-center">
          <div class="number">
            <animated-number
              :value="number[2]"
              :formatValue="formatToSingle"
              :round="0"
              :duration="900"
            ></animated-number>
          </div>
        </div>
        <div class="col box d-flex justify-content-center align-items-center">
          <div class="number">
            <animated-number
              :value="number[3]"
              :formatValue="formatToSingle"
              :round="0"
              :duration="1100"
            ></animated-number>
          </div>
        </div>
        <div class="col box d-flex justify-content-center align-items-center">
          <div class="number">
            <animated-number
              :value="number[4]"
              :formatValue="formatToSingle"
              :round="0"
              :duration="1500"
            ></animated-number>
          </div>
        </div>
        <div class="col box d-flex justify-content-center align-items-center">
          <div class="number">
            <animated-number
              :value="number[5]"
              :formatValue="formatToSingle"
              :round="0"
              :duration="2000"
            ></animated-number>
          </div>
        </div>
      </div>
    </div>
    <br>
    <div class="text-center">
      <button :disabled="isDisable" @click="randomUser()" class="btn btn-primary random-btn">Random</button>
    </div>
    <br>
  </div>
</template>

<script>
import axios from "axios";
import AnimatedNumber from "animated-number-vue";

import { HEADER, URL_RANDOM_USER, URL_ALL_LUCKY_USER } from "../js/config";

export default {
  components: {
    AnimatedNumber
  },
  data() {
    return {
      user: null,
      number: [0, 0, 0, 0, 0, 0],
      isDisable: false
    };
  },
  methods: {
    async randomUser() {
      this.isDisable = true;
      let userList = await axios.get(URL_ALL_LUCKY_USER, HEADER);
      let multi = userList.data.rows.length;
      if (multi >= 6) {
        let cf = await this.openPopupWarning();
        if (!cf.value) {
          this.isDisable = false;
          return;
        }
      }
      await axios.get(URL_RANDOM_USER, HEADER).then(res => {
        if (res.data.msg == "OK") {
          this.user = res.data.rows;
          let digits = [];
          for (var i = 0; i < 6; i++) {
            digits.push((multi+1) * 2 + "0" + this.user.id.charAt(i));
          }
          this.number = digits;
          setTimeout(() => {
            this.openPopupCongrats();
            this.isDisable = false;
          }, 2000);
        } else {
          this.openPopupLimited();
          this.isDisable = false;
        }
      });
    },
    formatToSingle(value) {
      return value % 10;
    },
    async openPopupWarning() {
      return await this.$swal.fire({
        type: "question",
        title: "Continue random?",
        text:
          "You have chosen enough participants already. Do you want to choose more?",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, random one more!"
      });
    },
    openPopupLimited() {
      this.$swal.fire({
        type: "error",
        title: "Oops...",
        text: "The chosen Participants reached limited!",
        footer: "Please contact to admin for more information."
      });
    },
    openPopupCongrats() {
      this.$swal.fire({
        title: `Congrats ${this.user.id}!!!`,
        text: `${this.user.name}`,
        animation: false,
        customClass: {
          popup: "animated tada"
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.box-wrapper {
  width: 70%;
  .box {
    margin: 0 6px;
    height: 150px;
    background: white;
    border: 1px solid #777;
    border-radius: 5px;
    .number {
      width: 40px;
      overflow: hidden;
    }
  }
}
.random-btn {
  &:hover {
    background-color: #ffa500;
    border-color: white;
    box-shadow: 2px 2px 5px lightsalmon;
    transform: translateY(-1px);
  }
}
</style>
