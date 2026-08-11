 /** Exclude password from response
  * @param data - object to exclude member password from
  */
 export const excludePassword = (data: any) => {
  if (data.password) {
    const { password, ...result } = data
    return result
  } 
  return data
}
 
/** Masks password for logs
 * @param data - object to mask member password from
 * @param mask - optional, some mask when default **** mask is unwanted 
 */
export const maskPassword = (data: any, mask: string = '****') => {
  return data['password'] ? { ...data, password: mask } : data
}
