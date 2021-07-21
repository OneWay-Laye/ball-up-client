import apiUrl from '../apiConfig'
import axios from 'axios'

export const createPickup = (user, data) => {
  return axios({
    method: 'POST',
    url: apiUrl + '/meetup/create/',
    headers: {
      'Authorization': `Token ${user.token}`
    },
    data: {
      meetup: {
        scheduled: data.scheduled,
        player_id: data.player_id,
        park_id: data.park_id
      }
    }
  })
}

export const indexPickup = () => {
  return axios({
    method: 'GET',
    url: apiUrl + '/meetup/'
  })
}

export const showPickup = (id) => {
  return axios({
    method: 'GET',
    url: `${apiUrl}/meetup/${id}/`
  })
}

export const deletePickup = (user, id) => {
  return axios({
    method: 'DELETE',
    url: `${apiUrl}/meetup/${id}/edit/`,
    headers: {
      'Authorization': `Token ${user.token}`
    }
  })
}

export const updateMeetup = (user, id, data) => {
  return axios({
    method: 'PATCH',
    url: `${apiUrl}/meetup/${id}/edit/`,
    headers: {
      'Authorization': `Token ${user.token}`
    },
    data: {
      data
    }
  })
}
