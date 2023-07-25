import axios from 'axios';
import { createRoot } from 'react-dom/client';
import SimpleBackdrop from './../components/SimpleBackdrop.js'

const apicaller = axios.create({
    baseURL: 'http://localhost:5015/api',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Connection': 'Keep-Alive'
    },
    withCredentials: true
});

const logOut = () => {
    localStorage.removeItem("token");

    window.location = '/';
};

apicaller.interceptors.request.use(
    config => {
        const token = localStorage.token;
        if (token) {
            config.headers["Authorization"] = "Bearer " + token;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

apicaller.interceptors.response.use(
    response => {
        if (response.status == 200 || response.status == 201) {
            return Promise.resolve(response);
        } else if (response.status == 401) {
            logOut();
        } else if (response.status == 403) {
            console.log("403 error");
            window.alert("Bu İşlem için Yetkiniz Bulunmamaktadır!");
        }
        else {
            return Promise.reject(response);
        }
    },
    error => {
        if (error && error.response && error.response.status) {
            if (error.response.status == 401) {
                logOut()
            } else {
                return Promise.resolve(error.response);
            }
        } else if (error && error.message) {
            return Promise.resolve(error);
        }
    }
);

const api = {
    AUTH: {
        login: async (username, password) => {
            const request = {
                username: username, password: password
            }

            // If request time is longer or you put a breakpoint on server, you can show the loading.
            const portalRoot = document.getElementById('loading-portal');
            const root = createRoot(portalRoot);
            root.render(<SimpleBackdrop />);


            try {
                const response = await apicaller.post('/auth/login', request);
                root.unmount();
                return response;
            } catch (error) {
                root.unmount();
                throw error;
            }
        },

        register: async (email, username, password) => {
            const portalRoot = document.getElementById('loading-portal');
            const root = createRoot(portalRoot);
            root.render(<SimpleBackdrop />);

            const request = {
                email: email, username: username, password: password
            }

            try {
                const response = await apicaller.post('/auth/register', request);
                root.unmount();
                return response;
            } catch (error) {
                root.unmount();
                throw error;
            }
        },
    },
    BUILDING_TYPE: {
        getAll: async () => {
            const portalRoot = document.getElementById('loading-portal');
            const root = createRoot(portalRoot);
            root.render(<SimpleBackdrop />);

            try {
                const response = await apicaller.get('/buildingtype');
                root.unmount();
                return response;
            } catch (error) {
                root.unmount();
                throw error;
            }
        }

    },
    CONFIGURATION: {
        getAllConfigData: async () => {
            try {
                const response = await apicaller.get('/configuration');
                return response;
            } catch (error) {
                throw error;
            }
        },
        add: async (configuration) => {

            try {
                const response = await apicaller.post('/configuration', configuration);
                return response;
            } catch (error) {
                throw error;
            }
        },
        delete: async (id) => {
            try {
                const response = await apicaller.delete(`/configuration/${id}`);
                return response;
            } catch (error) {
                throw error;
            }
        }
    }



};

export default api;