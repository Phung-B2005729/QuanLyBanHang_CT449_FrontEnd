<template>
  <div>
    <AppHeader :session_user="session_user" />
    <main>
      <div id="hd3">
            <div class="row">
                <div class="col-3 " id="danhmuc">
                  <div class="col-lg-3 col-md-6 col-sm-12">
                    <div class="d-flex align-items-center st1border " >
                      <router-link :to="{ name: 'trangchu' }" class="navbar-brand logo">
                        <img src="@/assets/images.png" alt="Pet Shop" width="80" height="80">
                        
                      </router-link>
                    
                        <h2 class="font-weight-semi-bold shoptext">Pet Shop Arch</h2>    
                    </div>
                </div>
                </div>
                <!-- banner + dieu huong -->
                <div class="col-9 container">
                    <!-- banner -->
                    <div  class="row" id="banner">
                        <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
                            <div class="carousel-inner">
                              <div class="carousel-item active" id="anhbanner">
                                <img src="@/assets/pet4.png" class="d-block w-100" alt="carousel-1">
                                <div class="text">
                                    <p>PET SHOP ARCH</p>
                                    <h2>Thương hiệu hàng đầu dành cho thú cưng</h2>
                                </div>
                              </div>
                              <div class="carousel-item" id="anhbanner">
                                <img src="@/assets/pet1.jpg" class="d-block w-100" alt="carousel-2">
                                <div class="text">
                                    <p>Pet Shop ưu đãi!!</p>
                                    <h2>Ưu đãi lớn cho đơn hàng đầu tiên</h2>
                                </div>
                              </div>
                              <div class="carousel-item" id="anhbanner">
                                <img src="@/assets/pet2.jpg" class="d-block w-100" alt="carousel-3">
                                <div class="text">
                                    <p>Thương Hiệu Hàng Đầu Dành Cho Thú Cưng</p>
                                    <h2>Pet Shop Uy tính, Chất lượng, Đảm bảo đổi trả 100%</h2>
                                </div> 
                            </div>
                            </div>
                            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                              <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                              <span class="visually-hidden">Previous</span>
                            </button>
                            <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                              <span class="carousel-control-next-icon" aria-hidden="true"></span>
                              <span class="visually-hidden">Next</span>
                            </button>
                          </div>
                    </div>
                    <div class="row st1">
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
            </div>
                </div>
               
      </div>
      <div class="container"  v-for="(loaihang) in this.listloaihang.slice(0, 3)" :key="loaihang._id">
        <div class="container" id="phancach">
            <div id="pchr">
                <hr style="width: 5rem;flex-grow: 1; font-weight: bold; height: 3px;">
            </div>
            <p class="tenloai" >{{loaihang.tenloai}}</p>
            <div id="pchr">
                <hr style="width: 5rem;flex-grow: 1; font-weight: bold; height: 3px;">
            </div>
        </div>
        <section class="container st2">
            <div class="row" >
                <!--     load du lieu san pham      -->
                    <div class="col-lg-3 col-md-6 mt-3 mb-5" v-for="(sanpham) in this.listsanpham.slice(0, (this.listsanpham.length>4) ? 4 : this.listsanpham.length)" :key="sanpham._id">
                      <div class="card" style="width: 16rem; ">
                      <img v-if="sanpham.linkanh" :src="sanpham.linkanh" class="card-img-top" alt="SanPham" id="anhsp">
                      <div class="card-body">
                        <h5 class="overflow-hidden">{{sanpham.tenhh}}</h5>
                        <p class="card-text d-flex justify-content-center">{{ formattedGia(sanpham.gia) }}</p>
                        <hr class="hidden_e">
                        <div class="row">
                          <div class="col-6">
                            <router-link
                              :to="{
                                name: 'sanphamchitiet',
                                params: {id: sanpham._id },
                              }"
                              class="hidden_e card-link iconsp"
                            >
                              <i class="fa-solid fa-eye"></i> Xem sản phẩm
                            </router-link>
                          </div>
                          <div class="col-6">
                            <a  class="hidden_e card-link iconsp themgiohang" @click="themgiohang(sanpham)"><i class="fa-solid fa-shopping-cart"></i> Thêm vào giỏ hàng</a>
                            <div v-if="isOutOfStock(sanpham.soluong)" class="out-of-stock-label">Hết hàng</div>
                          </div>
                          <div class="col-12 text-message">
                            {{sanpham.message}}

                          </div>
                        </div>
                  </div>
              </div>

                </div>


                <!-- end -->
            </div>
        </section>
        <hr>
        <hr>
          <router-link
                :to="{
                      name: 'sanpham',
                    params: {id: loaihang._id },
                  }"
                              class="xemthem"
                            >
               <h4>Xem thêm</h4>
          </router-link>
      
        
        <hr>
        <hr class="mb-3">
      </div>
     
              
    </main>
   

    <AppFooter :session_user="session_user" />
  </div>
</template>

<script>
import AppHeader from "@/components/AppHeader.vue";
import AppFooter from "@/components/AppFooter.vue";
import hanghoaService from "../services/hanghoa.service";
import hinhanhService from "../services/hinhanh.service";
import loaihangService from "../services/loaihang.service";
import giohangService from "@/services/giohang.service";
import { RouterLink } from "vue-router";

export default {
  components: {
    AppHeader,
    AppFooter,
    RouterLink
},
  data() {
    return {
      listsanpham: [],
      listloaihang: []
    };
  },
  props: ["session_user"],
  methods: {
    isOutOfStock(soluong) {
  
        return soluong == 0;
      // Default to false if this.sanpham is null
      },
      formattedGia(gia) {
                  if (gia) {
                      return new Intl.NumberFormat("vi-VN", {
                          style: "currency",
                          currency: "VND",
                      }).format(gia);
                  }
                  return "0 VND";
      },
      async getALLLoaiHang () {
        try{
          this.listloaihang = await loaihangService.getAll();
          console.log('get all loai hang');
        }catch(e){
          console.log(e);
          alert("loi thu lai");
          this.$router.push("/");

        }
      },
      async getALLSanPham(){
        try{
           this.listsanpham = await hanghoaService.getAll();
           this.listsanpham.forEach(async (sanpham) => {
            sanpham.message = '';
        const hinhanh = await hinhanhService.getHinhAnhSanPham(sanpham._id);
        if (hinhanh.length > 0) {
          sanpham.linkanh = hinhanh[0].linkanh;
        } else {
          sanpham.linkanh = ''; // Hoặc đặt giá trị mặc định nếu không có hình ảnh
        }
      });
        }catch(e){
          console.log(e);
          alert("loi thu lai");
          this.$router.push("/");

        }
      },
      async themgiohang(sanpham)  {
        try{
        if(this.session_user==null || (this.session_user && this.session_user.id == null)){
          alert("Vui lòng đăng nhập tài khoản của bạn")
          this.$router.push({ name: 'DangNhap' });
        }
        else{
            const document = await giohangService.getByIdKhacHangVaIdSP(this.session_user.id, sanpham._id);
            
          if(document && ((document.soluong + 1) > sanpham.soluong)){
            // sản phẩm trong giỏ hàng đã đạt tối đa
                sanpham.message="Số lượng sản phẩm trong giỏ hàng đã đạt tối đa."
                // không cho phép tổng sản phẩm trong giỏ hàng > tồn kho
          }
          else{
            const data = {
              idkhachhang: this.session_user.id,
              idhanghoa: sanpham._id,
              soluong: 1,
              gia: sanpham.gia
            }
            const result = await giohangService.create(data);
                // thêm và update số lượng sản phẩm trong giỏ hàng;
                //alert('Thêm giỏ hàng thành công');
              this.setMessage("Đã thêm vào giỏ hàng", sanpham);
                  }
            }
          }
            catch(error){
              console.log(error);
            }
          },  
          setMessage(message, sanpham) {
      sanpham.message = message;
      setTimeout(() => {
        sanpham.message = null;
      }, 2000); // 2000 milliseconds (2 seconds)
    },


  },
  async created() {
      this.getALLLoaiHang();
    this.getALLSanPham();
    
    // this.$store.commit('setSessionUser', null);
    //  this.$store.commit('setSessionAdmin', null);
  },
};
</script>
<style>
#hd3{
  margin-top: 2rem;
}

.st1 h2{
  color:  #24696a;
  margin: 0.5rem;
}
.st1 h5{
  color: black;
  /* margin-top: 0.7rem; */
  font-size: 1rem;
}
.st1 .st1border{
   padding: 1rem;
   
}
.st2{
  margin-left: 4rem;
}
#phancach {
  display: flex;
  align-items: center;
  justify-content: center;
  
}
.xemthem h4{
  text-align: center;
  text-decoration: none;
}
.xemthem {
  text-decoration: none;
  color: #24696a;
}

#phancach .tenloai{
 padding: 0 1rem;
 color: black;
 font-weight: 5rem;
 font-weight: bolder;
 font-size: 2rem;
  
}
.shoptext{
  color:  #24696a;
}
</style>
