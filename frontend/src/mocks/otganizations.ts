export type Organization = {
  id: number
  name: string
  address: string
  city: string
  coordinates: [number, number]
}

export const organizations: Organization[] = [
  {
    id: 1,
    name: "CleanCar Автомойка",
    city: "Москва",
    address: "Москва, Тверская 10",
    coordinates: [55.764, 37.604],
  },
  {
    id: 2,
    name: "TurboWash",
    city: "Москва",
    address: "Москва, Арбат 5",
    coordinates: [55.752, 37.592],
  },
  {
    id: 3,
    name: "ShinaPro",
    city: "Москва",
    address: "Москва, Ленинский проспект 30",
    coordinates: [55.708, 37.583],
  },
  {
    id: 4,
    name: "AutoSpa",
    city: "Санкт-Петербург",
    address: "Санкт-Петербург, Невский 12",
    coordinates: [59.935, 30.325],
  },
]