import { Request, Response } from 'express'
import { Reservation } from '../models'
import { IReservationRepo } from '../repos'
import { ITryBookReservationUseCase } from '../usecases/TryBookReservationUseCase'
import { BaseController } from './BaseController'
import * as E from 'fp-ts/Either'

// TODO should be in 'infra' layer
export class ReservationController extends BaseController {
  constructor(
    private useCase: ITryBookReservationUseCase,
    private repo: IReservationRepo,
  ) {
    super()
  }

  async bookReservation(request: Request, response: Response) {
    const reservation = this.parseRequestBody(request.body)
    const reservations = await this.repo.getByDate(reservation.date)
    const result = this.useCase.tryAccept(reservation, reservations)

    if (E.isLeft(result)) {
      return this.internalServerError(response, result.left)
    }

    const reservationId = await this.repo.create(result.right)

    return this.ok(response, reservationId)
  }

  private parseRequestBody(body: unknown) {
    return body as Reservation
  }
}
