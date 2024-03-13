import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class AdminService {
  hostname: string = environment.hostname;

  constructor(private httpClient: HttpClient) {}

  reboot() {
    return this.httpClient.get("http://" + this.hostname + "/reboot");
  }
}
