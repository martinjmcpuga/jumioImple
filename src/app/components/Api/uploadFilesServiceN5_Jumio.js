import { appGlobal } from './appGlobal';

export async function uploadFilesServiceN5_Jumio(file, renombreFile, cpv, IdJumio) {
    try {
        let formData = new FormData();
        formData.append("file", file);
        formData.append("renombreFile", renombreFile);
        formData.append("cpv", cpv);
        formData.append("idJumio", IdJumio);
        const url = appGlobal.hostFile + "uploadN5_2C_Jumio";
        const params = {
            method: "POST",
            body: formData
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