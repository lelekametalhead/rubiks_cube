import store from './store'

// const API = process.env.REACT_APP_API_PATH
// const USER_API = process.env.REACT_APP_USER_API
// const APP_ID = process.env.REACT_APP_ID
const TOKEN = localStorage.getItem('currentUserToken')

export const request = async (url, options, isBool) => {
  const handleError = (e, status) => {
    let error = {
      url: url,
      body: options.body,
      method: options.method,
      message: e?.message || 'No error message',
      stack: e?.stack || 'No error stack',
      status: status,
    }
    console.error(e)
    store.dispatch({type: 'HANDLE_ERROR', error})
    fetch(
      'https://tmc.lll.org.ua/error_bot/error',
      {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(error)
      }
    )
    return {error}
  }
  let status
  let response = await fetch(url, options)
    .then(res => {
      status = res.status
      if (isBool) return res.status === 200
      if (res.status === 204) return []
      return res.json().catch(e => handleError(e, status))
    })
    .catch(e => handleError(e, status))
  // console.log('\n', path, '\n', options, '\n', response, '\n', '\n')
  return new Promise(resolve => resolve(response))
}

export const generateOptions = (method, body) => {
  return {
    method: method,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': TOKEN
    },
    body: JSON.stringify(body)
  }
}

// export const generateURL = (query, params) => {
//   let keys = Object.keys(params)
//   if (keys.length === 0) return query
//   let url = query
//   url += '?'
//   for (let i = 0; i < keys.length; i++) {
//     url += `${keys[i]}=${params[keys[i]]}&`
//   }
//   url = url.substr(0, url.length - 1)
//   return url
// }
//
// export const getSearchParams = () => {
//   let path = window.location.search
//   if (!path) return false
//   let string = path.split('?')[1]
//   let options = string.split('&')
//   let result = {}
//   for (let i = 0; i < options.length; i++) {
//     let pairs = options[i].split('=')
//     result[pairs[0]] = pairs[1]
//   }
//   return result
// }
//
// export const authCheck = async () => {
//   const throwUser = () => {
//     localStorage.removeItem('currentUserName')
//     localStorage.removeItem('currentUserPhone')
//     localStorage.removeItem('currentUserToken')
//     window.location.href = window.location.origin
//     return false
//   }
//   if (!TOKEN) return throwUser()
//   let options = generateOptions('GET')
//   let check = await request(`${USER_API}/checkRight/${APP_ID}`, options)
//   if (!check) return throwUser()
//   return true
// }
//
// export const parseDate = (dateString, isDateOnly, isTimeOnly) => {
//   if (dateString) {
//     let splitted = dateString.split('T')
//     let date = `${splitted[0].split('-')[2]}.${splitted[0].split('-')[1]}.${splitted[0].split('-')[0]}`
//     let time = splitted[1].split('.')[0]
//     if (isDateOnly) return date
//     if (isTimeOnly) return time
//     return date + ' ' + time
//   } else {
//     return '---'
//   }
// }
//
// export const calcColumnWidth = (array) => {
//    let lengths = []
//    for (let key in array[0]) {
//      let length = key.toString().length
//      for (let i = 0; i < array.length; i++) {
//        let current = array[i][key]?.toString().length
//        if (current > length) length = current
//      }
//      lengths.push({wch: length + 3})
//    }
//    return lengths
//  }
// export const excelExport = (list) => {
//   let data = []
//   for (let i = 0; i < list.length; i++) {
//     let obj = {}
//     obj['Ключ'] = list[i].key
//     data.push(obj)
//   }
//   const wb = XLSX.utils.book_new()
//   const ws = XLSX.utils.json_to_sheet(data)
//   ws['!cols'] = calcColumnWidth(data)
//   XLSX.utils.book_append_sheet(wb, ws, "Sales")
//   XLSX.writeFile(wb, 'Sales.xlsx')
// }