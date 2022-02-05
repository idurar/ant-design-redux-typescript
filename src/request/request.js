import { API_BASE_URL } from "@/config/serverApiConfig"

const request = {
  search: async ({ entity, options = {} }) => {
    try {
      let query = "?"
      for (let key in options) {
        query += key + "=" + options[key] + "&"
      }
      query = query.slice(0, -1)
      const response = await fetch(`${API_BASE_URL}search/${entity}${query}`)
      const data = await response.json()

      return { success: true, result: data }
    } catch (error) {
      return { success: false, result: null }
    }
  },

  post: async ({ entity, jsonData, options = {} }) => {
    try {
      const url = `${API_BASE_URL}${entity}`
      const response = await fetch(url, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(jsonData), // body data type must match "Content-Type" header
      })
      const data = await response.json()
      return { success: true, result: data }
    } catch (error) {
      return { success: false, result: null }
    }
  },
  get: async ({ entity }) => {
    try {
      const response = await fetch(`${API_BASE_URL}${entity}`)
      const data = await response.json()
      return { success: true, result: data }
    } catch (error) {
      return { success: false, result: null }
    }
  },
  patch: async ({ entity, jsonData }) => {
    try {
      const url = `${API_BASE_URL}${entity}`
      const response = await fetch(url, {
        method: "PATCH", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(jsonData), // body data type must match "Content-Type" header
      })
      const data = await response.json()
      return { success: true, result: data }
    } catch (error) {
      return { success: false, result: null }
    }
  },
}
export default request
