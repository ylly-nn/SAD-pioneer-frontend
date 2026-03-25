export interface OrderDetails {
  [key: string]: number
}

export interface Order {
  id: string
  users: string
  service_by_branch: string
  inn: string
  name_company: string
  city: string
  address: string
  service: string
  start_moment: string
  end_moment: string
  order_details: OrderDetails
}

export interface UserOrder {
  order_id: string
  name_company: string
  city: string
  address: string
  service: string
  start_moment: string
  end_moment: string
  order_details: OrderDetails
}

export interface CreateOrderRequest {
    users: string;
  service_by_branch: string
  start_moment: string
  order_details: OrderDetails
}

export interface CreateOrderResponse {
  id: string
  users: string
  service_by_branch: string
  start_moment: string
  end_moment: string
  order_details: OrderDetails
}