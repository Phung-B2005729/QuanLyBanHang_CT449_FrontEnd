

<template>
    <header>
    <nav id="menu" class="navbar navbar-expand-lg">
    <div class="container-fluid">
        <a class="navbar-brand logo" href="/">
          <img src="src/assets/images.png" alt="ARCH CINEMA" width="80" height="80">
        </a>
        <button class="navbar-toggler icon-tab" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
              <a class="nav-link" href="/">Trang Chủ</a>
            </li>
            <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown" id="dropdownMenuButton2" aria-expanded="false">
              Sản phẩm cho chó
            </a>
            <div class="dropdown-menu row mt-4 danhsach"  aria-labelledby="dropdownMenuButton2">
              <div class="col">
                <a class="dropdown-item" href="/">Hạt cho chó</a>
                 <a class="dropdown-item" href="/">Pate chó</a>
                 <a class="dropdown-item" href="/">Sữa tắm chó</a>
                <a class="dropdown-item" href="/">Bát đựng thức ăn cho chó</a>
              </div>
            </div>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown" id="dropdownMenuButton3" aria-expanded="false">
              Sản phẩm cho mèo
            </a>
            <div class="dropdown-menu row mt-4 danhsach"  aria-labelledby="dropdownMenuButton3">
          <div class="col">
                <a class="dropdown-item" href="/">Hạt cho mèo</a>
                 <a class="dropdown-item" href="/">Súp thưởng</a>
                 <a class="dropdown-item" href="/">Pate mèo</a>
                <a class="dropdown-item" href="/">Cát vệ sinh cho mèo</a>
                 <a class="dropdown-item" href="/">Sữa tắm cho mèo</a>
                 <a class="dropdown-item" href="/">Balo cho mèo</a>
              </div>
                 
            </div>
          </li>
            <li class="nav-item" v-if="session_user==null">
              <a class="nav-link" href="/dangnhap">Đăng Nhập</a>
            </li>
            <li class="nav-item" v-if="session_user==null">
              <a class="nav-link" href="/dangky">Đăng ký</a>
            </li>
            <li class="nav-item" v-if="session_user!=null">
              <a class="nav-link" href="donhang.php">Đơn Hàng</a>
            </li>
          </ul>
        </div>
        <!---Tìm kiếm Form-->
        <InputSearch></InputSearch>
          <a class="nav-link icon-cart iconadmin" href="/giohang"><i class="fa fa-cart-shopping "></i></a>
          <ul class="navbar-nav" id="nguoidung" v-if="session_user!=null">
            <li class="nav-item dropdown danhsachnguoidung">
            <a class="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown" id="dropdownMenuButton1" aria-expanded="false">
              {{session_user.token.hoten}}
            </a>
                <div class="dropdown-menu container danhsach"  aria-labelledby="dropdownMenuButton1">
                  <a class="dropdown-item" href="/khachhang">Trang cá nhân</a>
                   <a class="dropdown-item" @click="setSession_user">Đăng xuất</a>
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
    </style>
    
    <script>
    import InputSearch from './InputSearch.vue';
    export default {
      components: {
        InputSearch
      },
      props: {
        session_user: { type : Object, default : null
        } // dữ liệu kiểm tra đăng nhập
      },
      
      methods: {
      setSession_user(){
        this.$store.commit('setSessionUser', null)
      }
    }
    }
    </script>