import Axios, { AxiosError } from 'axios'
import appConfig from '../configs/app.config'

const BASE_URL = appConfig.BASE_URL

const axios = Axios.create({
    withCredentials: true,
})

export default {
    get(endpoint: string, params: Record<string, unknown> = {}) {
        return ajax(endpoint, 'GET', null, params)
    },
    post(endpoint: string, data: unknown = null, params: Record<string, unknown> = {}) {
        return ajax(endpoint, 'POST', data, params)
    },
    put(endpoint: string, data: unknown = null, params: Record<string, unknown> = {}) {
        return ajax(endpoint, 'PUT', data, params)
    },
    delete(endpoint: string, data: unknown = null, params: Record<string, unknown> = {}) {
        return ajax(endpoint, 'DELETE', data, params)
    },
}

async function handleError(error: unknown): Promise<boolean> {
    if (Axios.isAxiosError(error)) {
        const axiosError = error as AxiosError
        if (axiosError.response?.status === 401) {
            window.location.href = '/auth/sign-in'
            return true
        }
    }

    return false
}

async function ajax(endpoint: string, method = 'GET', data: unknown = null, params: Record<string, unknown> = {}) {
    try {
        const res = await axios({
            url: `${BASE_URL}${endpoint}`,
            method,
            data,
            params,
        })

        return res.data
    } catch (err: unknown) {
        const isHandleError = await handleError(err)
        if (!isHandleError) throw err
    }
}
