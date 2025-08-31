import { appGlobal } from './appGlobal';

export async function getListEstadosJumio() {
    try {
        const url = appGlobal.host + "getListEstadosJumio";
        const params = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "charset": "UTF8"
            }
        };
        const response = await fetch(url, params);
        const result = await response.json();
        return result;
    } catch (error) {
        const objError = {
            message: appGlobal.errorRequestServer,
            status: appGlobal.codeErrorRequestServer,
        }
        return objError;
    }
}