import {AUTH_TOKEN, ROLE_ADMIN, USER_INFO} from "./const";

export const isLogin = () => {
    return localStorage.getItem(USER_INFO);
}

export const getRole = () => localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')).is_admin : ROLE_ADMIN

export const nullOrUndefined = (collection) => {
    return collection.filter(e => e == null).length > 0
}
