import { Component } from '@angular/core';
import { Satellite } from './satellite';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'orbit-report';
  sourceList: Satellite[];
  displayList: Satellite[];
  total: any;
  spaceDebris: any;
  communication: any;
  probe: any;
  positioning: any;
  spaceStation: any;
  telescope: any;
  constructor() {
    // this.sourceList = [
    //    new Satellite("SiriusXM", "Communication", "2009-03-21", "LOW", true),
    //    new Satellite("Cat Scanner", "Imaging", "2012-01-05", "LOW", true),
    //    new Satellite("Weber Grill", "Space Debris", "1996-03-25", "HIGH", false),
    //    new Satellite("GPS 938", "Positioning", "2001-11-01", "HIGH", true),
    //    new Satellite("ISS", "Space Station", "1998-11-20", "LOW", true),
    // ];
    this.sourceList = [];
    this.displayList = [];
    let satellitesUrl = 'https://handlers.education.launchcode.org/static/satellites.json';

    window.fetch(satellitesUrl).then(function (response) {
      response.json().then(function (data) {

        let fetchedSatellites = data.satellites;
        for (var i = 0; i < data.satellites.length; i++) {
          this.sourceList.push(new Satellite(fetchedSatellites[i].name, fetchedSatellites[i].type, fetchedSatellites[i].launchDate, fetchedSatellites[i].orbitType, fetchedSatellites[i].operational));
        }

        this.displayList = this.sourceList.slice(0);
        this.countingSatellitesBonus();
      }.bind(this));
    }.bind(this));
  }
  search(searchTerm: string): void {
    let matchingSatellites: Satellite[] = [];
    searchTerm = searchTerm.toLowerCase();
    for (let i = 0; i < this.sourceList.length; i++) {
      let name = this.sourceList[i].name.toLowerCase();
      if (name.indexOf(searchTerm) >= 0) {
        matchingSatellites.push(this.sourceList[i]);
      }
    }
    // assign this.displayList to be the array of matching satellites
    // this will cause Angular to re-make the table, but now only containing matches
    this.displayList = matchingSatellites;
    this.countingSatellitesBonus();
  }

  countingSatellitesBonus() {
    this.total,this.spaceDebris,this.communication,this.probe,this.positioning,this.spaceStation, this.telescope = 0;
    this.total = this.displayList.length;
    this.spaceDebris = this.displayList.filter(item => item.type == 'Space Debris').length;
    this.communication = this.displayList.filter(item => item.type == 'Communication').length;
    this.probe = this.displayList.filter(item => item.type == 'Probe').length;
    this.positioning = this.displayList.filter(item => item.type == 'Positioning').length;
    this.spaceStation = this.displayList.filter(item => item.type == 'Space Station').length;
    this.telescope = this.displayList.filter(item => item.type == 'Telescope').length;
  }
}
