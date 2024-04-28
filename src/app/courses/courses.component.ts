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
  coursesArrCopy: any[] = [];
  codeSorted: boolean = false;
  nameSorted: boolean = false;
  progSorted: boolean = false;
  searchTerm: string = '';
  coursesArrCopySorted: any[] = [];

  constructor(private coursesService: GetCoursesService) {}

  ngOnInit(): void {
    this.coursesService.getCourses().subscribe((data) => {
      this.coursesArr = data;
      //använder inte slice för då blir det konstigt när jag sorterar med prog, array byter håll varje sortering
      for (let index = 0; index < this.coursesArr.length; index++) {
        this.coursesArrCopy.push(this.coursesArr[index]);
      }
      console.log(this.coursesArr);
    });
  }

  searchTable(): void {
    let searchArr: string[] = []; //konvertera kurser till strings
    let searched: string[] = []; //håller koll på vilka som matchar sökning
    let searchedArr: any[] = []; //kurser från courseArr som matchar sökning

    // skapa en array där alla index är en combo av code, name och men mallanrum
    for (let index = 0; index < this.coursesArr.length; index++) {
      //lägger till alla kurser i en string array med kod och namn
      searchArr.push(
        `${this.coursesArr[index].code.toLowerCase()} ${this.coursesArr[
          index
        ].coursename.toLowerCase()}`
      );
    }

    for (let index = 0; index < this.coursesArr.length; index++) {
      //kollar om sökningen matchar kod eller namn på kurs
      let matchesSearchTerm: number = searchArr[index].search(this.searchTerm.toLowerCase());
      //om den matchar läggs den till i searched
      if (matchesSearchTerm != -1) {
        searched.push(searchArr[index]);
      }
    }

    // lägger till de från courseArr som matchar koden i de som ligger i searched
    for (let index = 0; index < this.coursesArr.length; index++) {
      for (let i = 0; i < searched.length; i++) {
        if (searched[i].substring(0, 6) == this.coursesArr[index].code) {
          searchedArr.push(this.coursesArr[index]);
        }
      }
    }
    this.coursesArrCopy = searchedArr;
  }

  sortByCode(): void {
    this.resetTable();
    console.log('sorterar efter kod');
    this.nameSorted = false;
    this.progSorted = false;
    if (this.codeSorted == false) {
      // sorterar array efter code
      this.coursesArrCopySorted = this.coursesArrCopy.sort((a, b) =>
        a.code > b.code ? 1 : -1
      );
      this.coursesArrCopy = this.coursesArrCopySorted;

      this.codeSorted = true;
    } else {
      this.coursesArrCopySorted = this.coursesArrCopy.sort((a, b) =>
        a.code > b.code ? -1 : 1
      );
      this.coursesArrCopy = this.coursesArrCopySorted;
      this.codeSorted = false;
    }
  }

  sortByName(): void {
    this.resetTable();
    console.log('sorterar efter namn');
    this.codeSorted = false;
    this.progSorted = false;
    if (this.nameSorted == false) {
      // sorterar array efter namn
      this.coursesArrCopySorted = this.coursesArrCopy.sort((a, b) =>
        a.coursename > b.coursename ? 1 : -1
      );
      this.coursesArrCopy = this.coursesArrCopySorted;
      this.nameSorted = true;
    } else {
      this.coursesArrCopySorted = this.coursesArrCopy.sort((a, b) =>
        a.coursename > b.coursename ? -1 : 1
      );
      this.coursesArrCopy = this.coursesArrCopySorted;
      this.nameSorted = false;
    }
  }

  sortByProg(): void {
    this.resetTable();
    console.log('sorterar efter prog');
    this.codeSorted = false;
    this.nameSorted = false;
    if (this.progSorted == false) {
      // sorterar array efter progression
      this.coursesArrCopySorted = this.coursesArrCopy.sort((a, b) =>
        a.progression > b.progression ? 1 : -1
      );
      this.coursesArrCopy = this.coursesArrCopySorted;
      this.progSorted = true;
    } else {
      this.coursesArrCopySorted = this.coursesArrCopy.sort((a, b) =>
        a.progression > b.progression ? -1 : 1
      );
      this.coursesArrCopy = this.coursesArrCopySorted;
      this.progSorted = false;
    }
  }

  //återställer tabell för ny sortering
  resetTable(): void {
    console.log('tabell återställd');

    this.coursesArrCopy = [];
    for (let index = 0; index < this.coursesArr.length; index++) {
      this.coursesArrCopy.push(this.coursesArr[index]);
    }
    console.log(this.coursesArr);
  }
}
