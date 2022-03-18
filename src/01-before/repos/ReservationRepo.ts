import { ReservationId } from '../../02-after/domain/models'
import { Reservation } from '../models'

export type IReservationRepo = {
  getByDate: (date: Date) => Promise<Reservation[]>
  create: (reservation: Reservation) => Promise<ReservationId>
}
