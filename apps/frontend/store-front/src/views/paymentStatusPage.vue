<template>
  <div v-if="paymentStatus" class="py-10 d-flex justify-center align-center">
    <div
      class="d-flex flex-column justify-center align-center"
      v-if="paymentStatus == 'succeeded'"
    >
      <lottie-player
        v-if="paymentStatus == 'succeeded'"
        src="https://assets5.lottiefiles.com/packages/lf20_uqjdfmt5.json"
        background="transparent"
        speed="1"
        style="width: 300px; height: 300px"
        autoplay
      ></lottie-player>
      <p class="text-h5 py-6 font-weight-bold grey--text">
        Payment Successfull . Order Fullfilment in Progress .
      </p>
    </div>

    <div
      class="d-flex flex-column justify-center align-center"
      v-else-if="paymentStatus == 'processing'"
    >
      <lottie-player
        v-if="paymentStatus == 'processing'"
        src="https://assets10.lottiefiles.com/datafiles/SOR469Hz9YCOk8z/data.json"
        background="transparent"
        speed="0.3"
        style="width: 300px; height: 300px"
        loop
        autoplay
      ></lottie-player>
      <p class="text-h5 py-6 font-weight-bold grey--text">
        processing your payment .
      </p>
    </div>

    <div
      class="d-flex flex-column justify-center align-center"
      v-else-if="paymentStatus == 'requires_payment_method'"
    >
      <lottie-player
        src="https://assets7.lottiefiles.com/packages/lf20_xw6o0yii.json"
        background="transparent"
        speed="1"
        style="width: 300px; height: 300px"
        autoplay
      ></lottie-player>
      <p class="text-h5 py-6 font-weight-bold grey--text">
        Your payment was not successful, please try again.
      </p>
    </div>

    <div class="d-flex flex-column justify-center align-center" v-else>
      <lottie-player
        src="https://assets7.lottiefiles.com/packages/lf20_xw6o0yii.json"
        background="transparent"
        speed="1"
        style="width: 300px; height: 300px"
        autoplay
      ></lottie-player>
      <p class="text-h5 py-6 font-weight-bold grey--text">
        Your payment was not successful, Some Thing WEnt Wong
      </p>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    this.includeStripe(
      "js.stripe.com/v3/",
      function () {
        this.initStripe();
        this.fetchPaymentStatus();
      }.bind(this)
    );
  },
  data() {
    return {
      stripe: null,
      paymentStatus: null,
    };
  },
  computed: {
    clientSecret() {
      return new URLSearchParams(window.location.search).get(
        "payment_intent_client_secret"
      );
    },
  },
  methods: {
    sleep(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    },
    includeStripe(URL, callback) {
      let documentTag = document,
        tag = "script",
        object = documentTag.createElement(tag),
        scriptTag = documentTag.getElementsByTagName(tag)[0];
      object.src = "//" + URL;
      if (callback) {
        object.addEventListener(
          "load",
          function (e) {
            callback(null, e);
          },
          false
        );
      }
      scriptTag.parentNode.insertBefore(object, scriptTag);
    },

    initStripe() {
      this.stripe = window.Stripe("pk_test_Jv6wYlXEfjDe5XS5C2MpqEuR00xUQo6Buk");
    },

    async fetchPaymentStatus() {
      let clientSecret = this.clientSecret;
      if (!clientSecret) {
        return;
      }

      const { paymentIntent } = await this.stripe.retrievePaymentIntent(
        clientSecret
      );
      // this.paymentStatus=paymentIntent.status
      this.paymentStatus = "processing";
      await this.sleep(5000);
      this.paymentStatus = "succeeded";
      // this.paymentStatus="requires_payment_method"
      switch (paymentIntent.status) {
        // case "succeeded":
        // // this.paymentStatus= "Payment succeeded!"
        // break;
        case "processing":
          // this.paymentStatus= "Your payment is processing.";
          await this.sleep(500);
          await this.fetchPaymentStatus();
          break;
        // case "requires_payment_method":
        // // this.paymentStatus= "Your payment was not successful, please try again.";
        // break;
        // default:
        // // this.paymentStatus="Something went wrong.";
        // break;
      }
    },
  },
};
</script>

<style>
.root {
  height: 100vh;
}
</style>
