import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SweetAlertService } from 'src/app/services/utils/sweet-alert.service';

@Component({
  selector: 'app-reusable-data-table',
  templateUrl: './reusable-data-table.component.html',
  styleUrls: ['./reusable-data-table.component.scss'],
})
export class ReusableDataTableComponent implements OnInit {
  @Input()
  title: any;

  private data: any = [];
  public elementsPage: any = [];
  public originalData: any = [];

  @Input('data')
  public set value(val: any) {
    this.data = val;
    this.originalData = val;
    this.elementsInPage();
  }

  filteredData = [];

  @Input()
  isLoading: any = true;

  @Input()
  cols: any;

  @Input()
  disableAdd: any;

  @Input()
  disableEdit: any;

  @Output() onDelete: EventEmitter<any> = new EventEmitter();

  public totalPages = 1;
  public pageNumber = 1;
  public pageSize = 10;
  public count = 0;

  constructor(private swalService: SweetAlertService) {}

  ngOnInit() {}

  async elementsInPage() {
    this.count = this.data.length;
    this.totalPages = Math.ceil(this.count / this.pageSize);
    var start = (this.pageNumber - 1) * this.pageSize;
    var end = this.pageNumber * this.pageSize;

    if (end > this.count) {
      end = this.count;
    }

    this.elementsPage = this.data.slice(start, end);
  }

  nextPage() {
    this.pageNumber += 1;
    this.elementsInPage();
  }

  previousPage() {
    this.pageNumber -= 1;
    this.elementsInPage();
  }

  async delete(id: any) {
    let response = await this.swalService.triggerAlert();
    if (response.value) this.onDelete.emit(id);
  }
}
