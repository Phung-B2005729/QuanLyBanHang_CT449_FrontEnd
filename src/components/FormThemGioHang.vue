<template>
     <form  @submit.prevent="submitthemgiohang">
                            <div class="row form-group">
                              <label for="soluong" class="col-2 mt-2"><b>Số Lượng :</b></label>
                                <div class="col-6">
                                   
                                        <div class="btn-group" role="group" aria-label="Button group with nested dropdown">
                                            <p @click="giamsoluong()" class="btn btn-outline-secondary"><i class="fas fa-minus"></i></p>
                                            <p class="btn btn-outline-secondary">{{data.soluong}}</p>
                                            <p @click="tangsoluong()" class="btn btn-outline-secondary"><i class="fa fa-plus"></i></p>
                                            <input  type="number" hidden
                                                            name="soluong"
                                                            readonly
                                                            class="sl text-center form-coltrol"
                                                            min="0"
                                                            :max="sanphamgiohang.soluong"
                                                            v-model="data.soluong"
                                                           >
                                    </div>
                                </div>
                                <div class="col-6 text-error"> 
                                  {{message}}
                                </div>
                            </div>
                                <div class="col-12 mt-4 form-group">
                               
                                    <button
                                        class="addgh text-center text-light form-control bg-danger shadow-sm rounded">
                                        THÊM VÀO GIỎ HÀNG
                                    </button>
                                   
                                </div>
                        </form>
</template>
<script>
export default {

    emits: ["submit:themgiohang"],
  props: {
    sanpham: {default: null }, // Dữ liệu user đăng nhập
    soluong: {default: 1},
    idkhachhang: {default: null},
  },
    data() {
      return {
        sanphamgiohang: this.sanpham,
        message: null,
        idkhachhang: this.idkhachhang,
        data: { idkhachhang: this.idkhachhang, idhanghoa: this.sanpham._id, gia: this.sanpham.gia, soluong: this.sanpham.soluong==0 ? 0 : this.soluong },
        
      };
    },
    methods: {
   
    setMessage(message) {
      this.message = message;
      setTimeout(() => {
        this.message = null;
      }, 2000); // 2000 milliseconds (2 seconds)
    },
   async submitthemgiohang()  {
    if(this.sanphamgiohang.soluong==0){
            this.message="Hàng đã hết"
    }
    else{
      this.sanphamgiohang.soluong = await this.sanphamgiohang.soluong - this.data.soluong; 
      await   this.$emit("submit:themgiohang", this.data, this.sanphamgiohang);  // sự kiện submit
      this.setMessage('Đã thêm vào giỏ hàng');
    }
    
            },
   giamsoluong(){
    if(this.sanpham.soluong==0){
     
    }
   else if (this.data.soluong <= 1) {
        this.message=null;
      } else {
        this.message = null;
        this.data.soluong= this.data.soluong - 1;
      }
   },
   tangsoluong(){
    if( this.sanphamgiohang.soluong==0){
        this.message="Hàng đã hết"
      }
      else if (this.data.soluong >= this.sanphamgiohang.soluong) {
        this.message = "Số lượng đã đạt tối đa";
      } else {
        this.data.soluong= this.data.soluong +1;
        this.message = null;
      }
   }
  },
}
</script>
<style>
.text-error{
    color: rgb(215, 78, 78);
}

</style>
