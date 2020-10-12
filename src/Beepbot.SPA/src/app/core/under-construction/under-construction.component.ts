import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-under-construction',
  templateUrl: './under-construction.component.html',
  styleUrls: ['./under-construction.component.scss'],
})
export class UnderConstructionComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  easterEgg() {
    const speed = 15;
    let dozer = document.getElementById('dozer');
    dozer.style.position = 'relative';

    let x = 0;
    let i = 1;

    let velF = 0.1;
    let accF = 0.02;
    let velB = 0.1;
    let accB = 0.01;

    var id = setInterval(() => {
      var pos = x + 'px';

      if (i < 30) {
      } else if (i < 90) {
        x += velB;
        velB += accB;
      } else if (i < 150) {
        x += velB;
        velB -= accB;
      } else if (i < 180) {
      } else {
        x -= velF;
        velF += accF;
      }

      dozer.style.left = pos;

      i++;
      if (i > 1000) clearInterval(id);
    }, 100 / speed);
  }
}
