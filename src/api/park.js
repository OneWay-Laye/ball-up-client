import apiUrl from '../apiConfig'
import axios from 'axios'

export const getAllParks = () => {
  return axios({
    method: 'GET',
    url: apiUrl + '/park/'
  })
}

export const getPark = pk => {
  return axios({
    method: 'GET',
    url: apiUrl + '/park/pk/'
  })
}
