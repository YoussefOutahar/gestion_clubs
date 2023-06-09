import { getCurrentUser } from "./DataBase/Clients/UsersClient";

export const getNavigations = async () => {
    const user = await getCurrentUser();

    const adminNavigations = [
        {
            name: "Dashboard",
            path: "/dashboard/default",
            icon: "dashboard",
            children: [
                {
                    name: "Summary",
                    path: "/summary/global",
                    iconText: "S",
                },
                {
                    name: "Clubs",
                    path: "/summary/clubs",
                    iconText: "C",
                },
                {
                    name: "Memebers",
                    path: "/summary/members",
                    iconText: "M",
                },
                {
                    name: "Events",
                    path: "/summary/events",
                    iconText: "E",
                },
            ],
        },
        { label: "General", type: "label" },
        {
            name: "Clubs",
            path: "/clubs",
            icon: "home",
        },
        {
            name: "Memebers",
            path: "/members",
            icon: "group",
        },
        {
            name: "Events",
            path: "/events",
            icon: "event",
        },
        {
            name: "Finances",
            path: "/finance",
            icon: "account_balance_wallet",
        },
        {
            name: "AddCharge",
            path: "/AddCharge",
            icon: "account_balance_wallet",
        },
        {
            name: "Supp Budget",
            path: "/Supp_Budget",
            icon: "account_balance_wallet",
        },
        {
            name: "AssignBudget",
            path: "/AssignBudget",
            icon: "account_balance_wallet",
        },
        {
            name: "Admin Finance",
            path: "/AdminFinance",
            icon: "account_balance_wallet",
        },
        { label: "PAGES", type: "label" },
        {
            name: "Session/Auth",
            icon: "security",
            children: [
                { name: "Sign up", iconText: "SU", path: "/session/signup" },
                { name: "Forgot Password", iconText: "FP", path: "/session/forgot-password" },
                { name: "Error", iconText: "404", path: "/session/404" },
            ],
        },
        { label: "Components", type: "label" },
        {
            name: "Components",
            icon: "favorite",
            badge: { value: "30+", color: "secondary" },
            children: [
                { name: "Auto Complete", path: "/material/autocomplete", iconText: "A" },
                { name: "Buttons", path: "/material/buttons", iconText: "B" },
                { name: "Checkbox", path: "/material/checkbox", iconText: "C" },
                { name: "Dialog", path: "/material/dialog", iconText: "D" },
                { name: "Expansion Panel", path: "/material/expansion-panel", iconText: "E" },
                { name: "Form", path: "/material/form", iconText: "F" },
                { name: "Icons", path: "/material/icons", iconText: "I" },
                { name: "Menu", path: "/material/menu", iconText: "M" },
                { name: "Progress", path: "/material/progress", iconText: "P" },
                { name: "Radio", path: "/material/radio", iconText: "R" },
                { name: "Switch", path: "/material/switch", iconText: "S" },
                { name: "Slider", path: "/material/slider", iconText: "S" },
                { name: "Snackbar", path: "/material/snackbar", iconText: "S" },
                { name: "Table", path: "/material/table", iconText: "T" },
            ],
        },
        {
            name: "Charts",
            icon: "trending_up",
            children: [{ name: "Echarts", path: "/charts/echarts", iconText: "E" }],
        },
        {
            name: "LandingPage",
            icon: "store_front",
            path: "/LandingPage",
        },
    ];

    const userNavigations = [
        {
            name: "Dashboard",
            path: "/dashboard/default",
            icon: "dashboard",
        },
    ];

    if (user) {
        if (user.user_metadata["role"] === "admin") {
            return adminNavigations;
        } else if (user.user_metadata["role"] === "user") {
            return userNavigations;
        }
    }
};
