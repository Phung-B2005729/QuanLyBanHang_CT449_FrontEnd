<template>
         <AppHeader 
    :session_user="session_user"
    />
       <section class="dangky">
            <div class="container">
                <div class="row">
                  <div class="col-6">
                  <FormDangKy
                  @submit:dangky="DangKy"
                  :user="user"
                  ></FormDangKy>
                  </div>

                  <div class="col-6 slide_uudai">
                    <div id="carouselExampleCaptions4" class="carousel slide uudai" data-bs-ride="carousel">
                      <div class="carousel-indicators">
                        <button type="button" data-bs-target="#carouselExampleCaptions4" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                        <button type="button" data-bs-target="#carouselExampleCaptions4" data-bs-slide-to="1" aria-label="Slide 2"></button>
                        <button type="button" data-bs-target="#carouselExampleCaptions4" data-bs-slide-to="2" aria-label="Slide 3"></button>
                      </div>
                      <div class="carousel-inner">
                        <div class="carousel-item active">
                          <img src="src/assets/pet4.png" class="d-block w-100" alt="...">
                          
                        </div>
                        <div class="carousel-item">
                          <img src="src/assets/pet2.jpg" class="d-block w-100" alt="...">
                         
                        </div>
                        <div class="carousel-item">
                          <img src="src/assets/pet1.jpg" class="d-block w-100" alt="...">
                          
                        </div>
                      </div>
                    
                      <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions4" data-bs-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Previous</span>
                      </button>
                      <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions4" data-bs-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Next</span>
                      </button>
                     
                    </div>
                  </div>
                </div>
                
            </div>

        </section>
        <AppFooter 
    :session_user="session_user"
    />
</template>
<script>
import AppHeader from "@/components/AppHeader.vue";
import AppFooter from "@/components/AppFooter.vue";
import FormDangKy from "@/components/FormDangKy.vue";
import khachhangService from "../services/khachhang.service";
  export default {
      components: {
    AppHeader,
    AppFooter,
    FormDangKy
},
props: ["session_user"],
data() {
            return {
                user: null
            };
        },
        methods: {
            async DangKy(data) {  // ham goi submit
                try {
                   // gọi login
                   await khachhangService.create(data);
                   this.message = "Đăng Ký thành công"
                   this.$router.push({ path: "/dangnhap" });
                   
                } catch (error) {
                  if(error.response && error.response.status === 404){
                        alert('Số điện thoại đã được sử dụng.')
                    }
                    else{
                        alert('Lỗi dữ liệu, Xin vui lòng thử lại')
                    }
                }
            },
        },
}
</script>
<style>

</style>
