import Axios, { AxiosError } from 'axios'
import appConfig from '../configs/app.config'

const BASE_URL = appConfig.BASE_URL

const axios = Axios.create({
    withCredentials: true,
})

export default {
    get(endpoint: string) {
        return ajax(endpoint, 'GET', null)
    },
    post(endpoint: string, data?: unknown) {
        return ajax(endpoint, 'POST', data)
    },
    put(endpoint: string, data?: unknown) {
        return ajax(endpoint, 'PUT', data)
    },
    delete(endpoint: string, data?: unknown) {
        return ajax(endpoint, 'DELETE', data)
    },
}

async function handleError(error: unknown): Promise<boolean> {
    if (Axios.isAxiosError(error)) {
        const axiosError = error as AxiosError
    }

    return false
}

async function ajax(endpoint: string, method = 'GET', data: unknown = null) {
    try {
        const res = await axios({
            url: `${BASE_URL}${endpoint}`,
            method,
            data,
        })

        return res.data
    } catch (err: unknown) {
        const isHandleError = await handleError(err)
        if (!isHandleError) throw err
    }
}
