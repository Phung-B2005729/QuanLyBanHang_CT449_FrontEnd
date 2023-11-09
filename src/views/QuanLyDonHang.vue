<template>
  <div>
    <AppHeaderAdmin :session_admin="session_admin" />
<main>
  <div id="hdsd">
  <div class="col-4 offset-1 danhsachsanpham">
      <InputSearchAdmin v-model="this.searchText" />
  </div>
  </div>
  <div class="row ">
      <div class="col-4 mt-3 offset-1">
        <div class="shadow p-3 rounded bg-body">
          <div class="col-md-12 text-success">
                          <h5> <span><i class="fa-solid fa-cart-shopping"></i></span> Danh Sách Sản Phẩm</h5>
                          <hr>
                      </div>
                      <HangHoaList
                          v-if="filteredhanghoaCount > 0"
                          :listhanghoa="filteredhanghoa"
                          v-model:activeIndex="activeIndex"
                          @delete:hanghoa="deleteHangHoa"
                          />
                          <p v-else>Không có sản phẩm nào</p>
              </div>
      <div class="row mb-3 thanhbutton">
          <button class="btn btn-sm btn-primary col-2 m-3" @click="refreshList()">
              <i class="fas fa-redo"></i> Làm mới
          </button>
          <button class="btn btn-sm btn-success col-2 m-3" @click="goToAddHangHoa">
              <i class="fas fa-plus"></i> Thêm mới
          </button>
          <button
              class="btn btn-sm btn-danger col-2 m-3"
              @click="removeAllContacts"
              >
              <i class="fas fa-trash"></i> Xóa tất cả
          </button>
      </div>
            
          </div>
          <div class="col-6 mt-3">
            <div>
              <div class="shadow mb-3 bg-body rounded"  v-if="activeHangHoa">
                  <div class="row ">
                      <div class="col-md-12 p-4 text-success text-left">
                          <h3 class="col-5">Chi tiết sản phẩm</h3>
                          <div class="hieuchinh col-md-5 text-success">
                      <router-link id="route-link" style="text-decoration: none; color: #2b7778;"
                              :to="{ name: 'editsanpham', params: { id: activeHangHoa._id } }"
                              >
                          <i class="fas fa-edit"></i> Hiệu chỉnh
                      </router-link>
                   </div> 
                  <hr>
                      </div>
                      <div class="col-md-12">
                          <SanPhamCard :sanphams="activeHangHoa" />
                      </div>
                  
               
                  </div>
              </div>
            </div>
          </div>
     
  </div>
  

  </main>

    <AppFooterAdmin/>
  </div>
</template>

<script>
import AppHeaderAdmin from "@/components/AppHeaderAdmin.vue";
import AppFooterAdmin from "@/components/AppFooterAdmin.vue";
import HangHoaList from "@/components/HangHoaList.vue";
import dathangService from "@/services/dathang.service";
import InputSearchAdmin from "@/components/InputSearchAdmin.vue";

export default {
  components: {
    AppHeaderAdmin,
    AppFooterAdmin,
    InputSearchAdmin,
    HangHoaList,
  },
  props: ["session_admin"],
  data() {
          return {
            listdathang: [],
              activeIndex: -1,  // vị trí liên hệ đang được chọn
              searchText: "",
          };
      },
      watch: {
          // Giám sát các thay đổi của biến searchText.
          // Bỏ chọn phần tử đang được chọn trong danh sách.
          searchText() {
            this.activeIndex = -1;
          },
      },
      computed: {
          // Chuyển các đối tượng  thành chuỗi để tiện cho tìm kiếm.
          hanghoatrings() {
              return this.istdathang.map((sanpham) => {
                   const { ngaydat, ngaygiao,tinhtrang,tongtien, diachigiao } = sanpham;
                  return [ngaydat, ngaygiao,tinhtrang,tongtien, diachigiao].join("");
              });
          },
          filteredhanghoa() {
             
                  if (!this.searchText) return this.listdathang;
                  const searchTextLower = this.searchText.toLowerCase();
                  console.log("Search Text:", searchTextLower);
                 
                  return this.istdathang.filter((_hanghoa, index) =>
                  this.hanghoatrings[index].toLowerCase().includes(searchTextLower)
                  );
              },
          activeHangHoa() { // liên hệ đang được chọn kiểm tra
              if (this.activeIndex < 0) return null;
              return this.filteredhanghoa[this.activeIndex];
          },
          filteredhanghoaCount() {
             return this.filteredhanghoa.length; //sl các liên hệ khi tìm kiếm
          },
          },
      methods: {
        async getSPdathang(){
        try{
           const tinhtrang = this.$route.query.tinhtrang;
           const listtam = await dathangService.getAll();
      if(tinhtrang=='Chờ xác nhận'){
        this.listdathang = listtam.filter(item => item.tinhtrang === 'Chờ xác nhận');
      }
      else if(tinhtrang=='Đang Giao'){
        this.listdathang =  listtam.filter(item => item.tinhtrang === 'Đang giao' || item.tinhtrang === 'Đã xác nhận');
      }
      else if(tinhtrang=='Đã huỷ'){
        this.listdathang =  listtam.filter(item => item.tinhtrang === 'Đã nhận hàng' || item.tinhtrang === 'Đã huỷ');
      }
      else{
        this.listdathang = listtam;
      }
      }catch(e){
        console.log(e);
        alert('Lỗi' + e.response.status);
    }
    },
    async huyDon (iddathang){
      try{
        const data = {
          tinhtrang: 'Đã huỷ'
        }
        console.log('Gọi huỷ đơn');
         const resu = await dathangService.update(iddathang,data);
         this.getSPdathang();
         this.$router.push({   name: 'QuanLyDonHang',
                query: {tinhtrang: this.$route.query.tinhtrang} });
         
        
      }catch(e){
        console.log(e);
        alert('Lỗi' + e.response.status);
      }

    },
    refreshList() {
              // làm mới danh sách
              // bỏ chọn
              this.getSPdathang();
              this.activeIndex = -1;
      },
      async removeAllhanghoa() {
              // xoá tất cả liên hệ
              if (confirm("Bạn muốn xóa tất cả Liên hệ?")) {
                  try {
                      await hanghoaService.deleteAll();
                      this.refreshList();
                  } catch (error) {
                      console.log(error);
                  }
              }
          },
      goToAddHangHoa() {
             this.$router.push({ name: "addsanpham" }); 
          },
      async deleteHangHoa(hanghoa) {  // ham cho phuong thuc delete
                  try {
                     
                      await hanghoaService.delete(hanghoa._id);
                      await hinhanhService.deleteHinhAnhSanPham(hanghoa._id);
                     
                      this.refreshList();
                  } catch (error) {
                      console.log(error);
                  }
             
          },
      },
      mounted() {
              this.refreshList(); // gọi làm mới danh sách khi trang được tải
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




</style>
