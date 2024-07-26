// utils/auth.js
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';
import { useRouter } from 'vue-router';

export function checkToken() {
    const token = Cookies.get('token');
    const router = useRouter();

    // Get current route
    const currentRoute = router.currentRoute.value.name;

    // Check if token exists
    if (!token && currentRoute !== 'login') {
        Swal.fire({
            icon: 'warning',
            title: 'Session Expired',
            text: 'Your session has expired. Please log in again.',
            confirmButtonText: 'OK'
        }).then(() => {
            router.push({ name: 'login' });
        });
    }
}
