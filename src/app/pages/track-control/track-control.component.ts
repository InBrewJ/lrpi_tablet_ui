import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {Location} from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { GetTracksService } from '../services/get-tracks.service';
import { of, Observable } from 'rxjs';
import { GetStylesService } from '../services/get-styles.service';

@Component({
  selector: 'app-track-control',
  templateUrl: './track-control.component.html',
  styleUrls: ['./track-control.component.css'],
  // encapsulation: ViewEncapsulation.ShadowDom
})
export class TrackControlComponent implements OnInit {
  serverData: Observable<any>;
  errorResponse = '';
  id: string;
  private sub: any;
  playing = false;
  duration = 'XX:XX:XX'
  now = '00:00:00'

  constructor(
    private route: ActivatedRoute,
    private getTracksService: GetTracksService,
    private getStylesService: GetStylesService,
    private _location: Location
  ) {}

  pad(num): string {
    return ("0"+num).slice(-2);
  }

  hhmmss(secs): string {
    secs = Math.floor(secs);
    var minutes = Math.floor(secs / 60);
    secs = secs%60;
    var hours = Math.floor(minutes/60)
    minutes = minutes%60;
    return `${this.pad(hours)}:${this.pad(minutes)}:${this.pad(secs)}`;
  }

  backClicked() {
    this._location.back();
  }

  styleObject() {
    if (!this.getStylesService.getStyles()) {
      return {
        background: 'black',
      };
    }
  }

  styleObjectBorder() {
    if (!this.getStylesService.getStyles()) {
    return {
      border: 'none'
    };
  }
  }
  ngOnInit() {

    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
    });
    this.getTracksService.getSingleTrack(this.id).subscribe(
      (data: any) => {
        console.log('from single track service: ', data);
        this.serverData = of(data.slice(0, data.length - 4));
      },
      (err: any) => {
        console.log('error', err);
        this.errorResponse = err;
      }
    );
  }

  playMusic() {
    this.playing = !this.playing;
    this.getTracksService.playSingleTrack(this.id).subscribe(data => {
      this.duration = this.hhmmss(data)
      console.log(data);
    });
  }

  pauseMusic() {
    this.playing = !this.playing;
    console.log(this.playing);
    this.getTracksService.pauseSingleTrack(this.id).subscribe(data => {
      console.log(data);
    });
  }

  stopMusic() {
    this.getTracksService.stopMusic().subscribe(data => {
      console.log(data);
    });
    this.playing = false;
  }

  scrubForward() {
    this.getTracksService.scrubForward().subscribe(data => {
      console.log(data);
    });
  }
}
