import * as TE from 'fp-ts/TaskEither'
import { pipe } from 'fp-ts/function'
import { Reservation } from '../../domain/models'
import { IReservationRepo } from '../repos'
import { TryBookReservationUseCase } from '../../domain/usecases/TryBookReservationUseCase'
import { BaseController } from './BaseController'

export class ReservationController extends BaseController {
  private readonly bookReservationUseCase: TryBookReservationUseCase

  constructor(private repo: IReservationRepo) {
    super()
    this.bookReservationUseCase = new TryBookReservationUseCase(10)
  }

  async bookReservation(request: { body: unknown }) {
    const reservation = this.parseRequestBody(request.body)

    const runPipeline = pipe(
      this.repo.getByDate(reservation.date),
      TE.chainW((reservations) =>
        pipe(
          this.bookReservationUseCase.tryAccept(reservation, reservations),
          TE.fromEither,
        ),
      ),
      TE.chainW(this.repo.create),
      TE.fold(
        (error) => this.internalServerError(error),
        (reservationId) => this.ok(reservationId),
      ),
    )

    return await runPipeline()
  }

  private parseRequestBody(body: unknown) {
    return body as Reservation
  }
}
