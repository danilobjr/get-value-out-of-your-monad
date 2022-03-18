import { ReservationController } from './infra/controllers/ReservationController'
import { ReservationRepo } from './infra/repos'

const repo = new ReservationRepo()
const controller = new ReservationController(repo)

const request = {
  body: {
    quantity: 3,
    date: new Date(),
  },
}

;(async () => {
  const result = await controller.bookReservation(request)
  console.log(result)
})()
