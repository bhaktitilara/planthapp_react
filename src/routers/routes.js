import {
    CHALLENGE_PATH,
    DASHBOARD_PATH, DONATION_PATH, EMPLOYEE_PATH,
    LOGIN_PATH
} from '../config/path'

const routes = [
    {
        path: LOGIN_PATH,
        exact: true,
        isPrivate: false,
        component: import('../containers/auth/LoginContainer'),
        restricted: true
    },
    {
        path: DASHBOARD_PATH,
        exact: true,
        isPrivate: true,
        component: import('../containers/HomeContainer'),
        restricted: true
    },
    {
        path: CHALLENGE_PATH,
        exact: true,
        isPrivate: true,
        component: import('../containers/ChallengeContainer'),
        restricted: true
    },
    {
        path: DONATION_PATH,
        exact: true,
        isPrivate: true,
        component: import('../containers/DonationContainer'),
        restricted: true
    },
    {
        path: EMPLOYEE_PATH,
        exact: true,
        isAdmin: true,
        isPrivate: true,
        component: import('../containers/EmployeeContainer'),
        restricted: true
    },
]

export default routes
