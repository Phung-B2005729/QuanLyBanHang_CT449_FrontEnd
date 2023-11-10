<template>
  <div>
    <AppHeaderAdmin :session_admin="session_admin" />
<main>
  <div id="hdsd">
  <div class="col-4 donhang danhsachsanpham">
      <InputSearchAdmin v-model="this.searchText" />
  </div>
  </div>
  <div class="row ">
      <div class="col-4 mt-3 donhang">
        <div class="shadow p-3 rounded bg-body">
          <div class="col-md-12 text-success">
                          <h5> <span><i class="fa-solid fa-cart-shopping"></i></span> Danh Sách Sản Phẩm</h5>
                          <hr>
                      </div>
                      <HoaDonList
                          v-if="filteredDatHangCount > 0"
                          :listdathang="filteredDatHang"
                          v-model:activeIndex="activeIndex"
                          @delete:DatHang="deleteDatHang"
                          />
                          <p v-else>Không có sản phẩm nào</p>
              </div>
      <div class="row mb-3 thanhbutton">
          <button class="btn btn-sm btn-primary col-2 m-3" @click="refreshList()">
              <i class="fas fa-redo"></i> Làm mới
          </button>
          <button
              class="btn btn-sm btn-danger col-2 m-3"
              @click="removeAllContacts"
              >
              <i class="fas fa-trash"></i> Xóa tất cả
          </button>
      </div>
            
          </div>
          <div class="col-7 mt-3">
            <div>
              <div class="shadow mb-3 bg-body rounded"  v-if="activeDatHang">
                  <div class="row ">
                      <div class="row p-3 text-success text-left">
                          <h3 class="col-4 ml-2">Chi tiết hoá đơn</h3>
                          <div class="hieuchinh col-md-5 text-success">
                       <!-- <router-link id="route-link" style="text-decoration: none; color: #2b7778;"
                                :to="{ name: 'editsanpham', params: { id: activeHangHoa._id } }"
                                >
                            <i class="fas fa-edit"></i> Hiệu chỉnh
                        </router-link> -->
                        <button class="btn btn-sm btn-primary col-md-4" >
                            Xác nhận đơn
                        </button>
                     </div> 
                  <hr>
                      </div>
                      <div class="col-md-12">
                          <HoaDonCard :dondathang="activeDatHang" />
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
import HoaDonList from "@/components/HoaDonList.vue";
import dathangService from "@/services/dathang.service";
import InputSearchAdmin from "@/components/InputSearchAdmin.vue";
import HoaDonCard from "../components/HoaDonCard.vue";
export default {
  components: {
    AppHeaderAdmin,
    AppFooterAdmin,
    InputSearchAdmin,
    HoaDonList,
    HoaDonCard
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
          DatHangtrings() {
        return this.listdathang.map((sanpham) => {
            const { ngaydat, ngaygiao, tinhtrang, tongtien, diachigiao } = sanpham;
            return [ngaydat, ngaygiao, tinhtrang, tongtien, diachigiao].join("");
        });
    },
    filteredDatHang() {
        if (!this.searchText) return this.listdathang;
        const searchTextLower = this.searchText.toLowerCase();
        console.log("Search Text:", searchTextLower);
        return this.listdathang.filter((_DatHang, index) =>
            this.DatHangtrings[index].toLowerCase().includes(searchTextLower)
        );
    },
          activeDatHang() { // liên hệ đang được chọn kiểm tra
              if (this.activeIndex < 0) return null;
              return this.filteredDatHang[this.activeIndex];
          },
          filteredDatHangCount() {
             return this.filteredDatHang.length; //sl các liên hệ khi tìm kiếm
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
      async removeAllDatHang() {
              // xoá tất cả liên hệ
              if (confirm("Bạn muốn xóa tất cả Liên hệ?")) {
                  try {
                      await dathangService.deleteAll();
                      this.refreshList();
                  } catch (error) {
                      console.log(error);
                  }
              }
          },
      goToAddDatHang() {
             this.$router.push({ name: "addsanpham" }); 
          },
      async deleteDatHang(DatHang) {  // ham cho phuong thuc delete
                  try {
                     
                      await dathangService.delete(DatHang._id);
                      await hinhanhService.deleteHinhAnhSanPham(DatHang._id);
                     
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

.donhang{
  margin-left: 3rem;
}


</style>
