import { Reservation } from '../models'

// TODO should be in 'infra' layer
export type IReservationRepo = {
  getByDate: (date: Date) => Promise<Reservation[]>
  create: (reservation: Reservation) => Promise<number>
}
