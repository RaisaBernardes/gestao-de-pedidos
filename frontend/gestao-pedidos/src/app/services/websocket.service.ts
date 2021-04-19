import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  socket: any;
  readonly url: string = "ws://localhost:9090"

  constructor() { 
    this.socket = io(this.url);
  }

  listen(eventName: String) {
    return new Observable((subscriber) => {
      this.socket.on((eventName), (data) => {
        subscriber.next(data);
      });
    })
  }

  emit(eventName: String, data: any) {
    this.socket.emit(eventName, data);
  }
}
