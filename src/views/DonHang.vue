<template>
    <div>
      <AppHeader :session_user="session_user" />
  
  
      <AppFooter :session_user="session_user" />
    </div>
  </template>
  
  <script>
  import AppHeader from "@/components/AppHeader.vue";
  import AppFooter from "@/components/AppFooter.vue";
  
  export default {
    components: {
      AppHeader,
      AppFooter,
    },
    props: ["session_user"],
   
  };
  </script>
  