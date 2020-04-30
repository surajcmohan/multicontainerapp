import { Component, OnInit } from '@angular/core';
import { SharepointService } from '../services/sharepoint.service';
import { SearchService } from '../services/search.service';
import { DataServiceService } from '../services/data-service.service';

import { File, FileEntry } from '@ionic-native/file/ngx';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { rigConfig } from 'src/config/rigConfig';
@Component({
  selector: 'app-rig-files',
  templateUrl: './rig-files.component.html',
  styleUrls: ['./rig-files.component.scss'],
})
export class RigFilesComponent implements OnInit {
  folderList = [];
  listOfFiles = [];
  listOfFilesDisplay = [];
  showLoadingImage: boolean;
  scrollCount = 0;
  displayName: string;
  selectedFolder: string;
  isHomeSelected: boolean;
  searchCriteria = "";
  private sub: any;
  constructor(public sharepointService: SharepointService, public searchService: SearchService, public file: File, public fileOpener: FileOpener, public route: ActivatedRoute, public dataServiceService: DataServiceService) { }

  public showPDF(docItem): void {
    if (docItem.docPath !== "" && docItem.isDownloaded === "true") {
      this.file.resolveDirectoryUrl(docItem.docPath)
        .then((rootDir) => {
          return this.file.getFile(rootDir, docItem.documentID, { create: false })
        })
        .then((fileEntry: FileEntry) => {

          //Open with File Opener plugin
          this.fileOpener.open(fileEntry.toURL(), "application/pdf")
            .then(() => console.log('File is opened'))
            .catch(err => console.error('Error openening file: ' + err));


        });
    } else {
      this.showLoadingImage = true;
      this.sharepointService.getPDF()
        .subscribe(x => {
          // It is necessary to create a new blob object with mime-type explicitly set
          // otherwise only Chrome works like it should
          var newBlob = new Blob([x], { type: "application/pdf" });

          if (environment.isAndroidApp) {
            //Determine a native file path to save to
            //let filePath = (this.appConfig.isNativeAndroid) ? this.file.externalRootDirectory : this.file.cacheDirectory;
            let filePath = this.file.externalRootDirectory;
            //Write the file
            //alert(docItem.documentID);
            this.file.writeFile(filePath, docItem.documentID, newBlob, { replace: true }).then((fileEntry: FileEntry) => {

              console.log("File created!");
              this.dataServiceService.updatePath(docItem.id, filePath, (data) => {
                setTimeout(() => {
                  this.fetch();
                }, 500);
              });
              //Open with File Opener plugin
              this.fileOpener.open(fileEntry.toURL(), newBlob.type)
                .then(() => {
                  console.log('File is opened');
                  this.showLoadingImage = false;
                })
                .catch(err => console.error('Error openening file: ' + err));
            })
              .catch((err) => {
                console.error("Error creating file: " + err);
                throw err;  //Rethrow - will be caught by caller
              });
          } else if (environment.isWebApp) {
            // IE doesn't allow using a blob object directly as link href
            // instead it is necessary to use msSaveOrOpenBlob
            if (window.navigator && window.navigator.msSaveOrOpenBlob) {
              window.navigator.msSaveOrOpenBlob(newBlob);
              return;
            }

            // For other browsers: 
            // Create a link pointing to the ObjectURL containing the blob.
            const data = window.URL.createObjectURL(newBlob);

            var link = document.createElement('a');
            link.href = data;
            link.download = "TestPDF.pdf";
            // this is necessary as link.click() does not work on the latest firefox
            link.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));

            setTimeout(function () {
              // For Firefox it is necessary to delay revoking the ObjectURL
              window.URL.revokeObjectURL(data);
              link.remove();
            }, 100);
            this.showLoadingImage = false;
          }


        });
    }
  }

  public selectFolder(selectedFolder): void {
    this.resetSelectionColor();
    this.selectedFolder = selectedFolder;
    document.getElementById(selectedFolder).style.color = "Red";
    if (selectedFolder == 'Home') {
      this.scrollCount = 0;
      this.isHomeSelected = true;
      this.fetch();
    } else {
      this.isHomeSelected = false;
      this.searchCategory(selectedFolder);
    }
  }
  public resetSelectionColor(): void {
    document.getElementById("Home").style.color = "#16569B";
    this.folderList.forEach(element => {
      console.log(element.value);
      document.getElementById(element.value).style.color = "#16569B";
    });
  }
  public searchName(searchCriteria): void {
    this.listOfFilesDisplay = this.searchService.filterItemsWithName(this.listOfFiles, searchCriteria);
  }
  public searchCategory(searchCriteria): void {
    this.listOfFilesDisplay = this.searchService.filterItemsWithCategory(this.listOfFiles, searchCriteria);
  }
  public cancelSearch(env): void {
    env.target.value = "";
    this.searchCriteria = "";
  }
  public sortTable(n): void {
    function sortTable(n) {
      var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
      table = document.getElementById("fileTable");
      switching = true;
      // Set the sorting direction to ascending:
      dir = "asc";
      /* Make a loop that will continue until
      no switching has been done: */
      while (switching) {
        // Start by saying: no switching is done:
        switching = false;
        rows = table.rows;
        /* Loop through all table rows (except the
        first, which contains table headers): */
        for (i = 1; i < (rows.length - 1); i++) {
          // Start by saying there should be no switching:
          shouldSwitch = false;
          /* Get the two elements you want to compare,
          one from current row and one from the next: */
          x = rows[i].getElementsByTagName("TD")[n];
          y = rows[i + 1].getElementsByTagName("TD")[n];
          /* Check if the two rows should switch place,
          based on the direction, asc or desc: */
          if (dir == "asc") {
            if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
              // If so, mark as a switch and break the loop:
              shouldSwitch = true;
              break;
            }
          } else if (dir == "desc") {
            if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
              // If so, mark as a switch and break the loop:
              shouldSwitch = true;
              break;
            }
          }
        }
        if (shouldSwitch) {
          /* If a switch has been marked, make the switch
          and mark that a switch has been done: */
          rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
          switching = true;
          // Each time a switch is done, increase this count by 1:
          switchcount++;
        } else {
          /* If no switching has been done AND the direction is "asc",
          set the direction to "desc" and run the while loop again. */
          if (switchcount == 0 && dir == "asc") {
            dir = "desc";
            switching = true;
          }
        }
      }
    }
  }
  public fetch(): void {
    this.dataServiceService.selectAllDocs((data) => {
      // alert("suc - " + JSON.stringify(data) + " - simpl - " + data + "");
      this.listOfFiles = data;
      alert(this.scrollCount);
      for (let i = this.scrollCount; i < 15; i++) {
        if (i < this.listOfFiles.length) {
          this.listOfFilesDisplay.push(this.listOfFiles[i]);
          this.scrollCount = i;
        }
      }
    });
  }
  public loadData(event): void {
    setTimeout(() => {
      console.log('Done');
      //alert("count - "+this.scrollCount);
      let limit = this.scrollCount + 5;
      for (let i = this.scrollCount + 1; i < limit; i++) {
        if (i < this.listOfFiles.length) {
          this.listOfFilesDisplay.push(this.listOfFiles[i]);
          this.scrollCount = i;
        } else {
          break;
        }
      }
      event.target.complete();
      // alert("lis of files length"+this.listOfFiles.length);
      // alert("lis of files display length"+this.listOfFilesDisplay.length);


      // App logic to determine if all data is loaded
      // and disable the infinite scroll
      if (this.listOfFilesDisplay.length == 1000 || this.listOfFiles.length <= this.listOfFilesDisplay.length) {
        event.target.disabled = true;
      }
    }, 500);
  }
  ngOnInit() {

    /* this.sub = this.route.params.subscribe(params => {
       this.foldername = params['type'];
     });*/
    this.selectedFolder = 'Home';
    this.isHomeSelected = true;
    this.displayName = rigConfig.displayName;
    this.showLoadingImage = false;
    this.folderList = [{
      "value": "Crane"
    },
    { "value": "Drilling" },
    { "value": "Electrical" },
    { "value": "Marine" },
    { "value": "Mechanical" },
    { "value": "Miscellaneous" },
    { "value": "Subsea" },
    { "value": "Welder" },
    { "value": "Catering" },
    { "value": "Engineering" },
    { "value": "Stores" },
    { "value": "Site-Specific Forms" }];

    this.sharepointService.getFileDetails((data) => {
      alert("data"+data);
      this.listOfFiles = data;
      this.listOfFilesDisplay = this.listOfFiles;
    });
    /*this.listOfFiles = [
      {
        "id": 1,
        "name": "Replace pal nuts on brick tracker",
        "documentID": "IUASDH98ASD",
        "category": "Marine",
        "documentStatus": "Published",
        "parentSemsStandard": "askdjakdjsadsasdad adasdadasdad",
        "relatedDocuments": "asdasdadadadad asdasdasdasdas asdasdasdasdsadasdasdasd",
        "revDate": "2020-02-01",
        "rev": "",
        "isDownloaded": "false",
        "docPath": ""
      },

      {
        "id": 2,
        "name": "God of small things",
        "documentID": "IUASDH98ASD",
        "category": "Electrical",
        "documentStatus": "Published",
        "parentSemsStandard": "askdjakdjsadsasdad",
        "relatedDocuments": "asdasdadadadad asdasdasdasdas",
        "revDate": "2020-03-29",
        "rev": "",
        "isDownloaded": "false",
        "docPath": ""
      },
      {
        "id": 3,
        "name": "Hello asdsadd",
        "documentID": "IUASDH98ASD",
        "category": "Drilling",
        "documentStatus": "Published",
        "parentSemsStandard": "askdjakdjsadsasdad adasdadasdad",
        "relatedDocuments": "asdasdadadadad asdasdasdasdas asdasdasdasdsadasdasdasd",
        "revDate": "2019-02-20",
        "rev": "",
        "isDownloaded": "false",
        "docPath": ""
      },
      {
        "id": 4,
        "name": "Test asads yaysyasd",
        "documentID": "IUASDH98ASD",
        "category": "Marine",
        "documentStatus": "Published",
        "parentSemsStandard": "askdjakdjsadsasdad adasdadasdad",
        "relatedDocuments": "asdasdadadadad asdasdasdasdas asdasdasdasdsadasdasdasd",
        "revDate": "2019-01-22",
        "rev": "",
        "isDownloaded": "false",
        "docPath": ""
      },
      {
        "id": 1,
        "name": "Replace pal nuts on brick tracker",
        "documentID": "IUASDH98ASD",
        "category": "Marine",
        "documentStatus": "Published",
        "parentSemsStandard": "askdjakdjsadsasdad adasdadasdad",
        "relatedDocuments": "asdasdadadadad asdasdasdasdas asdasdasdasdsadasdasdasd",
        "revDate": "2019-01-22",
        "rev": "",
        "isDownloaded": "false",
        "docPath": ""
      }

      
    ]
*/

    if (environment.isAndroidApp) {
      setTimeout(() => {
        let count = 0;
        this.listOfFiles.forEach(element => {
          this.dataServiceService.insertData(element, () => {
            count++;
            alert("count - " + count + "length - " + this.listOfFiles.length);
            if (count === this.listOfFiles.length) {
              this.fetch();
            }
          });
        });
      }, 1000);
    }

  }


}
