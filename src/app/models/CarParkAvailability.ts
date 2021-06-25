export interface CarParkAvailability {
  items?: (ItemsEntity)[] | null;
}
export interface ItemsEntity {
  timestamp: string;
  carpark_data?: (CarparkDataEntity)[] | null;
}
export interface CarparkDataEntity {
  total_lots: string;
  lot_type: string;
  lots_available: string;
}
