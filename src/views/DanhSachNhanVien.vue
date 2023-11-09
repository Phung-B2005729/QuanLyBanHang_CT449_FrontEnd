<template>
    <div>
      <AppHeaderAdmin :session_admin="session_admin" />
  
  
      <AppFooterAdmin/>
    </div>
  </template>
  
  <script>
  import AppHeaderAdmin from "@/components/AppHeaderAdmin.vue";
  import AppFooterAdmin from "@/components/AppFooterAdmin.vue";
  
  export default {
    components: {
      AppHeaderAdmin,
      AppFooterAdmin,
    },
    props: ["session_admin"],
   
  };
  </script>
  