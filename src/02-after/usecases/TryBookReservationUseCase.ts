import type { Reservation } from '../models'
import { IReservationRepo } from '../repos'
import { add } from '../utils/mathUtils'

export interface ITryBookReservationUseCase {
  tryAccept: (reservation: Reservation) => Promise<number | null>
}

export class TryBookReservationUseCase implements ITryBookReservationUseCase {
  constructor(private capacity: number, private repo: IReservationRepo) {}

  async tryAccept(reservation: Reservation): Promise<number | null> {
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

    return await this.repo.create(reservation)
  }
}
