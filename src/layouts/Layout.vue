<template lang="">
    <div class="layout">
        <div>
            <b-navbar toggleable="lg" type="dark" variant="light">
                <b-navbar-brand href="/">
                   <b-img
                    class="logo"
                    :src="logo"
                    alt="Login img"
                   />
                </b-navbar-brand> 
                <!-- Right aligned nav items -->
                  <b-navbar-nav class="ml-auto user-dropdown">
                    <b-nav-item-dropdown right toggle-class="d-flex align-items-center dropdown-user-link">
                      <!-- Using 'button-content' slot -->
                      <template #button-content>
                        <div class="d-sm-flex d-none user-nav">
                          <p class="user-name font-weight-bolder mb-0">
                            {{ "Admin" }}
                          </p>
                          <span class="user-status">{{ "admin" }}</span>
                        </div>
                        <b-avatar
                          size="40"
                          :src="avatar"
                          variant="light-primary"
                          badge
                          class="badge-minimal"
                          badge-variant="success"
                        >
                          <!-- <feather-icon
                            v-if="!userData.fullName"
                            icon="UserIcon"
                            size="22"
                          /> -->
                        </b-avatar>
                      </template>
                       <b-dropdown-item
                        link-class="d-flex align-items-center"
                      >
                        <feather-icon
                          size="16"
                          icon="UserIcon"
                          class="mr-50"
                        />
                        <span>Profile</span>
                      </b-dropdown-item>
                      <b-dropdown-divider />
                     <b-dropdown-item
                        link-class="d-flex align-items-center"
                        @click="$router.push({name:'auth-login'})"
                      >
                        <feather-icon
                          size="16"
                          icon="LogOutIcon"
                          class="mr-50"
                        />
                        <span>Logout</span>
                      </b-dropdown-item>
                     </b-nav-item-dropdown>
                  </b-navbar-nav>
            </b-navbar>
        </div>
         <div class="search-modal" @click="closeSearch" v-if="searchProcess&&!config.SEARCH_BUTTON" />
        <div class="content">
          <div class="menu-bar">
            <vertical-menu/>
          </div>
         <div class="page-content">
            <slot></slot>
         </div>
        </div>
    </div>
</template>
<script lang="ts">
import {
  BNavbar,
  BNavItemDropdown,
  BDropdownItem,
  BNavbarBrand,
  BImg,
  BAvatar,
  BDropdownDivider
} from "bootstrap-vue";
import { Component, Vue } from "vue-property-decorator";
// import searchDataMixin from "@core/mixins/searchDataMixin";
// import configMixin from "@core/mixins/configMixin"
import VerticalMenu from "./vertical-nav/VerticalMenu.vue"
import {PageModule} from "@/store/modules/page"
@Component({
components:{
    BNavbar,
    BNavbarBrand,
    BNavItemDropdown,
    BDropdownItem,
    BImg,
    BAvatar,
    BDropdownDivider,
    VerticalMenu
},

})
export default class Layout extends Vue {
  logo= require("@/assets/logo.png")
  avatar= require("@/assets/imgs/avatar.jpeg")
  get searchProcess(){
    return PageModule.searchProcess
  }
  closeSearch() {
     PageModule.updateProcess(false)
  }
  get config(){
    return  this.$store.state.config.data
    }
    created() {
      PageModule.getQuestionsFaq()
    }
  }
</script>
<style lang="scss">
.layout {
  height: 100%;
  position: relative;
  .logo {
    height: 50px;
  }
  .branch-name {
    color: black;
    font-weight: 600;
  }
  .badge-success {
    background: #28c76f;
    min-width: 10px !important;
    min-height: 10px !important;
  }
  .user-nav {
    display: flex;
    justify-content: center;
    justify-items: center;
    flex-direction: column;
    color: #6e6b7b;
    line-height: 1.3;
    margin-right: 0.5rem;
    .user-name {
      font-weight: 500;
      color: #6e6b7b;
    }
    .user-status {
      font-size: 12px;
    }
  }
  .user-dropdown{
    .dropdown-item{
      font-size:14px;
      color:#6e6b7b
    }
  }
  .search-modal {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left:0;
  background: rgba(44, 42, 41, 0.2);
}
.content{
display: flex;
flex-direction: row;
height: calc(100% - 60px);
.menu-bar{
  width: 260px;
   box-shadow: 0 0 15px 0 rgba(34, 41, 47, 0.1);
   height: 100%;
   max-height: 100%;
}
.page-content{
  flex: 1;
  max-width: 1280px;
  margin: auto;
  padding: 30px 20px;
  height: 100%;
  max-height: 100%;
  overflow: auto;
}
}
}

@media (max-width: 768px) {
  .page-content {
    padding: 10px 10px;
  }
}
</style>