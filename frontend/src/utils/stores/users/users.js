import { defineStore } from 'pinia';

import Cookies from "js-cookie";

import Api from "../../../utils/index.js";

const token = Cookies.get("token");

export const useUsersStore = defineStore('users', {
    state: () => ({
        dataUsers: [],
        isLoading: false,
        search: "",
    }),
    getters: {
        getDataUsers(state) {
            return state.dataUsers
        },
        filtersDataUsers(state) {
            return state.dataUsers.filter(data => {
                const matchesSearch = data.name.toLowerCase().includes(state.search.toLowerCase());
                const matchesEmail = data.email.toLowerCase().includes(state.search.toLowerCase());
                return matchesSearch || matchesEmail;
            })
        }
    },
    actions: {
        async dataListUsers() {
            try {
                if (this.isLoading || this.dataUsers.length > 0) return;

                this.isLoading = true;

                Api.defaults.headers.common["Authorization"] = token;
                const res = await Api.get('/api/admin/users/getallusers')
                console.log('hasil res:', res.data.data)
                this.dataUsers = res.data.data;
            } catch (error) {
                console.error(error)
            } finally {
                this.isLoading = false;
            }
        },
        setSearchKeyword(keyword) {
            this.search = keyword;
        },
    },
});
