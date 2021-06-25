<template>
  <div>
    <!-- Nav bar -->
    <nav class="navbar navbar-dark bg-primary justify-content-between flex-nowrap flex-row">
      <div class="container">
        <router-link class="navbar-brand float-left" to="/"><img src="@/assets/logos/logo_black_transparent.png" class="imgNavbar"/></router-link>
        <ul class="nav navbar-nav flex-row float-right">
          <li class="nav-item">
            <router-link class="nav-link pr-3" to="/editArticle/0">Creer un Menu</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link pr-3" to="/editArticle/0">Creer un article</router-link>
          </li>
                    <li class="nav-item">
            <router-link class="nav-link pr-3" to="/viewArticle">Voir mes articles</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/login">Se connecter</router-link>
          </li>
        </ul>
      </div>
    </nav>

    <!-- Router view -->
    <div class="container mt-5">
      <router-view></router-view>
    </div>
  </div>
</template>
<style >
.imgNavbar {
  width: 80px;

}
</style>