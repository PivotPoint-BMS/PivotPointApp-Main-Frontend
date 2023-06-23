// assets
import car from 'public/vehicules/car.png'
import small from 'public/vehicules/small.png'
import medium from 'public/vehicules/medium.png'
import large from 'public/vehicules/large.png'

export default function getVehiclesImage(type: 0 | 1 | 2 | 3, size: 0 | 1 | 2 | 3) {
  if (type === 0) {
    switch (size) {
      case 0:
        return car
      case 1:
        return small
      case 2:
        return medium
      case 3:
        return large
      default:
        return car
    }
  } else return car
}
