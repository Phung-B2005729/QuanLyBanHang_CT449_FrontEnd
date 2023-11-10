

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
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <router-link :to="{ name: 'admin' }" class="nav-link">Trang Chủ
          </router-link>
          </li>
          <li class="nav-item" v-if="session_admin!=null">
            <router-link 
              :to="{
                  name: 'DanhSachSanPham',
                  
              }"
             class="nav-link"
          >
        Danh sách sản phẩm
          </router-link>
          </li>
          <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown" id="dropdownMenuButton2" aria-expanded="false">
           Danh sách người dùng
          </a>
          <div class="dropdown-menu row mt-4 danhsach"  aria-labelledby="dropdownMenuButton2">
            <div class="col">
              <router-link 
              :to="{
                  name: 'DanhSachKhachHang',
                 
              }"
               class="dropdown-item"
          >
              <span class="dropdown-item">
                 Danh sách khách hàng
              </span>
          </router-link>
            
            </div>
            <div class="col">
              <router-link 
              :to="{
                  name: 'DanhSachNhanVien',
                
              }"
               class="dropdown-item"
          >
              <span class="dropdown-item">
                 Danh sách nhân viên
              </span>
          </router-link>
            
            </div>
          </div>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown" id="dropdownMenuButton3" aria-expanded="false">
            Quản Lý Đơn Hàng
          </a>
          <div class="dropdown-menu row mt-4 danhsach"  aria-labelledby="dropdownMenuButton2">
            <div class="col">
              <router-link 
              :to="{
                  name: 'QuanLyDonHang',
                  query: {tinhtrang: 'Chờ xác nhận' }, // truyền tham số id với giá trị id của contact đang được chọn vao trang edit-delete
              }"
              class="dropdown-item"
          >
              <span >
                Đơn Hàng Mới
              </span>
          </router-link>
            
            </div>
            <div class="col">
              <router-link 
              :to="{
                  name: 'QuanLyDonHang',  // đang giao // đã xác nhận
                  query: {tinhtrang: 'Đang giao' },
              }"
              class="dropdown-item"
          >
              <span>
                Cập nhật đơn hàng
              </span>
          </router-link>
            
            </div>
            <div class="col">
              <router-link 
              :to="{
                  name: 'QuanLyDonHang', // đã nhận hàng, đã huỷ
                  query: {tinhtrang: 'Đã nhận hàng' },
              }"
              class="dropdown-item"
          >
              <span >
                Danh sách đơn hàng
              </span>
          </router-link>
            
            </div>
          </div>
        </li>
         
        </ul>
      </div>

     <ul class="navbar-nav" id="nguoidung" v-if="this.admin!=null && session_user!=null && session_user.id!=null">
          <li class="nav-item dropdown danhsachnguoidung">
          <a class="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown" id="dropdownMenuButton1" aria-expanded="false">
          Amin
          </a>
              <div class="dropdown-menu container danhsach"  aria-labelledby="dropdownMenuButton1">
  
                <router-link 
              :to="{
                  name: 'CaNhanAdmin',
              }"
             class="dropdown-item"
          >
          Trang Cá Nhân
          </router-link>
                 <a class="dropdown-item dangxuat" @click="logout">Đăng xuất</a>
              </div>
        </li>
          </ul>
        
  
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
  import nhanvienService from "@/services/nhanvien.service";
  export default {
    components: {
      InputSearch
    },
    props: ["session_admin"],
    data() {
      return {
        admin: null,
      };
    },
  
    methods: {

  async logout() {
        try{
        const document =  await nhanvienService.logout();
        this.$store.commit('setSessionAdmin', null);
        this.admin=null;
        this.$router.push({ path: "/admin/dangnhap" });
      }catch(e){
        console.log("Lỗi " +e);
      }
      
    },
  
    async getadmin() {
      if(this.session_admin && this.session_admin.id!=null){
        alert('Gọi get admin')
                  try {
                      // lấy danh sách admin
                    this.admin = await nhanvienService.getById(this.session_admin.id);  
                    alert(this.admin==null);   
                  } catch (error) {
                      console.log(error);
                  }
                }
    },
   
  },
    mounted(){
          this.getadmin();
              },
    created(){
      this.getadmin();
    }
        }
  </script>