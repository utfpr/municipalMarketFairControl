<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/> -->

    <a-layout>
      <a-layout-header id="header">Header</a-layout-header>
      <a-layout>
        <a-layout-sider id="sider">
          <ul>
            <li><router-link to="/crud">CRUD</router-link></li>
            <li> <router-link to="/categoria">Categoria</router-link></li>
          </ul>
        </a-layout-sider>
        <a-layout-content>
          <router-view/>
        </a-layout-content>
      </a-layout>
     
    </a-layout>
  </div>
</template>

<style>
#app,
#app .ant-layout {
  height: 100%;
}

#header {
  background-color: lightgray;
}
#sider {
  background-color: gainsboro;
}
</style>
