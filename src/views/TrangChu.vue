<template>
  <div>
    <AppHeader :session_user="session_user" />
    <main>
      <section class="container">
            <div class="row st1">
              <div class="col-lg-3 col-md-6 col-sm-12">
                    <div class="d-flex align-items-center st1border " >
                      <router-link :to="{ name: 'trangchu' }" class="navbar-brand logo">
          <img src="@/assets/images.png" alt="Pet Shop" width="80" height="80">
          
        </router-link>
      
          <h2 class="font-weight-semi-bold ">Pet Shop Arch <br/>Xin Chào</h2>
          
                
                    </div>
                </div>
                <div class="col-lg-3 col-md-6 col-sm-12 mt-3">
                    <div class="d-flex align-items-center st1border" >
                        <h2 class="fa fa-shipping-fast  "></h2>
                        <h5 class="font-weight-semi-bold "> Miễn phí giao hàng</h5>
                    </div>
                </div>
                <div class="col-lg-3 col-md-6 col-sm-12 mt-3">
                    <div class="d-flex align-items-center st1border " >
                        <h2 class="fas fa-exchange-alt  "></h2>
                        <h5 class="font-weight-semi-bold "> Đổi hàng trong 7 ngày</h5>
                    </div>
                </div>
                <div class="col-lg-3 col-md-6 col-sm-12 mt-3">
                    <div class="d-flex align-items-center st1border" >
                        <h2 class="fa fa-phone-volume "></h2>
                        <h5 class="font-weight-semi-bold "> Hỗ trợ 24/7</h5>
                    </div>
                </div>
            </div>
        </section>

    </main>
   

    <AppFooter :session_user="session_user" />
  </div>
</template>

<script>
import AppHeader from "@/components/AppHeader.vue";
import AppFooter from "@/components/AppFooter.vue";
import hinhanhService from "../services/hinhanh.service";

export default {
  components: {
    AppHeader,
    AppFooter,
  },
  data() {
    return {
     
    };
  },
  props: ["session_user"],
  methods: {

  },
};
</script>
