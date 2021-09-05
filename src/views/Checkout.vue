<template>
  <main id="main-content" style="padding: 0 10%">
    <div class="stepper-panel__title">結帳</div>
    <!-- Stepper.vue -->
    <!-- <Stepper /> -->
    <!-- Form -->
    <div class="content-wrapper">
      <Form @handleSubmit="afterHandleSubmit" />
      <!-- Chart -->
      <Chart
        :isFormSubmited="isFormSubmited"
        @afterFormSubmited="afterFormSubmited"
      />
      <div>
        <b-modal id="showResults" title="Purchase order">
          <pre class="my-4">{{ results.shipInfo }}</pre>
          <pre class="my-4">{{ results.goodsInCart }}</pre>
        </b-modal>
      </div>
    </div>
  </main>
</template>
<script>
import Form from "../components/Form.vue";
import Chart from "../components/Chart.vue";

export default {
  name: "Checkout",
  components: {
    // Stepper,
    Form,
    Chart,
  },
  data() {
    return {
      results: { shipInfo: {}, goodsInCart: [] },
      isFormSubmited: false,
    };
  },
  methods: {
    afterHandleSubmit(payload) {
      this.isFormSubmited = true;
      this.results.shipInfo = { ...payload };
    },
    afterFormSubmited(payload) {
      this.results.goodsInCart = [payload.goods];
      this.$bvModal.show("showResults");
      this.isFormSubmited = false;
    },
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/scss/abstracts/_mixins";

@include desktop {
  .content-wrapper {
    padding-top: 3em;
    display: flex;
    justify-content: center;
  }
}
</style>
