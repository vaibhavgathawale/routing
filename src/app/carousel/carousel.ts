import { Component, OnInit, AfterViewInit, OnDestroy, NgZone, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { interval, Subscription } from 'rxjs';


@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carousel.html',
  styleUrls: ['./carousel.css']
})
export class CarouselComponent implements OnInit, AfterViewInit, OnDestroy {
  images = [
    'assets/images/img1.jpg',
    'assets/images/img2.jpg',
    'assets/images/img3.jpg',
    // add more if needed
  ];

   currentIndex = 0;
  readonly intervalMs = 1000; // change interval as needed
  private timerSub: Subscription | null = null;
  private started = false; // guards against double start

  constructor(private ngZone: NgZone, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    // attempt to start early (covers some route reuse cases)
    this.tryStartAuto();
  }

  ngAfterViewInit(): void {
    // ensure start after view is rendered
    this.tryStartAuto();
  }

  ngOnDestroy(): void {
    this.stopAuto();
  }

  private tryStartAuto(): void {
    // ensure we only start once
    if (!this.started) {
      this.started = true;
      // small delay to ensure DOM/images are registered; safe and fixes flakiness
      setTimeout(() => this.startAuto(), 20);
    }
  }

  private startAuto(): void {
    // don't start if only one or zero images
    if (!this.images || this.images.length < 2) { return; }

    // if already running, do nothing
    if (this.timerSub) { return; }

    // run the interval outside Angular and re-enter only when updating index
    this.ngZone.runOutsideAngular(() => {
      this.timerSub = interval(this.intervalMs).subscribe(() => {
        this.ngZone.run(() => {
          this.next();
          // mark for check in case OnPush or to ensure update
          try { this.cdr.markForCheck(); } catch {}
        });
      });
    });
  }

  private stopAuto(): void {
    if (this.timerSub) {
      this.timerSub.unsubscribe();
      this.timerSub = null;
    }
  }

  private restartAuto(): void {
    this.stopAuto();
    // small delay so UI updates before timer restarts
    setTimeout(() => this.startAuto(), 20);
  }

  next(): void {
    if (!this.images || this.images.length === 0) return;
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
  }

  prev(): void {
    if (!this.images || this.images.length === 0) return;
    this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
  }

  goTo(index: number): void {
    if (!this.images || index < 0 || index >= this.images.length) return;
    this.currentIndex = index;
    this.restartAuto(); // restart timer so user has full interval
  }

  onMouseEnter(): void {
    this.stopAuto();
  }

  onMouseLeave(): void {
    this.startAuto();
  }
}
