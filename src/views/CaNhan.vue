<template>
  <div>
    <AppHeader :session_user="session_user" />
<main>
  <div class="row mb-5 mt-5 thongtin">
          <div class="col-md-4 mt-3">
            <div>
              <div class="shadow mb-3 bg-body rounded">
              <div class="col-md-12">
              <div>
                <div class="shadow p-2 mb-5 bg-body rounded">
                    <div class="row p-4 " v-if="this.khachhang">
                        <div class="col-md-12 text-success">
                            <h5> <span><i class="fa-solid fa-user"></i></span>Thông tin cá nhân</h5>
                           <h5 class="text-primary hienchinh" @click="formhienthi"><i class="fas fa-edit"></i> Hiệu chỉnh</h5>
                          
                     
                            <hr>
                        </div>
                        <div class="col-md-12 mt-2">
                          <b>Họ Tên :</b> {{this.khachhang.hoten}}
                        </div>
                        <div class="col-md-12 mt-2">
                          <b>Số điện thoại: </b>
                            {{this.khachhang.sdt}}
                        </div>
                        <div class="col-md-12 mt-3">
                            <b>
                            Địa chỉ: 
                          </b>
                         {{this.khachhang.diachi}}
                        
                        </div>
                      
                        
                    </div>
                </div>

              </div>
              </div>
                  
               
                  </div>
              </div>
            </div>
            <div class="col-md-6" v-if="this.form">
              <div class="shadow mb-3 p-4 bg-body rounded">
                <h5 class="mt-3 text-center">Cập nhật thông tin</h5>
               <!--Hiển thị form-->
               <FormCapNhatThongTinUser
                  :nguoidung="khachhang"
                  :mode="mode"
                  @submit:nguoidung="updatenguoidung"
                  @delete:nguoidung="deletenguoidung"
              />
              </div>
            </div>
          
     
  </div>
  

  </main>

    <AppFooter :session_user="session_user"/>
  </div>
</template>

<script>
import AppHeader from "@/components/AppHeader.vue";
import AppFooter from "@/components/AppFooter.vue";
import FormCapNhatThongTinUser from "@/components/FormCapNhatThongTinUser.vue";
import khachhangService from "@/services/khachhang.service";
import dathangService from "@/services/dathang.service";
export default {
  components: {
    AppHeader,
    AppFooter,
    FormCapNhatThongTinUser
  
  },
  props: ["session_user"],
  data() {
          return {
            khachhang: null,
            form: false,
            mode: 'edit'
          };
      },
      watch: {
          // Giám sát các thay đổi của biến searchText.
          // Bỏ chọn phần tử đang được chọn trong danh sách.
          searchText() {
            this.activeIndex = -1;
          },
      },
      methods: {
        async getkhachhang(){
          const id = this.$route.params.id;
            try{
              this.khachhang = await khachhangService.getById(id);
            }catch(e){
              console.log(e);
              this.$router.push("/notfound");
            }

    },
    async updatenguoidung(data) {  // ham goi submit
              try {
              
                console.log("gọi update " + data._id);
                  const resu = await khachhangService.update(data._id, data);
                  this.message = "Cập nhật thông tin thành công";
                //  this.$router.push({ path: '/canhan/'+ data._id});
                  alert(this.message);  // thông báo thành công
                  //this.$router.push({ path: '/'});
              
                 this.getkhachhang();
                 this.formhienthi();
              } catch (error) {
                if(error.response && error.response.status === 403){
                        alert('Số điện thoại đã được sử dụng ở một tài khoản khác');
                    }
                    else{
                      alert('Lỗi thử lại');
                    }
                  console.log(error);
              }
          },
          async deletenguoidung() {  // ham cho phuong thuc delete
              if (confirm("Bạn muốn xóa tài khoản này?")) {
                try {
                    console.log(this.khachhang._id);
                   const re =  await khachhangService.delete(this.khachhang._id);
                   console.log('Đã gọi xoá khách hàng');
                   const resu =  await dathangService.deleteALLIdKhachhang(this.khachhang._id);
                   const document =  await khachhangService.logout();
                    this.$store.commit('setSessionUser', document.token);
                    this.$router.push({ path: "/" });
                  } catch (error) {
                      console.log(error);
                  }
              }
          },
    formhienthi () {
      this.form = !this.form;
      if(this.form==false){
        this.getkhachhang();
      }
    }
  },
  created() {
        this.getkhachhang(); // gọi làm mới danh sách khi trang được tải
          },
  };
</script>
<style scoped>
.thanhbutton {
  text-align: center;
  margin-top: 0;
}
#hdsd{
  margin-top: 2rem;
}
.process{
margin-top: 1.5rem ;
color: #000;
font-size: 1.8rem;
}

.thongtin{
  margin-left: 10rem;
}
.hienchinh {
  cursor: pointer;
}

</style>
