<template>
    <Form
        @submit="submitHangHoa"
        :validation-schema="HangHoaFormSchema"  
    >
    <!--đặt kiểm tra dữ liệu gàng buộc với các trường nhập liệu :validation-schema="HangHoaFormSchema"  -->
        <div class="form-group">
            <label for="name">Tên Hàng Hoá</label>
            <Field
                name="name"
                type="text"
                class="form-control"
                v-model="HangHoaLocal.tenhh"
            />
            <ErrorMessage name="name" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="mota">Mô tả</label>
            <Field
                name="mota"
                type="text"
                class="form-control"
                v-model="HangHoaLocal.mota"
            />
            <ErrorMessage name="mota" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="gia">Giá Bán</label>
            <Field
                name="gia"
                type="text"
                class="form-control"
                v-model="HangHoaLocal.gia"
            />
            <ErrorMessage name="gia" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="soluong">Số Lượng</label>
            <Field
                name="soluong"
                type="text"
                class="form-control"
                v-model="HangHoaLocal.soluong"
            />
            <ErrorMessage name="gia" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="thuonghieu">Thương Hiệu</label>
            <Field
                name="thuonghieu"
                type="text"
                class="form-control"
                v-model="HangHoaLocal.thuonghieu"
            />
            <ErrorMessage name="gia" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="loaiHangHoa">Loại Hàng Hóa</label>
            <select
                name="loaiHangHoa"
                class="form-control"
                v-model="HangHoaLocal.loaiHangHoa"
            >
                <option value="hat_meo">Hạt Mèo</option>
                <option value="hat_cho">Hạt Cho</option>
                <option value="pate">Pate</option>
                <!-- Thêm các loại hàng khác nếu cần -->
            </select>
            <ErrorMessage name="loaiHangHoa" class="error-feedback" />
            </div>
            <div class="form-group">
            <label for="ngaysanxuat">Ngày sản xuất</label>
            <Field
                name="ngaysanxuat"
                type="date"
                class="form-control"
                v-model="HangHoaLocal.ngaysanxuat"
            />
            <ErrorMessage name="hansudung" class="error-feedback" />
</div>
            <div class="form-group">
            <label for="hansudung">Hạn sử dụng</label>
            <Field
                name="hansudung"
                type="date"
                class="form-control"
                v-model="HangHoaLocal.hansudung"
            />
            <ErrorMessage name="hansudung" class="error-feedback" />
</div>
        <div class="form-group">
            <label for="hinhanh">Hình ảnh</label>
            <input
                type="file"
                name="hinhanh"
                class="form-control-file"
                @change="handleImageChange"
            />
            <ErrorMessage name="hinhanh" class="error-feedback" />

            <!-- Hiển thị hình ảnh đã chọn (nếu có) -->
            <div v-if="HangHoaLocal.hinhanh">
                <img :src="HangHoaLocal.hinhanh" alt="Hình ảnh" style="max-width: 100px; max-height: 100px;" />
            </div>
            </div>
        <div class="form-group">
            <button class="btn btn-primary">Lưu</button>
            <button
                v-if="HangHoaLocal._id || mode === 'edit'"
               
                type="button"
                class="ml-2 btn btn-danger"
                @click="deleteHangHoa"
                >
            Xóa
            </button>
        </div>
    </Form>
</template>

<script>
import { format, parseISO } from "date-fns";
//  this.HangHoaLocal.ngayHetHan = format(parseISO(this.HangHoaLocal.ngayHetHan), "dd/MM/yyyy");
    import * as yup from "yup"; // thư viện xác thực kiểm tra tính hợp lệ
    import { Form, Field, ErrorMessage } from "vee-validate"; // thư viện xây dựng các Form thực hiện xác thực dữ liệu
        //Form: tạo Form chứa các trường nhập liệu, quản lý trạng thái,sự kiện gửi.
        //Field: tạo các trường nhập liệu trong trong Form
        //ErrorMessage: hiển thị thông báo lỗi nếu việc kiểm tra tính hợp lệ thất bại.
    export default {
        components: {
            Form,
            Field,
            ErrorMessage,
        },
        emits: ["submit:HangHoa", "delete:HangHoa"],
        props: {
            HangHoa: { type: Object, default: null }, // dữ lieu HangHoa nhận từ HangHoaadd, HangHoaedit
            mode: { type: String, default: "create" },// dữ lieu HangHoa nhận từ HangHoaadd, HangHoaedit
        },
        data() {
            const HangHoaFormSchema = yup.object().shape({  // tạp 1 schema để kiểm tra dữ liệu
                // định nghĩa các ràng buộc dữ liệu nhập vào
                name: yup.string().required("Tên phải có giá trị.").min(2, "Tên phải ít nhất 2 ký tự.").max(50, "Tên có nhiều nhất 50 ký tự."),
                thuonghieu: yup.string().required("Thương hiệu phải có giá trị."),
                loaiHangHoa: yup.string().required("Tên phải có giá trị."),
                hansudung: yup.date().required("Hạn sử dụng không được bỏ trống."),
                ngaysanxuat: yup.date().required("Ngày sản xuất không được bỏ trống."),

                //
                mota: yup.string().max(50, "Địa chỉ tối đa 50 ký tự."),
                //
                soluong: yup.string().test("is-number", "Số lượng phải là số", (value) => !isNaN(value)),
                gia: yup.string().test("is-number", "Số lượng phải là số", (value) => !isNaN(value)),
            });
            return {
                HangHoaLocal: this.HangHoa || { name: "", email: "", mota: "", gia: "", favorite: false },
                HangHoaFormSchema,
            };
        },
        methods: {
            submitHangHoa() {
                this.$emit("submit:HangHoa", this.HangHoaLocal);  // sự kiện submit
                
            },
            deleteHangHoa() {
                this.$emit("delete:HangHoa", this.HangHoaLocal.id);  // sự kiện delete
            },
        },
    };
</script>
<style scoped>
        @import "@/assets/form.css";
</style>