<template>
  <div class="about">
    <h1>Sign In</h1>
    <form>
      <label>Email</label>
      <input type="email" name="email" placeholder="EMAIL" required />

      <label>Password</label>
      <input type="password" name="password" placeholder required />
      <button type="submit">Log In</button>
      <div>
        <a href="#">Forgot password?</a>
      </div>
      <div>
        New?
        <a href="#">Sign up now</a>
      </div>
    </form>
  </div>
</template>

<style scoped lang="scss">
input {
  display: block;
  margin: 0 auto;
  height: 40px;
  width: 250px;
  margin-bottom: 1rem;
  border: 1px solid lightgray;
  border-radius: 3px;
}

button {
  height: 40px;
  width: 125px;
  font-size: 16px;
  border: 1px solid transparent;
  border-radius: 20px;
  padding: 8px 5px;
  background-color: #42b983;
  color: white;
  margin-bottom: 1rem;
}
</style>
