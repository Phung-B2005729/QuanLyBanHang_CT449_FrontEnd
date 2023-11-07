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
                      <h2 class="font-weight-semi-bold ">Pet Shop Arch</h2>
                
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
        <div class="container phancach">
            <div clas="pchr" >
                <hr style="width: 5rem;flex-grow: 1; height: 3px; margin-right: 1rem;">
            </div>
            <h2 class=" mb-2 text-giohang">Giỏ Hàng</h2>
            <div clas="pchr">
                <hr style="width: 5rem;flex-grow: 1; height: 3px;margin-left: 1rem;">
            </div>
        </div>

        <div class="row " id="tablegiohang">
            <div class="col-12">
                    <table class="table table-hover shadow-lg rounded">
                        <thead>
                            <tr>
                                <th scope="col">Sản phẩm</th>
                                <th scope="col">Tên</th>
                                <th scope="col">Đơn Giá</th>
                                <th scope="col">Số Lượng</th>
                                <th scope="col">Thành Tiền</th>
                                <th scope="col">Xóa</th>
                            </tr>
                        </thead>
                        <tbody v-for="giohang in this.listgiohang" :key="giohang._id">
                            <tr>
                               
                                <td class=" pt-3">
                                    <div class="col-6 p-0">
                                        <img :src="giohang.linkanh" alt="loi"
                                            style="height: 5rem;width: 5rem; object-fit: cover">
                                    </div>
                                </td>
                                <td class="pt-3"> 
                                  {{giohang.tenhh}}
                                </td>
                                <td class="pt-3">{{formattedGia(giohang.gia)}}</td>
                                <!-- tang giam sl -->
                                <td class="pt-3">
                                  <div class="btn-group" role="group" aria-label="Button group with nested dropdown">
                                            <p @click="giamsoluong()"  class="btn btn-outline-secondary"><i class="fas fa-minus"></i></p>
                                            <p class="btn btn-outline-secondary">{{giohang.soluong}}</p>
                                            <p @click="tangsoluong()" class="btn btn-outline-secondary"><i class="fa fa-plus"></i></p>
                                    <p class="text-error">{{this.message}}</p>
                                    </div>
                                </td>
                                <!-- thung rac -->
                                
                                <!-- tong tien -->
                                <td class=" pt-3">
                                  {{formattedGia(giohang.thanhtien)}}
                                </td>
                                <td class="pt-3">
                                    <div>
                                        <i class=" fa-solid fa-trash icon-xoa"></i>

                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
               
            </div>
            <!-- ===================================== MUA HANGF ============================================== -->

            <div class="col-4 table_thanhtoan offset-8">
                    <table class="table table-light">
                        <tr class="position-relative">
                            <th scope="col">Tổng Tiền (<span>VND</span>)</th>
                            <th scope="col" class=" text-danger position-absolute top-50 end-0 translate-middle-y">
                                0Đ </th>
                        </tr>
                        <tr>
                            <td colspan="2">
                                <div class="row">
                                    <div class="col-12">
                                      <!--Truyển trang thanh toán-->
                                        <button type="submit" href="cart_bill.php"
                                            class="text-center mt-2 text-light form-control bg-danger shadow-sm rounded">
                                           THANH TOÁN
                                        </button>
                                    </div>
                                   
                                </div>
                            </td>
                        </tr>
                        
                    </table>
               
            </div>
        </div>

        <!-- =====================================end MUA HANG ============================================== -->
    </main>
  
      <AppFooter :session_user="session_user" />
    </div>
  </template>
  
  <script>
  import AppHeader from "@/components/AppHeader.vue";
  import AppFooter from "@/components/AppFooter.vue";
  import hanghoaService from "@/services/hanghoa.service";
  import hinhanhService from "@/services/hinhanh.service";
  import giohangService from "@/services/giohang.service";
  export default {
    components: {
      AppHeader,
      AppFooter,
    },
    props: ["session_user"],
    data(){
      return {
        listgiohang: [],
        message: null
      }
    }
    ,
    watch: {
    listgiohang: {
      handler: "getSPGioHang", // Call getSPGioHang when listgiohang changes
      deep: true, // Watch for changes in nested properties
    },
  },
    methods: {
      async getSPGioHang(){
      const idkhachhang = this.$route.query.id;
      try{
        
      if(idkhachhang!=null){
          this.listgiohang = await giohangService.getALLSPGioHangKhachHang(idkhachhang);
        if(this.listgiohang){
          this.listgiohang.forEach(async (giohang) => {
            giohang.thanhtien = await giohang.gia*giohang.soluong;
           const hinhanh = await hinhanhService.getHinhAnhSanPham(giohang.idhanghoa);
           const sanpham = await hanghoaService.getById(giohang.idhanghoa);
           if (hinhanh.length > 0 && sanpham) {
             giohang.linkanh = hinhanh[0].linkanh;
             giohang.tenhh = sanpham.tenhh;
             giohang.soluongtonkho = sanpham.soluong;
            
           } else {
             giohang.linkanh = ''; // Hoặc đặt giá trị mặc định nếu không có hình ảnh
             giohang.tenhh = '';
           }
        })
      }
      }
      }catch(e){
        console.log(e);
        alert('Lỗi' + e.response.status);
    }
    },
    async deleteSanPhamGioHang (idgiohang) {
      try{
        if(idgiohang){
          const resu = await giohangService.delete(idgiohang);
          if(resu){
            this.getSPGioHang();
          }
          
      }
      }catch(e){
        console.log(e);
        alert('Lỗi' + e.response.status);
      }
      

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
  giamsoluong(){
    if(this.listgiohang.soluongtonkho==0){
       // hết hàng
    }
   else if (this.listgiohang.soluong <= 1) {
        this.message=null;
      } else {
        this.message = null;
        this.listgiohang.soluong= this.listgiohang.soluong - 1;
      }
   },
   tangsoluong(){
    if( this.listgiohang.soluongtonkho==0){
      setMessage("Hết hàng")
      }
      else if (this.listgiohang.soluong >= this.listgiohang.soluongtonkho) {
        setMessage("Số lượng đã đạt tối đa")
      } else {
        this.listgiohang.soluong= this.listgiohang.soluong +1;
        this.message = null;
      }
   },
   setMessage(message) {
      this.message = message;
      setTimeout(() => {
        this.message = null;
      }, 2000); // 2000 milliseconds (2 seconds)
    },
    },
    async created() {
      this.getSPGioHang();
  },

   
  };
  </script>
  <style>
.text-error{
    color: rgb(215, 78, 78);
}

.icon-xoa{
  color: brown;
  font-size: 1.2rem;
  text-align: center;
}
.text-giohang{
  font-size: 3rem;
 
}
#tablegiohang{
  margin-left: 5rem;
  margin-right: 5rem;
  margin-top: 1rem;
  margin-bottom: 1rem;
}
#tablegiohang td, img{
  text-align: left;
}


</style>

  