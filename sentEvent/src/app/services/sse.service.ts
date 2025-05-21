import { Injectable } from '@angular/core';
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SseService {

  constructor() { }

  getServerEvents(url: string): Observable<any> {
      return new Observable(observer => {
        
        const connect = () => {
            const eventSource = new EventSource(url);
            eventSource.onmessage = (event) => { 
              console.log("Messaggio ricevuto:", event.data);
              observer.next(JSON.parse(event.data));
            }

            eventSource.onerror = () => {
                console.error('Errore SSE, tentativo di riconnessione...');
                eventSource.close();
                setTimeout(connect, 5000); // Riconnessione dopo 5 secondi

            }
        }

        connect();

      });
  }

}
