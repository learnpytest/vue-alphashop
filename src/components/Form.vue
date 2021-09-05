<template>
  <div class="panel form-panel">
    <!-- the form contains a stepper bar and three parts of form which has address, shipment, payment -->
    <Stepper :currentCheckoutForm="currentCheckoutForm" />
    <!-- stepper -->
    <form id="form-control" action="">
      <div class="form__wrapper">
        <div class="form__content">
          <router-view
            :key="$router.currentRoute.path"
            :initCurrentEditFormAddress="currentEditFormAddress"
            :initCurrentEditFormPayment="currentEditFormPayment"
          />
          <!-- address -->
          <!-- shipment -->
          <!-- payment -->
        </div>
      </div>
      <!-- FormButtons.vue -->
      <div
        id="form__button-control"
        :class="[
          'form__button-control',
          { 'display-one-btn': currentCheckoutForm === 'form-address' },
        ]"
      >
        <button
          class="btn form__button-control__button--outline"
          v-show="currentCheckoutForm !== 'form-address'"
          @click.stop.prevent="goPrevCheckoutForm"
        >
          上一步
        </button>

        <button
          class="btn form__button-control__button--primary"
          v-show="currentCheckoutForm !== 'form-payment'"
          @click.stop.prevent="goNextCheckoutForm"
        >
          下一步
        </button>
        <button
          class="btn form__button-control__button--primary last-step"
          v-show="currentCheckoutForm === 'form-payment'"
          @click.stop.prevent="handleSubmit"
        >
          確認下單
        </button>
      </div>
    </form>
  </div>
</template>
<script>
import Stepper from "../components/Stepper.vue";

export default {
  name: "Form",
  components: {
    Stepper,
  },
  data() {
    return {
      currentCheckoutForm: "form-address",
      currentEditFormAddress: {
        appellation: "",
        name: "",
        phone: "",
        email: "",
        city: "",
        address: "",
      },
      currentEditFormShipment: {
        method: "standard",
        fee: 0,
      },
      currentEditFormPayment: {
        cardHolder: "",
        creditCard: "",
        expireDate: "",
        cvcCcv: "",
      },
      formPayload: this.initFormPayload,
    };
  },
  created() {
    this.currentCheckoutForm = this.$router.currentRoute.name;
  },
  methods: {
    goNextCheckoutForm() {
      switch (this.currentCheckoutForm) {
        case "form-address":
          this.currentCheckoutForm = "form-shipment";
          break;
        case "form-shipment":
          this.currentCheckoutForm = "form-payment";
          break;
        default:
          this.currentCheckoutForm = "form-address";
      }
      this.$router.push({ name: this.currentCheckoutForm });
    },
    goPrevCheckoutForm() {
      switch (this.currentCheckoutForm) {
        case "form-shipment":
          this.currentCheckoutForm = "form-address";
          break;
        case "form-payment":
          this.currentCheckoutForm = "form-shipment";
          break;
        default:
          this.currentCheckoutForm = "form-shipment";
      }
      this.$router.push({ name: this.currentCheckoutForm });
    },
    handleSubmit() {
      //將資料整理成JSON先傳送父元件，由父元件打包表單與購物籃資料統一向後端發送API
      this.currentEditFormShipment = { ...this.$store.state.shipping };
      this.formPayload = {
        shipAddress: { ...this.currentEditFormAddress },
        shipMethod: { ...this.currentEditFormShipment },
        paymentMethod: { ...this.currentEditFormPayment },
      };
      this.$emit("handleSubmit", this.formPayload);
    },
  },
};
</script>
<style lang="scss">
@import "../assets/scss/components/_formButton";
@import "../assets/scss/components/_form";
</style>
