import api from "api/api";

const request = <T>(url: string): Promise<[number, T]> =>
    api.inject(url).then(async response => [response.statusCode, await response.json()]);

export default request;
