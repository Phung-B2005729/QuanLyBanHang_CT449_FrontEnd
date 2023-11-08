import { createWebHistory, createRouter } from "vue-router";
//createRouter tạo một thể hiện của Vue Router để quản lý các định tuyến
//createWebHistory được sử dụng để tạo một loại lịch sử định tuyến
import TrangChu from '@/views/TrangChu.vue'
import Admin from '@/views/Admin.vue'
import store from '@/store';
import SanPham from '@/views/SanPham.vue'
import SanPhamChiTiet from '@/views/SanPhamChiTiet.vue'
import DonHang from '@/views/DonHang.vue'
import GioHang from '@/views/GioHang.vue'
import CaNhan from '@/views/CaNhan.vue'
import ThanhToan from '@/views/ThanhToan.vue'
import ChiTietDonHang from '@/views/ChiTietDonHang.vue';
    const routes = [
        {
            path: "/",
            name: "trangchu",
            component: TrangChu, // trang hiển thị
        }, 
        {
            path: "/admin",
            name: "admin",
            component: Admin,
            beforeEnter: (to, from, next) => {
                // Kiểm tra xem người dùng đã đăng nhập thành công chưa
                const sessionAdmin = store.state.session_admin;
                if (sessionAdmin) {
                  // Đã đăng nhập, chuyển hướng đến trang chính
                  next();
                } else {
                  // Chưa đăng nhập, cho phép truy cập trang đăng nhập
                  next('/admin/dangnhap');
                }
              }, // trang hiển thị
        }, 
        {
          path: "/sanpham/:id",
          name: "sanpham",
          component: SanPham, // trang hiển thị
          

      }, 
      {
        path: "/sanphamchitiet/:id",
        name: "sanphamchitiet",
        component: SanPhamChiTiet, // trang hiển thị
       

    }, 
    {
      path: "/donhang",
      name: "DonHang",
      component: DonHang, // trang hiển thị
      beforeEnter: (to, from, next) => {
        // Kiểm tra xem người dùng đã đăng nhập thành công chưa
        const sessionUser = store.state.session_user;
        if (sessionUser!=null) {
          // đã đăng nhập, chuyển hướng đến trang chính
          next();
        } else {
          // chưa đăng nhập, cho phép truy cập trang đăng nhập
          next("/");
        }
      },

  }, 
  {
    path: "/chitietdonhang",
    name: "ChiTietDonHang",
    component: ChiTietDonHang, // trang hiển thị
    beforeEnter: (to, from, next) => {
      // Kiểm tra xem người dùng đã đăng nhập thành công chưa
      const sessionUser = store.state.session_user;
      if (sessionUser!=null) {
        // đã đăng nhập, chuyển hướng đến trang chính
        next();
      } else {
        // chưa đăng nhập, cho phép truy cập trang đăng nhập
        next("/");
      }
    },
}, 
  
  {
    path: "/thanhtoan",
    name: "thanhtoan",
    component: ThanhToan, // trang hiển thị
    beforeEnter: (to, from, next) => {
      // Kiểm tra xem người dùng đã đăng nhập thành công chưa
      const sessionUser = store.state.session_user;
      if (sessionUser!=null) {
        // đã đăng nhập, chuyển hướng đến trang chính
        next();
      } else {
        // chưa đăng nhập, cho phép truy cập trang đăng nhập
        next("/");
      }
    },
}, 
  {
    path: "/canhan",
    name: "CaNhan",
    component: CaNhan, // trang hiển thị
   
    beforeEnter: (to, from, next) => {
      // Kiểm tra xem người dùng đã đăng nhập thành công chưa
      const sessionUser = store.state.session_user;
      if (sessionUser!=null) {
        // đã đăng nhập, chuyển hướng đến trang chính
        next();
      } else {
        // chưa đăng nhập, cho phép truy cập trang đăng nhập
        next("/");
      }
    },

}, 
  {
    path: "/giohang",
    name: "GioHang",
    component: GioHang, // trang hiển thị
   
    beforeEnter: (to, from, next) => {
      // Kiểm tra xem người dùng đã đăng nhập thành công chưa
      const sessionUser = store.state.session_user;
      if (sessionUser!=null) {
        // đã đăng nhập, chuyển hướng đến trang chính
        next();
      } else {
        // chưa đăng nhập, cho phép truy cập trang đăng nhập
        next("/");
      }
    },

}, 
        {
            path: "/dangnhap",  // đường dẫn trang edit
            name: "DangNhap",
            component: () => import("@/views/DangNhap.vue"),
            beforeEnter: (to, from, next) => {
                // Kiểm tra xem người dùng đã đăng nhập thành công chưa
                const sessionUser = store.state.session_user;
                if (sessionUser) {
                  // Đã đăng nhập, chuyển hướng đến trang chính
                  next("/");
                } else {
                  // Chưa đăng nhập, cho phép truy cập trang đăng nhập
                  next();
                }
              },
           
            //cho phép bạn truyền tham số id từ đường dẫn vào thành phần ContactEdit
        },
        {
            path: "/dangky",  // đường dẫn trang add
            name: "DangKy",
           
            component: () => import("@/views/DangKy.vue"),
            beforeEnter: (to, from, next) => {
                // Kiểm tra xem người dùng đã đăng nhập thành công chưa
                const sessionUser = store.state.session_user;
                if (sessionUser) {
                  // Đã đăng nhập, chuyển hướng đến trang chính
                  next("/");
                } else {
                  // Chưa đăng nhập, cho phép truy cập trang đăng nhập
                  next();
                }
              },
            
        },
        {
          path: "/:pathMatch(.*)*",
          name: "notfound",
          component: () => import("@/views/NotFound.vue"),
          },

    ];
    const router = createRouter({
        history: createWebHistory(import.meta.env.BASE_URL),
        routes, 
    });
export default router;