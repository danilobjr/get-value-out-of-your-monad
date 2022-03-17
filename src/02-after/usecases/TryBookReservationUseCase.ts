import type { Reservation } from '../models'
import { IReservationRepo } from '../repos'
import { add } from '../utils/mathUtils'

export interface ITryBookReservationUseCase {
  tryAccept: (reservation: Reservation) => Promise<number | null>
}

// TODO 1. this is a business rule. Why has it async stuff? ...
export class TryBookReservationUseCase implements ITryBookReservationUseCase {
  constructor(private capacity: number, private repo: IReservationRepo) {}

  async tryAccept(reservation: Reservation): Promise<number | null> {
    // TODO 2. ... side effect
    const reservations = await this.repo.getByDate(reservation.date)

    const reservedSeatsQuantity = reservations
      .map((r) => r.quantity)
      .reduce(add, 0)

    const overCapacity =
      reservedSeatsQuantity + reservation.quantity > this.capacity
    if (overCapacity) {
      return null
    }

    reservation.accepted = true

    // TODO 3. ... side effect
    return await this.repo.create(reservation)
  }
}

// TODO 4. move impure things to the boundary of the request/response loop
