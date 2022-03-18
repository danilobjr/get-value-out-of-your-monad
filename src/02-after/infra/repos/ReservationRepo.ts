import * as TE from 'fp-ts/TaskEither'
import { Reservation, ReservationId } from '../../domain/models'

export interface IReservationRepo {
  getByDate: (date: Date) => TE.TaskEither<Error, Reservation[]>
  create: (reservation: Reservation) => TE.TaskEither<Error, ReservationId>
}

export class ReservationRepo implements IReservationRepo {
  getByDate(date: Date) {
    // return TE.left(new Error('getByDate'))
    return TE.of([
      {
        id: 1,
        date: new Date(),
        quantity: 2,
        accepted: true,
      },
      {
        id: 2,
        date: new Date(),
        quantity: 4,
        accepted: true,
      },
    ])
  }

  create(reservation: Reservation) {
    // return TE.left(new Error('create'))
    return TE.of(3)
  }
}
