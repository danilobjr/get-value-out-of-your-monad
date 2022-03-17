import { Reservation } from '../models'

export type IReservationRepo = {
  getByDate: (date: Date) => Promise<Reservation[]>
  // TODO - refactor. Return should be a nominal type (ReservationId, for example)
  create: (reservation: Reservation) => Promise<number>
}
