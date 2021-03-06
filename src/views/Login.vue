<template>
  <div class="container-wrapper">
    <div class="container" :class="{ 'right-panel-active': isActive }">
      <div class="form-container sign-up-container">
        <form @submit="signUp">
          <h1>Sign up</h1>
          <input type="text" placeholder="Name" v-model="signUpForm.name" required />
          <input type="email" placeholder="Email" v-model="signUpForm.email" required />
          <input type="password" placeholder="Password" v-model="signUpForm.password" required />
          <button type="submit">Sign Up</button>
          <div v-if="error">{{ error }}</div>
        </form>
      </div>
      <div class="form-container sign-in-container">
        <form @submit="signIn">
          <h1>Sign in</h1>
          <input type="email" placeholder="Email" v-model="signInForm.email" required />
          <input type="password" placeholder="Password" v-model="signInForm.password" required />
          <button type="submit">Sign In</button>
          <div v-if="error">{{ error }}</div>
          <a href="#">Forgot password?</a>
        </form>
      </div>
      <div class="overlay-container">
        <div class="overlay">
          <div class="overlay-panel overlay-left">
            <h1>Already have an account?</h1>
            <p>Sign in instead</p>
            <button class="ghost" @click="toggleOverlay">Sign In</button>
          </div>
          <div class="overlay-panel overlay-right">
            <h1>Hello!</h1>
            <p>Enter your personal details and start your journey with us</p>
            <button class="ghost" @click="toggleOverlay">Sign Up</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase';

export default {
  name: 'Login',
  data() {
    return {
      signUpForm: {
        name: '',
        email: '',
        password: ''
      },
      signInForm: {
        email: '',
        password: ''
      },
      error: null,
      isActive: false
    };
  },
  methods: {
    toggleOverlay() {
      this.isActive = !this.isActive;
    },
    async signUp(e) {
      const { name, email, password } = this.signUpForm;
      e.preventDefault();
      try {
        const response = await firebase.auth().createUserWithEmailAndPassword(email, password);
        await response.user.updateProfile({ displayName: name });
      } catch (err) {
        console.log('err', err);
        this.error = err.message;
      }
    },
    async signIn(e) {
      const { email, password } = this.signInForm;
      e.preventDefault();
      try {
        await firebase.auth().signInWithEmailAndPassword(email, password);
        this.$router.push('/');
      } catch (err) {
        this.error = err.message;
      }
    }
  }
};
</script>

<style scoped lang="scss">
form {
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 50px;
  height: 100%;
  text-align: center;
}

input {
  background-color: #eee;
  border: none;
  padding: 12px 15px;
  margin-bottom: 1rem;
  width: 100%;
}

a {
  text-decoration: none;
  color: #304455;
  &:hover {
    text-decoration: underline;
  }
}

.container-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 90vh;
}

.container {
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  position: relative;
  overflow: hidden;
  width: 768px;
  max-width: 100%;
  min-height: 480px;
}

.form-container {
  position: absolute;
  top: 0;
  height: 100%;
  transition: all 0.6s ease-in-out;
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

.sign-in-container {
  left: 0;
  width: 50%;
  z-index: 2;
}

.container.right-panel-active .sign-in-container {
  transform: translateX(100%);
}

.sign-up-container {
  left: 0;
  width: 50%;
  opacity: 0;
  z-index: 1;
}

.container.right-panel-active .sign-up-container {
  transform: translateX(100%);
  opacity: 1;
  z-index: 5;
  animation: show 0.6s;
}

@keyframes show {
  0%,
  49.99% {
    opacity: 0;
    z-index: 1;
  }

  50%,
  100% {
    opacity: 1;
    z-index: 5;
  }
}

.overlay-container {
  position: absolute;
  top: 0;
  left: 50%;
  width: 50%;
  height: 100%;
  overflow: hidden;
  transition: transform 0.6s ease-in-out;
  z-index: 100;
}

.container.right-panel-active .overlay-container {
  transform: translateX(-100%);
}

.overlay {
  background: #42b983;
  background: -webkit-linear-gradient(to right, #304455, #42b983);
  background: linear-gradient(to right, #304455, #42b983);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 0 0;
  color: #ffffff;
  position: relative;
  left: -100%;
  height: 100%;
  width: 200%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
}

.container.right-panel-active .overlay {
  transform: translateX(50%);
}

.overlay-panel {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 40px;
  text-align: center;
  top: 0;
  height: 100%;
  width: 50%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
}

.overlay-left {
  transform: translateX(-20%);
}

.container.right-panel-active .overlay-left {
  transform: translateX(0);
}

.overlay-right {
  right: 0;
  transform: translateX(0);
}

.container.right-panel-active .overlay-right {
  transform: translateX(20%);
}

.social-container {
  margin: 20px 0;
}

.social-container a {
  border: 1px solid #dddddd;
  border-radius: 50%;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  margin: 0 5px;
  height: 40px;
  width: 40px;
}
</style>
