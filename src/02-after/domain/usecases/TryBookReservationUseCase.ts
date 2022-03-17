import type { Reservation } from '../models'
import { add } from '../../utils/mathUtils'
import { Either, left, right } from 'fp-ts/Either'

type Failure = 'Over capacity'
type Sucess = Reservation

export interface ITryBookReservationUseCase {
  tryAccept: (
    reservation: Reservation,
    reservations: Reservation[],
  ) => Either<Failure, Sucess>
}

export class TryBookReservationUseCase implements ITryBookReservationUseCase {
  constructor(private capacity: number) {}

  tryAccept(
    reservation: Reservation,
    reservations: Reservation[],
  ): Either<Failure, Sucess> {
    const reservedSeatsQuantity = reservations
      .map((r) => r.quantity)
      .reduce(add, 0)

    const overCapacity =
      reservedSeatsQuantity + reservation.quantity > this.capacity
    if (overCapacity) {
      return left('Over capacity')
    }

    reservation = { ...reservation, accepted: true }

    return right(reservation)
  }
}
