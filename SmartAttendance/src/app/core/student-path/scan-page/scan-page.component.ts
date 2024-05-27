import { Component, OnInit, ViewChild } from '@angular/core';
import { ZXingScannerComponent } from '@zxing/ngx-scanner';
import {IUserCredentials} from "../../../User.module";
import {QrCodeService} from "../../../qr-code.service";
import {UserService} from "../../../user.service"; // Assuming you have a user service to get the student ID

@Component({
  selector: 'app-scan-page',
  templateUrl: './scan-page.component.html',
  styleUrls: ['./scan-page.component.css']
})
export class ScanPageComponent implements OnInit {
  @ViewChild('scanner', { static: false }) scanner!: ZXingScannerComponent;
  availableDevices: MediaDeviceInfo[] = [];
  selectedDevice: MediaDeviceInfo;
  user: IUserCredentials | null = null;

  constructor(
    private qrCodeService: QrCodeService,
    private userService: UserService // Assuming userService provides student_id
  ) {
    this.selectedDevice = {} as MediaDeviceInfo; // Default initialization
  }

  ngOnInit(): void {
    // this.user = this.userService.getUser();
    // this.scanner.camerasFound.subscribe((devices: MediaDeviceInfo[]) => {
    //   this.availableDevices = devices;
    //   if (devices.length > 0) {
    //     this.selectedDevice = devices[0];
    //   }
    // });
  }

  onDeviceSelect(event: Event): void {
    const selectedDeviceId = (event.target as HTMLSelectElement).value;
    const device = this.availableDevices.find(device => device.deviceId === selectedDeviceId);
    if (device) {
      this.selectedDevice = device;
    }
  }

  // handleScanSuccess(result: string): void {
  //   console.log('Scan result:', result);
  //
  //   // Parse the JSON string from the QR code
  //   let scannedData;
  //   try {
  //     scannedData = JSON.parse(result);
  //   } catch (e) {
  //     console.error('Error parsing scan result:', e);
  //     return;
  //   }
  //
  //   const { passcode, course_id, date } = scannedData;
  //   const student_id = this.user?.id // Replace with actual method to get student_id
  //
  //   if (student_id && this.user) {
  //   this.qrCodeService.updateAttendance(student_id, course_id, date, passcode).subscribe(response => {
  //     console.log('Attendance updated successfully:', response);
  //   }, error => {
  //     console.error('Error updating attendance:', error);
  //   });
  // }
  // }
}
