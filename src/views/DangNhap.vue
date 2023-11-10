<template>
      <AppHeader 
    :session_user="session_user"
    />
     <div class="contaner" id="dangnhap"> 
        <div class="row">
            <div class="col-6">
                <div class="container quangcao">
                    <div class="row">
                        <h1>TRÃI NGHIỆM MUA HÀNG TUYỆT VỜI <br/> VỚI Pet Shop Arch!!</h1>
                    </div>
                    <div class="row">
                        <h4>Kiểm tra hàng đổi trả hoàn phí 100%
                        </h4><h4>Giao hàng nhanh chống, miễn phí ưu đãi cho thành viên mới</h4>
                        <h4>Đăng ký ngay trở thành thành viên mới của Pet Shop Arch để có cở hội tích điểm ưu đãi</h4>
                    </div>
                </div>
            </div>
            <div class="col-6">
            <FormDangNhap
            :user="user"
            @login="login"
            />
        </div>
    </div>
        </div>
        <AppFooter 
    :session_user="session_user"
    />
</template>
<style scoped>

</style>
<script>
 import FormDangNhap from "@/components/FormDangNhap.vue";
 import AppHeader from "@/components/AppHeader.vue";
import AppFooter from "@/components/AppFooter.vue";
import khachhangService from "../services/khachhang.service";
export default {
    components: {
       FormDangNhap,
       AppHeader,
    AppFooter,
    },
    props: ["session_user"],
    data() {
            return {
                user: null
            };
        },
        methods: {
            async login(data) {  // ham goi submit
                try {
                   // gọi login
                   const createdData =  await khachhangService.login(data);
                   if(createdData){
                   await this.$store.commit('setSessionUser', createdData.token)
                   this.message = "Đăng nhập thành công"
                   this.$router.push({ path: "/" });
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