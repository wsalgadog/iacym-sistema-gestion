<template>
  <div id="app">
    <div id="nav2">
      <b-navbar toggleable="lg" type="dark" variant="info">
        <b-navbar-brand href="#">Sistema de Gestión</b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item href="#"><router-link to="/">Home</router-link></b-nav-item>  
            <b-nav-item href="#"><router-link to="/personas">Miembros</router-link></b-nav-item>
            <b-nav-item href="#"><router-link to="/grupos">Grupos</router-link></b-nav-item>
            
          </b-navbar-nav>
          <b-navbar-nav class="ml-auto">
            <b-nav-item href="#"><router-link to="/about">About</router-link></b-nav-item>
          </b-navbar-nav>
        </b-collapse>     
      </b-navbar>
    </div>
    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-left: 5px;
  margin-right: 5px;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

#nav2 a {
  color:azure;
  text-decoration: none;
}

#nav2 a.router-link-exact-active {
  color:darkslategray
}

</style>
