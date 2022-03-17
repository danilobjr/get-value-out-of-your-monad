import { Request, Response } from 'express'
import { Reservation } from '../../domain/models'
import { IReservationRepo } from '../repos'
import { ITryBookReservationUseCase } from '../../domain/usecases/TryBookReservationUseCase'
import { BaseController } from './BaseController'
import * as E from 'fp-ts/Either'

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
