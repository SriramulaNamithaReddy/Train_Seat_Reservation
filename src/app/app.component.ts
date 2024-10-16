import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SeatReservationComponent } from './seat-reservation/seat-reservation.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SeatReservationComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'SeatReservation';
}
