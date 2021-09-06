<template>
  <div id="stepper-control" class="panel stepper-panel">
    <div class="wrapper stepper-panel__stepper-wrapper justify-content-between">
      <div
        :class="['step', 'active', { checked: currentStep !== 'form-address' }]"
      >
        <div class="circle-container"></div>
        <span class="step__label">寄送地址</span>
      </div>
      <div
        :class="[
          'step',
          { active: currentStep === 'form-shipment' },
          { checked: currentStep === 'form-payment' },
        ]"
      >
        <div class="circle-container"></div>
        <span class="step__label label-container">運送方式</span>
        <span class="connect-line"></span>
      </div>
      <div :class="['step', { active: currentStep === 'form-payment' }]">
        <div class="circle-container"></div>
        <span class="step__label label-container">付款資訊</span>
        <span class="connect-line"></span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Stepper",
  props: {
    currentStep: {
      type: String,
      default: "form-address",
    },
  },
};
</script>
<style lang="scss">
@import "../assets/scss/components/_stepper.scss";
</style>
