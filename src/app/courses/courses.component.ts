import { CommonModule } from '@angular/common';
import { GetCoursesService } from '../services/get-courses.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss'
})
export class CoursesComponent {
  coursesArr: any[] = [];

  constructor(private coursesService: GetCoursesService) {}

  ngOnInit(){
    this.coursesService.getCourses().subscribe((data) =>{
      this.coursesArr = data;
    })
  }
}
