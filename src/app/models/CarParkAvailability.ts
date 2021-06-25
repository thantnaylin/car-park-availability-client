export interface CarParkAvailability {
    api_info: ApiInfo;
    items?: (ItemsEntity)[] | null;
  }
  export interface ApiInfo {
    status: string;
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
  