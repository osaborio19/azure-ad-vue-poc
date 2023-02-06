<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <div v-if="!isAuthenticated" className="p-3 col-12 row text-center">
    <div className="spinner-border main-spinner text-primary center"></div>
    <h3 className="p-3">Intel Developer Cloud Console</h3>
    <p>Authentication process in progress</p>
  </div>
  <HelloWorld  v-if="isAuthenticated" msg="Welcome to Your Vue.js App" :userName="userName" />
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import { PublicClientApplication } from '@azure/msal-browser';
import { InteractionRequiredAuthError } from "@azure/msal-browser";

export default {
  name: 'App',
  data() {
    return {
      userName: "",
      isAuthenticated: false
    }
  },
  components: {
    HelloWorld
  },
  created() {
    this.$msalInstance = new PublicClientApplication(
      this.$store.state.msalConfig,
    );
  },
  async mounted() {

    try {

      const request = {
        scopes: ["User.Read"]
      };

      await this.$msalInstance.ssoSilent(request);

    } catch (error) {
      if (error instanceof InteractionRequiredAuthError) {
        this.$msalInstance.loginPopup()
          .then(res => console.log('res', res))
          .catch(e => console.log('error ', e))
      }
    }

    const accounts = this.$msalInstance.getAllAccounts()

    this.$msalInstance.setActiveAccount(accounts[0])

    this.userName = accounts[0].name

    this.isAuthenticated = true

    console.log('accounts', this.$msalInstance.getActiveAccount())
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
