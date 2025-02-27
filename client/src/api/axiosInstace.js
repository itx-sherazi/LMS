    import axios from 'axios';


    const axiosInstance = axios.create({
        baseURL: 'http://localhost:8000',
        withCredentials: true // ✅ Cookies allow karne ke liye
    })
    axiosInstance.interceptors.request.use(config=>{
        const accessToken = sessionStorage.getItem('accessToken');
        if(accessToken){
            config.headers.Authorization=`Bearer ${accessToken}`;
        }
        return config;
        },error=>{
        return Promise.reject(error);
    })

    export default axiosInstance;


//     import axios from 'axios';

// const axiosInstance = axios.create({
//     baseURL: 'http://localhost:8000',
//     withCredentials: true // ✅ Cookies allow karne ke liye
// });

// export default axiosInstance;
