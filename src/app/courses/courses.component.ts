import { CommonModule } from '@angular/common';
import { GetCoursesService } from '../services/get-courses.service';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss',
})
export class CoursesComponent {
  coursesArr: any[] = [];
  codeSorted: boolean = false;
  nameSorted: boolean = false;
  progSorted: boolean = false;
  searchTerm: string = "";

  constructor(private coursesService: GetCoursesService) {}

  ngOnInit(): void {
    this.coursesService.getCourses().subscribe((data) => {
      this.coursesArr = data;
      console.log(data);
    });
  }

  searchTable(): void {
    console.log("söker: " + this.searchTerm);
  }

  sortByCode(): void {
    this.resetTable();
    console.log('sorterar efter kod');
    this.nameSorted = false;
    this.progSorted = false;
    if (this.codeSorted == false) {
      console.log('sorterat efter kod uppifrån ner');
      this.codeSorted = true;
    } else {
      console.log('sorterat efter kod nerifrån upp');
      this.codeSorted = false;
    }
  }

  sortByName(): void {
    this.resetTable();
    console.log('sorterar efter namn');
    this.codeSorted = false;
    this.progSorted = false;
    if (this.nameSorted == false) {
      console.log('sorterat efter namn uppifrån ner');
      this.nameSorted = true;
    } else {
      console.log('sorterat efter namn nerifrån upp');
      this.nameSorted = false;
    }
  }

  sortByProg(): void {
    this.resetTable();
    console.log('sorterar efter prog');
    this.codeSorted = false;
    this.nameSorted = false;
    if (this.progSorted == false) {
      console.log('sorterat efter prog uppifrån ner');
      this.progSorted = true;
    } else {
      console.log('sorterat efter prog nerifrån upp');
      this.progSorted = false;
    }
  }

  //återställer tabell för ny sortering
  resetTable(): void {
    console.log('tabell återställd');
  }
}
