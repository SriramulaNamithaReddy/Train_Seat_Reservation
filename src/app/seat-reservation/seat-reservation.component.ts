import { Component, OnInit } from '@angular/core';
import { SeatService } from '../seat.service';
import { Seat } from '../seat.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-seat-reservation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './seat-reservation.component.html',
  styleUrls: ['./seat-reservation.component.css']
})
export class SeatReservationComponent implements OnInit{
  seats: Seat[] = [];
  message='';

  constructor(private seatService: SeatService){}
  
  ngOnInit(): void {
    this.seats=this.seatService.getSeats();
  }
  bookSeats(requestedSeats: number){
    try{
      const bookedSeats=this.seatService.bookSeats(requestedSeats);
      this.message=`Booked seats are :  ${bookedSeats.join(', ')}`;
    }
    catch(error: any){
      this.message=error.message;
    }
  }
}
