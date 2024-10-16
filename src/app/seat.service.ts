import { Injectable } from '@angular/core';

export interface Seat{
  number: number;
  booked: boolean;
}


@Injectable({
  providedIn: 'root'
})
export class SeatService {
  private seats: Seat[] = [];

  constructor() { 
    this.initializeSeats();
  }
  private initializeSeats(){
    for(let i=1;i<=80;i++){
      this.seats.push({number: i, booked: false});
    }
  }
  getSeats(){
    return this.seats;
  }

  bookSeats(requestedSeats: number): number[]{
    if(requestedSeats<1 || requestedSeats>7){
      throw new Error('You can book a minimum of 1 and a maximum of 7 seats at a time.');
    }

    const rowSeats=this.findSeatsInRow(requestedSeats);
    if(rowSeats.length>0){
      this.markSeatsAsBooked(rowSeats);
      return rowSeats;
    }
    const nearbySeats=this.findNearbySeats(requestedSeats);
    if(nearbySeats.length>0){
      this.markSeatsAsBooked(nearbySeats);
      return nearbySeats;
    }
    throw new Error('Not enough seats available.');
  }

  private findSeatsInRow(requestedSeats: number): number[]{
    for(let i=0;i<80; i+=7){
      const row= this.seats.slice(i, i+7);
      const availableSeats=row.filter(seat => !seat.booked);

      if(availableSeats.length >= requestedSeats){
        return availableSeats.slice(0, requestedSeats).map(seat => seat.number);
      }
    }
    return [];
  }
  private findNearbySeats(requestedSeats: number): number[] {
    const availableSeats = this.seats.filter(seat => !seat.booked);
    return availableSeats.slice(0, requestedSeats).map(seat => seat.number);
  }

  private markSeatsAsBooked(seatNumbers: number[]){
    this.seats.forEach( seat=>{
      if(seatNumbers.includes(seat.number)){
        seat.booked=true;
      }
    });
  }
}
