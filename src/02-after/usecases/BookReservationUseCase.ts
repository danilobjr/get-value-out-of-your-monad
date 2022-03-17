import type { Reservation } from '../models'
import { IReservationRepo } from '../repos'

export interface IBookReservationUseCase {
  tryAccept: (reservation: Reservation) => Promise<number | null>
}

export class BookReservationUseCase implements IBookReservationUseCase {
  constructor(private capacity: number, private repo: IReservationRepo) {}

  async tryAccept(reservation: Reservation): Promise<number | null> {
    const reservations = await this.repo.getByDate(reservation.date)

    // TODO refactor - use helper functions instead of write callbacks from scratch
    // TODO refactor - even more: use transducers to loop through array only once
    const reservedSeatsQuantity = reservations
      .map((r) => r.quantity)
      .reduce((x, y) => x + y, 0)

    const overCapacity =
      reservedSeatsQuantity + reservation.quantity > this.capacity
    if (overCapacity) {
      return null
    }

    reservation.accepted = true

    return await this.repo.create(reservation)
  }
}
