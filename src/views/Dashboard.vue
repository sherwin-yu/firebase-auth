<template>
  <div class="dashboard">
    <div class="nav">
      <button @click="logout">Logout</button>
    </div>
    <div class="main">
      <h1>Hello, {{ user.data.displayName }}!</h1>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase';
import { mapGetters } from 'vuex';

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters({
      user: 'user'
    })
  },
  methods: {
    async logout(e) {
      e.preventDefault();
      try {
        await firebase.auth().signOut();
        this.$router.push('/login');
      } catch (err) {
        console.log('err', err);
      }
    }
  }
};
</script>

<style scoped lang="scss">
.nav {
  display: flex;
  flex-flow: row-reverse wrap;
}

.main {
  text-align: center;
}

button {
  border-radius: 20px;
  border: 1px solid #42b983;
  background-color: #42b983;
  color: #ffffff;
  font-size: 12px;
  font-weight: bold;
  padding: 12px 45px;
  letter-spacing: 1px;
  text-transform: uppercase;
  transition: transform 80ms ease-in;
  margin-bottom: 1rem;
  &:hover {
    cursor: pointer;
  }
  &:active {
    transform: scale(0.95);
  }
  &:focus {
    outline: none;
  }
  &.ghost {
    background-color: transparent;
    border-color: #ffffff;
  }
}
</style>
