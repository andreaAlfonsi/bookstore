import { Component, OnInit } from '@angular/core';
import { CommonModule} from '@angular/common';
import { AccountService } from '../../services/account.service';
import { ReviewService } from '../../services/review.service'
import { Review } from '../../models/review.model';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { AddReviewComponent } from '../add-review/add-review.component';


@Component({
  selector: 'app-review-list',
  standalone: true,
  imports: [CommonModule, AddReviewComponent],
  templateUrl: './review-list.component.html',
  styleUrl: './review-list.component.css'
})
export class ReviewListComponent implements OnInit{
	
  isLoggedIn$!: Observable<boolean>;
  reviews: Review[] = [];
  bookId: string | null = null;

  constructor(private reviewService: ReviewService, private route: ActivatedRoute, 	private accountService: AccountService,) {}
  
  ngOnInit(): void {
	  this.isLoggedIn$ = this.accountService.isLoggedIn$;
	  this.bookId = this.route.snapshot.paramMap.get('id');
      this.loadReviews();
	}
	
  loadReviews(): void {
    this.reviewService.getReviews(Number(this.bookId)).subscribe((data: Review[]) => {
      this.reviews = data;
    });
	}
}
