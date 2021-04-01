import { Component, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { distinctUntilChanged, startWith, tap } from 'rxjs/operators';
import { fadeInAnimation } from '../../utils/animations';
import { isNonNullable } from '../../utils/rx-operators';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss'],
})
export class ImageComponent {
  private readonly _src$ = new BehaviorSubject<string | undefined>(undefined);

  readonly src$ = this._src$.pipe(
    startWith(TINIEST_GIF),
    isNonNullable(),
    distinctUntilChanged(),
    tap(() => (this.isImageError = false))
  );

  @Input()
  set src(value: string) {
    this._src$.next(value);
  }

  isImageError = false;

  // eslint-disable-next-line class-methods-use-this
  async onImageLoaded(event: Event) {
    const imgElement = event.target as HTMLIonImgElement;
    return fadeInAnimation().addElement(imgElement).play();
  }

  onImageError() {
    this.isImageError = true;
  }
}

const TINIEST_GIF =
  'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';
