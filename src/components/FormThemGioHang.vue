<template>
     <form  @submit="submitthemgiohang">
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
                                                            min="1"
                                                            :max="sanphamgiohang.soluong"
                                                            v-model="data.soluong"
                                                            @input="checkSoluong">
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
    idkhachhang: {default: null}
  },
    data() {
      return {
        sanphamgiohang: this.sanpham,
        message: null,
        idkhachhang: this.idkhachhang,
        data: { idkhachhang: this.idkhachhang, idhanghoa: this.sanpham._id, gia: this.sanpham.gia, soluong: this.soluong },
        
      };
    },
    methods: {
    checkSoluong() {
      if (this.data.soluong == this.sanphamgiohang.soluong) {
        this.message = "Số lượng đã đạt tối đa";
      } else {
        this.message = null;
      }
     
    },
   async submitthemgiohang()  {
      this.sanphamgiohang.soluong = await this.sanphamgiohang.soluong - this.data.soluong; 
                this.$emit("submit:themgiohang", this.data, this.sanphamgiohang);  // sự kiện submit
            },
   giamsoluong(){
   
    if (this.data.soluong == 1) {
        this.message=null;
      } else {
        this.message = null;
        this.data.soluong= this.data.soluong - 1;
      }
   },
   tangsoluong(){
   
    if (this.data.soluong == this.sanphamgiohang.soluong) {
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
<!--
  <template>
  <Form @submit="submitthemgiohang">
    <div class="row form-group">
      <label for="soluong" class="col-2 mt-2"><b>Số Lượng :</b></label>
      <div class="col-6">
        <div class="btn-group" role="group" aria-label="Button group with nested dropdown">
          <p @click="giamsoluong()" class="btn btn-outline-secondary"><i class="fas fa-minus"></i></p>
          <p class="btn btn-outline-secondary">{{data.soluong}}</p>
          <p @click="tangsoluong()" class="btn btn-outline-secondary"><i class="fa fa-plus"></i></p>
          <Field
            type="number"
            name="soluong"
            class="sl text-center form-control"
            min="1"
            :max="sanphamgiohang.soluong"
            v-model="data.soluong"
          ></Field>
        </div>
      </div>
      <div class="col-6 text-error">
        <ErrorMessage name="soluong" class="text-danger"></ErrorMessage>
      </div>
    </div>
    <div class="col-12 mt-4 form-group">
      <button class="addgh text-center text-light form-control bg-danger shadow-sm rounded">
        THÊM VÀO GIỎ HÀNG
      </button>
    </div>
  </Form>
</template>
<script>
import * as yup from 'yup';
import { defineComponent } from 'vue';
import { useForm, Field } from 'vee-validate';

const validationSchema = yup.object().shape({
  soluong: yup
    .number()
    .min(1, 'Số lượng phải lớn hơn 0')
    .max(this.sanphamgiohang.soluong, 'Số lượng đã đạt tối đa'),
});

export default defineComponent({
  setup() {
    const { handleSubmit } = useForm();

    const data = {
      idkhachhang: this.idkhachhang,
      idhanghoa: this.sanpham._id,
      gia: this.sanpham.gia,
      soluong: this.soluong,
    };

    const submitthemgiohang = handleSubmit(async () => {
      this.sanphamgiohang.soluong = this.sanphamgiohang.soluong - this.data.soluong;
      this.$emit('submit:themgiohang', this.data, this.sanphamgiohang);
    });

    const giamsoluong = () => {
      if (this.data.soluong === 1) {
        this.message = null;
      } else {
        this.message = null;
        this.data.soluong = this.data.soluong - 1;
      }
    };

    const tangsoluong = () => {
      if (this.data.soluong === this.sanphamgiohang.soluong) {
        this.message = 'Số lượng đã đạt tối đa';
      } else {
        this.data.soluong = this.data.soluong + 1;
        this.message = null;
      }
    };

    return {
      data,
      submitthemgiohang,
      giamsoluong,
      tangsoluong,
    };
  },
});
</script>

-->