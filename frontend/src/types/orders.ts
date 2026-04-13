// для создания заказа
export interface CreateOrderDetail {
  detail: string
}

// для отображения заказов
export interface OrderDetail {
  detail: string
  duration_min: number
  price: number
}

// для ответа POST/order
export type OrderDetailsMap = Record<string, number>


export interface Order {
  id: string
  users: string
  service_by_branch: string
  name_service: string
  start_moment: string
  end_moment: string
  status: string
  sum: number
  order_details: OrderDetail[]
}

export interface UserOrder {
  order_id: string
  name_company: string
  city: string
  address: string
  service: string
  start_moment: string
  end_moment: string
  status: OrderStatus
  sum: number
  order_details: OrderDetail[]
}

type OrderStatus = "create" | "approve" | "reject"

export interface CreateOrderRequest {
  service_by_branch: string
  start_moment: string
  order_details: CreateOrderDetail[]
}

export interface CreateOrderResponse {
  id: string
  users: string
  service_by_branch: string
  start_moment: string
  end_moment: string
  status: string
  sum: number
  order_details: OrderDetailsMap
}

export interface CompanyOrders {
  address: string
  branch_id: string
  city: string
  orders: Order[]
}