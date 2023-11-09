<template>
<footer id="lkfooter">
    <div class="container pt-4 link">
        <div class="row ml-3">
        <div class="col-6" v-if="session_user==null">
                <h4>Link</h4>
                 <p  class="mb-3"> <router-link :to="{ name: 'trangchu' }" class="nav-link">Trang Chủ
        </router-link></p>
                 <p class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown" id="dropdownMenuButton2" aria-expanded="false">
          Sản phẩm cho chó
        </a>
        <div class="dropdown-menu row mt-4 danhsach"  aria-labelledby="dropdownMenuButton2">
        
          <div class="col" v-for="loai in filteredLoaiCho" :key="loai._id">
            <router-link 
            :to="{
                name: 'sanpham',
                params: { id: loai._id }, // truyền tham số id với giá trị id của contact đang được chọn vao trang edit-delete
            }"
             class="dropdown-item"
        >
            <span class="dropdown-item">
               {{loai.tenloai}}
            </span>
        </router-link>
          
          </div>
        </div>
      </p>
                 <p class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown" id="dropdownMenuButton3" aria-expanded="false">
          Sản phẩm cho mèo
        </a>
        <div class="dropdown-menu row mt-4 danhsach"  aria-labelledby="dropdownMenuButton3">
          
          <div class="col" v-for="loai in filteredLoaiMeo" :key="loai._id">
            <router-link 
            :to="{
                name: 'sanpham',
                params: { id: loai._id }, // truyền tham số id với giá trị id của contact đang được chọn vao trang edit-delete
            }"
             class="dropdown-item"
        >
            <span class="dropdown-item">
               {{loai.tenloai}}
            </span>
        </router-link>
          
          </div>
             
        </div>
      </p>
      <p  class="mb-3">
      <router-link 
            :to="{
                name: 'DangNhap',
            }"
          class="mb-5"
        >
        Đăng Nhập
        </router-link></p>
                 <p  class="mb-3"> <router-link 
            :to="{
                name: 'DangKy',
            }"
           class="nav-link"
        >
        Đăng Ký
        </router-link></p>
               
            </div>
            <div class="col-6" v-else>
                <h4>Link</h4> 
                 <p  class="mb-3">  <router-link :to="{ name: 'trangchu' }" class="nav-link">Trang Chủ
        </router-link></p>
                 <p class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown" id="dropdownMenuButton2" aria-expanded="false">
          Sản phẩm cho chó
        </a>
        <div class="dropdown-menu row mt-4 danhsach"  aria-labelledby="dropdownMenuButton2">
          <div class="col" v-for="loai in filteredLoaiCho" :key="loai._id">
            <router-link 
            :to="{
                name: 'sanpham',
                params: { id: loai._id }, // truyền tham số id với giá trị id của contact đang được chọn vao trang edit-delete
            }"
             class="dropdown-item"
        >
            <span class="dropdown-item">
               {{loai.tenloai}}
            </span>
        </router-link>
          
          </div>
        </div>
      </p>
                 <p class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown" id="dropdownMenuButton3" aria-expanded="false">
          Sản phẩm cho mèo
        </a>
        <div class="dropdown-menu row mt-4 danhsach"  aria-labelledby="dropdownMenuButton3">
          <div class="col" v-for="loai in filteredLoaiMeo" :key="loai._id">
            <router-link 
            :to="{
                name: 'sanpham',
                params: { id: loai._id }, // truyền tham số id với giá trị id của contact đang được chọn vao trang edit-delete
            }"
             class="dropdown-item"
        >
            <span class="dropdown-item">
               {{loai.tenloai}}
            </span>
        </router-link>
          
          </div>
             
        </div>
      </p>
      <p  class="mb-3">  <router-link 
            :to="{
                name: 'DonHang',
                query: {id: session_user.token.id}
            }"
           class="nav-link"
        >
        Đơn Hàng
        </router-link></p>
                     
            </div>
            <div class="col-6">
            <h4>Liên hệ với chúng tôi</h4>
                <a href="" class="mb-3"> <i class="fa-brands fa-facebook mb-3"></i> : Facebook</a>
                <a href="" class="mb-3"><i class="fa-brands fa-square-instagram mb-3"></i> : Instagram</a>
                <p><i class="fa fa-phone"> 0907789456</i></p>
                <p class="mb-5">Phường Xuân Khánh,Huyện Ninh Kiều,TP.Cần Thơ</p>
               
            </div>
        </div>
        <div class="row copy">
                  &#169; 2023 Bản quyền thuộc về Pet Shop ArCH
        </div> 
    </div>
</footer>
</template>
<style scoped>
       @import "@/assets/stype.css"; 
       .danhsach {
  background-color:  #8eb9be; 
  max-width: max-content;
  font-weight: 600;
}

.danhsach :hover{
    margin-right: 4;
    color: black;
    font-weight: bolder;
    font-size: large;
    background-color:  #8eb9be; 
  }
</style>
<script>
import loaihangService from "../services/loaihang.service";
export default {
  props: {
    session_user: { type : Object, default : null} // dữ liệu kiểm tra đăng nhập
  },
  data() {
    return {
      loaihang: []
    };
  },
  computed: {
    loaihangStrings() {
                return this.loaihang.map((loai) => {
                     const {tenloai } = loai;
                    return [tenloai].join("");
                });
            },
    filteredLoaiCho() {
      return this.loaihang.filter((_loai,index) => this.loaihangStrings[index].includes('chó'));
    },
    filteredLoaiMeo() {
      return this.loaihang.filter((_loai,index) => this.loaihangStrings[index].includes('mèo'));
    },
    
  },
  
  methods: {
  setSession_user(){
    this.$store.commit('setSessionUser', null)
  },
  async getALLLoaiHang() {
                try {
                    // lấy danh sách các loại hàng
                  this.loaihang = await loaihangService.getAll();
                } catch (error) {
                    console.log(error);
                }
            },
},
mounted(){
this.getALLLoaiHang(); // gọi khi trang vừa được load
}
}
</script>