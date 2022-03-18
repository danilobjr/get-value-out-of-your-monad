import * as T from 'fp-ts/Task'

export abstract class BaseController {
  protected ok<T>(data: T) {
    return T.of(`[OK] ${JSON.stringify(data ?? 'No content')}`)
  }

  protected internalServerError(error: Error) {
    return T.of(`[Internal Server Error] ${String(error)}`)
  }
}
