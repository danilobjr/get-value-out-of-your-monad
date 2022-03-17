import { Request, Response } from 'express'
import { Reservation } from '../models'
import { IBookReservationUseCase } from '../usecases/BookReservationUseCase'
import { BaseController } from './BaseController'

export class ReservationController extends BaseController {
  constructor(private useCase: IBookReservationUseCase) {
    super()
  }

  async bookReservation(request: Request, response: Response) {
    const reservation = this.parseRequestBody(request.body)
    const id = await this.useCase.tryAccept(reservation)

    if (id === null) {
      return this.internalServerError(response, 'Table unavailable')
    }

    return this.ok(response, id)
  }

  private parseRequestBody(body: unknown) {
    return body as Reservation
  }
}
