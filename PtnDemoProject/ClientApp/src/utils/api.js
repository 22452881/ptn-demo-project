import axios from 'axios';
import { createRoot } from 'react-dom/client';
import SimpleBackdrop from './../components/SimpleBackdrop.js'
const apicaller = axios.create({
    baseURL: 'http://localhost:5015/api',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        'Access-Control-Allow-Headers': '*',
        'Connection': 'Keep-Alive'
    },
    withCredentials: true
});

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
        add: async (configuration) => {
            const portalRoot = document.getElementById('loading-portal');
            const root = createRoot(portalRoot);
            root.render(<SimpleBackdrop />);

            try {
                const response = await apicaller.post('/configuration', configuration);
                root.unmount();
                return response;
            } catch (error) {
                root.unmount();
                throw error;
            }
        }
    }



};

export default api;