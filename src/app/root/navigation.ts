import { FuseNavigationItem } from "@fuse/components/navigation";

export const navigationItem : FuseNavigationItem[]= [
    // {
    //     icon: "heroicons_outline:chart-pie",
    //     id: "Transaction",
    //     title: "Transaction",
    //     type: "collapsable",
    //     feature: "transaction",
    //     children: [
    //         {
    //             icon: "currency_exchange",
    //             id: "transaction",
    //             link: "/transaction",
    //             title: "Transaction",
    //             type: "basic",
    //             feature: "transaction"
    //         },
    //         {
    //             icon: "heroicons_outline:chart-pie",
    //             id: "example",
    //             link: "/examplevv",
    //             title: "child 2",
    //             type: "basic",
    //             feature: "child 2"
    //         }
    //     ]
    // },
    // {
    //     icon: "account_circle",
    //     id: "Account",
    //     title: "Account",
    //     type: "collapsable",
    //     feature: "account",
    //     children: [
    //         {
    //             icon: "person_add_alt",
    //             id: "account-account",
    //             link: "/account/create",
    //             title: "Create Account",
    //             type: "basic",
    //             feature: "account-create"
    //         },
    //         {
    //             icon: "info",
    //             id: "account-detail",
    //             link: "/account/detail",
    //             title: "Detail Account",
    //             type: "basic",
    //             feature: "account-detail"
    //         },
    //         {
    //             icon: "account_balance",
    //             id: "account-balance",
    //             link: "/account/balance",
    //             title: "Account Balance",
    //             type: "basic",
    //             feature: "account-balance"
    //         },
    //         {
    //             icon: "manage_accounts",
    //             id: "account-statement",
    //             link: "/account/statement",
    //             title: "Account Statement",
    //             type: "basic",
    //             feature: "account-statement"
    //         },
    //     ]
    // },
    {
        icon: "home",
        id: "Home",
        title: "Home",
        type: "basic",
        feature: "home",
        link: "/home",
    },
    {
        icon: "install_mobile",
        id: "Mobile Recharge",
        link: "/mobile-recharge",
        title: "Mobile Recharge",
        type: "basic",
        feature: "mobile-recharge",
        usualImage: "",
        selectedImage: "",
    },
    {
        icon: "", 
        usualImage: "AddMoney",
        selectedImage: "AddMoney_White",
        id: "Transfer",
        title: "Add   Money",
        type: "basic",
        feature: "add-money",
        link: "/add-money",
    },
    {
        icon: "",
        id: "Pay Bill",
        link: "/pay-bill",
        title: "Pay Bill",
        type: "basic",
        feature: "pay-bill",
        usualImage: "PayBill",
        selectedImage: "PayBill_White",
    },
    {
        icon: "credit_card",
        id: "Credit",
        link: "/credit",
        title: "Credit",
        type: "basic",
        feature: "credit"
    },
    {
        icon: "account_balance",
        id: "Bank Transfer",
        link: "/bank-transfer",
        title: "Bank Transfer",
        type: "basic",
        feature: "bank-transfer",
        // usualImage: "BankTransfer",
        // selectedImage: "BankTransfer_White",
    },
    {
        icon: "",
        id: "Payment",
        link: "/payment",
        title: "Payment",
        type: "basic",
        feature: "payment",
        usualImage: "Payment",
        selectedImage: "Payment_White",
    },
    {
        icon: "",
        id: "Send Money",
        link: "/send-money",
        title: "Send Money",
        type: "basic",
        feature: "send-money",
        usualImage: "SendMoney",
        selectedImage: "SendMoney_White",
    },
    {
        icon: "",
        id: "Wealth",
        link: "/wealth",
        title: "Wealth",
        type: "basic",
        feature: "wealth",
        usualImage: "Wealth",
        selectedImage: "Wealth_White",
    },
    {
        icon: "logout",
        id: "LogOut",
        title: "LogOut",
        type: "basic",
        feature: "logout",
        link: "/sign-out", 
    },
    // {
    //     icon: "heroicons_outline:chart-pie",
    //     id: "TxnType",
    //     title: "TxnType",
    //     type: "collapsable",
    //     feature: "txnType",
    //     children: [
    //         {
    //             icon: "currency_exchange",
    //             id: "Txn-Type",
    //             link: "/txn/type",
    //             title: "Txn Type",
    //             type: "basic",
    //             feature: "txnType-type"
    //         },
    //         {
    //             icon: "currency_exchange",
    //             id: "TxnType-Free",
    //             link: "/txn/free",
    //             title: "Txn Free",
    //             type: "basic",
    //             feature: "txnType-free"
    //         }
    //     ]
    // },
    // {
    //     icon: "heroicons_outline:chart-pie",
    //     id: "Report",
    //     title: "Report",
    //     type: "collapsable",
    //     feature: "report",
    //     children: [
            // {
            //     icon: "currency_exchange",
            //     id: "Balance-Sheet",
            //     link: "/report/balance-sheet",
            //     title: "Balance Sheet",
            //     type: "basic",
            //     feature: "balance-sheet"
            // },
            // {
            //     icon: "currency_exchange",
            //     id: "Income-Statement",
            //     link: "/report/income-statement",
            //     title: "Income-Statement",
            //     type: "basic",
            //     feature: "income-statement"
            // }
    //     ]
    // },
    // {
    //     icon: "app_registration",
    //     id: "Registration",
    //     title: "Registration",
    //     type: "collapsable",
    //     feature: "registration",
    //     children: [
    //         {
    //             icon: "how_to_reg",
    //             id: "Registration-List",
    //             link: "/registration/list",
    //             title: "Registration",
    //             type: "basic",
    //             feature: "registration-list"
    //         },
    //         {
    //             icon: "how_to_reg",
    //             id: "bulk-registration",
    //             link: "/registration/bulk",
    //             title: "Bulk-Registration",
    //             type: "basic",
    //             feature: "bulk-registration"
    //         }
    //     ]
    // },
    // {
    //     icon: "credit_card",
    //     id: "Credit",
    //     title: "Credit",
    //     type: "collapsable",
    //     feature: "credit",
    //     children: [
    //         {
    //             icon: "real_estate_agent",
    //             id: "Loan-Product-List",
    //             link: "/credit/loan-products",
    //             title: "Loan-Product-List",
    //             type: "basic",
    //             feature: "loan-product-list"
    //         },
    //         {
    //             icon: "real_estate_agent",
    //             id: "Loan-Applications",
    //             link: "/credit/loan-applications",
    //             title: "Loan-Applications",
    //             type: "basic",
    //             feature: "loan-applications"
    //         },
    //         {
    //             icon: "real_estate_agent",
    //             id: "Loans",
    //             link: "/credit/loans",
    //             title: "Loans",
    //             type: "basic",
    //             feature: "loans"
    //         }
    //     ]
    // },
];