// @flow

export type Method = {
  name: string
}

export const GET: Method= { name : 'GET'}
export const POST: Method= { name : 'POST'}
export const PUT: Method= { name : 'PUT'}
export const DELETE: Method= { name : 'DELETE'}
export const PATCH: Method= { name : 'PATCH'}
export const HEAD: Method= { name : 'HEAD'}
export const OPTIONS: Method= { name : 'OPTIONS'}

export class MethodUtil {

  static fromName(name: string): Method {
    switch (name) {
      case "GET": return GET
      case "POST": return POST
      case "PUT": return PUT
      case "DELETE": return DELETE
      case "PATCH": return PATCH
      case "HEAD": return HEAD
      case "OPTIONS": return OPTIONS
      default : throw new Error(`Method ${name} doesn't exist`)
    }
  }

  static getMethods(): Method[] { return [GET, POST, PUT, DELETE, PATCH, HEAD, OPTIONS] }
}