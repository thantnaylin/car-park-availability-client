import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CarparkDataEntity } from 'src/app/models/CarParkAvailability';


@Component({
  selector: 'app-car-park-table',
  templateUrl: './car-park-table.component.html',
  styleUrls: ['./car-park-table.component.css']
})
export class CarParkTableComponent implements AfterViewInit {

  @Input() CarParkData : CarparkDataEntity[] | undefined;

   displayColumns: string[] = ['total_lots', 'lot_type', 'lots_available', 'carpark_number'];
   dataSource : MatTableDataSource<CarparkDataEntity> | undefined;
   isDataEmpty: boolean = false;

   @ViewChild(MatPaginator) paginator: MatPaginator | null;


  ngOnInit() {
    if(this.CarParkData === null) {
      this.isDataEmpty = true;
    }
    this.dataSource = new MatTableDataSource<CarparkDataEntity>(this.CarParkData);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
 
}
