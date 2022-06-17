import actions from "./actions";
import axios from "axios"

const baseUrlRestApi = "https://restapi.yapashop.com"
const baseUrlProcessManagerApi = "https://processapi.yapashop.com"
export default async (action, headerParams = {}, body = {}) => {
    let axiosOptions
    let response
    switch(action){
        case actions.createStore:
            axiosOptions = getAxiosOptions("POST", `${baseUrlRestApi}/api/store`, body)
            response = await axios(axiosOptions)
            return response.data
            break
        case actions.getStores:
            axiosOptions = getAxiosOptions("GET", `${baseUrlRestApi}/api/store`)
            response = await axios(axiosOptions)
            return response.data
            break
        case actions.deleteStores:
            axiosOptions = getAxiosOptions("DELETE", `${baseUrlRestApi}/api/store/${headerParams.id}`)
            response = await axios(axiosOptions)
            return response.data
            break
        case actions.createStoreProcess:
            axiosOptions = getAxiosOptions("POST", `${baseUrlProcessManagerApi}/createProcess`, body)
            response = await axios(axiosOptions)
            return response.data
            break
        case actions.stopStoreProcess:
            axiosOptions = getAxiosOptions("PUT", `${baseUrlProcessManagerApi}/stopProcess/${headerParams.id}`)
            response = await axios(axiosOptions)
            return response.data
            break
        case actions.restartStoreProcess:
            axiosOptions = getAxiosOptions("PUT", `${baseUrlProcessManagerApi}/restartProcess/${headerParams.id}`)
            response = await axios(axiosOptions)
            return response.data
            break
        case actions.deleteStoreProcess:
            axiosOptions = getAxiosOptions("DELETE", `${baseUrlProcessManagerApi}/${headerParams.id}`)
            response = await axios(axiosOptions)
            return response.data
            break
        case actions.getStoreProcesses:
            axiosOptions = getAxiosOptions("GET", `${baseUrlRestApi}/api/process/${headerParams.storeId}`)
            response = await axios(axiosOptions)
            return response.data
            break
        case actions.getStoreErrors:
            axiosOptions = getAxiosOptions("GET", `${baseUrlRestApi}/api/storeError/${headerParams.storeId}`)
            response = await axios(axiosOptions)
            return response.data
            break
        case actions.getStoreNotifications:
            axiosOptions = getAxiosOptions("GET", `${baseUrlRestApi}/api/storeNotification/${headerParams.storeId}`)
            response = await axios(axiosOptions)
            return response.data
            break
        case actions.batchUpdateStoreNotifications:
            axiosOptions = getAxiosOptions("PUT",`${baseUrlRestApi}/api/storeNotification/batchNotification/update`, body)
            response = await axios(axiosOptions)
            return response.data
            break
        case actions.batchRestartProcesses:
            axiosOptions = getAxiosOptions("PUT", `${baseUrlProcessManagerApi}/batchRestartProcess`,body)
            response = await axios(axiosOptions)
            return response.data
            break
        case actions.batchStopProcesses:
            axiosOptions = getAxiosOptions("PUT", `${baseUrlProcessManagerApi}/batchStopProcess`, body)
            response = await axios(axiosOptions)
            return response.data
            break
        case actions.batchDeleteProcesses:
            axiosOptions = getAxiosOptions("PUT", `${baseUrlProcessManagerApi}/batchDeleteProcess`,body)
            response = await axios(axiosOptions)
            return response.data
            break
        case actions.clearError:
            axiosOptions = getAxiosOptions("DELETE", `${baseUrlRestApi}/api/storeError/delete/all/${headerParams.storeId}`)
            response = await axios(axiosOptions)
            return response.data
            break
        case actions.clearNotification:
            axiosOptions = getAxiosOptions("DELETE", `${baseUrlRestApi}/api/storeNotification/delete/all/${headerParams.storeId}`)
            response = await axios(axiosOptions)
            return response.data
            break
        case actions.updateProcess:
            axiosOptions = getAxiosOptions("PUT", `${baseUrlRestApi}/api/process/${headerParams.id}`, body)
            response = await axios(axiosOptions)
            return response.data
            break
    }
}




const getAxiosOptions = (method, url, body) => {
    const headers = {
        "admin-secret": "dELDdcK9V6n9TH3sh9jmhnejPs5U5M39",
        "Content-Type": "application/json",
    };
    switch (method) {
        case "GET":
            return {
                method: "GET",
                url,
                headers,
            };
            break;
        case "POST":
            return {
                method: "POST",
                url,
                headers,
                data: {
                    ...body,
                },
            };
            break;
        case "PUT":
            return {
                method: "PUT",
                url,
                headers,
                data: {
                    ...body,
                },
            };
            break;
        case "DELETE":
            return {
                method: "DELETE",
                url,
                headers,
            };
            break;
    }
};