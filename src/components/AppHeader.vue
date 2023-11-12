

<template>
<header>
<nav id="menu" class="navbar navbar-expand-lg">
<div class="container-fluid">
  <router-link :to="{ name: 'trangchu' }" class="navbar-brand logo">
          <img src="@/assets/images.png" alt="Pet Shop" width="80" height="80">
        </router-link>
    <button class="navbar-toggler icon-tab" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse col-6" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
      <li class="nav-item">
        <router-link :to="{ name: 'trangchu' }" class="nav-link">Trang Chủ
        </router-link>
        </li>
        <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown" id="dropdownMenuButton2" aria-expanded="false">
          Sản phẩm cho chó
        </a>
        <div class="dropdown-menu row mt-4 danhsach"  aria-labelledby="dropdownMenuButton2">
          <div class="col" v-for="loai in filteredLoaiCho" :key="loai._id">
            <router-link 
            :to="{
                name: 'sanpham',
                params: {id: loai._id }, // truyền tham số id với giá trị id của contact đang được chọn vao trang edit-delete
            }"
             class="dropdown-item"
        >
            <span class="dropdown-item">
               {{loai.tenloai}}
            </span>
        </router-link>
          
          </div>
        </div>
      </li>
      <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown" id="dropdownMenuButton3" aria-expanded="false">
          Sản phẩm cho mèo
        </a>
        <div class="dropdown-menu row mt-4 danhsach"  aria-labelledby="dropdownMenuButton2">
          <div class="col" v-for="loai in filteredLoaiMeo" :key="loai._id">
            <router-link 
            :to="{
                name: 'sanpham',
                params: {id: loai._id }, // truyền tham số id với giá trị id của contact đang được chọn vao trang edit-delete
            }"
            class="dropdown-item"
        >
            <span >
               {{loai.tenloai}}
            </span>
        </router-link>
          
          </div>
        </div>
      </li>
        <li class="nav-item" v-if="session_user==null">
          <router-link 
            :to="{
                name: 'DangNhap',
            }"
           class="nav-link"
        >
        Đăng Nhập
        </router-link>
         
        </li>
        <li class="nav-item" v-if="session_user==null">
          <router-link 
            :to="{
                name: 'DangKy',
            }"
           class="nav-link"
        >
        Đăng Ký
        </router-link>
        </li>
        <li class="nav-item" v-if="this.user!=null &&this.session_user && this.session_user.id!=null">
          <router-link 
            :to="{
                name: 'DonHang',
                query: {id: session_user.id}
            }"
           class="nav-link"
        >
        Đơn Hàng
        </router-link>
        </li>
      </ul>
    </div>
    <!---Tìm kiếm Form-->
   <div class="col-3">
    <InputSearch></InputSearch>
   </div> 
   
    <router-link v-if="this.session_user && this.session_user.id!=null && this.user!=null"
            :to="{
                name: 'GioHang',
                query: { id: session_user.id }
            }"
           
           class="nav-link"
        ><i class="fa fa-cart-shopping icon-cart"></i>
        </router-link>
        <router-link v-else
            :to="{
                name: 'GioHang',
               
            }"
           
           class="nav-link"
        ><i class="fa fa-cart-shopping icon-cart"></i>
        </router-link>
      <ul class="navbar-nav" id="nguoidung" v-if="this.user!=null && session_user!=null && session_user.id!=null">
        <li class="nav-item dropdown danhsachnguoidung">
        <a class="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown" id="dropdownMenuButton1" aria-expanded="false">
          {{this.user.hoten}}
        </a>
            <div class="dropdown-menu container danhsach"  aria-labelledby="dropdownMenuButton1">

              <router-link 
            :to="{
                name: 'CaNhan',
                params:{
                 id: session_user.id
                }
            }"
           class="dropdown-item"
        >
        Trang Cá Nhân
        </router-link>
               <a class="dropdown-item dangxuat" @click="logout">Đăng xuất</a>
            </div>
      </li>
        </ul>
        <div>
   
  
  </div>

</div>

</nav>
</header>
</template>
<style scoped>
       @import "@/assets/stype.css"; 
.danhsach {
  background-color: #539590;
  max-width: max-content;
  font-weight: 600;
}

.danhsach :hover{
    margin-right: 4;
    color: black;
    font-weight: bolder;
    font-size: large;
    background-color: #539590;
  }
.dangxuat {
  cursor: pointer;
}
</style>

<script>
import InputSearch from '@/components/InputSearch.vue';
import loaihangService from "@/services/loaihang.service";
import khachhangService from "@/services/khachhang.service";
export default {
  components: {
    InputSearch
  },
 props: ["session_user"],
  data() {
    return {
      loaihang: [],
      user: null,
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
    async logout() {
    try{
    const document =  await khachhangService.logout();
    this.$store.commit('setSessionUser', document.token);
     this.user=document.token;
    this.$router.push({ path: "/" });
  }
  catch(e){
    console.log('Lỗi'+e);
  }
    
  },

  async getUser() {
    if(this.session_user && this.session_user.id!=null){
                try {
                    // lấy danh sách các loại hàng
                  this.user = await khachhangService.getById(this.session_user.id);
                  if(this.user==null){  // thông tin khách hàng đã bị xoá;
                    this.$store.commit('setSessionUser', null);
                    this.$router.push({ path: "/" });
                  }
                 
                } catch (error) {
                    console.log(error);
                }
    }
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
        this.getUser();
        this.getALLLoaiHang(); // gọi khi trang vừa được load
            }
      }
</script>