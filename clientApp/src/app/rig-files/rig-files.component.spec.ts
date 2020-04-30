import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RigFilesComponent } from './rig-files.component';

describe('RigFilesComponent', () => {
  let component: RigFilesComponent;
  let fixture: ComponentFixture<RigFilesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RigFilesComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RigFilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
