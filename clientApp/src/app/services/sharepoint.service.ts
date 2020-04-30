import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharepointService {

  constructor(private http: HttpClient) { }

  public getPDF(): Observable<Blob> {
    //const options = { responseType: 'blob' }; there is no use of this
    //let uri = 'http://gems.dodi.com/SSP/BlackRhino/Procedures/Crane/111-%20Moving%20Equipment%20to%20and%20from%20Rig%20Floor.pdf';
    let uri = 'http://192.168.0.105:8080/MaximoMobile/maximo/hi'
    // this.http refers to HttpClient. Note here that you cannot use the generic get<Blob> as it does not compile: instead you "choose" the appropriate API in this way.
    return this.http.get(uri, { responseType: 'blob' });
  }
  public getFileDetails(suc) {
    let uri = 'http://server-app/fileService/getFiles'
    // this.http refers to HttpClient. Note here that you cannot use the generic get<Blob> as it does not compile: instead you "choose" the appropriate API in this way.
    this.http.get(uri).subscribe(data => {
      suc(data);
    });
  }
}
