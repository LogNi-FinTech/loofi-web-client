export const accountServiceBaseUrl = 'http://103.125.252.81:8080/account/';
export const kycServiceBaseUrl = 'http://localhost:8090/';
export const creditServiceBaseUrl = 'http://localhost:8010/';
export const authServiceBaseUrl = 'http://localhost:8091/';

 
export const Services = [
    {
        ServiceName: "Mobile Recharge",
        imageName: "AddMoney.png",
        usualImage: "AddMoney",
        icon: "install_mobile",
        selectedImage: "AddMoney_White",
        isSelected: true
    },
    {
        ServiceName: "Add Money",
        imageName: "MobileRecharge.png",
        icon: "",
        usualImage: "AddMoney",
        selectedImage: "AddMoney_White",
        isSelected: false
    },
    {
        ServiceName: "Pay Bill",
        imageName: "bill-payment.png",
        usualImage: "PayBill",
        icon: "",
        selectedImage: "PayBill_White",
        isSelected: false
    },
    {
        ServiceName: "Credit",
        imageName: "Credit.png",
        icon: "credit_card",
        usualImage: "AddMoney",
        selectedImage: "AddMoney_White",
        isSelected: false
    },
    {
        ServiceName: "Bank Transfer",
        imageName: "BankTransfer.png",
        usualImage: "BankTransfer",
        icon: "",
        selectedImage: "BankTransfer_White",
        isSelected: false
    },
    {
        ServiceName: "Payment",
        imageName: "Payment.png",
        usualImage: "Payment",
        icon: "",
        selectedImage: "Payment_White",
        isSelected: false
    },
    {
        ServiceName: "Send Money",
        imageName: "SendMoney.png",
        icon: "",
        usualImage: "SendMoney",
        selectedImage: "SendMoney_White",
        isSelected: false
    },
    {
        ServiceName: "Wealth",
        imageName: "wealth.jpg",
        usualImage: "Wealth",
        icon: "",
        selectedImage: "Wealth_White",
        isSelected: false
    }
];  

export const OperatorTypes = [
    {
        name: "Banglalink",
        img: "1.png",
        isSelected: false
    },
    {
        name: "Grameenphone",
        img: "2.png",
        isSelected: false
    },
    {
        name: "Airtel",
        img: "3.png",
        isSelected: true
    },
    {
        name: "Robi",
        img: "4.png",
        isSelected: false
    },
    {
        name: "Teletalk",
        img: "5.png",
        isSelected: false
    }
];

export const WelcomeTitle = "Welcome to LooFi Digital Wallet/Banking";
export const WelcomeDetail = "LooFi is OpenSource Digital Wallet/Banking. If you want to implement or  customise it Please contact with us. <br> Email:lognifintech@gmail.com  <br>  Phone:+8801778455963";

export const TransactionObject = {
    "fromAc": "",
    "toAc": "",
    "amount": "",
    "transactionType": {"txnCode": 1201},
    "note": "",
    "referenceId": "6411-TEST",
    "tag": "TEST",
    "data": {"reason": "Joma"},
    "description": " ",
    "channel": "REST",
    "requestId": "3886735",
    "maker": "TEST",
    "checker": "TEST"
};

export enum TxnCode {
    SendMoney = 1201,
    Payment = 1202,
    AddMoney = 103,
    MobileRecharge = 1202
}

export enum TransactionType {
    SendMoney = "Send money",
    Payment = "Payment",
    AddMoney = "Add money",
    MobileRecharge = "Mobile recharge",
    PayBill = "Pay bill"
}

export const AddMoneyAccount = '10100';