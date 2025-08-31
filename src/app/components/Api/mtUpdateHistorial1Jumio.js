import { appGlobal } from './appGlobal';

export async function mtUpdateHistorial1Jumio(obj) {
    try {
        const url = appGlobal.host + "mtUpdateHistorial1Jumio";
        const params = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "charset": "UTF8"
            },
            body: JSON.stringify(obj)
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