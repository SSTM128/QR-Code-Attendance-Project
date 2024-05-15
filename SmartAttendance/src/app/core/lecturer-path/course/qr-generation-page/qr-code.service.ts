import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {IUser} from "../../../../User.module";


@Injectable({
  providedIn: 'root'
})
export class QrCodeService {

  private baseUrl = 'http://localhost:3000/qr/generate';

  constructor(private http: HttpClient) {}

  getQrCode (data: string) {
    const encodeData = encodeURIComponent(data);
    return this.http.get(`${this.baseUrl}?data=${encodeData}`, {responseType: 'text'})

  }


}
