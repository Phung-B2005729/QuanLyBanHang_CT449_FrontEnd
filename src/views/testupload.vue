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
  