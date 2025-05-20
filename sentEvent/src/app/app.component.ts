import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SseService } from './services/sse.service';
import { NgZone } from '@angular/core';


@Component({
  selector: 'app-root',
  template: "<p>File Content: {{ content }}</p>",
})
export class AppComponent implements OnInit {
  content:string = '';
  url:string = "http://localhost:3000/events";

  constructor(private sseService:SseService, private ngZone:NgZone){}
  
  ngOnInit(): void {
    
    this.sseService.getServerEvents(this.url).subscribe( data => {
      this.ngZone.run(() => {
        this.content = data.content; 
      });
      console.log(data.content);
    });
  }
}