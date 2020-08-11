import { Component, OnInit } from '@angular/core';

import { RequestServiceService } from '../services/request-service.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  locations : Array<any>;
  name : string;
  area : string;

  constructor(private request : RequestServiceService) { }

  deleteLocation(loca){
    console.log(loca);
    this.request.request(this.deleteLocationCorrect.bind(this), this.deleteLocationIncorrect.bind(this),'DELETE','/api/locations',loca,{});
  }

  deleteLocationCorrect(data){
    console.log(data);
    for(var i=0; i<this.locations.length; i++){
      if(data.name == this.locations[i].name){
        this.locations.splice(i,1);
      }
    }
    
  }

  deleteLocationIncorrect(error){
    console.log(error);
  }


  agregarLocation(){
    var newLocation = {
      name : this.name,
      area_m2 : this.area
    };
    this.request.request(this.agregarLocationCorrect.bind(this), this.agregarLocationIncorrect.bind(this),'POST','/api/locations',newLocation,{})
  }

  agregarLocationCorrect(data){
    this.locations.push(data);
  }

  agregarLocationIncorrect(error){

  }

  updateName(event){
   event.preventDefault();
   this.name = event.target.value;
   console.log(this.name)
  }

  updateArea(event){
    event.preventDefault();
    this.area = event.target.value;
    console.log(this.area);
  }

  getLocations(){
    this.request.request(this.getLocationsCorrect.bind(this), this.getLocationsInctorrect.bind(this),'GET','/api/locations',{},{})
  }

  getLocationsCorrect(data){
    this.locations = data;
  }

  getLocationsInctorrect(error){
    console.log(error);
  }

  ngOnInit(): void {
    this.getLocations();
  }

}
