import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { DialogCreateEditAddressComponent } from '../../_dialogs/dialog-create-edit-address/dialog-create-edit-address.component';
import { UserService } from '../../../_services/user.service';
import { AuthenticationService } from '../../../_services/authentication.service';

@Component({
  selector: 'app-profile-change-addresses',
  templateUrl: './profile-change-addresses.component.html',
  styleUrls: ['./profile-change-addresses.component.css']
})
export class ProfileChangeAddressesComponent implements OnInit {

  constructor(public dialog: MatDialog,
              private userService:UserService,
              private auth:AuthenticationService) { }

  userID;
  addresses = [];

  ngOnInit() {
    this.userID = this.auth.getUser().id;
    this.loadAddreses();
  }

  loadAddreses() {
    this.userService.getAddresses(this.userID).then(r => {
      if(r.status == 'success') {
        this.addresses = r.data;
        for(let i=0; i<this.addresses.length; i++) {
          this.addresses[i]['type'] = this.addresses[i]['nip'] != null ? 'company' : 'personal';
          if(this.addresses[i]['type'] == 'company') {
            this.addresses[i]['names'] = '';
            this.addresses[i]['names'] += this.addresses[i]['name'] != null ? this.addresses[i]['name'] : '';
            this.addresses[i]['names'] += this.addresses[i]['name2'] != null ? '<br>'+this.addresses[i]['name2'] : '';
            this.addresses[i]['names'] += this.addresses[i]['name3'] != null ? '<br>'+this.addresses[i]['name3'] : '';
          }
        }
        console.log(this.addresses);
      }
    });
  }

  addNewAddress_Click() {
    let dialogRef = this.dialog.open(DialogCreateEditAddressComponent, {
      width: '600px',
      data: {  }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result.success) {
        // console.log(JSON.stringify(result));
        this.loadAddreses();
      }
    });
  }
}
