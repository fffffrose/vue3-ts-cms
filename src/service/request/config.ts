let BASE_URL = ''
const TIME_OUT = 10000
if (process.env.NODE_ENV === 'development') {
  BASE_URL = 'http://'
} else if (process.env.NODE_ENV === 'production') {
  BASE_URL = 'http://'
} else {
  BASE_URL = 'http://'
}

export { BASE_URL, TIME_OUT }
