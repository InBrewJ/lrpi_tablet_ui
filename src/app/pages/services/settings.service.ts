import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  // hostname: string = 'lushroom-dev-jason.local';
  hostname: string = environment.hostname;
  settings: object = null;

  constructor(
    private httpClient: HttpClient
  ) { }

  getSettings() {
    return this.httpClient.get('http://' + this.hostname + '/settings');
  }

  setRoomName(newName: string) {
    console.log('New name: ', newName);
    // Send new name to the 'Pi...
    
  }
}
