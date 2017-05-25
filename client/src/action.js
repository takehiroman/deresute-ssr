export const REQUEST_DATA         = 'REQUEST_DATA'
export const RECEIVE_DATA_SUCCESS = 'RECEIVE_DATA_SUCCESS'
export const RECEIVE_DATA_FAILED  = 'RECEIVE_DATA_FAILED'
export const COUNTUP = 'COUNTUP'
export const COUNTDOWN = 'COUNTDOWN'

export const requestData = () => ({
  type: REQUEST_DATA,
})
export const receiveDataSuccess = characterArray => ({
  type: RECEIVE_DATA_SUCCESS,
  characterArray,
})
export const receiveDataFailed = () => ({
  type: RECEIVE_DATA_FAILED,
})
export const countup = () => ({
  type: COUNTUP,
  count: 1,
})
export const countdown = () => ({
  type: COUNTDOWN,
  count: -1,
})