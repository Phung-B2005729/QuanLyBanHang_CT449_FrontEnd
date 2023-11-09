<template>
    <div>
      <AppHeader :session_user="session_user" />
  
      <div class="container">
        <input
          type="file"
          accept="image/png, image/jpg, image/jpeg"
          @change="handleFileChange"
        />
        <img v-if="imageUrl" :src="imageUrl" alt="Uploaded Image" />
      </div>
  
      <button class="btn" @click="uploadImage">Upload</button>
  
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
        imageUrl: null,
        fileupload: null,
        error: null,
        hinhanh: null
      };
    },
    props: ["session_user"],
    methods: {
      async uploadImage() {
        if (!this.fileupload) {
          console.error("No file selected.");
          return;
        }
  
        const formData = new FormData();
        formData.append("file", this.fileupload);
  
        try {
          const response = await hinhanhService.upload(formData);
          this.imageUrl = response.url;
          this.hinhanh = {
            linkanh: this.imageUrl,
            tenanh: this.fileupload.name,
            idhanghoa: ""
          }
         
          const ketqua = await hinhanhService.create(this.hinhanh);
         
          alert("Thêm ảnh thành công");
          
        } catch (error) {
          console.error("Image upload failed:", error);
          alert("Image upload failed:");
        }
      },
      handleFileChange(event) {
        this.fileupload = event.target.files[0];
        this.getImagePreviews(this.fileupload);
      },
      getImagePreviews(image) {
        if(/\.(jpe?g|png)$/i.test(image.name) && image.size < 1000000000){
          let reader = new FileReader();
        reader.onloadend = (e) => {
          this.imageUrl = e.target.result;
        };
        reader.readAsDataURL(image);
        }
        else{
            this.error = "File is not support for size bigger than 1MB"
            alert(this.error)
        }
      
      },
    },
  };
  </script>
  <!--<div class="page row">
    <div class="col-md-10">
        <InputSearchAdmin v-model="searchText" />
    </div>
     <div class="mt-3 col-md-6">
        <h4>
            Danh Sách Hàng Hoá
            <i class="fas fa-address-book"></i>
        </h4>
        <HangHoaList
            v-if="filteredhanghoaCount > 0"
            :listhanghoa="filteredhanghoa"
            v-model:activeIndex="activeIndex"
            />
        <p v-else>Không có hàng hoá nào</p>
        <div class="mt-3 row justify-content-around align-items-center">
            <button class="btn btn-sm btn-primary" @click="refreshList()">
                <i class="fas fa-redo"></i> Làm mới
            </button>
            <button class="btn btn-sm btn-success" @click="goToAddHangHoa">
                <i class="fas fa-plus"></i> Thêm mới
            </button>
            <button
                class="btn btn-sm btn-danger"
                @click="removeAllhanghoa"
                >
                <i class="fas fa-trash"></i> Xóa tất cả
            </button>
        </div>
    </div>
  <div class="mt-3 col-md-6">
    <div v-if="activeHangHoa">
        <h4>
            Chi tiết Sản Phẩm
            <i class="fas fa-address-card"></i>
        </h4>

        <h5>Thông tin sản phẩm</h5>
      Thông tin sản phẩm chi tiết
        <router-link 
            :to="{
                name: 'editsanpham',
                params: { id: activeHangHoa._id }, // truyền tham số id với giá trị id của contact đang được chọn vao trang edit-delete
            }"
        >
            <span class="mt-2 badge badge-warning">
                <i class="fas fa-edit"></i> Hiệu chỉnh
            </span>
        </router-link>
    </div>
    </div> 
</div> -->