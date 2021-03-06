import { Response } from 'express'

export abstract class BaseController {
  protected ok<T>(response: Response, data: T) {
    console.log('OK: ', JSON.stringify(data ?? 'No content'))
    return response
  }

  protected internalServerError(response: Response, message: string) {
    console.log('Internal Server Error: ', message)
    return response
  }
}
