import { Component } from '@angular/core';

@Component({
  selector: 'app-shows',
  templateUrl: './shows.component.html',
  styleUrls: ['./shows.component.css']
})
export class ShowsComponent {

 
  popupVisible: boolean = false;
  popupTitle: string = '';
  popupDate: string = '';
  popupDescription: string = '';
  popupImageSrc: string = '';

  openPopup(title: string, date: string, description: string,  imageSrc: string): void {
    this.popupVisible = true;
    this.popupTitle = title;
    this.popupDate = date;
    this.popupDescription = description;
    this.popupImageSrc =imageSrc ;
  }

  closePopup(): void {
    this.popupVisible = false;
  }
}
