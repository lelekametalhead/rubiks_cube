import { request, generateOptions } from "./helpers";

export const getPharmaciesList = async () => {
  let url = 'https://tmc.lll.org.ua/call_center_reviews_api/pharmacy'
  let options = generateOptions('GET')
  let response = await request(url, options)
  return new Promise(resolve => resolve(response))
}