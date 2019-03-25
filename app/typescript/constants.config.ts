export class Constants {
    public static get ENDPOINT(): string { return "https://api.spoonity.com"; };
    public static get ERRORCODES(): Array<any> { return [400, 401, 403, 404, 500] };
}