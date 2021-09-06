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
      <!-- StepButtons.vue -->
      <StepButtons @submit="submited" :initCurrentStep="currentStep" />
    </form>
  </div>
</template>
<script>
import Stepper from "../components/Stepper.vue";
import StepButtons from "../components/StepButtons.vue";

export default {
  name: "Form",
  components: {
    Stepper,
    StepButtons,
  },
  data() {
    return {
      currentStep: this.$router.currentRoute.name,
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
  watch: {
    $route() {
      this.currentStep = this.$router.currentRoute.name;
    },
  },
  methods: {
    submited() {
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
