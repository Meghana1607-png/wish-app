import { Component } from '@angular/core';

@Component({
  selector: 'app-header-side-bar',
  templateUrl: './header-side-bar.component.html',
  styleUrls: ['./header-side-bar.component.css']
})
export class HeaderSideBarComponent {
  menu = [
      { path: 'org/dashboard', label: 'Blood Hub', icon: 'pi pi-users' },
      { path: 'org/donorsList', label: 'Donors list', icon: 'pi pi-users' },
      //{ path: 'org/receiversList', label: 'Receivers list', icon: 'pi pi-users' },
      {
        path: 'org/donorsList/pending',
        label: 'Donor pending list',
        icon: 'pi pi-users',
      },
      {
        path: 'org/donorsList/approved',
        label: 'Donor approved list',
        icon: 'pi pi-users',
      },
      {
        path: 'org/donorsList/rejected',
        label: 'Donor rejected list',
        icon: 'pi pi-users',
      },
      {
        path: 'org/receiversList/pending',
        label: 'Receiver pending list',
        icon: 'pi pi-users',
      },
      {
        path: 'org/receiversList/approved',
        label: 'Receiver approved list',
        icon: 'pi pi-users',
      },
      {
        path: 'org/receiversList/rejected',
        label: 'Receiver rejected list',
        icon: 'pi pi-users',
      },
      { path: 'org/teams-table', label: 'feedbacks', icon: 'pi pi-users' },
    ];
}
