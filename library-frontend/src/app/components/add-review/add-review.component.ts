import { Component, OnInit } from '@angular/core';
import { ReviewService } from '../../services/review.service';
import { AccountService } from '../../services/account.service';
import { CommonModule} from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-review',
  standalone: true,
  imports: [ CommonModule, FormsModule ],
  templateUrl: './add-review.component.html',
  styleUrl: './add-review.component.css'
})
export class AddReviewComponent implements OnInit{
  comment = {rating: 3, message: ''};
  bookId: string | null = null;
  isLoggedIn$!: Observable<boolean>;
  userId: number | null = null;
  //userId$: Observable<string> | null = null;

  constructor(private reviewService: ReviewService, private accountService: AccountService, private route: ActivatedRoute) {  }

  ngOnInit(): void {
	this.bookId = this.route.snapshot.paramMap.get('id');
    this.isLoggedIn$ = this.accountService.isLoggedIn$;
	this.userId = this.accountService.getUserId();	
  }
  
  submitReview() {
    this.reviewService.addReview(Number(this.bookId), Number(this.userId), this.comment.rating, this.comment.message).subscribe();
    alert('Recensione aggiunta');
	window.location.reload();
  }
}
