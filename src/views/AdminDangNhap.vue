<template>
<header>
  <nav id="menu" class="navbar navbar-expand-lg">
  <div class="container-fluid">
    <router-link :to="{ name: 'admin' }" class="navbar-brand logo">
            <img src="@/assets/images.png" alt="Pet Shop" width="80" height="80">
          </router-link>
      <button class="navbar-toggler icon-tab" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse col-6" id="navbarSupportedContent">
       <h2>Xin Chào Admin</h2>
      </div>
  </div>
  </nav>
  </header>
  <main>
    <div class="contaner" id="dangnhap"> 
        <div class="row">
            <div class="col-6">
                <div class="container quangcao">
                    <div class="row">
                        <h1>Quản Lý Cửa Hàng <br/> </h1>
                    </div>
                    <div class="row">
                        <h4>Pet Shop Arch!!</h4>
                        <h4>Vui lòng đăng nhập</h4>
                        <h4></h4>
                    </div>
                </div>
            </div>
            <div class="col-6">
            <FormDangNhapAdmin
            :admin="admin"
            @login="login"
            />
        </div>
    </div>
        </div>
  </main>
  <AppFooterAmin/>
</template>
<style>
 @import "@/assets/stype.css"; 
 .lkfooter .copy{
  margin-left: 2rem;
  margin-top: 1rem;
    color: rgb(57, 55, 55);
    margin-bottom: 6rem;
   
}
</style>
<script>
import FormDangNhapAdmin from "@/components/FormDangNhapAdmin.vue";
 import AppFooterAmin from "@/components/AppFooterAdmin.vue"; 
import nhanvienService from "../services/nhanvien.service";
export default {
    components: {
       FormDangNhapAdmin,
       AppFooterAmin,
   
    },
    props: ["session_admin"],
    data() {
            return {
                admin: null
            };
        },
        methods: {
            async login(data) {  // ham goi submit
                try {
                   // gọi login
                   const createdData =  await nhanvienService.login(data);
                   if(createdData){
                   await this.$store.commit('setSessionAdmin', createdData.token);
                   this.message = "Đăng nhập thành công"
                   this.$router.push({ path: "/admin" });
                   console.log(createdData.message);
                }
                } catch (error) {
                    
                    if(error.response && error.response.status === 404){
                        alert('Số điện thoại hoặc password của bạn không chính xác')
                    }
                    else{
                        alert('Lỗi dữ liệu, xin vui lòng thử lại')
                    }
                }
            },
        },
}
</script>