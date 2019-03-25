export class Egift {
    amount: number;
    buyer: {
        name: string;
        email: string;
    };
    recipient: {
        name: string;
        email: string;
    };
    message: string;
    billing: {
        id: number;
        name: string;
        number: string;
        expiry: {
            month: string;
            year: string;
        };
        zip_code: string;
    };
    vendor: number;
    session_key: string;
}