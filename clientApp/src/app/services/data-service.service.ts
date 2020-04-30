import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {
  public storage: SQLiteObject;
updateField1 = "";
updateField2 = "";
updateParam1 = "";
  constructor(
    private sqlite: SQLite,
    private platform: Platform
  ) {
    this.platform.ready().then(() => {
      //this.createDB();
    });
  }
  public createDB(): void {
    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {
        this.storage = db;
        //alert("DB created");
      })
      .catch(e => console.log(e));
  }
  public initialiseDB(): void {


    this.storage.executeSql('create table IF NOT EXISTS Documents10(id integer primary key AUTOINCREMENT,name VARCHAR(200),documentID VARCHAR(32), category VARCHAR(32),documentStatus VARCHAR(32), parentSemsStandard VARCHAR(32),relatedDocuments VARCHAR(32),revDate DATE,rev VARCHAR(32),isDownloaded VARCHAR(5), docPath VARCHAR(32))', [])
      .then(() => {
       // alert('Executed SQL');
      })
      .catch(e => console.log(e));

  }
  public insertData(element, suc): void {
    let query = "insert into Documents10(name ,documentID , category ,documentStatus , parentSemsStandard ,relatedDocuments ,revDate ,rev ,isDownloaded, docPath ) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    this.storage.executeSql(query, [element.name, element.documentID, element.category, element.documentStatus, element.parentSemsStandard, element.relatedDocuments, element.revDate, element.rev, element.isDownloaded, element.docPath]).then((data) => {
      suc();
      //alert("INSERTED data " + JSON.stringify(data));
    })
      .catch(e => console.log(e));
  }
  public selectAllDocs(suc): void {
    this.storage.executeSql('select * from Documents10 ORDER BY revDate DESC', []).then((res) => {
      let row_data = [];
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          row_data.push(res.rows.item(i));
        }        
        suc(row_data);
      }
    })
      .catch(e => console.log(e));
  }

  public updatePath(id, filePath, suc): void {
    this.updateField1 = filePath;
    this.updateField2 = id;
    this.storage.executeSql('UPDATE Documents10 set docPath = ?, isDownloaded = "true" where id = ?', [filePath, id]).then((res) => {
      suc(res);      
    })
      .catch(e => console.log(e));
  }
}
