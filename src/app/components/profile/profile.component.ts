import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  @Input() user : User | undefined;

  constructor() { }

  ngOnInit(): void {
  }

}
