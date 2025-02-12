import { defineStore } from 'pinia';
import Cookies from "js-cookie";
import Api from "../../../utils/index.js";

export const useUsersStore = defineStore('users', {
    state: () => ({
        dataUsers: [],
        isLoading: false,
        search: "",
    }),
    getters: {
        getDataUsers(state) {
            return state.dataUsers;
        },
        filtersDataUsers(state) {
            return state.dataUsers.filter(data => {
                const matchesSearch = data.name.toLowerCase().includes(state.search.toLowerCase());
                const matchesEmail = data.email.toLowerCase().includes(state.search.toLowerCase());
                return matchesSearch || matchesEmail;
            });
        }
    },
    actions: {
        async dataListUsers(forceRefresh = false) { //forceRefresh untuk refresh data ulang
            try {
                if (this.isLoading || (!forceRefresh && this.dataUsers.length > 0)) return;

                this.isLoading = true;

                const token = Cookies.get("token");
                Api.defaults.headers.common["Authorization"] = token;

                const res = await Api.get('/api/admin/users/getallusers');
                // console.log('Data received from API:', res.data.data);
                this.dataUsers = res.data.data;
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                this.isLoading = false;
            }
        },
        async deleteUser(id) {
            try {
                const token = Cookies.get("token");
                Api.defaults.headers.common["Authorization"] = token;

                await Api.delete(`/api/admin/users/deleteusers/${id}`);
                await this.dataListUsers(true); // Force data refresh setelah hapus
            } catch (error) {
                console.error('Error deleting user:', error);
            }
        },
        addUser(user) {
            this.dataUsers.push(user);
        },
        setSearchKeyword(keyword) {
            this.search = keyword;
        },
    },
});
