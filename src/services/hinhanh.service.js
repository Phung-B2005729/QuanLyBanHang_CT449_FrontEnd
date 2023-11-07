import createApiClient from "./api.service";
class HinhAnhService {
    constructor(baseUrl="/api/hinhanh"){
        this.api = createApiClient(baseUrl);  // axios.create bên api.service
    }
    // các hàm tương tác với backend 
    async upload(formData) {
         return (await this.api.post("/upload",formData,)).data;
    }
    async create(data){
        return (await this.api.post("/", data)).data;
    }
    async getHinhAnhSanPham(idsanpham){
        return (await this.api.get(`/idhanghoa/${idsanpham}`)).data;
    }
 }
       
export default new HinhAnhService();