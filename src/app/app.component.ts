import {Component, OnInit, ViewChild} from '@angular/core';
import {HttpService} from "./shared/services/http.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatTableDataSource} from "@angular/material/table";
import {UserData} from "./shared/interfaces/interfaces";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  displayedColumns: string[] = ['image', 'breed', 'description'];
  dataSource!: MatTableDataSource<UserData>;
  form!: FormGroup
  breeds: any

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private fb: FormBuilder,
              private httpService: HttpService) {
  }

  ngOnInit(): void {
    this.initializeForm()
    this.getBreeds()
  }

  applyFilter() {
    const filterValue = this.form.value.select;
    this.dataSource.filter = filterValue
  }

  public getBreeds(): void {
    this.httpService.getBreed().subscribe({
      next: (res) => {
        this.breeds = res
        this.dataSource = new MatTableDataSource<UserData>(res)
        this.dataSource.paginator = this.paginator
        this.dataSource.sort = this.sort
      }
    })
  }

  private initializeForm(): void {
    this.form = this.fb.group({
      select: ['', [Validators.required]]
    })
  }
}
