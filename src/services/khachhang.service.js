import createApiClient from "./api.service";
class KhachHangService {
    constructor(baseUrl="/api/khachhang"){
        this.api = createApiClient(baseUrl);  // axios.create bên api.service
    }
    // các hàm tương tác với backend contact
    async getAll() {
         return (await this.api.get("/")).data;
    }
    async create(data) {
        return (await this.api.post("/register", data)).data;
    }
   async login(data){
    return (await this.api.post("/login", data)).data;
   }
   async logout(){
    return (await this.api.post("/logout")).data;
   }
   async getById(id){
    return (await this.api.get(`/${id}`)).data;
    }
    async update(id, data) {
        return (await this.api.put(`/${id}`, data)).data;
    }
    async delete(id) {
        return (await this.api.delete(`/${id}`)).data;
    }
    async deleteALL() {
        return (await this.api.delete("/")).data;
    }
}
       
export default new KhachHangService();