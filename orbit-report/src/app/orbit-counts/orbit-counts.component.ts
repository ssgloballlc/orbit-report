import { Component, Input, OnInit } from '@angular/core';
import { Satellite } from '../satellite';

@Component({
  selector: 'app-orbit-counts',
  templateUrl: './orbit-counts.component.html',
  styleUrls: ['./orbit-counts.component.css']
})
export class OrbitCountsComponent implements OnInit {
  @Input() satellites: Satellite[];
  @Input() total;
  @Input() spaceDebris:any;
  @Input() communication: any;
  @Input() probe:any;
  @Input() positioning:any;
  @Input() spaceStation: any;
  @Input() telescope: any;
  constructor() { 
  }

  ngOnInit(): void {
    
  }

}
