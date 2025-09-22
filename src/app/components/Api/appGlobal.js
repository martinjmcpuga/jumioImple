
//=================== Produccion  ====================

export const appGlobal = {
    host: process.env.NEXT_PUBLIC_JUMIO_BASE_URL,
    hostFile: process.env.NEXT_PUBLIC_JUMIO_BASE_URL,
    urlShare: process.env.NEXT_PUBLIC_JUMIO_BASE_URL_SHARE,
    errorRequestServer: 'No se generó la petición, verificar conexión al servidor',
    codeErrorRequestServer: 102,
    ev: 'aicm'
}