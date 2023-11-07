import createApiClient from "./api.service";
class HangHoaService {
    constructor(baseUrl="/api/hanghoa"){
        this.api = createApiClient(baseUrl);  // axios.create bên api.service
    }
    // các hàm tương tác với backend contact
    async getAll() {
         return (await this.api.get("/")).data;
    }
    async create(data) {
        return (await this.api.post("/", data)).data;
    }
    async update(id, data) {
        return (await this.api.put(`/${id}`, data)).data;
}
    async delete(id) {
        return (await this.api.delete(`/${id}`)).data;
    }
    async getALLSanPhamTheoLoai(idloai) {
        return (await this.api.get(`/loaihang/${idloai}`)).data;
    }
    async getById(id){
        return (await this.api.get(`/${id}`)).data;
    }
}
       
export default new HangHoaService();